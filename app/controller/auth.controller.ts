import * as express from "express";
import * as bcryptjs from "bcryptjs"

import * as Helper from "./../helper";
import * as Middleware from "./../middleware";

import { Controller, Route, Root, RouteMiddleware, IRoutes } from "@dedekrnwan/decorators-express";

import { User } from "./../entity";
import { IResponse } from "./../interfaces";

import * as joi from "joi";
import { register } from "../interfaces/entity/joi";


@Controller('/auth')
export class AuthController {
    user:User
    constructor(){
        this.user = new User();
    }
    @Route(<IRoutes> {
        path: '/login',
        method: 'post',
    })
    @RouteMiddleware.before([
        Middleware.Joi.validate.body(Middleware.Joi.schema.user.login)
    ])
    login = async (request:express.Request, response:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            this.user.model.findOne({
                email: request.body.email
            }).then(user => {
                bcryptjs.compare(request.body.password, user.password)
                .then((result) => {
                    if(result){
                        Helper.Jwt.sign({
                            id: user.id
                        }).then((token) => {
                            next(Helper.Response.prototype.ok('You successfully login', {
                                token: token
                            }))
                        }).catch((error) => {
                            next(new Helper.Exception(error))
                        })
                    }else{
                        //password false
                        next(Helper.Response.prototype.badRequest('Email or password is invalid', {}));
                    }
                }).catch((error) => {
                    next(new Helper.Exception(error))
                })
            }).catch(error => {
                next(Helper.Response.prototype.badRequest('Email or password is invalid', {}));
            })
        } catch (error) {
            next(new Helper.Exception(error))
        }
    }
    @Route(<IRoutes> {
        path: '/register',
        method: 'post',
    })
    @RouteMiddleware.before([
        Middleware.Joi.validate.body(Middleware.Joi.schema.user.register)
    ])
    register = async (request:express.Request, response:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            Helper.bcryptjs.hash(request.body['password']).then((result) => {
                request.body['password'] = result;
                this.user.model(request.body).save().then(user => {
                    next(Helper.Response.prototype.created('your account has been created', user))
                }).catch(error => {
                    next(new Helper.Exception(error))
                })
            }).catch((error) => {
                next(new Helper.Exception(error))
            })
        } catch (error) {
            next(new Helper.Exception(error))
        }
    }
}
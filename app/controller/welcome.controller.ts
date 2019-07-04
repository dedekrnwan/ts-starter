import * as express from "express";

import * as Helper from "./../helper";
import * as Middleware from "./../middleware";

import { IRoutes, Controller, Route, Root, RouteMiddleware } from "@dedekrnwan/decorators-express";

@Controller('/welcome')
export class WelcomeController {
    constructor(){
    }
    @Root()
    @RouteMiddleware.before([
        Middleware.Auth.Jwt.authenticated
    ])
    index = async (request:express.Request, response:express.Response, next:express.NextFunction):Promise<any> => {
        try {
            next(new Helper.Response().ok(`Mantab`,{}))
        } catch (error) {
            next(new Helper.Exception(error))
        }
    }
}
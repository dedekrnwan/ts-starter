import * as express from "express";
import * as joi from "joi";
import * as ObjectJoi from "./../interfaces/entity/joi";
import * as Helper from "./../helper/response.helper";

export const schema  = {
    user : {
        register: ObjectJoi.register(),
        login: ObjectJoi.login(),
    }
}

export const validate = {
    param: (schema:joi.ObjectSchema, name:any) => {
        return (req:express.Request, res:express.Response, next:express.NextFunction) => {
            let result = joi.validate({
                param: req['params'][name]
            }, schema)
            if(result.error){
                next(Helper.Response.prototype.badRequest(result.error.name, {
                    error: result.error.details[0].message,
                    param: result.error._object.param
                }))
            }else{
                next();
            }
        }
    },
    body: (schema:joi.ObjectSchema) => {
        return (req:express.Request, res:express.Response, next:express.NextFunction) => {
            joi.validate(req.body, schema, (error) => {
                if(error){
                    next(Helper.Response.prototype.badRequest(error.name, {
                        error: error.details,
                    }))
                }else{
                    next();
                }
            });
        }
    }
}
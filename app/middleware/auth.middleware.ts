import * as express from "express";
import * as Helper from "./../helper";
import { decode } from "punycode";

export const Jwt = {
    authenticated : async (req: express.Request, res:express.Response, next:express.NextFunction):Promise<any> =>{
        try {
            //get the token from the header if present
            let token:string = req.headers["authorization"];
            //if no token found, return response (without going to the next middelware)
            if (!token){
                next(new Helper.Response().unAuthorized('Access denied. No token provided.', req.body))
            }else{
                //if can verify the token, set req.user and pass to next middleware
                token = token.replace('Bearer ','');
                Helper.Jwt.verify(token).then((result) => {
                    next();
                }).catch(async (error) => {
                    next(await new Helper.Exception(error))
                })
            }
        } catch (error) {
            next(await new Helper.Exception(error))
        }
    },
    authorized: async (req: express.Request, res:express.Response, next:express.NextFunction):Promise<any> =>{
        try {
            
        } catch (error) {
            next(await new Helper.Exception(error))
        }
    }
}
import * as Auth from "./auth.middleware";
import { Response } from "./response.middleware";
import { Error as ErrorMiddleware} from "./error.middleware";
import * as Joi from "./joi.middleware";
import * as express from "express"
import * as cors from "cors";
import * as bodyparser from "body-parser";

const before = async (app:express.Application):Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let middlewares:Array<Function> | Array<any>
            //declaring used middleware
            middlewares = [
                cors(),
                bodyparser.urlencoded({
                    extended: true
                }),
                bodyparser.json()
            ];
            middlewares.forEach(async (middleware:any) => {
                await app.use(middleware)
            })
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}
const after = (app:express.Application):Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let middlewares:Array<Function> | Array<any>
            //declaring used middleware
            middlewares = [
                Response
            ];
            middlewares.forEach(async (middleware:any) => {
                await app.use(middleware)
            })
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}
const error = (app:express.Application):Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let middlewares:Array<Function> | Array<any>
            //declaring used middleware
            middlewares = [
                ErrorMiddleware
            ];
            middlewares.forEach(async (middleware:any) => {
                await app.use(middleware)
            })
            resolve(app)
        } catch (error) {
            reject(error)
        }
    })
}

export {
    before,
    after,
    error,
    Response,
    Auth,
    Joi
}

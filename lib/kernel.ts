import * as express from "express";
import chalk from "chalk";

import { Database } from "./../app/services";

import { RouteMiddleware, Attach, IRoutes } from "@dedekrnwan/decorators-express";

import * as Middlewares from "./../app/middleware";
import * as Controllers from "./../app/controller";

export default async (apps:express.Application) => {
   return new Promise<express.Application>(async (resolve, reject) =>{
        try {
            const db = new Database();
            db.fractal().then(result => {
                console.log(chalk.green.inverse(result))
                //middlewares attach
                middlewares(apps).then(app => {
                    resolve(app)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        } catch (error) {
            reject(error)
        }
   })
}
const controllers = [
    Controllers.WelcomeController,
    Controllers.AuthController,
];
const middlewares = async (apps:express.Application) => {
    return new Promise<express.Application>(async (resolve, reject) => {
        try {
            //use all middleware that has been set to run before all request
            Middlewares.before(apps).then((apps) => {
                //use all controllers
                Attach.Controller(apps,controllers).then((apps) => {
                    //use middleware that has been set to run for error handling
                     Middlewares.error(apps).then((apps) => {
                        //use middleware that has been set to run after all request
                        Middlewares.after(apps).then((apps) => {
                            resolve(apps)
                        }).catch(error => {
                            reject(error)
                        })
                    }).catch(error => {
                        reject(error)
                    })
                }).catch((error) => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        } catch (error) {
            reject(error)
        }
    })
}
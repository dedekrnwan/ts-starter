import { createConnections, Connection } from "typeorm";
import * as mongoose from "mongoose";

import { fractal } from "./../config/database.config";

export class Database {
    constructor(){

    }
    
    fractal:any = async (url?:string) => {
        return new Promise(async (resolve, reject) => {
            try {
                await mongoose.connect(
                    fractal.url, 
                    {useNewUrlParser: true}
                ).then(async (result) => {
                    resolve(`Mongoose ${fractal.schema} connection is open to ${(url) ? url : fractal.url}`)
                }).catch(error => {
                    reject(error)
                });
                // await mongoose.connection.on('connected', () => {
                //     resolve(`Mongoose ${fractal.schema} connection is open to ${(url) ? url : fractal.url}`)
                // })
                // await mongoose.connection.on('error', (error) => {
                //     reject(`Mongoose ${fractal.schema} connection at ${(url) ? url : fractal.url} has occured ${error} error`);
                // });
                // await mongoose.connection.on('disconnected', () => {
                //     reject(`Mongoose ${fractal.schema} connection at ${(url) ? url : fractal.url} is disconnected`);
                // });
                // process.on('SIGINT', function(){
                //     mongoose.connection.close(function(){
                //         console.log(`Mongoose ${fractal.schema} connection is disconnected due to application termination`);
                //         process.exit(0)
                //     });
                // });
            } catch (error) {
                reject(error)
            }
        })
    }
}
import * as express from "express";
import * as path from "path";

import * as Config from "./../app/config";

import { Database } from "./../app/services";
import { Error } from "./../app/interfaces";

import { RouteMiddleware, Attach, IRoutes } from "@dedekrnwan/decorators-express";

import * as Middlewares from "./../app/middleware";
import * as Controllers from "./../app/controller"

class App {
    app:express.Application
    constructor(){
        this.app = express()
        this.database()
        this.middlewares()
        this.static()
    }
    middlewares = async () => {
        try {
            Middlewares.before(this.app).then((apps) => {
                this.app = apps;
            }).catch(error => {
                throw error;
            })

            Attach.Controller(this.app,[
                Controllers.WelcomeController,
                Controllers.AuthController,
            ]).then((apps) => {
                this.app = apps;
            }).catch((error) => {
                throw error;
            })
            Middlewares.error(this.app).then((apps) => {
                this.app = apps;
            }).catch(error => {
                throw error;
            })
            Middlewares.after(this.app).then((apps) => {
                this.app = apps;
            }).catch(error => {
                throw error;
            })
        } catch (error) {
            throw error
        }
    }
    static = async () => {
        this.app.use('/public',express.static(path.join(__dirname, './../public/')))
    }
    database = async () => {
        try {
            const db = await new Database();
            await db.fractal();
            await db.orm();
        } catch (error) {
            throw error
        }
    }
    run = async (port:number) => {
        try {
            this.app.listen(port, () => {
                console.log(`${Config.Server.name} listening on the port ${port}`)
            }).on('error' , async (err:Error) => {
                let another_port = [8080, 3000, 4000, 5000, 6000,7000,8000,9000]; 
                let next = another_port[Math.floor(Math.random() * another_port.length)];
                if(err.code == 'EADDRINUSE')
                    console.error(`${Config.Server.name} failed listening on the port ${err['port']}`)
                    console.log(`${Config.Server.name} try listening on the port ${next}`)
                    await this.run(next)
            })
        } catch (error) {
            throw error;
        }
    }
}

export default App
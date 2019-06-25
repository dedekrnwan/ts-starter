import * as express from "express";
import * as path from "path";

import * as Config from "./../app/config";

import { Database } from "./../app/services";
import { Error } from "./../app/interfaces";


import { RouteMiddleware, Attach, IRoutes, IMiddlewares } from "@dedekrnwan/decorators-express";
import * as Middlewares from "./../app/middleware";
import * as Controllers from "./../app/controller"

class App {
    app:express.Application
    constructor(){
        this.app = express()
        this.app = Middlewares.before(this.app);
        this.app = Attach.Controller(this.app, [
            Controllers.WelcomeController
        ]);
        this.app = Middlewares.error(this.app);
        this.app = Middlewares.after(this.app);

        this.static()
        this.database()
    }
    static = async () => {
        this.app.use('/public',express.static(path.join(__dirname, './../public/')))
    }
    routes = async (routes:any) => {
        routes.data.forEach((route:any) => {
            this.app.use(routes.uses, route.router);
        });
    }
    database = async () => {
        const db = await new Database();
        await db.fractal();
    }
    run = async (port:number) => {
        this.app.listen(port, () => {
            console.log(`${Config.Server.name} listening on the port ${port}`)
        }).on('error' , async (err:Error) => {
            let another_port = [8080, 80, 3000, 4000, 5000]; 
            let next = another_port[Math.floor(Math.random() * another_port.length)];
            if(err.code == 'EADDRINUSE')
                console.error(`${Config.Server.name} failed listening on the port ${err['port']}`)
                console.log(`${Config.Server.name} try listening on the port ${next}`)
                await this.run(next)
        })
    }
}

export default App
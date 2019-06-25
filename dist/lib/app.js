"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const Config = require("./../app/config");
const services_1 = require("./../app/services");
const decorators_express_1 = require("@dedekrnwan/decorators-express");
const Middlewares = require("./../app/middleware");
const Controllers = require("./../app/controller");
class App {
    constructor() {
        this.app = express();
        this.app = Middlewares.before(this.app);
        this.app = decorators_express_1.Attach.Controller(this.app, [
            Controllers.WelcomeController
        ]);
        this.app = Middlewares.error(this.app);
        this.app = Middlewares.after(this.app);
        this.static();
        this.database();
    }
    static() {
        this.app.use('/public', express.static(path.join(__dirname, './../public/')));
    }
    routes(routes) {
        routes.data.forEach((route) => {
            this.app.use(routes.uses, route.router);
        });
    }
    database() {
        const db = new services_1.Database();
        db.fractal();
    }
    run(port) {
        this.app.listen(port, () => {
            console.log(`${Config.Server.name} listening on the port ${port}`);
        }).on('error', (err) => {
            let another_port = [8080, 80, 3000, 4000, 5000];
            let next = another_port[Math.floor(Math.random() * another_port.length)];
            if (err.code == 'EADDRINUSE')
                console.error(`${Config.Server.name} failed listening on the port ${err['port']}`);
            console.log(`${Config.Server.name} try listening on the port ${next}`);
            this.run(next);
        });
    }
}
exports.default = App;

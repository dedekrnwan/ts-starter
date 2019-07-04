"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.middlewares = () => __awaiter(this, void 0, void 0, function* () {
            try {
                Middlewares.before(this.app).then((apps) => {
                    this.app = apps;
                }).catch(error => {
                    throw error;
                });
                decorators_express_1.Attach.Controller(this.app, [
                    // Controllers.WelcomeController,
                    Controllers.AuthController,
                ]).then((apps) => {
                    this.app = apps;
                }).catch((error) => {
                    throw error;
                });
                Middlewares.error(this.app).then((apps) => {
                    this.app = apps;
                }).catch(error => {
                    throw error;
                });
                Middlewares.after(this.app).then((apps) => {
                    this.app = apps;
                }).catch(error => {
                    throw error;
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.static = () => __awaiter(this, void 0, void 0, function* () {
            this.app.use('/public', express.static(path.join(__dirname, './../public/')));
        });
        this.database = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield new services_1.Database();
                yield db.fractal();
                yield db.orm();
            }
            catch (error) {
                throw error;
            }
        });
        this.run = (port) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.app.listen(port, () => {
                    console.log(`${Config.Server.name} listening on the port ${port}`);
                }).on('error', (err) => __awaiter(this, void 0, void 0, function* () {
                    let another_port = [8080, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
                    let next = another_port[Math.floor(Math.random() * another_port.length)];
                    if (err.code == 'EADDRINUSE')
                        console.error(`${Config.Server.name} failed listening on the port ${err['port']}`);
                    console.log(`${Config.Server.name} try listening on the port ${next}`);
                    yield this.run(next);
                }));
            }
            catch (error) {
                throw error;
            }
        });
        this.app = express();
        this.database();
        this.middlewares();
        this.static();
    }
}
exports.default = App;

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
const app_1 = require("../lib/app");
const request = require("supertest");
const mongoose = require("mongoose");
const Controllers = require("./../app/controller");
const app = new app_1.default().app;
describe('Accessing controllers', () => {
    [
        Controllers.WelcomeController
    ].forEach(controller => {
        const prefix = Reflect.getMetadata(`${controller.name}:prefix`, controller);
        const routes = Reflect.getMetadata(`${controller.name}:routes`, controller);
        routes.forEach((route) => {
            // router.route(`${route.path}`)[route.method]([...middlewares.before, handler, ...middlewares.after, ...middlewares.error]) 
            test(`Test of ${prefix}${route.path}, should get 200 or 401 status code`, (done) => __awaiter(this, void 0, void 0, function* () {
                yield request(app).get(`${prefix}${route.path}`).then((response) => __awaiter(this, void 0, void 0, function* () {
                    yield mongoose.connection.close();
                    yield expect(response.status == 200 || response.status == 401).toBeTruthy();
                    done();
                }));
            }));
        });
    });
});

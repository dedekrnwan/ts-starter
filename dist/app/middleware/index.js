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
const Auth = require("./auth.middleware");
exports.Auth = Auth;
const response_middleware_1 = require("./response.middleware");
exports.Response = response_middleware_1.Response;
const error_middleware_1 = require("./error.middleware");
const Joi = require("./joi.middleware");
exports.Joi = Joi;
const cors = require("cors");
const bodyparser = require("body-parser");
const before = (app) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let middlewares;
            //declaring used middleware
            middlewares = [
                cors(),
                bodyparser.urlencoded({
                    extended: true
                }),
                bodyparser.json()
            ];
            middlewares.forEach((middleware) => __awaiter(this, void 0, void 0, function* () {
                yield app.use(middleware);
            }));
            resolve(app);
        }
        catch (error) {
            reject(error);
        }
    }));
});
exports.before = before;
const after = (app) => {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let middlewares;
            //declaring used middleware
            middlewares = [
                response_middleware_1.Response
            ];
            middlewares.forEach((middleware) => __awaiter(this, void 0, void 0, function* () {
                yield app.use(middleware);
            }));
            resolve(app);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.after = after;
const error = (app) => {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let middlewares;
            //declaring used middleware
            middlewares = [
                error_middleware_1.Error
            ];
            middlewares.forEach((middleware) => __awaiter(this, void 0, void 0, function* () {
                yield app.use(middleware);
            }));
            resolve(app);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.error = error;

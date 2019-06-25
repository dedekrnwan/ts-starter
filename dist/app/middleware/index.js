"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth = require("./auth.middleware");
exports.Auth = Auth;
const response_middleware_1 = require("./response.middleware");
exports.Response = response_middleware_1.Response;
const error_middleware_1 = require("./error.middleware");
const cors = require("cors");
const before = (app) => {
    let middlewares;
    //declaring used middleware
    middlewares = [
        cors(),
    ];
    middlewares.forEach((middleware) => {
        app.use(middleware);
    });
    return app;
};
exports.before = before;
const after = (app) => {
    let middlewares;
    //declaring used middleware
    middlewares = [
        response_middleware_1.Response
    ];
    middlewares.forEach((middleware) => {
        app.use(middleware);
    });
    return app;
};
exports.after = after;
const error = (app) => {
    let middlewares;
    //declaring used middleware
    middlewares = [
        error_middleware_1.Error
    ];
    middlewares.forEach((middleware) => {
        app.use(middleware);
    });
    return app;
};
exports.error = error;

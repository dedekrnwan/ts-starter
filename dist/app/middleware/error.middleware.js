"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helper = require("./../helper");
exports.Error = (request, response, next) => {
    next(new Helper.Response().notFound(`Not Found`, {}));
};

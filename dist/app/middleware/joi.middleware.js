"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const ObjectJoi = require("./../interfaces/entity/joi");
const Helper = require("./../helper/response.helper");
exports.schema = {
    user: {
        register: ObjectJoi.register(),
        login: ObjectJoi.login(),
    }
};
exports.validate = {
    param: (schema, name) => {
        return (req, res, next) => {
            let result = joi.validate({
                param: req['params'][name]
            }, schema);
            if (result.error) {
                next(Helper.Response.prototype.badRequest(result.error.name, {
                    error: result.error.details[0].message,
                    param: result.error._object.param
                }));
            }
            else {
                next();
            }
        };
    },
    body: (schema) => {
        return (req, res, next) => {
            joi.validate(req.body, schema, (error) => {
                if (error) {
                    next(Helper.Response.prototype.badRequest(error.name, {
                        error: error.details,
                    }));
                }
                else {
                    next();
                }
            });
        };
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
exports.register = () => {
    return joi.object().keys({
        email: joi.string().email().required(),
        username: joi.string().required(),
        name: joi.string().required(),
        birthdate: joi.date().required(),
        phone: joi.string(),
        telephone: joi.string(),
        address: joi.string(),
        category: joi.string().required(),
        email_verify_date: joi.date(),
        password: joi.string().required(),
        remember_token: joi.string(),
        created_date: joi.date(),
        created_by_id: joi.number(),
        updated_date: joi.date(),
        updated_by_id: joi.number(),
    });
};
exports.login = () => {
    return joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
};

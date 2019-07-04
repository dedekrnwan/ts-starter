"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("localenv");
exports.fractal = {
    url: `${process.env.FRACTAL_DEFAULT_URL}:${process.env.FRACTAL_DEFAULT_PORT}/${process.env.FRACTAL_DEFAULT_SCHEMA}`,
    port: parseInt(process.env.FRACTAL_DEFAULT_PORT || '27017'),
    schema: process.env.FRACTAL_DEFAULT_SCHEMA,
};

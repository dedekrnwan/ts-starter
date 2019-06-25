"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = (retur, request, response, next) => {
    response.status((retur.meta.status) ? retur.meta.status : 500).json(retur);
};

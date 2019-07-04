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
const Helper = require("./../helper");
exports.Jwt = {
    authenticated: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            //get the token from the header if present
            let token = req.headers["authorization"];
            //if no token found, return response (without going to the next middelware)
            if (!token) {
                next(new Helper.Response().unAuthorized('Access denied. No token provided.', req.body));
            }
            else {
                //if can verify the token, set req.user and pass to next middleware
                token = token.replace('Bearer ', '');
                // const decoded = await new Helper.Jwt(token).verify();
                let decoded;
                Helper.Jwt.verify(token).then((result) => {
                    decoded = result;
                }).catch((error) => {
                    throw error;
                });
                next();
            }
        }
        catch (error) {
            next(yield new Helper.Exception(error));
        }
    }),
    authorized: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            next(yield new Helper.Exception(error));
        }
    })
};

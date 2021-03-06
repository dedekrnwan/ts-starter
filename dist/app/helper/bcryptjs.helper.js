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
const bcryptJs = require("bcryptjs");
const fs = require("fs");
exports.bcryptjs = {
    hash: (data) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let privateKey;
                fs.readFile(`${__dirname}/../utils/private.key`, (error, data) => {
                    if (error)
                        reject(error);
                    privateKey = data.toString('utf-8');
                });
                bcryptJs.hash(data, yield bcryptJs.genSalt(10)).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    })
};

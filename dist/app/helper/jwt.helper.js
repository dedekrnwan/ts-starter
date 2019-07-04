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
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Config = require("./../config");
// export class Jwt {
//     public data:any
//     private private:string
//     private public:string
//     public options:IJwtOptions
//     constructor(data:any, $options?:IJwtOptions) {
//         this.data = data
//         //key
//         this.key()
//         if(!$options){
//             this.options = Config.Jwt()
//         }else{
//             this.options.issuer = ($options.issuer) ? $options.issuer : this.options.issuer;
//             this.options.subject = ($options.subject) ? $options.subject : this.options.subject;
//             this.options.audience = ($options.audience) ? $options.audience : this.options.audience;
//             this.options.expiresIn = ($options.expiresIn) ? $options.expiresIn : this.options.expiresIn;
//             this.options.algorithm = ($options.algorithm) ? $options.algorithm : this.options.algorithm;
//         }
//     }
//     private key(){
//         try {
//             this.private = fs.readFileSync(`${__dirname}/../utils/private.key`, 'utf-8')
//             this.public = fs.readFileSync(`${__dirname}/../utils/public.key`, 'utf-8')
//         } catch (error) {
//             console.log(`error reading key: `, error)
//             throw error
//         }
//     }
//     public async sign(){
//         // Token signing options
//         let option = <IJwtOptions> {
//             issuer:  this.options.issuer,
//             subject:  this.options.subject,
//             audience:  this.options.audience,
//             expiresIn:  "30d",    // 30 days validity
//             algorithm:  "RS256"    
//         };
//         return await jwt.sign(
//             this.data, 
//             this.private,
//             option
//         );
//     }
//     public async verify(){
//         let option = <IJwtOptions> {
//             issuer:  this.options.issuer,
//             subject:  this.options.subject,
//             audience:  this.options.audience,
//             expiresIn:  "30d",
//             algorithm:  ["RS256"]
//         };
//         return await jwt.verify(
//             this.data, 
//             this.public,
//             option
//         );
//     }
//     public async decode(){
//         return await jwt.decode(
//             this.data, 
//             {
//                 complete: true
//             }
//         );
//     }
// }
exports.Jwt = {
    sign: (data) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                fs.readFile(`${__dirname}/../utils/private.key`, 'utf-8', (error, result) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (error)
                            reject(error);
                        var signOptions = {
                            issuer: 'local',
                            subject: 'Json web token',
                            audience: 'Typescript',
                            expiresIn: "12h",
                            algorithm: "RS256",
                        };
                        jwt.sign(data, result, signOptions, (error, token) => {
                            if (error)
                                reject(error);
                            resolve(token);
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            }
            catch (error) {
                reject(error);
            }
        }));
    }),
    verify: (token, publicKey) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let privateKey;
                fs.readFile(`${__dirname}/../utils/private.key`, 'utf-8', (error, data) => {
                    if (error)
                        reject(error);
                    privateKey = data;
                });
                const key = (publicKey) ? publicKey : privateKey;
                const result = yield jwt.verify(token, key, yield Config.Jwt());
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        }));
    }),
    decode: (token) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield jwt.decode(token, {
                    complete: true
                });
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        }));
    })
};

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs = require("bcryptjs");
const typeorm_1 = require("typeorm");
const Helper = require("./../helper");
const Middleware = require("./../middleware");
const decorators_express_1 = require("@dedekrnwan/decorators-express");
const entity_1 = require("./../entity");
let AuthController = class AuthController {
    constructor() {
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = typeorm_1.getConnection('default');
                connection.getRepository(entity_1.User).findOne({
                    email: request.body.email,
                }).then((user) => {
                    bcryptjs.compare(request.body.password, user.password)
                        .then((result) => {
                        if (result) {
                            Helper.Jwt.sign({
                                id: user.id
                            }).then((token) => {
                                next(Helper.Response.prototype.ok('You successfully login', {
                                    token: token
                                }));
                            }).catch((error) => {
                                next(new Helper.Exception(error));
                            });
                        }
                        else {
                            //password false
                            next(Helper.Response.prototype.badRequest('Email or password is invalid', {}));
                        }
                    }).catch((error) => {
                        next(new Helper.Exception(error));
                    });
                }).catch((error) => {
                    next(Helper.Response.prototype.badRequest('Email or password is invalid!', error));
                });
            }
            catch (error) {
                next(new Helper.Exception(error));
            }
        });
        this.register = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                Helper.bcryptjs.hash(request.body['password']).then((result) => {
                    request.body['password'] = result;
                    const connection = typeorm_1.getConnection('default');
                    connection.manager.insert(entity_1.User, request.body).then((result) => {
                        next(Helper.Response.prototype.created('your account has been created', result));
                    }).catch((error) => {
                        next(new Helper.Exception(error));
                    });
                }).catch((error) => {
                    next(new Helper.Exception(error));
                });
                // connection.getRepository(User).findOne({
                //     email: request.body.email,
                // }).then((user) => {
                //     bcryptjs.compare(request.body.password, user.password)
                //         .then((result) => {
                //             if(result)
                //                 Helper.Jwt.sign({
                //                     id: user.id
                //                 }).then((token) => {
                //                     next(Helper.Response.prototype.ok('You successfully login', {
                //                         token: token
                //                     }))
                //                 }).catch((error) => {
                //                     next(new Helper.Exception(error))
                //                 })
                //             //password false
                //             next(Helper.Response.prototype.badRequest('Email or password is invalid', {}));
                //         }).catch((error) => {
                //             next(new Helper.Exception(error))
                //         })
                // }).catch((error) => {
                //     next(Helper.Response.prototype.badRequest('Email or password is invalid!', error));
                // })
            }
            catch (error) {
                next(new Helper.Exception(error));
            }
        });
    }
};
__decorate([
    decorators_express_1.Route({
        path: '/login',
        method: 'post',
    }),
    decorators_express_1.RouteMiddleware.before([
        Middleware.Joi.validate.body(Middleware.Joi.schema.user.login)
    ]),
    __metadata("design:type", Object)
], AuthController.prototype, "login", void 0);
__decorate([
    decorators_express_1.Route({
        path: '/register',
        method: 'post',
    }),
    decorators_express_1.RouteMiddleware.before([
        Middleware.Joi.validate.body(Middleware.Joi.schema.user.register)
    ]),
    __metadata("design:type", Object)
], AuthController.prototype, "register", void 0);
AuthController = __decorate([
    decorators_express_1.Controller('/auth'),
    __metadata("design:paramtypes", [])
], AuthController);
exports.AuthController = AuthController;

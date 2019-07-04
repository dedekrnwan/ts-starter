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
const Helper = require("./../helper");
const Middleware = require("./../middleware");
const decorators_express_1 = require("@dedekrnwan/decorators-express");
let WelcomeController = class WelcomeController {
    constructor() {
        this.index = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                next(new Helper.Response().ok(`Mantab`, {}));
            }
            catch (error) {
                next(new Helper.Exception(error));
            }
        });
    }
};
__decorate([
    decorators_express_1.Root(),
    decorators_express_1.RouteMiddleware.before([
        Middleware.Auth.Jwt.authenticated
    ]),
    __metadata("design:type", Object)
], WelcomeController.prototype, "index", void 0);
WelcomeController = __decorate([
    decorators_express_1.Controller('/welcome'),
    __metadata("design:paramtypes", [])
], WelcomeController);
exports.WelcomeController = WelcomeController;

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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let User = User_1 = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
        comment: 'Unique username'
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
        comment: 'Unique email'
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'date',
    }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 20,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 20,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 45
    }),
    __metadata("design:type", String)
], User.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({
        type: 'datetime',
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "email_verify_date", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "remember_token", void 0);
__decorate([
    typeorm_1.Column({
        type: 'datetime',
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "created_date", void 0);
__decorate([
    typeorm_1.OneToOne(type => User_1, user => user.id),
    typeorm_1.Column({
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], User.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column({
        type: 'datetime',
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "updated_date", void 0);
__decorate([
    typeorm_1.OneToOne(type => User_1, user => user.id),
    typeorm_1.Column({
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], User.prototype, "updated_by", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity({
        name: "user"
    })
], User);
exports.User = User;

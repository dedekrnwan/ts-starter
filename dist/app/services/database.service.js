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
const typeorm_1 = require("typeorm");
const mongoose = require("mongoose");
const database_config_1 = require("./../config/database.config");
class Database {
    constructor() {
        this.fractal = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connect(database_config_1.fractal.url, { useNewUrlParser: true });
            yield mongoose.connection.on('connected', () => {
                console.log(`Mongoose ${database_config_1.fractal.schema} connection is open to ${database_config_1.fractal.url}`);
            });
            yield mongoose.connection.on('error', (error) => {
                console.log(`Mongoose ${database_config_1.fractal.schema} connection at ${database_config_1.fractal.url} has occured ${error} error`);
            });
            yield mongoose.connection.on('disconnected', () => {
                console.log(`Mongoose ${database_config_1.fractal.schema} connection at ${database_config_1.fractal.url} is disconnected`);
            });
            // process.on('SIGINT', function(){
            //     mongoose.connection.close(function(){
            //         console.log(`Mongoose ${fractal.schema} connection is disconnected due to application termination`);
            //         process.exit(0)
            //     });
            // });
        });
        this.orm = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const connections = yield typeorm_1.createConnections([
                        database_config_1.cores
                    ]);
                    resolve(connections);
                }
                catch (error) {
                    rejects(error);
                }
            }));
        });
    }
}
exports.Database = Database;

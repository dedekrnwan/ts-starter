"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const Config = require("./../app/config");
const app = new app_1.default();
app.run(Config.Server.port);

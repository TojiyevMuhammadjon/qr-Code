"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("config"));
const bootstrap = async (app) => {
    try {
        await (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/qrCode");
        console.log("connected to MongoDB");
        app.listen(config_1.default.get("port"), () => {
            console.log(config_1.default.get("port"));
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = bootstrap;

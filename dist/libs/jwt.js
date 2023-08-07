"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const verify = (payload) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(payload, config_1.default.get("jwt_secret"));
        return decoded;
    }
    catch (error) {
        throw new Error("Invalid JWT token");
    }
};
exports.verify = verify;
const sign = (payload) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.get("jwt_secret"));
        return token;
    }
    catch (error) {
        throw new Error("Error signing JWT token");
    }
};
exports.sign = sign;

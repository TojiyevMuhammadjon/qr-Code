"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.compare = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const compare = async (password, hashedPass) => {
    try {
        const result = await bcrypt_1.default.compare(password, hashedPass);
        return result;
    }
    catch (error) {
        throw new Error("Error comparing passwords");
    }
};
exports.compare = compare;
const generate = async (password) => {
    try {
        const saltRounds = 10; // You can adjust this according to your needs
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw new Error("Error generating hashed password");
    }
};
exports.generate = generate;

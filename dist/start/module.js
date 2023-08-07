"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("../api/routes");
const modules = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, express_fileupload_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static(process.cwd() + "/uploads"));
    app.set("view engine", "ejs");
    app.set("views", "src/views");
    app.use(routes_1.index);
};
exports.default = modules;

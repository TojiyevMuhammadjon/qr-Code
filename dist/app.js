"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const run_1 = __importDefault(require("./start/run"));
const module_1 = __importDefault(require("./start/module"));
const app = (0, express_1.default)();
(0, run_1.default)(app);
(0, module_1.default)(app);

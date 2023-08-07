"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const auth_route_1 = require("./auth.route");
const qr_code_route_1 = require("./qr.code.route");
exports.index = [auth_route_1.router, qr_code_route_1.then];

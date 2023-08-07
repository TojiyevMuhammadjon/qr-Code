"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIn = exports.register = exports.loginIn = exports.login = void 0;
const users_scheme_1 = __importDefault(require("../../models/users.scheme"));
const bcrypt_1 = require("../../libs/bcrypt");
const jwt_1 = require("../../libs/jwt");
const qrcode_1 = __importDefault(require("qrcode"));
const uuid_1 = require("uuid");
const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const user = await users_scheme_1.default.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            const isPasswordValid = await (0, bcrypt_1.compare)(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid password" });
            }
            else {
                const user_id = user._id?.toString(); // Use optional chaining operator to check if _id is defined
                if (!user_id) {
                    res.status(500).json({ message: "User ID is undefined" });
                    return;
                }
                const token = (0, jwt_1.sign)({ userId: user_id });
                const imagename = `${(0, uuid_1.v4)()}.png`;
                const pathimages = process.cwd() + "/uploads/" + imagename;
                await qrcode_1.default.toFile(`${pathimages}`, user_id, {
                    color: {
                        dark: "#3735a2",
                        light: "#f8f9fa",
                    },
                });
                res.status(200).json({ token });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};
exports.login = login;
const loginIn = async (req, res) => {
    res.render("login");
};
exports.loginIn = loginIn;
const register = async (req, res) => {
    const { name, username, password, city } = req.body;
    try {
        const existingUser = await users_scheme_1.default.findOne({ username });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
        }
        else {
            const hashedPassword = await (0, bcrypt_1.generate)(password);
            const imagename = `${(0, uuid_1.v4)()}.png`;
            const newUser = new users_scheme_1.default({
                name,
                username,
                password: hashedPassword,
                city,
                imagename,
            });
            await newUser.save();
            const pathimages = process.cwd() + "/uploads/" + imagename;
            await qrcode_1.default.toFile(`${pathimages}`, newUser.id, {
                color: {
                    dark: "#3735a2",
                    light: "#f8f9fa",
                },
            });
            // const qrCodeImagePath = `${process.cwd() + "/uploads/" + imagename}`; // Save the image name (e.g., "abc123.png") instead of the full path
            const qrCodeDataUrl = await qrcode_1.default.toDataURL(newUser.id.toString(), {
                color: {
                    dark: "#3735a2",
                    light: "#f8f9fa",
                },
            });
            // Send the QR code data URL back to the client along with the success message
            res.status(201).json({
                message: "User registered successfully",
                imageUrl: qrCodeDataUrl,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error during registration", error });
    }
};
exports.register = register;
const registerIn = async (req, res) => {
    res.render("register");
};
exports.registerIn = registerIn;

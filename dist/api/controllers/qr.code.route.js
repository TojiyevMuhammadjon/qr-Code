"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signQr = exports.qrcodeIs = exports.qrCode = void 0;
const uuid_1 = require("uuid");
const qrCode = (req, res) => {
    res.render("qrcode");
};
exports.qrCode = qrCode;
const qrcodeIs = async (req, res) => {
    try {
        const { qrCodeResult } = req.body;
        console.log(qrCodeResult);
        // Use the 'qrCodeResult' to perform any operations you need,
        // such as saving it to the Users database using Mongoose
        // For example, if you have a model named 'QRCode' in the Users database,
        // you can create a new QRCode document with the QR code result like this:
        const imagename = `${(0, uuid_1.v4)()}.png`;
        // const qrCodeData = new Users({
        //   imagename: `${uuid()}.png`,
        //   qrCodeResult: qrCodeResult,
        // });
        // await qrCodeData.save();
        // Respond with a success message
        res.status(200).json({ message: "QR code result saved successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error saving QR code result to database", error });
    }
};
exports.qrcodeIs = qrcodeIs;
const signQr = (req, res) => {
    res.render("signQr");
};
exports.signQr = signQr;

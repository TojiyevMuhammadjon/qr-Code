import { Router } from "express";
import { qrCode, qrcodeIs, signQr } from "../controllers/qr.code.route";

export const then = Router();

then.get("/signqr", qrCode);
then.get("/getqr", signQr);
then.get("/qrscanner", qrcodeIs);
then.post("/getDownloadURL/:id", qrcodeIs);

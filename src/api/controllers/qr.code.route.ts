import { Request, Response } from "express";
import QRCode from "qrcode";
import Users from "../../models/users.scheme";
import { v4 as uuid } from "uuid";

export const qrCode = (req: Request, res: Response) => {
  res.render("qrcode");
};

export const qrcodeIs = async (req: Request, res: Response) => {
  try {
    const { qrCodeResult } = req.body;
    console.log(qrCodeResult);

    // Use the 'qrCodeResult' to perform any operations you need,
    // such as saving it to the Users database using Mongoose

    // For example, if you have a model named 'QRCode' in the Users database,
    // you can create a new QRCode document with the QR code result like this:
    const imagename = `${uuid()}.png`;

    // const qrCodeData = new Users({
    //   imagename: `${uuid()}.png`,
    //   qrCodeResult: qrCodeResult,
    // });
    // await qrCodeData.save();

    // Respond with a success message
    res.status(200).json({ message: "QR code result saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving QR code result to database", error });
  }
};

export const signQr = (req: Request, res: Response) => {
  res.render("signQr");
};

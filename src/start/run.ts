import { connect } from "mongoose";
import config from "config";
import { Application } from "express";

const bootstrap = async (app: Application): Promise<void> => {
  try {
    await connect("mongodb://127.0.0.1:27017/qrCode");
    console.log("connected to MongoDB");

    app.listen(config.get("port"), () => {
      console.log(config.get("port"));
    });
  } catch (error) {
    console.log(error);
  }
};

export default bootstrap;

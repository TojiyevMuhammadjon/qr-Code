import express from "express";
import { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookie from "cookie-parser";
import { index } from "../api/routes";

const modules = (app: Application): void => {
  app.use(cors());
  app.use(express.json());
  app.use(fileUpload());
  app.use(cookie());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(process.cwd() + "/uploads"));

  app.set("view engine", "ejs");
  app.set("views", "src/views");

  app.use(index);
};

export default modules;

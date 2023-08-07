import express, { Application } from "express";
import run from "./start/run";
import modules from "./start/module";

const app: Application = express();

run(app);
modules(app);

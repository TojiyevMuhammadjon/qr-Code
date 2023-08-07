import { Router } from "express";
import { login, loginIn, register, registerIn } from "../controllers/auth.controller";

export const router = Router();

router.post("/auth/login", login);
router.get("/loginIn", loginIn);
router.post("/auth/register", register);
router.get("/registerIn", registerIn);

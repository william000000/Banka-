import express from "express";
const router=express.Router();
import AuthController from "../controllers/auth";


router.post("/signup",AuthController.signUp);
router.post("/signin",AuthController.login);

export default router;
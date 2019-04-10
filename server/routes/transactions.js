import express from "express";
import AccountController from "../controllers/accounts"; 
const router=express.Router();

router.post("/:accountNumber/debit",AccountController.debit);

export default router;
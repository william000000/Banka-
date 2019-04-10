import express from "express";
import AccountController from "../controllers/accounts"; 
const router=express.Router();

router.post("/",AccountController.create);
router.patch("/:id",AccountController.activate);
router.post("/:accountNumber/debit",AccountController.debit);

export default router;
import express from "express";
import AccountController from "../controllers/accounts"; 
const router=express.Router();

router.post("/",AccountController.create);
router.patch("/:id",AccountController.activate);
router.delete("/:accountNumber",AccountController.delete);
router.post("/:accountNumber/debit",AccountController.debit);
router.post("/:accountNumber/credit",AccountController.credit);

export default router;
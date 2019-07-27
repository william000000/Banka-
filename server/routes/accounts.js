import express from "express";
import AccountController from "../controllers/accounts";
import signUpValidation from "../helpers/accountvalidation";
import auth from "../controllers/auth";

const { createAccountSchema } = signUpValidation;
const router = express.Router();

router.post("/", createAccountSchema, AccountController.create);
router.patch("/:id", AccountController.activate);
router.delete("/:accountNumber", AccountController.delete);
router.post("/:accountNumber/debit", AccountController.debit);
router.post("/:accountNumber/credit", AccountController.credit);
router.get("/all", AccountController.viewAllAccount);
export default router;
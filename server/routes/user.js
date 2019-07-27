import express from "express";
const router = express.Router();
import AuthController from "../controllers/user";
import signUpValidation from "../helpers/accountvalidation";

const { signupschema } = signUpValidation;

router.post("/signup", signupschema, AuthController.signUp);
router.post("/signin", AuthController.login);

export default router;
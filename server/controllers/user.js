import users from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signValidation } from "../helpers/signValid";
import { signUpValidation } from "../helpers/accountvalidation";
dotenv.config();

class AuthController {
    static login(req, res) {

        const singleUser = users.find(user => user.email == req.body.email && user.password == req.body.password);

        if ((req.body.email).length == 0 || (req.body.password).length == 0) {
            return res.status(400).json({ status: 400, error: "Please! give us the information" })
        }

        else if (singleUser) {
            const token = jwt.sign({ id: singleUser.id, email: singleUser.email, isAdmin: singleUser.isAdmin }, process.env.secretkey);

            res.status(200).send({
                status: 200,
                token: token,
                data: singleUser
            });
        } else return res.status(401).json({ status: 401, error: "invalid user account" })


    }

    static signUp(req, res) {
        const singleUser = users.find(user => user.email === req.body.email);
        // const { error } = signUpValidation(req.body);

        if (singleUser) {
            return res.status(400).send({
                status: 400,
                message: "Account with this email already exists!"
            })
        }

        // else if (error) {
        //     return res.status(400).json({ status: 400, error: error.details[0].message })
        // }

        const newUser = {
            id: users.length + 1,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            type: "client",
            isAdmin: false
        }

        users.push(newUser);
        const token = jwt.sign({ id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin }, process.env.secretkey);
        res.status(201).send({
            status: 201,
            data: {
                token,
                newUser
            }
        })
}

export default AuthController;
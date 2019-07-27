const email = /^\S+@[\S\-]+\.[A-Za-z ]{2,}$/;
const password = /^[a-zA-Z0-9]{5,}$/;
const firstname = /^[a-zA-Z]{2,}$/;
const lastname = /^[a-zA-Z]{3,}$/;
const amount = /^[+-]?([0-9]*[.])?[0-9]+/;
const type = /^[a-zA-Z]{1,}$/;


class ValidationUser {
    static signupschema(req, res, next) {
        try {
    
            req.body.email = req.body.email.trim();
            req.body.password = req.body.password.trim();
            req.body.firstname = req.body.firstname.trim();
            req.body.lastname = req.body.lastname.trim();
            if (!email.test(req.body.email)) throw new Error("Invalid email");
            if (!password.test(req.body.password)) throw new Error("Invalid password");
            if (!firstname.test(req.body.firstname)) throw new Error("Invalid firstname");
            if (!lastname.test(req.body.lastname)) throw new Error("Invalid lastname");


            next();

        } catch (e) {
            return res.status(400).send({ status: 400, message: e.message })
        }

    }

    static createAccountSchema(req, res, next) {
        try {

            req.body.email = req.body.email.trim();
            req.body.type = req.body.type.trim();
            
            if (!email.test(req.body.email)) throw new Error("Invalid email");
            if (req.body.type !== "saving" && req.body.type !== "current") throw new Error("Invalid type, must be either current or saving");
            if (!amount.test(req.body.amount)) throw new Error("Invalid amount");
            next();

        } catch (e) {
            return res.status(400).send({ status: 400, message: e.message })

        }

    }
}
export default ValidationUser;

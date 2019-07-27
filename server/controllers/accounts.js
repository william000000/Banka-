import users from "../models/users";
import accounts from "../models/accounts";
import transactions from "../models/transactions";
import jwt from "jsonwebtoken";

class AccountController {
    static create(req, res) {

        const singleUser = users.find(user => user.email === req.body.email);
       
        if (singleUser) {
            console.log("hhe")
            const newAccount = {
                accountNumber: accounts.length + 1,
                firstname: singleUser.firstname,
                lastname: singleUser.lastname,
                email: singleUser.email,
                owner: singleUser.id,
                type: req.body.type,
                balance: parseFloat(req.body.amount) || 0.0,
                status: 'active',
                createdOn: new Date()
            }
    
            accounts.push(newAccount);
            res.status(201).send({
                status: 201,
                data: newAccount
            })
        } else {
            return res.status(404).send({
                status: 404,
                error: "User not found"
            })
        }

    }

    static activate(req, res) {
        const accountNumber = req.params.id;
        let status;
        const accountInfo = accounts.find(account => account.accountNumber === parseInt(accountNumber));
        if (accountInfo) {
            const newAccounts = accounts.map(ac => {
                if (ac.status === 'dormant' && ac.accountNumber === parseInt(accountNumber)) { ac.status = 'active'; return status = ac.status; }
                else if (ac.status === 'active' && ac.accountNumber === parseInt(accountNumber)) { ac.status = 'dormant'; return status = ac.status; }

            });

            res.status(200).send({
                accountNumber: parseInt(accountNumber),
                status: status
            });
        }
        else {
            res.status(404).send({
                status: 404,
                error: "Account not found"
            });
        }
    }
    static viewAllAccount(req, res) {
        const token = jwt.verify(req.headers.token, process.env.secretKey);
        console.log(token.isAdmin);
        if (token.isAdmin === true) {
            return res.status(200).send({
                status: 200,
                data: accounts
            })
        } else return res.status(403).send({
            status: 403,
            message: "you are not an admin"
        })
    }

    static debit(request, res) {
        const account = accounts.find(account => account.accountNumber === parseInt(request.params.accountNumber));
        if (!account) {
            return res.status(404).send({
                status: 404,
                error: "Account not found"
            });
        }
        const amount = request.body.amount;
        const oldBalance = account.balance;
        if (oldBalance < parseFloat(amount)) {
            return res.status(403).send({
                status: 403,
                error: "Insufficient Balance",
            })
        }
        const newBalance = oldBalance - amount;
        account.balance = newBalance;
        const cashier = 1;
        const transaction = {
            id: transactions.length + 1,
            createdOn: "12/05/2019",
            type: "debit",
            accountNumber: account.accountNumber,
            cashier,
            amount,
            oldBalance,
            newBalance,
        };
        transactions.push(transaction);
        const response = {
            transactionId: transaction.id,
            accountNumber: account.accountNumber,
            amount,
            cashier,
            transactionType: "debit",
            accountBalance: newBalance,
        };
        res.status(200).send({
            status: 200,
            data: response,
        });
    }

    static delete(req, res) {
        const account = accounts.find(account => account.accountNumber === parseInt(req.params.accountNumber));
        try {
            const isOwner = jwt.verify(req.headers.token, process.env.secretKey);
    
            if (!account) {
                return res.status(404).send({
                    status: 404,
                    error: "Account not found"
                });
            }
            //check if he is an admin or the owner of the account
            if (isOwner.isAdmin !== true && isOwner.email !== account.owner)
                return res.status(403).send({ status: 403, error: "Not allowed to delete this account" });

            // const { accountNumber } = req.params;

            const newAccounts = accounts.splice(accounts.indexOf(account), 1);
            return res.status(200).send({
                status: 200,
                message: "successfully deleted!",
                data: newAccounts
            });
        } catch (err) {
            return res.status(401).send({ error: err.message })
        }
    }

    static credit(request, res) {
        const account = accounts.find(account => account.accountNumber === parseInt(request.params.accountNumber));
        if (!account) {
            return res.status(404).send({
                status: 404,
                error: "Account not found"
            });
        }
        const amount = request.body.amount;
        const oldBalance = account.balance;
        if (0 > amount) {
            return res.status(403).send({
                status: 403,
                error: "your Amount is not allowed heree!",
            })
        }
        const newBalance = parseFloat(oldBalance) + parseFloat(amount);
        console.log(newBalance);
        account.balance = newBalance;
        const cashier = 1;
        const transaction = {
            id: transactions.length + 1,
            createdOn: "12/05/2019",
            type: "credit",
            accountNumber: account.accountNumber,
            cashier,
            amount,
            oldBalance,
            newBalance,
        };
        transactions.push(transaction);
        const response = {
            transactionId: transaction.id,
            accountNumber: account.accountNumber,
            transactionType: "credit",
            accountBalance: newBalance,
            amount,
            cashier

        };
        res.status(200).send({
            status: 200,
            data: response,
        });
    }

}

export default AccountController;
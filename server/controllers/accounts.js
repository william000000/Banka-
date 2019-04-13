import users from "../models/users";
import accounts from "../models/accounts";
import transactions from "../models/transactions";
class AccountController{
    static create(req,res){
      const singleUser=users.find(user=>user.email===req.body.email);
      if(singleUser){
          const newAccount={
              accountNumber:accounts.length+1,
              firstname:singleUser.firstname,
              lastname:singleUser.lastname,
              email:singleUser.email,
              owner: singleUser.id,
              type:req.body.type,
              openingBalance:parseFloat(req.body.amount) || 0.0,
              balance:parseFloat(req.body.amount) || 0.0,
              status:'active',
          }
          accounts.push(newAccount);
          res.status(201).send({
              status:201,
              data:newAccount
          })
      }
      else{
          res.status(400).send({
              status:400,
              error:"User not found"
          })
      }
    }

    static activate(req,res){
       const accountNumber=req.params.id;
       let status;
       const accountInfo=accounts.find(account=>account.accountNumber===parseInt(accountNumber));
       console.log(accountNumber);
       if(accountInfo){
           const newAccounts=accounts.map(ac=>{
               if(ac.status==='dormant' && ac.accountNumber===parseInt(accountNumber)) ac.status='active';
               else if(ac.status==='active' && ac.accountNumber===parseInt(accountNumber)) ac.status='dormant';
               status=ac.status;
               return ac;
           });
    
           res.status(200).send({
               accountNumber:parseInt(accountNumber),
               status:status
           });
       }
       else{
           res.status(400).send({
               status:400,
               error:"Account not found"
           });
       }
    }

    static debit(request, res){
        const account = accounts.find(account=>account.accountNumber===parseInt(request.params.accountNumber));
        if(!account){
            return res.status(400).send({
                status:400,
                error:"Account not found"
            });
        }
        const amount = request.body.amount;
        const oldBalance = account.balance;
        if(oldBalance<amount){
            return res.status(400).send({
                status:400,
                error:"Insufficient Balance",
            })
        }
        const newBalance = oldBalance - amount;
        console.log(newBalance);
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
            status:200,
            data: response,
        });
    }

    static delete(req, res){
        const account = accounts.find(account=>account.accountNumber===parseInt(req.params.accountNumber));
        if(!account){
            return res.status(400).send({
                status:400,
                error:"Account not found"
            });
        }
        const {accountNumber}=req.params;
        //const accountNumber=req.params.accountNumber;

        
        const newAccounts=accounts.filter(account=>account.accountNumber!==parseInt(accountNumber));


        return res.status(200).send({
            status:200,
            data:newAccounts
        });
    }

    static credit(request, res){
        const account = accounts.find(account=>account.accountNumber===parseInt(request.params.accountNumber));
        if(!account){
            return res.status(400).send({
                status:400,
                error:"Account not found"
            });
        }
        const amount = request.body.amount;
        const oldBalance = account.balance;
        if(0>amount){
            return res.status(400).send({
                status:400,
                error:"your Amount is not allowed!",
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
            amount,
            cashier,
            transactionType: "credit",
            accountBalance: newBalance,
        };
        res.status(200).send({
            status:200,
            data: response,
        });
    }

}

export default AccountController;
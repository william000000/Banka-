import users from "../models/users";

class AuthController{
    static login(req,res){
      const singleUser=users.find(user=>user.email===req.body.email && user.password===req.body.password);
      if(singleUser){
          res.status(200).send({
              status:200,
              data:singleUser
          });
      }
      else{
          res.status(400).send({
              status:400,
              message:"Invalid credentials"
          })
      }
    }

    static signUp(req,res){
      const singleUser=users.find(user=>user.email===req.body.email);
      if(singleUser){
          res.status(400).send({
            status:400,
            message:"Account with this email already exists!"
          })
      }
      else{
          const newUser={
              id:users.length+1,
              email:req.body.email,
              firstname:req.body.firstname,
              lastname:req.body.lastname,
              password:req.body.password,
              type:"client",
              isAdmin:false
          }

          users.push(newUser);
          res.status(201).send({
              status:201,
              data:newUser
          })
      }

    }
}

export default AuthController;
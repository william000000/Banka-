import users from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {signValidation} from "../helpers/signValid";
dotenv.config();

class AuthController{
    static login(req,res){
        const singleUser=users.find(user=>user.email===req.body.email && user.password===req.body.password);
        if(!singleUser){
            return res.status(400).json({ status:400, error: "invalid user account" })
        }
      const {error}=signValidation(req.body);
      if(error){
        return res.status(400).json({ status:400, error: error.details[0].message })
      } 
      const token = jwt.sign({id: singleUser.id}, process.env.secretkey);
      if(singleUser){
          res.status(200).send({
              status:200,
              token: token,
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
          const token = jwt.sign({id: newUser.id}, process.env.secretkey);
          res.status(200).send({
              status:200,
              data:{
                  token,
                  newUser
              }
          })
      }

    }
}

export default AuthController;
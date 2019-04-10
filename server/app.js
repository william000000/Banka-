import express from "express";
import bodyParser from "body-parser";

import authRoute from "./routes/auth";
import accountRoute from "./routes/accounts";
import transactionsRoute from "./routes/transactions";

const app=express();

app.get("/",(req,res)=>{
  
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/accounts",accountRoute);
app.use("/api/v1/transactions",transactionsRoute);

app.listen(3000,()=>{
    console.log("Server connected");
})
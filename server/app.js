import express from "express";
import bodyParser from "body-parser";

import authRoute from "./routes/auth";

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello world");
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/api/v1/auth",authRoute);

app.listen(3000,()=>{
    console.log("Server connected");
})
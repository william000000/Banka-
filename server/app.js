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

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server connected");
})

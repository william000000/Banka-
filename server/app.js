import express from "express";
import bodyParser from "body-parser";

import authRoute from "./routes/auth";
import accountRoute from "./routes/accounts";

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello world");
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/accounts",accountRoute);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server connected");
})


export default app;
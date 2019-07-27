import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./routes/user";
import accountRoute from "./routes/accounts";
import controllerDb from "./controllers/userdb";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/api/v1/auth/",authRoute);
app.use("/api/v1/accounts",accountRoute);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server connected ${PORT}`);
})


export default app;
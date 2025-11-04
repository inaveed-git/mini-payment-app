import express from "express";
import verifyToken from "../middleware/verfiyToken";
import { getBalance, TransferBalance } from "../controller/balance.controller";

const Router = express.Router()


Router.post("/transfer" ,verifyToken ,  TransferBalance);
Router.get("/amount" ,verifyToken ,  getBalance)



export default Router ; 

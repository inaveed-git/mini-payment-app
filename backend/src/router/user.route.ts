import express from "express";
import { First_Last_Name_udpate, searchUser } from "../controller/user.controller";
import { validate } from "../middleware/zodValidation/validation.middleware";
import { updateUserFirstLastName } from "../schemaValidatoin/user.schema";
import verifyToken from "../middleware/verfiyToken"

 let Router = express.Router();


Router.put("/name", verifyToken ,  validate(updateUserFirstLastName) ,  First_Last_Name_udpate);
Router.get("/find" , searchUser)

export default Router;

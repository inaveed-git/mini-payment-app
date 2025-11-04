import express from "express";
import { SignInUser,  SignupUser } from "../controller/auth.controller";
import { validate } from "../middleware/zodValidation/validation.middleware";
import { signInSchema, signUpSchema } from "../schemaValidatoin/user.schema";
import verifyToken from "../middleware/verfiyToken";
import { success } from "zod";
import User from "../model/user.model";

const Router = express.Router();


Router.post("/auth/signup" , validate(signUpSchema)  ,  SignupUser);



Router.post("/auth/signin" , validate(signInSchema) , SignInUser);


Router.get('/auth/me', verifyToken, (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ user: null });
    }
});


export default Router;

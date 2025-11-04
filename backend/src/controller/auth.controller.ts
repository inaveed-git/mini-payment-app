import { Request, Response } from "express";
import User from "../model/user.model";

import { handleDeliveryToken, sendTokenResponse } from "../utils/tokenUtils";
import { Types } from "mongoose";
import Balance from "../model/balance.model";


export const SignupUser = async (req: Request, res: Response) => {


    const { firstName, lastName, userName, email, password } = req.body;


    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.status(400).json({
            success: false,
            message: "User already registred"
        })
    }

    if (!firstName.trim() || !userName.trim() || !email.trim() || !password.trim()) {
        res.status(400).json("you need fill all the fields")
    }

    const newUser = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password
    })

    const randomBalance = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

    await Balance.create({
        userId: newUser._id,
        balance: randomBalance * 100, 
    });

    const { password: _, ...user } = newUser.toObject();


    res.status(201).json({
        success: true,
        message: "User registred successfully",
        user
    })

}


export const SignInUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const isUser = await User.findOne({ email }).select("+password");


        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User dont existed"
            })
        }

        if (!email.trim() || !password.trim() || !(await isUser?.matchPassword(password))) {
            return res.status(400).json({

                success: false,
                message: "invalid credinals"

            })
        }


        const token = sendTokenResponse((isUser?._id as Types.ObjectId).toString());
        handleDeliveryToken(res, token);

        const { password: _, ...sanitizedUser } = isUser.toObject();

        res.status(201).json({
            success: true,
            message: "User SignIn successFully",
            token,
            user: sanitizedUser

        })
    } catch (error) {
        console.log("User failed to SignIn", error)
    }

}
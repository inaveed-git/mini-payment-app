import { Request, Response, NextFunction } from "express";

import User from "../model/user.model";


export const First_Last_Name_udpate = async (req: Request, res: Response, next: NextFunction) => {



    try {

        const { firstName, lastName } = req.body;

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "you are unathorized user"
            })
        }

        const udpateUser = await User.findByIdAndUpdate(
            req.user, {
            firstName, lastName
        },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(201).json({
            success: true,
            messgae: "User Updated successfully",
            user: udpateUser
        })


    } catch (error) {
        return res.status(400).json("invalid to upated the user");
    }
}



export const searchUser = async (req: Request, res: Response) => {

    try {

        const { search } = req.query;

        if (!search) {
            return res.status(401).json({
                success: false,
                message: "Enter Valid search"
            })
        }

        const isUser = await User.find({
            $or: [
                { firstName: { $regex: search as string, $options: 'i' } },
                { lastName: { $regex: search as string, $options: 'i' } },
                { userName: { $regex: search as string, $options: 'i' } }
            ]
        }).select("_id firstName lastName userName");

        if (isUser.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No users found",
                users: [],
            });
        }

        return res.status(201).json({
            success: true,
            message: "User's found",
            user: isUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error occur while in search of users"
        })
    }


}
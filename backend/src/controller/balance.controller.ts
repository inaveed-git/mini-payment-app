import { Request, Response } from "express";
import mongoose from "mongoose";
import Balance from "../model/balance.model";



export const TransferBalance = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const senderId = req.user._id;
        const { receiverId, amount } = req.body;

        if (!receiverId || !amount) {
            session.abortTransaction();

            return res.status(404).json({
                success: false,
                message: "The receiver and the amount are needed"
            })
        }


        const senderBalance = await Balance.findOne({ userId: senderId });


        if (!senderBalance || senderBalance.balance < amount) {
            session.abortTransaction();
            return res.status(400).json("Insufficient balance");
        }

        const receiverBalance = await Balance.findOne({ userId: receiverId }).session(session);
        if (!receiverBalance) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: "Receiver not found."
            });
        }


        await Balance.updateOne({ userId: senderId }, { $inc: { balance: -amount } }).session(session);
        await Balance.updateOne({ userId: receiverId }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: "AMOUNT TRANSFER SUCCESSFULLY"
        })




    } catch (error) {
        session.abortTransaction()
        session.endSession()

        res.status(500).json({
            success: false,
            message: "Error occur in transfer the amount"
        })
    }

}



export const getBalance = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;

        const userBalance = await Balance.findOne({ userId });

        if (!userBalance) {
            return res.status(404).json({
                success: false,
                message: "Cant find the user balance"
            })
        }


        res.status(201).json({
            success: true,
            message: "user balance",
            userBalance
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "cant get the user balance"
        })
    }
}
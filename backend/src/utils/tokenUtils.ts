import jwt from "jsonwebtoken";

import { Response } from "express";

export const handleDeliveryToken = (res:Response , token: string): void => { 

    res.cookie("token" , token , {
        httpOnly: true , 
        secure: true , 
        sameSite: "none" , 
        maxAge: 24 * 60 * 60 * 1000 
    });
}




export const sendTokenResponse = (userId: string): string => {
   const secret = process.env.JWTSECRET;

   if(!secret) throw new Error("jwt not define");

return jwt.sign({userId} , secret , {expiresIn: "7d"});
}
import { Response , Request , NextFunction } from "express";
import { success, z  , ZodError} from "zod";

import jwt from "jsonwebtoken";
import User from "../model/user.model";

declare global { 
    namespace Express { 
        interface Request { 
            user?: any;
            
        }
    }
}

const verifyToken = async (req: Request ,res: Response , next: NextFunction) => {

try {
    
const {token} = req.cookies;


if(!token){
    res.status(400).json({
        success: false , 
        message: "No token found "
    })
}

if(!process.env.JWTSECRET){
    throw new Error("No jwt token found");
}

const decode = jwt.verify(token , process.env.JWTSECRET) as {userId: string};
const user = await User.findById(decode.userId).select("-password")

if(!user){
    res.status(201).json({
        success: false , 
        message: "invalid token user not found"
    });
}

req.user = user 
next()

} catch (error) {
     res.status(400).json("you can login");
}

}


export default verifyToken;

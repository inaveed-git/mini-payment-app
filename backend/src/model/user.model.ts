import mongoose, { Document, Types } from "mongoose";

import bcrypt from "bcryptjs";



export interface Iuser extends Document {

    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    matchPassword: (enteredPassword: string) => Promise<Boolean>;

}



const userSchema = new mongoose.Schema<Iuser>({


    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }

}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    try {
        const salt = await bcrypt.genSalt(5);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (error) {
        console.log("error  in password hash")
    }

})



userSchema.methods.matchPassword = async function (enteredPassword: string) {

    try {

        return await bcrypt.compare(enteredPassword, this.password)
    } catch (error) {
        console.log("error in matching the password");
    }
}


const User = mongoose.model("User", userSchema)

export default User;






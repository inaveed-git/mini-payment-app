import mongoose, { Document, Schema, Types }   from "mongoose";



export interface Ibalance extends Document {
_id: Types.ObjectId; 
userId: Types.ObjectId;
balance: Number;
}



const balanceSchema = new mongoose.Schema<Ibalance>({
    userId: {type:  Schema.Types.ObjectId , ref: "User" , required: true} , 
    balance: {type: Number , required: true}
})



const Balance = mongoose.model("Balance" , balanceSchema);

export default Balance;


import mongoose from 'mongoose';



const connectDB = async () => {

try {
   const conn = await mongoose.connect(process.env.MONGO_URI as string);
console.log(`Database connected ${conn.connection.host}`);
} catch (error) {
    console.log("Error connection to database" , error);
    process.exit(1);
}



}

export default connectDB;


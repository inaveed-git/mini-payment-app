import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import connectDB from "./DB/connectDB";
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser";




import authRouter from "./router/auth.route"
import UserRouter from  "./router/user.route";
import BalacneRouter from "./router/balance.route"
const app = express();



// Middleware to parse JSON (important if you later use req.body)
app.use(express.json());
app.use(cookieParser())

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express!");
});




// userRouter

// api/user/auth/signup
// api/user/auth/signin

app.use("/api/user" , authRouter)

// /api/user/update/name
// / /api/user/update/find
app.use("/api/user/update" , UserRouter)


// /api/account/transfer
// /api/account/amount


app.use("/api/account" , BalacneRouter)




const startServer = async () => { 
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

    app.listen(PORT, () => { 
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(" Error while connecting to DB:", error);
    process.exit(1);
  }    
}

// Call the function to start the server
startServer();

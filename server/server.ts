import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db";
import { corsOptions } from "./config/cors";
import errorHandler from "./middlewares/error";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import friendRouter from "./routes/friend";
import postRouter from "./routes/post";

dotenv.config();
connectDB(); // connect to database
const app = express();
app.use(cors(corsOptions)); // CORS config

// Add middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/friends", friendRouter);
app.use("/posts", postRouter);

// Custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

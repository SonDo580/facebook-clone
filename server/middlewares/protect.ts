import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { CustomRequest } from "../types";
import User from "../models/user";

type JwtPayload = {
  userId: string;
};

/* Add this middleware before protected routes */
const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // Get token from cookie
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized!");
    }

    // Decode token and find user with id
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401);
      throw new Error("Not authorized!");
    }

    // Add user to request object and pass control to the next middleware
    req.user = user;
    next();
  }
);

export default protect;

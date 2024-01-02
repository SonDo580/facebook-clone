import { CookieOptions } from "express";
import { SignOptions } from "jsonwebtoken";

const JWT_OPTIONS: SignOptions = { expiresIn: "7d" };

const COOKIE_OPTIONS: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
};

export { JWT_OPTIONS, COOKIE_OPTIONS };

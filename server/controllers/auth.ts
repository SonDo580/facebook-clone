import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user";
import { CustomRequest } from "../types";
import { registerValidations, validateDateOfBirth } from "../validations/user";
import {
  getUserInfo,
  getHashedPassword,
  getUsername,
  generateToken,
} from "../utils/auth";

/* Register handler */
const register = [
  ...registerValidations,
  asyncHandler(async (req: Request, res: Response) => {
    // Check validation errors
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      res.status(400);
      throw new Error(errors[0].msg);
    }

    const {
      firstName,
      lastName,
      email,
      password,
      birthDay,
      birthMonth,
      birthYear,
      gender,
    } = req.body;

    // Validate date of birth
    const dateOfBirthError = validateDateOfBirth(
      birthDay,
      birthMonth,
      birthYear
    );
    if (dateOfBirthError) {
      res.status(400);
      throw new Error(dateOfBirthError);
    }

    // Check if email existed
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      res.status(400);
      throw new Error("Email already used!");
    }

    // Hash password
    const hashedPassword = await getHashedPassword(password);

    // Generate unique username
    const username = await getUsername(firstName, lastName);

    // Create and save user
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      birthDay,
      birthMonth,
      birthYear,
      gender,
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid user data!");
    }

    // Generate token
    const token = generateToken(
      { userId: user._id.toString() },
      { expiresIn: "7d" }
    );

    res
      .status(201)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
      })
      .json(getUserInfo(user));
  }),
];

/* Login handler */
const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user with email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials!");
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401);
    throw new Error("Invalid credentials!");
  }

  // Generate token
  const token = generateToken(
    { userId: user._id.toString() },
    { expiresIn: "7d" }
  );

  res
    .status(200)
    .cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
    })
    .json(getUserInfo(user));
});

const logout = (req: CustomRequest, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Success" });
};

export { register, login, logout };

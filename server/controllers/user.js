const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const { registerValidations } = require("../validations/user");
const { validateDateOfBirth } = require("../utils/validate");
const {
  getUserInfo,
  getHashedPassword,
  getUsername,
} = require("../utils/auth");

const register = [
  registerValidations,
  asyncHandler(async (req, res) => {
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
    const dateOfBirthError = validateDateOfBirth({
      birthDay,
      birthMonth,
      birthYear,
    });
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

    res.status(201).json(getUserInfo(user));
  }),
];

module.exports = {
  register,
};

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const { getUserInfo, getHashedPassword } = require("../utils/auth");
const { validateDateOfBirth } = require("../utils/validate");

const registerValidations = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required!")
    .isLength({ max: 30 })
    .withMessage("First Name must contains at most 30 characters!")
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required!")
    .isLength({ max: 30 })
    .withMessage("Last Name must contains at most 30 characters!")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6, max: 40 })
    .withMessage("Password must be between 6 and 40 characters!")
    .matches("")
    .withMessage("Password must contains alphanumeric and special characters!"),
  body("gender").trim().notEmpty().withMessage("Gender is required!"),
  body("birthDay")
    .trim()
    .notEmpty()
    .withMessage("Birth Day is required!")
    .isInt({ min: 1, max: 31 })
    .withMessage("Birth Day is invalid!"),
  body("birthMonth")
    .trim()
    .notEmpty()
    .withMessage("Birth Month is required!")
    .isInt({ min: 1, max: 12 })
    .withMessage("Birth Month is invalid!"),
  body("birthYear")
    .trim()
    .notEmpty()
    .withMessage("Birth Year is required!")
    .isInt()
    .withMessage("Birth Year is invalid!"),
];

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

    // Create and save user
    const user = await User.create({
      firstName,
      lastName,
      email,
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

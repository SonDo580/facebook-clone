const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const lodash = require("lodash");

const User = require("../models/user");

const register = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastname,
    email,
    username,
    password,
    birthDay,
    birthMonth,
    birthYear,
    gender,
  } = req.body;

  // Validate input

  // Check if username is available
  const existedUser = await User.findOne({ username });
  if (existedUser) {
    res.status(400);
    throw new Error("Username already exists!");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save user
  const user = await User.create({
    firstName,
    lastname,
    email,
    username,
    birthDay,
    birthMonth,
    birthYear,
    gender,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data!");
  }

  res.status(201).json(lodash.omit(user, ["password"]));
});

module.exports = {
  register,
};

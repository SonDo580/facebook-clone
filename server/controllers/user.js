const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const { getUserInfo, getHashedPassword } = require("../utils/auth");

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
  const hashedPassword = await getHashedPassword(password);

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

  res.status(201).json(getUserInfo(user));
});

module.exports = {
  register,
};

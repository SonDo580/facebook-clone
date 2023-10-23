const lodash = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const getUserInfo = (userDocument) =>
  lodash.omit(userDocument.toObject(), ["password"]);

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const getUsername = async (firstName, lastName) => {
  const fixed = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  while (true) {
    const username = `${fixed}-${generateId()}`;
    const existedUser = await User.findOne({ username });
    if (!existedUser) {
      return username;
    }
  }
};

const generateToken = (payload, options) =>
  jwt.sign(payload, process.env.JWT_SECRET, options);

module.exports = {
  getUserInfo,
  getHashedPassword,
  getUsername,
  generateToken,
};

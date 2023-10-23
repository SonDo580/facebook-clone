const lodash = require("lodash");
const bcrypt = require("bcryptjs");

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

module.exports = {
  getUserInfo,
  getHashedPassword,
  getUsername,
};

const lodash = require("lodash");
const bcrypt = require("bcryptjs");

const getUserInfo = (userDocument) =>
  lodash.omit(userDocument.toObject(), ["password"]);

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {
  getUserInfo,
  getHashedPassword,
};

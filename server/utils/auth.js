const lodash = require("lodash");

const getUserInfo = (userDocument) =>
  lodash.omit(userDocument.toObject(), ["password"]);

module.exports = {
  getUserInfo,
};

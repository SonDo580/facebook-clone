const { MAX_AGE } = require("../constants");
const { invalidMessage } = require("./message");

const validateDateOfBirth = ({ birthDay, birthMonth, birthYear }) => {
  if (birthDay < 1 || birthDay > 31) {
    return invalidMessage("Birth Day");
  }

  if (birthMonth < 1 || birthMonth > 12) {
    return invalidMessage("Birth Month");
  }

  const currentYear = new Date().getFullYear();
  if (currentYear - birthYear > MAX_AGE) {
    return invalidMessage("Birth Year");
  }

  const date = new Date(birthYear, birthMonth - 1, birthDay);
  if (
    date.getDate() !== birthDay ||
    date.getMonth() !== birthMonth - 1 ||
    date.getFullYear() !== birthYear
  ) {
    return invalidMessage("Date of Birth");
  }

  return null;
};

module.exports = {
  validateDateOfBirth,
};

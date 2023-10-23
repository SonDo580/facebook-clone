const { invalidMessage } = require("./message");
const {
  MAX_AGE,
  MIN_MONTH_DAY,
  MAX_MONTH_DAY,
  MIN_MONTH,
  MAX_MONTH,
} = require("../constants");

const validateDateOfBirth = ({ birthDay, birthMonth, birthYear }) => {
  if (birthDay < MIN_MONTH_DAY || birthDay > MAX_MONTH_DAY) {
    return invalidMessage("Birth Day");
  }

  if (birthMonth < MIN_MONTH || birthMonth > MAX_MONTH) {
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

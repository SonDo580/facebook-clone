const MAX_AGE = 200;

const validateDateOfBirth = ({ birthDay, birthMonth, birthYear }) => {
  if (birthDay < 1 || birthDay > 31) {
    return "Birth Day is invalid!";
  }

  if (birthMonth < 1 || birthMonth > 12) {
    return "Birth Month is invalid!";
  }

  const currentYear = new Date().getFullYear();
  if (currentYear - birthYear > MAX_AGE) {
    return "Birth Year is invalid!";
  }

  const date = new Date(birthYear, birthMonth - 1, birthDay);
  if (
    date.getDate() !== birthDay ||
    date.getMonth() !== birthMonth - 1 ||
    date.getFullYear() !== birthYear
  ) {
    return "Date of Birth is invalid!";
  }

  return null;
};

module.exports = {
  validateDateOfBirth,
};

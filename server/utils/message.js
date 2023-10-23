const requiredMessage = (name) => `${name} is required!`;

const invalidMessage = (name) => `${name} is invalid!`;

const lengthMessage = (name, { min, max }) => {
  if (!min && max) {
    return `${name} must contains at most ${max} characters!`;
  }
  if (!max && min) {
    return `${name} must contains at least ${min} characters!`;
  }
  if (min === max) {
    return `${name} must contains ${min} characters!`;
  }
  return `${name} must be between ${min} and ${max} characters!`;
};

module.exports = {
  requiredMessage,
  invalidMessage,
  lengthMessage,
};

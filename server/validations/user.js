const { body } = require("express-validator");

const registerValidations = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required!")
    .isLength({ max: 30 })
    .withMessage("First Name must contains at most 30 characters!")
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required!")
    .isLength({ max: 30 })
    .withMessage("Last Name must contains at most 30 characters!")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is invalid!")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6, max: 40 })
    .withMessage("Password must be between 6 and 40 characters!")
    .matches("")
    .withMessage("Password must contains alphanumeric and special characters!"),
  body("gender").trim().notEmpty().withMessage("Gender is required!"),
  body("birthDay")
    .trim()
    .notEmpty()
    .withMessage("Birth Day is required!")
    .isInt({ min: 1, max: 31 })
    .withMessage("Birth Day is invalid!"),
  body("birthMonth")
    .trim()
    .notEmpty()
    .withMessage("Birth Month is required!")
    .isInt({ min: 1, max: 12 })
    .withMessage("Birth Month is invalid!"),
  body("birthYear")
    .trim()
    .notEmpty()
    .withMessage("Birth Year is required!")
    .isInt()
    .withMessage("Birth Year is invalid!"),
];

module.exports = {
  registerValidations,
};

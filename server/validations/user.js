const { body } = require("express-validator");

const {
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  MIN_MONTH_DAY,
  MAX_MONTH_DAY,
  MIN_MONTH,
  MAX_MONTH,
} = require("../constants");
const {
  requiredMessage,
  lengthMessage,
  invalidMessage,
} = require("../utils/message");

const registerValidations = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("First Name"))
    .isLength({ max: NAME_MAX_LENGTH })
    .withMessage(lengthMessage("First Name", { max: NAME_MAX_LENGTH }))
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Last Name"))
    .isLength({ max: NAME_MAX_LENGTH })
    .withMessage(lengthMessage("Last Name", { max: NAME_MAX_LENGTH }))
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Email"))
    .isEmail()
    .withMessage(invalidMessage("Email"))
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage(requiredMessage("Password"))
    .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
    .withMessage(
      lengthMessage("Password", {
        min: PASSWORD_MIN_LENGTH,
        max: PASSWORD_MAX_LENGTH,
      })
    )
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contains both uppercase letters, lowecase letters, numbers, symbols!"
    ),
  body("gender").trim().notEmpty().withMessage(requiredMessage("Gender")),
  body("birthDay")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Day"))
    .isInt({ min: MIN_MONTH_DAY, max: MAX_MONTH_DAY })
    .withMessage(invalidMessage("Birth Day")),
  body("birthMonth")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Month"))
    .isInt({ min: MIN_MONTH, max: MAX_MONTH })
    .withMessage(invalidMessage("Birth Month")),
  body("birthYear")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Year"))
    .isInt()
    .withMessage(invalidMessage("Birth Year")),
];

module.exports = {
  registerValidations,
};

import { ValidationChain, body } from "express-validator";

import {
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  MIN_MONTH_DAY,
  MAX_MONTH_DAY,
  MIN_MONTH,
  MAX_MONTH,
  MAX_AGE,
} from "../constants";
import {
  requiredMessage,
  lengthMessage,
  invalidMessage,
} from "../utils/message";

const registerValidations: ValidationChain[] = [
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
      minLength: PASSWORD_MIN_LENGTH,
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
    .withMessage(invalidMessage("Birth Day"))
    .toInt(),

  body("birthMonth")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Month"))
    .isInt({ min: MIN_MONTH, max: MAX_MONTH })
    .withMessage(invalidMessage("Birth Month"))
    .toInt(),

  body("birthYear")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Year"))
    .isInt()
    .withMessage(invalidMessage("Birth Year"))
    .toInt(),
];

const updateUserValidations = [
  body("firstName")
    .if((_, { req }) => req.body.firstName !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("First Name"))
    .isLength({ max: NAME_MAX_LENGTH })
    .withMessage(lengthMessage("First Name", { max: NAME_MAX_LENGTH }))
    .escape(),

  body("lastName")
    .if((_, { req }) => req.body.lastName !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Last Name"))
    .isLength({ max: NAME_MAX_LENGTH })
    .withMessage(lengthMessage("Last Name", { max: NAME_MAX_LENGTH }))
    .escape(),

  body("email")
    .if((_, { req }) => req.body.email !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Email"))
    .isEmail()
    .withMessage(invalidMessage("Email"))
    .normalizeEmail(),

  body("password")
    .if((_, { req }) => req.body.password !== undefined)
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
      minLength: PASSWORD_MIN_LENGTH,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contains both uppercase letters, lowecase letters, numbers, symbols!"
    ),

  body("gender")
    .if((_, { req }) => req.body.gender !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Gender")),

  body("birthDay")
    .if((_, { req }) => req.body.birthDay !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Day"))
    .isInt({ min: MIN_MONTH_DAY, max: MAX_MONTH_DAY })
    .withMessage(invalidMessage("Birth Day"))
    .toInt(),

  body("birthMonth")
    .if((_, { req }) => req.body.birthMonth !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Month"))
    .isInt({ min: MIN_MONTH, max: MAX_MONTH })
    .withMessage(invalidMessage("Birth Month"))
    .toInt(),

  body("birthYear")
    .if((_, { req }) => req.body.birthYear !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Birth Year"))
    .isInt()
    .withMessage(invalidMessage("Birth Year"))
    .toInt(),
];

const validateDateOfBirth = (
  birthDay: number,
  birthMonth: number,
  birthYear: number
) => {
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

export { registerValidations, updateUserValidations, validateDateOfBirth };

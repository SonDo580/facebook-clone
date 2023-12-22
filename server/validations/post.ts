import { body } from "express-validator";
import { requiredMessage } from "../utils/message";

const createPostValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Post content"))
    .escape(),
];

export { createPostValidations };

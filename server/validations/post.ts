import { body } from "express-validator";
import { requiredMessage } from "../utils/message";

const createPostValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Post content")),
];

const updatePostValidations = [
  body("content")
    .if((_, { req }) => req.body.content !== undefined)
    .trim()
    .notEmpty()
    .withMessage(requiredMessage("Post content")),
];

export { createPostValidations, updatePostValidations };

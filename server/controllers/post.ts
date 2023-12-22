import { Response } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import { CustomRequest } from "../types";
import Post from "../models/post";
import { createPostValidations } from "../validations/post";

/* Create new post */
const createPost = [
  ...createPostValidations,
  asyncHandler(async (req: CustomRequest, res: Response) => {
    // Check validation errors
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      res.status(400);
      throw new Error(errors[0].msg);
    }

    const userId = req.user!._id;
    const { content, images = [] } = req.body;

    const post = await Post.create({
      author: userId,
      content,
      images,
    });

    res.json(post);
  }),
];

export { createPost };

import { Response } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import Post from "../models/post";
import User from "../models/user";
import { CustomRequest } from "../types";
import {
  createPostValidations,
  updatePostValidations,
} from "../validations/post";
import { REACTIONS } from "../constants/reactions";

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

    await post.populate({
      path: "author",
      select: "firstName lastName profilePicture",
    });

    res.json(post);
  }),
];

/* Update post */
const updatePost = [
  ...updatePostValidations,
  asyncHandler(async (req: CustomRequest, res: Response) => {
    // Check validation errors
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      res.status(400);
      throw new Error(errors[0].msg);
    }

    const userId = req.user!._id.toString();
    const postId = req.params.postId;

    // Find the post to update
    const post = await Post.findById(postId);
    if (!post) {
      res.status(400);
      throw new Error("Post not found!");
    }

    // Check if user is author of the post
    if (post.author.toString() !== userId) {
      res.status(403);
      throw new Error("You don't have permission to edit this post!");
    }

    // Check if content and images are the same
    const { content, images } = req.body;
    if (!content && !images) {
      res.json(post);
      return;
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        content: content || post.content,
        images: images || [],
      },
      { new: true }
    );

    await updatedPost!.populate({
      path: "author",
      select: "firstName lastName profilePicture",
    });

    res.json(updatedPost);
  }),
];

/* Delete post */
const deletePost = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user!._id.toString();
  const postId = req.params.postId;

  // Find the post to delete
  const post = await Post.findById(postId);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }

  // Check if user is author of the post
  if (post.author.toString() !== userId) {
    res.status(403);
    throw new Error("You don't have permission to delete this post!");
  }

  // Remove references to the post from users
  await User.updateMany(
    {
      "savedPosts.post": postId,
    },
    {
      $pull: {
        savedPosts: { post: postId },
      },
    }
  );

  // TODO: Remove all post comments

  // Delete the post
  await post.deleteOne();
  res.json({ deletedPostId: postId });
});

/* Get a post */
const getPost = asyncHandler(async (req: CustomRequest, res: Response) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }
  res.json(post);
});

/* Get feed posts */
const getFeedPosts = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentUser = req.user!;

  // Find posts by currentUser and people that currentUser is following
  const posts = await Post.find({
    $or: [
      { author: currentUser._id },
      {
        author: { $in: currentUser.following },
      },
    ],
  })
    .populate({
      path: "author",
      select: "firstName lastName profilePicture",
    })
    .sort({ updatedAt: -1 });

  // TODO: Limit number of posts returned (client will use infinite scrolling)

  res.json(posts);
});

/* React to a post */
const reactToPost = asyncHandler(async (req: CustomRequest, res: Response) => {
  // Find the post
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }

  const userId = req.user!._id;
  const { reactionType } = req.body;

  // Just remove user reaction if reactionType is null
  if (reactionType === null) {
    await post.updateOne({
      $pull: Object.fromEntries(
        REACTIONS.map((reaction) => [`reactions.${reaction}`, { user: userId }])
      ),
    });

    res.json({ message: "Success" });
    return;
  }

  // Check if the reaction is valid
  if (!REACTIONS.includes(reactionType)) {
    res.status(400);
    throw new Error("Invalid reaction!");
  }

  // Remove user's old reaction
  await post.updateOne({
    $pull: Object.fromEntries(
      REACTIONS.map((reaction) => [`reactions.${reaction}`, userId])
    ),
  });

  // Add user's new reaction
  await post.updateOne({
    $push: {
      [`reactions.${reactionType}`]: userId,
    },
  });

  res.json({ message: "Success" });
});

export {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getFeedPosts,
  reactToPost,
};

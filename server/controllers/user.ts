import { Response } from "express";
import asyncHandler from "express-async-handler";

import { CustomRequest } from "../types";
import { checkIncludeId } from "../utils";
import User from "../models/user";

/* Follow a user */
const follow = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentUser = req.user!;
  const currentUserId = currentUser._id.toString();
  const otherUserId = req.params.userId;

  if (currentUserId === otherUserId) {
    res.status(403);
    throw new Error("You can't follow yourself!");
  }

  // Check 'following' list of current user
  if (checkIncludeId(currentUser.following, otherUserId)) {
    res.status(403);
    throw new Error("You already followed this user!");
  }

  // Find user to follow
  const otherUser = await User.findById(otherUserId);
  if (!otherUser) {
    res.status(400);
    throw new Error("User not found!");
  }

  // Update 'following' array of current user
  await currentUser.updateOne({ $push: { following: otherUserId } });

  // Update 'followers' array of the other user
  await otherUser.updateOne({ $push: { followers: currentUserId } });

  res.json({ message: "Success" });
});

/* Unfollow a user */
const unfollow = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentUser = req.user!;
  const currentUserId = currentUser._id.toString();
  const otherUserId = req.params.userId;

  if (currentUserId === otherUserId) {
    res.status(403);
    throw new Error("You can't unfollow yourself!");
  }

  if (!checkIncludeId(currentUser.following, otherUserId)) {
    res.status(403);
    throw new Error("You haven't followed this user!");
  }

  // Update 'following' array of current user
  await currentUser.updateOne({ $pull: { following: otherUserId } });

  // Update 'followers' array of the other user
  const otherUser = await User.findById(otherUserId);
  await otherUser!.updateOne({ $pull: { followers: currentUserId } });

  res.json({ message: "Success" });
});

export { follow, unfollow };

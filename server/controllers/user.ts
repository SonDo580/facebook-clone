import { Response } from "express";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import User from "../models/user";
import { CustomRequest } from "../types";
import { checkIncludeId } from "../utils";
import { getHashedPassword } from "../utils/auth";
import {
  updateUserValidations,
  validateDateOfBirth,
} from "../validations/user";

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

/* Get user info */
const getInfo = asyncHandler(async (req: CustomRequest, res: Response) => {});

/* Update user info */
const updateInfo = [
  ...updateUserValidations,
  asyncHandler(async (req: CustomRequest, res: Response) => {
    const currentUser = req.user!;
    if (currentUser._id.toString() !== req.params.userId) {
      res.status(403);
      throw new Error("You can't update other account!");
    }

    // Check validation errors
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      res.status(400);
      throw new Error(errors[0].msg);
    }

    const { email, password, username, birthDay, birthMonth, birthYear } =
      req.body;

    // Validate date of birth
    const dateOfBirthError = validateDateOfBirth(
      birthDay ? birthDay : currentUser.birthDay,
      birthMonth ? birthMonth : currentUser.birthMonth,
      birthYear ? birthYear : currentUser.birthYear
    );
    if (dateOfBirthError) {
      res.status(400);
      throw new Error(dateOfBirthError);
    }

    if (email && email !== currentUser.email) {
      // Check if email existed
      if (await User.exists({ email })) {
        res.status(400);
        throw new Error("Email already used!");
      }
    }

    if (username && username !== currentUser.username) {
      // Check if username existed
      if (await User.exists({ username })) {
        res.status(400);
        throw new Error("Username existed!");
      }
    }

    if (password) {
      // Hash password
      req.body.password = await getHashedPassword(password);
    }

    // Update user info
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  }),
];

/* Delete account */
const deleteAccount = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const currentUser = req.user!;
    const userId = req.params.userId;
    if (currentUser._id.toString() !== userId) {
      res.status(403);
      throw new Error("You can't delete other account!");
    }

    // Remove references to this user from other users
    await User.updateMany(
      {
        $or: [
          { followers: userId },
          { following: userId },
          { "friends.user": userId },
          { friendRequestsIn: userId },
          { friendRequestsOut: userId },
          { "details.familyMembers.user": userId },
        ],
      },
      {
        $pull: {
          followers: userId,
          following: userId,
          friends: { user: userId },
          friendRequestsIn: userId,
          friendRequestsOut: userId,
          "details.familyMembers": { user: userId },
        },
      }
    );

    // TODO: Remove references to this user in posts

    // Delete user
    await currentUser.deleteOne();
    res.json({ message: "Success" });
  }
);

export { follow, unfollow, getInfo, updateInfo, deleteAccount };

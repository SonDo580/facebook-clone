import { Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/user";
import { CustomRequest } from "../types";
import { checkIncludeId } from "../utils";

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

/* Friend request */
const friendRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const currentUser = req.user!;
    const currentUserId = currentUser._id.toString();
    const otherUserId = req.params.userId;

    if (currentUserId === otherUserId) {
      res.status(403);
      throw new Error("You can't send friend request to yourself!");
    }

    if (checkIncludeId(currentUser.friendRequestsOut, otherUserId)) {
      res.status(403);
      throw new Error("You already sent friend request to this user!");
    }

    const friendList = currentUser.friends.map((friend) => friend.user);
    if (checkIncludeId(friendList, otherUserId)) {
      res.status(403);
      throw new Error("You and this user are already friends!");
    }

    // Find the other user
    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      res.status(400);
      throw new Error("User not found!");
    }

    // Check if otherUser requested to be friend with currentUser
    if (checkIncludeId(otherUser.friendRequestsOut, currentUserId)) {
      // Update 'friends' array of both users
      await currentUser.updateOne({
        $push: { friends: { user: otherUserId } },
      });

      await otherUser.updateOne({
        $push: { friends: { user: currentUserId } },
      });

      // Update 'friendRequestsIn' array of currentUser
      await otherUser.updateOne({
        $pull: { friendRequestsIn: otherUserId },
      });

      // Update 'friendRequestsOut' array of otherUser
      await otherUser.updateOne({
        $pull: { friendRequestsOut: currentUserId },
      });

      res.json({ message: "Success" });
      return;
    }

    // Update 'friendRequestsOut' array of current user
    await currentUser.updateOne({ $push: { friendRequestsOut: otherUserId } });

    // Update 'friendRequestsIn' array of the other user
    await otherUser.updateOne({ $push: { friendRequestsIn: currentUserId } });

    res.json({ message: "Success" });
  }
);

/* Cancel friend request*/
const cancelFriendRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {}
);

/* Accept friend request*/
const acceptFriendRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {}
);

/* Reject friend request*/
const rejectFriendRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {}
);

/* Unfriend */
const unfriend = asyncHandler(async (req: CustomRequest, res: Response) => {});

export {
  follow,
  unfollow,
  friendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  unfriend,
};

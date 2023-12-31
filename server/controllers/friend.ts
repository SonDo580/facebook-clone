import asyncHandler from "express-async-handler";
import { Response } from "express";

import User from "../models/user";
import { CustomRequest } from "../types";
import { checkIncludeId } from "../utils";

/* Get list of friends */
const friendList = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentUser = req.user!;
  await currentUser.populate({
    path: "friends.user",
    select: "firstName lastName profilePicture",
  });

  res.json(currentUser.friends);
});

/* Get list of friend requests */
const requestList = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentUser = req.user!;
  await currentUser.populate({
    path: "friendRequestsIn",
    select: "firstName lastName profilePicture",
  });

  res.json(currentUser.friendRequestsIn);
});

/* Send friend request */
const sendRequest = asyncHandler(async (req: CustomRequest, res: Response) => {
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
    // Add each user to 'friends', 'following', 'followers' array of the other
    // Remove otherUser from 'friendRequestsIn' array of currentUser
    // Remove currentUser from 'friendRequestsOut' array of otherUser
    await currentUser.updateOne({
      $push: {
        friends: { user: otherUserId },
        followers: otherUserId,
        following: otherUserId,
      },
      $pull: { friendRequestsIn: otherUserId },
    });

    await otherUser.updateOne({
      $push: {
        friends: { user: currentUserId },
        followers: currentUserId,
        following: currentUserId,
      },
      $pull: { friendRequestsOut: currentUserId },
    });

    res.json({ message: "Success" });
    return;
  }

  // Add otherUser to 'friendRequestsOut' array of currentUser
  await currentUser.updateOne({ $push: { friendRequestsOut: otherUserId } });

  // Add currentUser to 'friendRequestsIn' array of otherUser
  await otherUser.updateOne({ $push: { friendRequestsIn: currentUserId } });

  res.json({ message: "Success" });
});

/* Cancel friend request*/
const cancelRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const currentUser = req.user!;
    const currentUserId = currentUser._id.toString();
    const otherUserId = req.params.userId;

    if (currentUserId === otherUserId) {
      res.status(403);
      throw new Error("Friend request to yourself is forbidden!");
    }

    if (!checkIncludeId(currentUser.friendRequestsOut, otherUserId)) {
      res.status(403);
      throw new Error("You haven't sent friend request to this user!");
    }

    // Remove otherUser from 'friendRequestsOut' array of currentUser
    await currentUser.updateOne({ $pull: { friendRequestsOut: otherUserId } });

    // Remove currentUser from 'friendRequestsIn' array of otherUser
    const otherUser = await User.findById(otherUserId);
    await otherUser!.updateOne({ $pull: { friendRequestsIn: currentUserId } });

    res.json({ message: "Success" });
  }
);

/* Accept friend request*/
const acceptRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const currentUser = req.user!;
    const currentUserId = currentUser._id.toString();
    const otherUserId = req.params.userId;

    if (currentUserId === otherUserId) {
      res.status(403);
      throw new Error("Friend request to yourself is forbidden!");
    }

    if (!checkIncludeId(currentUser.friendRequestsIn, otherUserId)) {
      res.status(403);
      throw new Error("You haven't received friend request from this user!");
    }

    // Find the other user
    const otherUser = await User.findById(otherUserId);

    // Add each user to 'friends', 'following', 'followers' array of the other
    // Remove otherUser from 'friendRequestsIn' array of currentUser
    // Remove currentUser from 'friendRequestsOut' array of otherUser
    await currentUser.updateOne({
      $push: {
        friends: { user: otherUserId },
        followers: otherUserId,
        following: otherUserId,
      },
      $pull: { friendRequestsIn: otherUserId },
    });

    await otherUser!.updateOne({
      $push: {
        friends: { user: currentUserId },
        followers: currentUserId,
        following: currentUserId,
      },
      $pull: { friendRequestsOut: currentUserId },
    });

    res.json({ message: "Success" });
  }
);

/* Reject friend request*/
const rejectRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const currentUser = req.user!;
    const currentUserId = currentUser._id.toString();
    const otherUserId = req.params.userId;

    if (currentUserId === otherUserId) {
      res.status(403);
      throw new Error("Friend request to yourself is forbidden!");
    }

    if (!checkIncludeId(currentUser.friendRequestsIn, otherUserId)) {
      res.status(403);
      throw new Error("You haven't received friend request from this user!");
    }

    // Remove otherUser from 'friendRequestsIn' array of currentUser
    await currentUser.updateOne({ $pull: { friendRequestsIn: otherUserId } });

    // Remove currentUser from 'friendRequestsOut' array of otherUser
    const otherUser = await User.findById(otherUserId);
    await otherUser!.updateOne({ $pull: { friendRequestsOut: currentUserId } });

    res.json({ message: "Success" });
  }
);

/* Unfriend */
const unfriend = asyncHandler(async (req: CustomRequest, res: Response) => {
  const currentUser = req.user!;
  const currentUserId = currentUser._id.toString();
  const otherUserId = req.params.userId;

  if (currentUserId === otherUserId) {
    res.status(403);
    throw new Error("You can't unfriend yourself!");
  }

  const friendList = currentUser.friends.map((friend) => friend.user);
  if (!checkIncludeId(friendList, otherUserId)) {
    res.status(403);
    throw new Error("You and this user are not friends!");
  }

  // Remove each user from 'friends', 'following', 'followers' array of the other
  await currentUser.updateOne({
    $pull: {
      friends: { user: otherUserId },
      followers: otherUserId,
      following: otherUserId,
    },
  });

  const otherUser = await User.findById(otherUserId);
  await otherUser!.updateOne({
    $pull: {
      friends: { user: currentUserId },
      followers: currentUserId,
      following: currentUserId,
    },
  });

  res.json({ message: "Success" });
});

export {
  friendList,
  requestList,
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  unfriend,
};

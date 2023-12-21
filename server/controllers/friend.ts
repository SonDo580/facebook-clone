import asyncHandler from "express-async-handler";
import { Response } from "express";

import User from "../models/user";
import { CustomRequest } from "../types";
import { checkIncludeId } from "../utils";

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
      // Add each user to 'friends' array of the other
      await currentUser.updateOne({
        $push: { friends: { user: otherUserId } },
      });

      await otherUser.updateOne({
        $push: { friends: { user: currentUserId } },
      });

      // Remove otherUser from 'friendRequestsIn' array of currentUser
      await otherUser.updateOne({
        $pull: { friendRequestsIn: otherUserId },
      });

      // Remove currentUser from 'friendRequestsOut' array of otherUser
      await otherUser.updateOne({
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
  }
);

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
  async (req: CustomRequest, res: Response) => {}
);

/* Reject friend request*/
const rejectRequest = asyncHandler(
  async (req: CustomRequest, res: Response) => {}
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

  // Remove each user from 'friends' array of the other
  await currentUser.updateOne({ $pull: { friends: { user: otherUserId } } });

  const otherUser = await User.findById(otherUserId);
  await otherUser!.updateOne({ $pull: { friends: { user: currentUserId } } });

  res.json({ message: "Success" });
});

export { friendRequest, cancelRequest, acceptRequest, rejectRequest, unfriend };

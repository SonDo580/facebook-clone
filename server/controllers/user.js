const asyncHandler = require("express-async-handler");

const User = require("../models/user");

/* Follow a user */
const follow = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const currentUserId = currentUser._id.toString();
  const otherUserId = req.params.userId;

  if (currentUserId === otherUserId) {
    res.status(403);
    throw new Error("You can't follow yourself!");
  }

  if (currentUser.following.includes(otherUserId)) {
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

  res.json({ followed: otherUserId });
});

/* Unfollow a user */
const unfollow = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const currentUserId = currentUser._id.toString();
  const otherUserId = req.params.userId;

  if (currentUserId === otherUserId) {
    res.status(403);
    throw new Error("You can't unfollow yourself!");
  }

  if (!currentUser.following.includes(otherUserId)) {
    res.status(403);
    throw new Error("You haven't followed this user!");
  }

  // Update 'following' array of current user
  await currentUser.updateOne({ $pull: { following: otherUserId } });

  // Update 'followers' array of the other user
  const otherUser = await User.findById(otherUserId);
  await otherUser.updateOne({ $pull: { followers: currentUserId } });

  res.json({ unfollowed: otherUserId });
});

module.exports = {
  follow,
  unfollow,
};

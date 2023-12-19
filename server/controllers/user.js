const asyncHandler = require("express-async-handler");

const User = require("../models/user");

const follow = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  const currentUserId = currentUser._id.toString();
  const userToFollowId = req.params.userId;

  if (currentUserId === userToFollowId) {
    res.status(403);
    throw new Error("You can't follow yourself!");
  }

  if (currentUser.following.includes(userToFollowId)) {
    res.status(403);
    throw new Error("You already followed this user!");
  }

  // Find user to follow
  const userToFollow = await User.findById(userToFollowId);
  if (!userToFollow) {
    res.status(400);
    throw new Error("User not found!");
  }

  // Update 'following' array of current user
  await currentUser.updateOne({ $push: { following: userToFollowId } });

  // Update 'followers' array of the other user
  await userToFollow.updateOne({ $push: { followers: currentUserId } });

  res.json({ followed: userToFollowId });
});

module.exports = {
  follow,
};

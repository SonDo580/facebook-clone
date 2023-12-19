const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

/* Add this middleware before protected routes */
const protect = asyncHandler(async (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized!");
  }

  // Decode token and find user with id
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized!");
  }

  // Add user to request object and pass control to the next middleware
  req.user = user;
  next();
});

module.exports = protect;

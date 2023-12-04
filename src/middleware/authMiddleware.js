const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    if (user.role === "suspended") {
      res.status(400);
      throw new Error("User suspended, please contact support");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

const adminOlny = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorize as an admin");
  }
};

const authorOlny = async (req, res) => {
  if (req.user.role === "author" || req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorize as an author");
  }
};

const verifiedOlny = async (req, res) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorize, account not verified");
  }
};

module.exports = { protect, adminOlny, authorOlny, verifiedOlny };

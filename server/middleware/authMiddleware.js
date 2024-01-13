const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decode the token id

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(`This ia Token ${token}`);
      // console.log(`THis is a decoded ${decoded.id}`);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, Token failed-----");
  }
});

module.exports = { protect };

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please Enter all the Felids`);
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error(`User Exists`);
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(` Failed to create User Try again later...`);
  }
  return res.redirect("back");
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error(`Please Fill the fields`);
  }

  const user = await User.findOne({ email });

  // here the password is been compared with the help of matchPassword function
  if (user && (await user.matchPassword(password))) {
    res.json({
      user,
    });
  } else {
  }
});

module.exports = { registerUser, authUser };

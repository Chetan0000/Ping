const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// function to register new Users
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
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(` Failed to create User Try again later...`);
  }
});

// function to authUser<Login >
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
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log(user);
  } else {
    console.log("error");
    res.status(400);
    throw new Error(`Invalid Email or Pasorswd`);
  }
});

// function to find users

const allUer = asyncHandler(async (req, res) => {
  const search = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(search).find({ _id: { $ne: req.user._id } });
  console.log(req.user);
  res.send(users);
});

module.exports = { registerUser, authUser, allUer };

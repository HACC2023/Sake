import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth-user
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id, "user");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// route POST /api/users/register-user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password, vendorName } = req.body;

  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const vendor = await Vendor.findOne({ name: vendorName });
  if (!vendor) {
    res.status(400);
    throw new Error("please input a valid vendor");
  }

  const user = await User.create({
    containerVendor: vendor._id,
    name,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout a user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("user", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

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
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid phone or password");
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
    generateToken(res, user._id, "user");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
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
// route GET /api/users/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id })
    .select("-password")
    .populate({ path: "container.containerInfo" })
    .populate({ path: "containerVendor" });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

// @desc Update user payment
// route POST /api/users/user/profile/payment
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).select("-password");
  const { card_number, cvv, expiry_month, expiry_year } = req.body;
  if (user) {
    user.payment = { card_number, cvv, expiry_month, expiry_year };
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

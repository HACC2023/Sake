import asyncHandler from "express-async-handler";
import Vendor from "../models/vendorModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth-vendor
// @access Public
const authVendor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const vendor = await Vendor.findOne({ email });

  if (vendor && (await vendor.matchPasswords(password))) {
    generateToken(res, vendor._id, "vendor");
    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Logout a vendor
// route POST /api/users/logout
// @access Public
const logoutVendor = asyncHandler(async (req, res) => {
  res.cookie("vendor", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Vendor Logged Out" });
});

// @desc get list of vendors
// route GET /api/users/vendor/list-users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ containerVendor: req.vendor._id }).select(
    "-password"
  );
  res.status(200).json(users);
});

// @desc get vendor by name
// route GET /api/users/vendor/user/:phone
// @access Private
const getUserByPhone = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    phone: req.params.phone,
  })
    .select("-password -containerVendor")
    .populate({ path: "container.containerInfo" });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @desc checkout containers for user
// route PATCH /api/users/vendor/checkout-user/:phone
// @access Private
const checkoutUser = asyncHandler(async (req, res) => {
  const vendorName = req.params.name.replace(/-/g, " ");
  const { containerName, quantity } = req.body;
  const container = await Container.findOne({
    category: containerName,
  });
  const vendor = await Vendor.findOne({
    name: new RegExp(`^${vendorName}$`, "i"),
  })
    .select("-password")
    .populate({ path: "containerReceived.containerSchema" });
  if (vendor) {
    const containerToUpdate = vendor.containerReceived.find(
      container => container.containerSchema.category === containerName
    );
    if (containerToUpdate) {
      containerToUpdate.quantity += +quantity;
    } else {
      vendor.containerReceived.push({ containerSchema: container, quantity });
    }
    const updatedVendor = await vendor.save();
    res.status(200).json(updatedVendor);
  } else {
    res.status(404).json({ message: "Vendor not found" });
  }
});

export { authVendor, logoutVendor, getAllUsers, getUserByPhone };

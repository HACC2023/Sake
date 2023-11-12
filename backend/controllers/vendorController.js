import asyncHandler from "express-async-handler";
import Vendor from "../models/vendorModel.js";
import User from "../models/userModel.js";
import Container from "../models/containerSchema.js";
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
      role: vendor.role,
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
  ).populate({path:"container.containerInfo"});
  res.status(200).json(users);
});

// @desc get user by name
// route GET /api/users/vendor/user/:phone
// @access Private
const getUserByPhone = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    phone: req.params.phone,
    containerVendor: req.vendor._id,
  })
    .select("-password -containerVendor")
    .populate({ path: "container.containerInfo" });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @desc get vendor profile
// route GET /api/users/vendor
// @access Private
const getVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({
    _id: req.vendor._id,
  })
    .select("-password")
    .populate({ path: "containerReceived.containerSchema" });
  if (!vendor) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(vendor);
});

// @desc checkout containers for user
// route PATCH /api/users/vendor/checkout-user/:phone
// @access Private
const checkoutUser = asyncHandler(async (req, res) => {
  const { containerName, quantity } = req.body;
  const containerInfo = await Container.findOne({
    category: containerName,
  });
  if (!containerInfo)
    return res.status(404).json({ message: "Container not found" });
  const vendor = await Vendor.findOne({ _id: req.vendor._id })
    .select("-password")
    .populate({ path: "containerReceived.containerSchema" });
  const user = await User.findOne({
    phone: req.params.phone,
    containerVendor: req.vendor._id,
  })
    .select("-password")
    .populate({ path: "container.containerInfo" });
  console.log(vendor.containerReceived);
  if (user && vendor) {
    const containerAvailability = vendor.containerReceived.find(
      container => container.containerSchema.category === containerName
    );
    if (!containerAvailability) {
      return res.status(404).json({ message: "Container not available" });
    }
    const containerToUpdate = user.container.find(
      container => container.containerInfo.category === containerName
    );
    if (containerToUpdate) {
      containerToUpdate.checkoutQuan += +quantity;
    } else {
      user.container.push({
        containerInfo,
        checkoutQuan: quantity,
        returnQuan: 0,
      });
    }
    if (containerAvailability >= quantity) {
      containerAvailability.quantity -= +quantity;
    } else {
      return res.status(404).json({ message: "Low stock or not available" });
    }
    const updatedVendor = await vendor.save();
    const updatedUser = await user.save();
    res.status(200).json({ vendor: updatedVendor, user: updatedUser });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc remove containers from specific user
// route PATCH /api/users/vendor/user-return/:phone
// @access Private
const returnUser = asyncHandler(async (req, res) => {
  const { containerName, quantity, location } = req.body;
  const user = await User.findOne({
    phone: req.params.phone,
    containerVendor: req.vendor._id,
  })
    .select("-password")
    .populate({ path: "container.containerInfo" });
  if (user) {
    const containerToUpdate = user.container.find(
      container => container.containerInfo.category === containerName
    );
    if (!containerToUpdate) {
      return res.status(404).json({
        message: "Container not found",
      });
    }
    if (containerToUpdate.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Quantity to remove exceeds the available quantity" });
    }

    containerToUpdate.returnQuan += +quantity;
    user.locationReturn = location;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc update return location
// route POST /api/users/vendor/location
// @access Private
const updateLocation = asyncHandler(async (req, res) => {
  const { returnLocation } = req.body;
  const vendor = await Vendor.findById({ _id: req.vendor._id });
  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }
  vendor.location.push(returnLocation);
  const updatedVendor = await vendor.save();
  res.status(200).json(updatedVendor);
});

// @desc get all vendors
// route POST /api/users/list-vendors
// @access Public
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().select("name");
  res.status(200).json(vendors);
});

export {
  authVendor,
  logoutVendor,
  getAllUsers,
  getUserByPhone,
  checkoutUser,
  returnUser,
  updateLocation,
  getVendorProfile,
  getVendors,
};

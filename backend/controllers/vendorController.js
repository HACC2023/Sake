import asyncHandler from "express-async-handler";
import Vendor from "../models/vendorModel.js";
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

export { authVendor, logoutVendor };

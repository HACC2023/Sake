import asyncHandler from "express-async-handler";

// @desc Auth user/set token
// route POST /api/users/auth-vendor
// @access Public
const authVendor = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth Vendor" });
});

// @desc Logout a vendor
// route POST /api/users/logout
// @access Public
const logoutVendor = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout Vendor" });
});

export { authVendor, logoutVendor };

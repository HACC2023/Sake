import asyncHandler from "express-async-handler";

// @desc Auth user/set token
// route POST /api/users/auth-admin
// @access Public
const authAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth Admin" });
});

// @desc Logout an admin
// route POST /api/users/logout
// @access Public
const logoutAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout Admin" });
});

export { authAdmin, logoutAdmin };

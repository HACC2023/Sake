import express from "express";
import { protectVendor } from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  authVendor,
  checkoutUser,
  getAllUsers,
  getUserByPhone,
  getVendorProfile,
  getVendors,
  logoutVendor,
  returnUser,
  updateLocation,
} from "../controllers/vendorController.js";

router.post("/auth-vendor", authVendor);
router.post("/logout-vendor", protectVendor, logoutVendor);
router.get("/vendor/list-users", protectVendor, getAllUsers);
router.get("/vendor/user/:phone", protectVendor, getUserByPhone);
router.patch("/vendor/checkout-user/:phone", protectVendor, checkoutUser);
router.patch("/vendor/user-return/:phone", protectVendor, returnUser);
router.post("/vendor/location", protectVendor, updateLocation);
router.get("/vendor", protectVendor, getVendorProfile);
router.get("/list-vendors", getVendors);


export default router;

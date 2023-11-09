import express from "express";
import { protectVendor } from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  authVendor,
  getAllUsers,
  getUserByPhone,
  logoutVendor,
} from "../controllers/vendorController.js";

router.post("/auth-vendor", authVendor);
router.post("/logout-vendor", protectVendor, logoutVendor);
router.get("/vendor/list-users", protectVendor, getAllUsers);
router.get("/vendor/user/:phone", protectVendor, getUserByPhone);

export default router;

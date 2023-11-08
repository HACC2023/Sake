import express from "express";
const router = express.Router();
import { protectAdmin } from "../middleware/authMiddleware.js";

import {
  authAdmin,
  logoutAdmin,
  registerAdmin,
  registerVendor,
  getAllVendors,
  getVendorByName,
  updateVendor,
} from "../controllers/adminController.js";

router.post("/register-admin", registerAdmin);
router.post("/register-vendor", protectAdmin, registerVendor);
router.post("/auth-admin", authAdmin);
router.post("/logout-admin", protectAdmin, logoutAdmin);
router.get("/admin/vendors", protectAdmin, getAllVendors);
router
  .route("/admin/vendors/:name")
  .get(protectAdmin, getVendorByName)
  .patch(protectAdmin, updateVendor);

export default router;

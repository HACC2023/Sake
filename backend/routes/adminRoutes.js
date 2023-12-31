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
  removeVendor,
  getContainers,
  removeVendorProfile,
  getAllUsers,
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
router.patch("/admin/remove/vendors/:name", protectAdmin, removeVendor);
router.get("/containers", getContainers);
router.delete("/admin/remove-vendor/:name", protectAdmin, removeVendorProfile);
router.get("/admin/users", protectAdmin, getAllUsers);

export default router;

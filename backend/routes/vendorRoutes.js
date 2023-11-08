import express from "express";
import { protectVendor } from "../middleware/authMiddleware.js";

const router = express.Router();

import { authVendor, logoutVendor } from "../controllers/vendorController.js";

router.post("/auth-vendor", authVendor);
router.post("/logout-vendor", protectVendor, logoutVendor);

export default router;

import express from "express";

const router = express.Router();

import { authVendor, logoutVendor } from "../controllers/vendorController.js";

router.post("/auth-vendor", authVendor);
router.post("/logout-vendor", logoutVendor);

export default router;

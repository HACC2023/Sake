import express from "express";

const router = express.Router();

import { authAdmin, logoutAdmin } from "../controllers/adminController.js";

router.post("/auth-admin", authAdmin);
router.post("/logout-admin", logoutAdmin);

export default router;

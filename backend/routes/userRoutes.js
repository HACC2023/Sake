import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

router.post("/register-user", registerUser);
router.post("/auth-user", authUser);
router.post("/logout-user", protectUser, logoutUser);
router.get("/user/profile", protectUser, getUserProfile);
router.post("/user/profile/payment", protectUser, updateUserProfile);

export default router;

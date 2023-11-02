import express from "express";

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
router.post("/logout-user", logoutUser);
router.route("/profile-user").get(getUserProfile).put(updateUserProfile);

export default router;

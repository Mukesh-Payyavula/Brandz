// routes/userRoutes.js
import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyOtp,
  forgotPassword, // Added for password recovery
  resetPassword,  // Added for resetting password
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes for managing users
router.route("/").get(protect, admin, getUsers);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// User authentication and profile routes
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// User registration and OTP verification
router.route("/register").post(registerUser);
router.route("/verify-otp").post(verifyOtp);

// Password management routes
router.route("/forgot-password").post(forgotPassword); 
router.route("/reset-password").post(resetPassword);  

export default router;

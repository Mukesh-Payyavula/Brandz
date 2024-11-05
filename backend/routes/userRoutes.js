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
  forgotPassword,  // Request password reset email
  resetPassword,   // Reset password using token
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes for managing users
router.route("/").get(protect, admin, getUsers); // Get all users
router
  .route("/:id")
  .get(protect, admin, getUserById) // Get user by ID
  .put(protect, admin, updateUser)  // Update user by ID
  .delete(protect, admin, deleteUser); // Delete user by ID

// User authentication and profile routes
router.route("/login").post(authUser); // User login
router
  .route("/profile")
  .get(protect, getUserProfile) // Get user profile
  .put(protect, updateUserProfile); // Update user profile

// User registration and OTP verification
router.route("/register").post(registerUser); // Register new user
router.route("/verify-otp").post(verifyOtp); // Verify OTP for registration

// Password management routes
router.route("/forgot-password").post(forgotPassword); // Request password reset email
router.route("/reset-password/:token").post(resetPassword); // Reset password using reset token

export default router;

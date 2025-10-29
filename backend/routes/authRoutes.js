import express from "express";
import {
  signup, login, logout, profile, makeAdmin,
  forgotPassword, resetPassword,
  getAllUsers, createUser, updateUser, updateProfile, deleteUser,
  getDashboardStats,
  getRecentActivities
} from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, profile);
router.patch('/profile', protect, updateProfile);
router.put("/make-admin", protect, isAdmin, makeAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/users", protect, isAdmin, getAllUsers);            // READ
router.post("/users", protect, isAdmin, createUser);          // CREATE
router.put("/users/:id", protect, isAdmin, updateUser);       // UPDATE
router.delete("/users/:id", protect, isAdmin, deleteUser);    // DELETE

router.get("/dashboard/stats", protect, isAdmin, getDashboardStats);
router.get("/dashboard/activities", protect, isAdmin, getRecentActivities);

export default router;
import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);
router.get("/user/:userId", protect, getBookings);

// Admin routes
router.get("/", protect, isAdmin, getBookings);
router.get("/:id", protect, isAdmin, getBookingById);
router.put("/:id", protect, isAdmin, updateBooking);
router.delete("/:id", protect, isAdmin, deleteBooking);

export default router;
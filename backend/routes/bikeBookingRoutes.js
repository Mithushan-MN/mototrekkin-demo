import express from "express";
import { createBooking, createPaymentSession, getBookings, verifyPayment, getAllBookings,deleteBooking,getBookingById, updateBooking } from "../controllers/bikeBookingController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();



router.post("/create", protect, upload, createBooking);
router.post("/create-payment-session", createPaymentSession);
router.post("/verify-payment", verifyPayment);

router.get("/user/:userId", protect, getBookings);
router.get("/", protect, isAdmin, getAllBookings); // Admin fetch all bookings
router.delete("/:id", protect, isAdmin, deleteBooking); // Admin delete booking

router.get("/:id", protect, isAdmin, getBookingById);
router.put("/:id", protect, isAdmin, updateBooking);

export default router;
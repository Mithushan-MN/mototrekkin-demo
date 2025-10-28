import express from "express";
import { createBooking, createPaymentSession, getBookings, verifyPayment, getAllBookings,deleteBooking,getBookingById, updateBooking } from "../controllers/bikeBookingController.js";
import multer from "multer";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/create", protect, upload.single("licenceFile"), createBooking);
router.post("/create-payment-session", createPaymentSession);
router.post("/verify-payment", verifyPayment);

router.get("/user/:userId", protect, getBookings);
router.get("/", protect, isAdmin, getAllBookings); // Admin fetch all bookings
router.delete("/:id", protect, isAdmin, deleteBooking); // Admin delete booking

router.get("/:id", protect, isAdmin, getBookingById);
router.put("/:id", protect, isAdmin, updateBooking);

export default router;
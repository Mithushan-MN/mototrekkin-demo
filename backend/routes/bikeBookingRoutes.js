// routes/bikeBookingRoutes.js
import express from "express";
import {
  createBooking,
  createPaymentSession,
  verifyPayment,
  getBookings,
  getAllBookings,
  deleteBooking,
  getBookingById,
  updateBooking,
} from "../controllers/bikeBookingController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Custom file parser middleware
const parseFile = (req, res, next) => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filename: (name, ext) => `${Date.now()}_${name}${ext}`,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable parse error:", err);
      return res.status(500).json({ message: "File parsing failed" });
    }

    // Attach parsed data
    req.body = { ...req.body, ...fields };
    
    const file = files.licenceFile?.[0] || files.licenceFile;
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "licence_files",
          resource_type: "auto",
          public_id: `licence_${Date.now()}`,
        });
        req.file = { path: result.secure_url }; // Cloudinary URL
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        return res.status(500).json({ message: "File upload failed" });
      }
    } else {
      req.file = null;
    }

    next();
  });
};

// === ROUTES ===
router.post("/create", protect, parseFile, createBooking);
router.post("/create-payment-session", createPaymentSession);
router.post("/verify-payment", verifyPayment);

router.get("/user/:userId", protect, getBookings);
router.get("/", protect, isAdmin, getAllBookings);
router.delete("/:id", protect, isAdmin, deleteBooking);
router.get("/:id", protect, isAdmin, getBookingById);
router.put("/:id", protect, isAdmin, updateBooking);

export default router;
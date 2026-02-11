// routes/RidgeRiderVIRegistration.js
import express from 'express';
import {
  createRidgeRiderVIRegistration,
  getAllRegistrations,
  getUserRegistrations,
  updateRidgeRiderVIRegistration,
  deleteRidgeRiderVIRegistration,
  resendPaymentEmail,
} from '../controllers/RidgeRiderVIRegistrationController.js';
import { getBikes } from '../controllers/bikeController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();


console.log('RidgeRiderVIRegistration: Router loaded');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// parseFile middleware (same as bike booking)
const parseFile = (req, res, next) => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ message: "File parsing failed" });
    }

    // FLATTEN FIELDS
    const flatFields = {};
    Object.keys(fields).forEach(key => {
      const value = fields[key];
      flatFields[key] = Array.isArray(value) ? value[0] : value;
    });
    req.body = flatFields;

    // UPLOAD FILE (field name: licenceFile)
    const file = files.licenceFile?.[0] || files.licenceFile;
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "nzsi_licences",
          resource_type: "auto",
        });
        req.file = {
          path: result.secure_url,
          filename: file.originalFilename,
          originalname: file.originalFilename,
          mimetype: file.mimetype,
        };
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

/* -------------------------------------------------------------------------- */
/*  PUBLIC / USER ENDPOINTS                                                   */
/* -------------------------------------------------------------------------- */
router.post('/create', protect, parseFile, createRidgeRiderVIRegistration);
router.get('/user', protect, getUserRegistrations);

/* -------------------------------------------------------------------------- */
/*  ADMIN ENDPOINTS (protected + admin only)                                 */
/* -------------------------------------------------------------------------- */
// GET ALL registrations – **admin panel**
router.get('/admin', protect, isAdmin, getAllRegistrations);

// GET ALL (legacy – you can keep both, they point to the same controller)
router.get('/', protect, isAdmin, getAllRegistrations);

router.put('/:id', protect, isAdmin, parseFile, updateRidgeRiderVIRegistration);
router.delete('/:id', protect, isAdmin, deleteRidgeRiderVIRegistration);
router.post('/resend-payment/:id', protect, isAdmin, resendPaymentEmail);

/* -------------------------------------------------------------------------- */
/*  BIKE LIST (public – no auth needed)                                      */
/* -------------------------------------------------------------------------- */
router.get('/bikes', getBikes);

export default router;
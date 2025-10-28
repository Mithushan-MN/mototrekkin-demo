// routes/nzsiRegistration.js
import express from 'express';
import {
  createNZSIRegistration,
  getAllRegistrations,
  getUserRegistrations,
  updateNZSIRegistration,
  deleteNZSIRegistration,
  resendPaymentEmail,
} from '../controllers/nzsiRegistrationController.js';
import { getBikes } from '../controllers/bikeController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

console.log('nzsiRegistration: Router loaded');

/* -------------------------------------------------------------------------- */
/*  PUBLIC / USER ENDPOINTS                                                   */
/* -------------------------------------------------------------------------- */
router.post('/create', protect, upload.single('licenceFile'), createNZSIRegistration);
router.get('/user', protect, getUserRegistrations);

/* -------------------------------------------------------------------------- */
/*  ADMIN ENDPOINTS (protected + admin only)                                 */
/* -------------------------------------------------------------------------- */
// GET ALL registrations – **admin panel**
router.get('/admin', protect, isAdmin, getAllRegistrations);

// GET ALL (legacy – you can keep both, they point to the same controller)
router.get('/', protect, isAdmin, getAllRegistrations);

router.put('/:id', protect, isAdmin, upload.single('licenceFile'), updateNZSIRegistration);
router.delete('/:id', protect, isAdmin, deleteNZSIRegistration);
router.post('/resend-payment/:id', protect, isAdmin, resendPaymentEmail);

/* -------------------------------------------------------------------------- */
/*  BIKE LIST (public – no auth needed)                                      */
/* -------------------------------------------------------------------------- */
router.get('/bikes', getBikes);

export default router;
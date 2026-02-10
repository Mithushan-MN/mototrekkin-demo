// routes/mdpPhase3Routes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  createMDPPhase3Registration,
  getUserMDPPhase3Registrations, 
  getAllMDPPhase3Registrations,
  deleteMDPPhase3Registration,
  resendPaymentEmail,
  updateMDPPhase3Registration

} from '../controllers/mdpPhase3RegistrationController.js';

const router = express.Router();

// POST /api/mdpPhase3Registrations/create
router.post('/create', protect, createMDPPhase3Registration);

// GET /api/mdpPhase3Registrations/user
router.get('/user', protect, getUserMDPPhase3Registrations);   // <-- NEW ROUTE

router.get('/admin', protect, isAdmin, getAllMDPPhase3Registrations);
router.delete('/:id', protect, isAdmin, deleteMDPPhase3Registration);
router.post('/resend-payment/:id', protect, isAdmin, resendPaymentEmail);
router.put('/:id', protect, isAdmin, updateMDPPhase3Registration);

export default router;
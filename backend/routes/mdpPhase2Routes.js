// routes/mdpPhase2Routes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  createMDPPhase2Registration,
  getUserMDPPhase2Registrations, 
  getAllMDPPhase2Registrations,
  deleteMDPPhase2Registration,
  resendPaymentEmail,
  updateMDPPhase2Registration

} from '../controllers/mdpPhase2RegistrationController.js';

const router = express.Router();

// POST /api/mdpPhase2Registrations/create
router.post('/create', protect, createMDPPhase2Registration);

// GET /api/mdpPhase2Registrations/user
router.get('/user', protect, getUserMDPPhase2Registrations);   // <-- NEW ROUTE

router.get('/admin', protect, isAdmin, getAllMDPPhase2Registrations);
router.delete('/:id', protect, isAdmin, deleteMDPPhase2Registration);
router.post('/resend-payment/:id', protect, isAdmin, resendPaymentEmail);
router.put('/:id', protect, isAdmin, updateMDPPhase2Registration);

export default router;
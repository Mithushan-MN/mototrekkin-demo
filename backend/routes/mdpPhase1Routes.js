// routes/mdpPhase1Routes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  createMDPPhase1Registration,
  getUserMDPPhase1Registrations, 
  getAllMDPPhase1Registrations,
  deleteMDPPhase1Registration,
  resendPaymentEmail,
  updateMDPPhase1Registration

} from '../controllers/mdpPhase1RegistrationController.js';

const router = express.Router();

// POST /api/mdpPhase1Registrations/create
router.post('/create', protect, createMDPPhase1Registration);

// GET /api/mdpPhase1Registrations/user
router.get('/user', protect, getUserMDPPhase1Registrations);   // <-- NEW ROUTE

router.get('/admin', protect, isAdmin, getAllMDPPhase1Registrations);
router.delete('/:id', protect, isAdmin, deleteMDPPhase1Registration);
router.post('/resend-payment/:id', protect, isAdmin, resendPaymentEmail);
router.put('/:id', protect, isAdmin, updateMDPPhase1Registration);

export default router;
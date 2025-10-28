import express from 'express';
import { getBikes } from '../controllers/mdpPhase2BikeController.js';

const router = express.Router();

// GET /api/bikes - Fetch available bikes
router.get('/', getBikes);

export default router;
import express from 'express';
import { getBikes,createBike,
  updateBike,
  deleteBike, } from '../controllers/mdpPhase2BikeController.js';

const router = express.Router();

// GET /api/bikes - Fetch available bikes
router.get('/', getBikes);
// POST /api/bikes
router.post('/', createBike);

// PUT /api/bikes/:id
router.put('/:id', updateBike);

// DELETE /api/bikes/:id (soft delete)
router.delete('/:id', deleteBike);

export default router;
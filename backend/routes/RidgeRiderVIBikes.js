import { Router } from 'express';
import {
  getBikes,
  createBike,
  updateBike,
  deleteBike,
} from '../controllers/RidgeRiderVIbikeController.js';

const router = Router();

router.get('/', getBikes);
router.post('/', createBike);
router.put('/:id', updateBike);
router.delete('/:id', deleteBike);

export default router;
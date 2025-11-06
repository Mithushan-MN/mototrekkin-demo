// src/routes/userProfile.js
import express from 'express';
import UserProfile from '../models/UserProfile.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET: Load profile
router.get('/:userId', protect, async (req, res) => {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Cannot access other user's profile" });
    }

    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error('GET /userProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH: Save field
router.patch('/:userId', protect, async (req, res) => {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ message: "Cannot update other user's profile" });
    }

    const updates = { ...req.body };
    if (updates.licenceExpiry) {
      updates.licenceExpiry = new Date(updates.licenceExpiry);
    }

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(profile);
  } catch (err) {
    console.error('PATCH /userProfile error:', err);
    res.status(500).json({ message: 'Save failed' });
  }
});

export default router;
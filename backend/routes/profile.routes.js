// routes/profile.routes.js
import express from "express";
import mongoose from "mongoose";
import UserProfile from "../models/UserProfile.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Allowed fields that can be written by the client
const ALLOWED_KEYS = new Set([
  "firstName","lastName","gender","email","mobile","landline","birthday","occupation",
  "address","address2","city","postCode","country","state",
  "emergency1FirstName","emergency1LastName","emergency1Email","emergency1Mobile","emergency1Landline","emergency1Relationship",
  "emergency2FirstName","emergency2LastName","emergency2Email","emergency2Mobile","emergency2Landline","emergency2Relationship",
  "licenceNumber","licenceExpiryDate","licenceState"
]);

const filterBody = (body) =>
  Object.fromEntries(Object.entries(body).filter(([k]) => ALLOWED_KEYS.has(k)));

router.get("/me", protect, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = mongoose.isValidObjectId(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    const profile = await UserProfile.findOne({ userId: id }).lean();
    return res.json(profile || {});
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/me", protect, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = mongoose.isValidObjectId(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    const payload = filterBody(req.body);

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: id },
      { $set: { userId: id, ...payload } },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true,        // ✅ validate against schema
      }
    );

    return res.json(updatedProfile);
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

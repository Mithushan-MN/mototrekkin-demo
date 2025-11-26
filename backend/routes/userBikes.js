// routes/userBikes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";  // ← This is YOUR style!
import UserBike from "../models/UserBike.js";

const router = express.Router();

// Apply protect to all routes
router.use(protect);

router.get("/", async (req, res) => {
  try {
    const bikes = await UserBike.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, bikes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to load your bikes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, brand, model, year, dailyRate, description, imageUrl, isAvailable = true } = req.body;

    if (!name?.trim() || !dailyRate)
      return res.status(400).json({ success: false, message: "Name and daily rate are required" });

    const bike = new UserBike({
      user: req.user.id,
      name: name.trim(),
      brand: brand?.trim(),
      model: model?.trim(),
      year: year ? Number(year) : undefined,
      dailyRate: Number(dailyRate),
      description: description?.trim(),
      imageUrl: imageUrl?.trim(),
      isAvailable,
    });

    await bike.save();
    res.status(201).json({ success: true, bike });
  } catch (err) {
    console.error("Add bike error:", err);
    res.status(500).json({ success: false, message: "Failed to add bike" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const bike = await UserBike.findOne({ _id: req.params.id, user: req.user.id });
    if (!bike) return res.status(404).json({ success: false, message: "Bike not found" });

    Object.assign(bike, req.body);
    if (req.body.dailyRate) bike.dailyRate = Number(req.body.dailyRate);
    if (req.body.year) bike.year = Number(req.body.year);

    await bike.save();
    res.json({ success: true, bike });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await UserBike.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!result) return res.status(404).json({ success: false, message: "Bike not found" });

    res.json({ success: true, message: "Bike removed from garage" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

export default router;
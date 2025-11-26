// models/UserBike.js
import mongoose from "mongoose";

const userBikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    model: { type: String, trim: true },
    year: { type: Number },
    dailyRate: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, default: true },
    description: { type: String, trim: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("UserBike", userBikeSchema);
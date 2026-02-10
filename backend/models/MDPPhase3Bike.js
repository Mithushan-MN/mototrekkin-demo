import mongoose from 'mongoose';

const mdpPhase3BikeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "HONDA CRF250 RALLY"
  dailyRate: { type: Number, required: true }, // e.g., 205
  remaining: { type: Number, default: 1, min: 0 }, // Availability count
  isActive: { type: Boolean, default: true },
  description: { type: String } // Optional
}, { timestamps: true });

export default mongoose.model('MDPPhase3Bike', mdpPhase3BikeSchema);
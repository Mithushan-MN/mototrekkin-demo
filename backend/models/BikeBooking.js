// models/BikeBooking.js
import mongoose from "mongoose";

const bikeBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  returnTime: { type: String, required: true },
  totalDays: { type: Number, required: true },
  bikeModel: { type: String, required: true },
  bikePrice: { type: Number, required: true }, // per day
  gearOption: { type: String, required: true },
  gear: { helmet: Boolean, jacket: Boolean, gloves: Boolean },
  addOns: { excessReduction: Boolean, tyreProtection: Boolean, windscreen: Boolean },
  riderDetails: { /* ... */ },
  emergencyContact: { /* ... */ },
  licenceDetails: { /* ... */ },
  agreementAccepted: { type: Boolean, required: true },
  paymentOption: { type: String, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },

  // ← ADD THESE
  subtotalUSD: { type: Number },        // e.g. 450.00
  merchantFeeUSD: { type: Number },     // e.g. 6.77
  totalAmountUSD: { type: Number },     // e.g. 456.77

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("BikeBooking", bikeBookingSchema);
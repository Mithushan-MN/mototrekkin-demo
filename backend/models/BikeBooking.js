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
  bikePrice: { type: Number, required: true },
  gearOption: { type: String, required: true },
  subGearOption: { type: String },
  gear: { helmet: Boolean, jacket: Boolean, gloves: Boolean },
  addOns: { excessReduction: Boolean, tyreProtection: Boolean, windscreen: Boolean },

  riderDetails: {
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    birthday: String,
    occupation: String,
    mobile: String,
    landline: String,
    streetAddress: String,
    streetAddress2: String,
    city: String,
    postCode: String,
    country: String,
    state: String,
  },

  emergencyContact: {
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    landline: String,
    relation: String,
  },

  licenceDetails: {
    licenceValid: String,
    licenceNumber: String,
    licenceExpiry: Date,
    licenceState: String,
    licenceFile: String, // Cloudinary URL
  },

  agreementAccepted: { type: Boolean, required: true },
  paymentOption: { type: String, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },

  subtotalUSD: { type: Number },
  merchantFeeUSD: { type: Number },
  totalAmountUSD: { type: Number },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("BikeBooking", bikeBookingSchema);
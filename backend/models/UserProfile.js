import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },

  // Basic info
  firstName: String,
  lastName: String,
  gender: String,
  email: String,
  mobile: String,
  landline: String,
  birthday: String,
  occupation: String,

  // Address
  address: String,
  address2: String,
  city: String,
  postCode: String,
  country: String,
  state: String,

  // Extra contact info
  phonePlatform: String,
  phoneModel: String,
  hasGPS: String,
  hasFacebook: String,

  // Emergency Contacts
  emergency1FirstName: String,
  emergency1LastName: String,
  emergency1Email: String,
  emergency1Mobile: String,
  emergency1Landline: String,
  emergency1Relationship: String,

  emergency2FirstName: String,
  emergency2LastName: String,
  emergency2Email: String,
  emergency2Mobile: String,
  emergency2Landline: String,
  emergency2Relationship: String,

  // Licence
  licenceValid: String,
  licenceNumber: String,
  licenceExpiryDate: String,
  licenceState: String,


}, { timestamps: true });

export default mongoose.model("UserProfile", userProfileSchema);

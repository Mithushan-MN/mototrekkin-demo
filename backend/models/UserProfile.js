// src/models/UserProfile.js

import mongoose from "mongoose";


const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  gender: String,
  email: String,
  confirmEmail: String,
  birthday: String,
  occupation: String,
  mobile: String,
  landline: String,
  streetAddress: String,
  streetAddress2: String,
  city: String,
  state: String,
  postCode: String,
  country: String,

  emergencyFirstName: String,
  emergencyLastName: String,
  emergencyEmail: String,
  emergencyMobile: String,
  emergencyLandline: String,
  emergencyRelation: String,

  licenceNumber: String,
  licenceExpiry: Date,
  licenceState: String,


  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('UserProfile', userProfileSchema);
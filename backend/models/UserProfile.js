// // src/models/UserProfile.js

// import mongoose from "mongoose";


// const userProfileSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },
//   firstName: String,
//   lastName: String,
//   gender: String,
//   email: String,
//   confirmEmail: String,
//   birthday: String,
//   occupation: String,
//   mobile: String,
//   landline: String,
//   streetAddress: String,
//   streetAddress2: String,
//   city: String,
//   state: String,
//   postCode: String,
//   country: String,

//   emergencyFirstName: String,
//   emergencyLastName: String,
//   emergencyEmail: String,
//   emergencyMobile: String,
//   emergencyLandline: String,
//   emergencyRelation: String,

//   licenceNumber: String,
//   licenceExpiry: Date,
//   licenceState: String,


//   updatedAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('UserProfile', userProfileSchema);


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

  // NEW: Medical Information Section
  medicalInfo: {
    hasMedicalCondition: { 
      type: String, 
      enum: ["Yes", "No"], 
      required: true 
    },
    medicalCondition: { type: String },
    
    medications: { type: String },
    
    hasMedicationAllergies: { 
      type: String, 
      enum: ["Yes", "No"], 
      required: true 
    },
    medicationAllergies: { type: String },
    
    hasFoodAllergies: { 
      type: String, 
      enum: ["Yes", "No"], 
      required: true 
    },
    foodAllergies: { type: String },
    
    dietaryRequirements: { type: String },
    
    hasHealthFund: { 
      type: String, 
      enum: ["Yes", "No"] 
    },
    healthFundName: { type: String },
    healthFundNumber: { type: String },
    
    hasAmbulanceCover: { 
      type: String, 
      enum: ["Yes", "No"] 
    },
    
    medicareNumber: { type: String },
    medicarePosition: { type: String } // e.g., "1" on card
  },

  updatedAt: { type: Date, default: Date.now }
});

// Optional: Add index for faster queries
userProfileSchema.index({ userId: 1 });

export default mongoose.model('UserProfile', userProfileSchema);
// src/constants/userFields.js
export const USER_FIELDS = [
  // 👤 Basic identity
  { profile: "firstName", names: ["firstName"] },
  { profile: "lastName", names: ["lastName"] },
  { profile: "gender", names: ["gender"] },
  { profile: "birthday", names: ["birthday"] },
  { profile: "occupation", names: ["occupation"] },

  // 📧 Contact info
  { profile: "email", names: ["email", "confirmEmail"] },
  { profile: "mobile", names: ["mobile"] },
  { profile: "landline", names: ["landline"] },

  // 🏠 Address
  { profile: "address", names: ["streetAddress", "address"] },
  { profile: "address2", names: ["streetAddress2", "address2"] },
  { profile: "city", names: ["city"] },
  { profile: "postCode", names: ["postCode"] },
  { profile: "country", names: ["country"] },
  { profile: "state", names: ["state"] },

  // 📱 Extra contact info (used only in NZSI form)
  { profile: "phonePlatform", names: ["phonePlatform"] },
  { profile: "phoneModel", names: ["phoneModel"] },
  { profile: "hasGPS", names: ["hasGPS"] },
  { profile: "hasFacebook", names: ["hasFacebook"] },

  // 🚨 Emergency Contact 1 (Bike + NZSI)
  { profile: "emergency1FirstName", names: ["emergencyFirstName", "emergency1FirstName"] },
  { profile: "emergency1LastName", names: ["emergencyLastName", "emergency1LastName"] },
  { profile: "emergency1Email", names: ["emergencyEmail", "emergency1Email"] },
  { profile: "emergency1Mobile", names: ["emergencyMobile", "emergency1Mobile"] },
  { profile: "emergency1Landline", names: ["emergencyLandline", "emergency1Landline"] },
  { profile: "emergency1Relationship", names: ["emergencyRelation", "emergency1Relationship"] },

  // 🚨 Emergency Contact 2 (NZSI only)
  { profile: "emergency2FirstName", names: ["emergency2FirstName"] },
  { profile: "emergency2LastName", names: ["emergency2LastName"] },
  { profile: "emergency2Email", names: ["emergency2Email"] },
  { profile: "emergency2Mobile", names: ["emergency2Mobile"] },
  { profile: "emergency2Landline", names: ["emergency2Landline"] },
  { profile: "emergency2Relationship", names: ["emergency2Relationship"] },

  // 🪪 Driver’s Licence (both forms)
  { profile: "licenceValid", names: ["licenceDetails.licenceValid", "licenceValid"] },
  { profile: "licenceNumber", names: ["licenceDetails.licenceNumber", "licenceNumber"] },
  { profile: "licenceExpiryDate", names: ["licenceDetails.licenceExpiry", "licenceExpiryDate"] },
  { profile: "licenceState", names: ["licenceDetails.licenceState", "licenceState"] },

];

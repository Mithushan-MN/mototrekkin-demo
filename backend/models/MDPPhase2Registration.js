import mongoose from 'mongoose';

const mdpPhase2RegistrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  phase1Completion: {
    completedPhase1: String,
    phase1Confirmation: String,
  },
  personalDetails: {
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    confirmEmail: String,
    birthday: Date,
    occupation: String,
    mobile: String,
    landline: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    postCode: String,
    phonePlatform: String,
    phoneModel: String,
    hasGPS: String,
    hasFacebook: String,
    hasPhoneMount: String,
    canChargePhone: String,
  },
  emergencyContacts: {
    emergency1: {
      firstName: String,
      lastName: String,
      email: String,
      mobile: String,
      landline: String,
      relationship: String,
    },
    emergency2: {
      firstName: String,
      lastName: String,
      email: String,
      mobile: String,
      landline: String,
      relationship: String,
    },
    shirtSize: String,
  },
  medicalInfo: {
    medicalCondition: String,
    medicalDescription: String,
    medications: String,
    regularMedication: String,
    medicationDetails: String,
    medicationAllergies: String,
    medicationAllergyDetails: String,
    foodAllergies: String,
    foodAllergyDetails: String,
    dietaryRequirements: String,
    medicareNumber: String,
    medicarePosition: String,
  },
  experience: {
    previousTraining: String,
    recentTraining: String,
    trainingDetails: String,
    offRoadExperience: String,
    experienceLevel: String,
    confidenceIssues: String,
  },
  trainingState: { type: String, required: true },
  trainingDate: { type: String, required: true },
  nonRidingPartner: {
    hasPartner: String,
    partnerName: String,
  },
  bikeDetails: {
    bikeChoice: String,
    bikeMake: String,
    bikeModel: String,
    bikeYear: String,
    bikeHire: String,
    hireBike: String,
    addOns: [String],
  },
  licenseDetails: {
    licenseValid: String,
    licenseNumber: String,
    licenseState: String,
  },
  tyreOrders: {
    requiresTyres: String,
    frontTyre: { width: String, height: String, rim: String },
    rearTyre: { width: String, height: String, rim: String },
    preferredBrand: String,
    secondBrand: String,
    wheelType: String,
    tyreManagement: String,
  },
  payment: {
    paymentOption: String,
    giftVoucher: String,
    totalPayment: Number,
    paymentStatus: { type: String, default: 'Pending' },
  },
  terms: {
    termsAgreed: Boolean,
    termsConfirmation: String,
  },
}, { timestamps: true });

// Export with correct name
const MDPPhase2Registration = mongoose.model('MDPPhase2Registration', mdpPhase2RegistrationSchema);

export default MDPPhase2Registration;
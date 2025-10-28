import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, CreditCard, Star, AlertTriangle, Shield, Bike, CheckCircle, XCircle } from 'lucide-react';

const MDPPhase2RegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Phase 1 Completion
    completedPhase1: '',
    phase1Confirmation: '',
    
    // Personal Details
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    confirmEmail: '',
    birthday: { day: '', month: '', year: '' },
    occupation: '',
    mobile: '',
    landline: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    postCode: '',
    phonePlatform: '',
    phoneModel: '',
    hasGPS: '',
    hasFacebook: '',
    hasPhoneMount: '',
    canChargePhone: '',
    
    // Emergency Contacts
    emergency1: { firstName: '', lastName: '', email: '', mobile: '', landline: '', relationship: '' },
    emergency2: { firstName: '', lastName: '', email: '', mobile: '', landline: '', relationship: '' },
    shirtSize: '',
    
    // Medical Information
    medicalCondition: '',
    medicalDescription: '',
    medications: '',
    regularMedication: '',
    medicationDetails: '',
    medicationAllergies: '',
    medicationAllergyDetails: '',
    foodAllergies: '',
    foodAllergyDetails: '',
    dietaryRequirements: '',
    medicareNumber: '',
    medicarePosition: '',
    
    // Experience
    previousTraining: '',
    recentTraining: '',
    trainingDetails: '',
    offRoadExperience: '',
    experienceLevel: '',
    confidenceIssues: '',
    
    // Training Date
    trainingState: 'HUNTER VALLEY NSW 2322',
    trainingDate: 'OCTOBER 24th + 25th + 26th Phase II Hunter Valley NSW 2322',
    
    // Accommodation
    accommodationPreference: '',
    groupMembers: '',
    
    // Non-riding Partner
    hasPartner: '',
    partnerName: '',
    partnerMealPackage: '',
    
    // Bike Details
    bikeChoice: '',
    bikeMake: '',
    bikeModel: '',
    bikeYear: '',
    bikeHire: '',
    hireBike: '',
    addOns: [],
    
    // License Details
    licenseValid: '',
    licenseNumber: '',
    licenseExpiry: { day: '', month: '', year: '' },
    licenseState: '',
    
    // Tyre Orders
    requiresTyres: '',
    frontTyre: { width: '', height: '', rim: '' },
    rearTyre: { width: '', height: '', rim: '' },
    preferredBrand: '',
    secondBrand: '',
    wheelType: '',
    tyreManagement: '',
    
    // Payment
    paymentOption: '',
    giftVoucher: '',
    termsAgreement: '',
    termsConfirmation: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.completedPhase1) newErrors.completedPhase1 = 'This field is required';
        break;
      case 2:
        if (!formData.phase1Confirmation) newErrors.phase1Confirmation = 'This field is required';
        break;
      // Add more validation steps as needed
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        // After Step 2 (confirmation), redirect to main registration page and seed phase=2
        navigate('/registration?phase=2');
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep1 = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <img 
            src="https://www.mototrekkin.com.au/wp-content/uploads/Adventure-Rider-MDP-Logo-04-500x500.png" 
            alt="MDP Logo" 
            className="w-32 h-32 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">REGISTRATION FORM MDP PHASE II</h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '12%'}}></div>
          </div>
          <p className="text-sm text-gray-600">Step 1 of 8 - 12%</p>
        </div>

        {/* Maintenance notice removed */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">READ THE FOLLOWING BEFORE YOU START</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">THIS IS THE MASTERCLASS ADVENTURE RIDER DEVELOPMENT PROGRAM REGISTRATION PAGE - THIS IS NOT THE PAGE TO REQUEST COURSE INFORMATION.</h3>
            <p className="text-red-700">To request information about this event <a href="#" className="underline font-bold">CLICK HERE</a></p>
          </div>

          {/* PDF viewer moved to RegistrationPage final step */}

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">BEFORE MAKING PAYMENT</h4>
              <p className="text-gray-700 mb-2">Please be aware that any deposit or other amount transmitted during or after the online registration is a non-refundable payment. If you're unable to make it to the course you have booked, let us know as early as possible. We will permit a change of date without a forfeit of your payment. Full details of our cancellation policy are included within the event terms and conditions, which will be presented to you as part of the registration process. Please read the event terms and conditions when presented to you during registration. There is also an option have the Terms and Conditions emailed to you.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">PREPARE BEFORE YOU BEGIN</h4>
              <p className="text-gray-700 mb-2">As part of the event registration process, you will need the following information. We recommend you have this information available before clicking next below and commencing your registration.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Personal health and next of kin details</li>
                <li>Health fund name and membership number, Medicare number and position on your card</li>
                <li>Details of ambulance cover if separate to health fund</li>
                <li>The expiry date of your licence and motorcycle registration</li>
                <li>Your Motorcycle tyre sizes (don't guess - must be accurate)</li>
                <li>Fuel capacity and range of your motorcycle</li>
                <li>A Visa or MasterCard to complete your payment</li>
              </ul>
              <p className="text-gray-700 mt-2 font-bold">The minimum deposit is 499 plus bank merchant fees</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">DON'T LEAVE BLANK SPACES ANYWHERE ON THE REGISTRATION FORMS</h4>
              <p className="text-gray-700">The information fields on the following pages need to be completed correctly, otherwise, you will receive processing errors, or the payment gateway will not appear. If this happens to you, go back and check you haven't missed a field or inadvertently entered any information in the incorrect format. If you have technical difficulties, our phone number is at the bottom of each information page. You can call us anytime – even after hours if you're having any technical issues.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">DECLINED PAYMENTS</h4>
              <p className="text-gray-700">Please ensure you have the available funds on your card before you commence. The webpage could present errors if your payment is declined which may result in your having to re-enter all your information.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">WHY WE REQUIRE THIS INFORMATION</h4>
              <p className="text-gray-700 mb-2">To meet our duty of care, insurance requirements and to ensure your safety during this event, we are obligated to obtain specific personal health and other information from you.</p>
              <p className="text-gray-700 mb-2">If you have an accident or suffer a health episode of any kind while attending the event, our first aid trained staff need to be aware of any medications, allergies or health conditions you have. It could be critical to your care if needed.</p>
              <p className="text-gray-700 mb-2">All the information you provide to us is kept in the strictest confidence and is only accessed by senior management with a valid reason or by medical staff.</p>
              <p className="text-gray-700 font-bold">If you do not provide this information you will not be able to complete your registration for this event.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">YOUR SAFETY</h4>
              <p className="text-gray-700">We need to be sure you have the required riding experience, appropriate riding and safety equipment, the physical capacity and endurance, along with the mental toughness required to enjoy this program. Please answer all of the questions honestly with zero ego involved.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Have you completed Phase 1? <span className="text-red-500">(Required)</span></h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="completedPhase1"
                value="Yes"
                checked={formData.completedPhase1 === 'Yes'}
                onChange={(e) => handleInputChange('completedPhase1', e.target.value)}
                className="mr-2"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="completedPhase1"
                value="No"
                checked={formData.completedPhase1 === 'No'}
                onChange={(e) => handleInputChange('completedPhase1', e.target.value)}
                className="mr-2"
              />
              <span>No</span>
            </label>
          </div>
          {formData.completedPhase1 === 'No' && (
            <p className="text-red-600 mt-2">You need to complete the Phase 1 program before you proceed to Phase 2.</p>
          )}
          {errors.completedPhase1 && <p className="text-red-500 text-sm mt-1">{errors.completedPhase1}</p>}
        </div>


        <div className="flex justify-between">
          <Link to="/off-road-training-detail" className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training
          </Link>
          {formData.completedPhase1 === 'Yes' && (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Information</h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '25%'}}></div>
          </div>
          <p className="text-sm text-gray-600">Step 2 of 8 - 25%</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">IMPORTANT</h3>
          <h4 className="text-lg font-bold text-red-800 mb-2">BEFORE YOU REGISTER FOR THIS COURSE</h4>
          <p className="text-red-700 mb-4">This course is Phase II of our Masterclass Development Program. To successfully register for Phase II, you must have completed Phase I and received your Phase I competency certificate. If you have not completed Phase I, please DO NOT continue with your registration for this course.</p>
          
          <p className="text-red-700 mb-4">Our Masterclass Development Program is a comprehensive, competency-based off-road training program conducted over seven full days, divided into three separate weekends. Participants who successfully complete all three phases of the program receive recognition in the following ways:</p>
          
          <ul className="list-disc list-inside text-red-700 space-y-1 mb-4">
            <li>Exclusive T-shirt and cap</li>
            <li>MDP Gold Jacket pin</li>
            <li>Inclusion on the Moto Trekkin ADV Legends website</li>
            <li>Personalised MDP Trophy</li>
            <li>Completion certificate</li>
          </ul>

          <div className="bg-white border border-red-300 rounded p-4">
            <h5 className="font-bold text-red-800 mb-2">CONFIRMATION <span className="text-red-500">(Required)</span></h5>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.phase1Confirmation === 'Yes'}
                onChange={(e) => handleInputChange('phase1Confirmation', e.target.checked ? 'Yes' : '')}
                className="mr-2"
              />
              <span className="text-red-700">Yes, I have completed Phase I of the program and have received my completion certificate.</span>
            </label>
            {errors.phase1Confirmation && <p className="text-red-500 text-sm mt-1">{errors.phase1Confirmation}</p>}
          </div>
        </div>


        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          {formData.phase1Confirmation === 'Yes' && (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Step 3 removed. After Step 2 we redirect to the main registration form.

  return (
    <div className="min-h-screen bg-gray-100">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {/* Step 3 removed */}
      {/* Add more steps as needed */}
    </div>
  );
};

export default MDPPhase2RegistrationPage;

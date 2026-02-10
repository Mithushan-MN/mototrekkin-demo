import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axiosConfig';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft } from 'lucide-react';
import { useUserAutoFill } from "../../../hooks/useUserAutoFill";
import { USER_FIELDS } from "../../../constants/userFields";
import Step3PersonalDetails from './steps/P1Step1PersonalDetails';
import Step4EmergencyContacts from './steps/P1Step2EmergencyContacts';
import Step5MedicalInfo from './steps/P1Step3MedicalInfo';
import Step6Experience from './steps/P1Step4Experience';
import Step7TrainingDate from './steps/P1Step5TrainingDate';
import Step8BikeDetails from './steps/P1Step6BikeDetails';

const stripePromise = loadStripe('pk_live_6C7fzU00LNNJoD74Cg1AjFeH00bxXpAZGj');

const TOTAL_STEPS = 7;

const MDPPhase1Registration = () => {
  const { formRef } = useUserAutoFill(USER_FIELDS);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const autofillDataRef = useRef({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    confirmEmail: '',
    birthday: '',
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
    emergency1: { firstName: '', lastName: '', email: '', mobile: '', landline: '', relationship: '' },
    emergency2: { firstName: '', lastName: '', email: '', mobile: '', landline: '', relationship: '' },
    shirtSize: '',
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
    previousTraining: '',
    recentTraining: '',
    trainingDetails: '',
    offRoadExperience: '',
    experienceLevel: '',
    confidenceIssues: '',
    trainingState: 'HUNTER VALLEY NSW 2322',
    trainingDate: 'MARCH 28th + 29th Phase I Hunter Valley NSW 2322',
    hasPartner: '',
    partnerName: '',
    partnerMealPackage: '',
    bikeChoice: '',
    bikeMake: '',
    bikeModel: '',
    bikeYear: '',
    bikeHire: '',
    hireBike: '',
    addOns: [],
    licenseValid: '',
    licenseNumber: '',
    licenseState: '',
    requiresTyres: '',
    frontTyre: { width: '', height: '', rim: '' },
    rearTyre: { width: '', height: '', rim: '' },
    preferredBrand: '',
    secondBrand: '',
    wheelType: '',
    tyreManagement: '',
    paymentOption: '',
    giftVoucher: '',
    termsAgreed: false,
    termsConfirmation: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) { setFetchingProfile(false); return; }
      try {
        const userId = JSON.parse(atob(token.split('.')[1])).id;
        const response = await axios.get(`/userProfile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profile = response.data || {};
        setFormData(prev => ({
          ...prev,
          firstName: profile.firstName || prev.firstName || '',
          lastName: profile.lastName || prev.lastName || '',
          gender: profile.gender || prev.gender || '',
          email: profile.email || prev.email || '',
          confirmEmail: profile.confirmEmail || profile.email || prev.confirmEmail || '',
          birthday: profile.birthday || prev.birthday || '',
          occupation: profile.occupation || prev.occupation || '',
          mobile: profile.mobile || prev.mobile || '',
          landline: profile.landline || prev.landline || '',
          address: profile.streetAddress || prev.address || '',
          address2: profile.streetAddress2 || prev.address2 || '',
          city: profile.city || prev.city || '',
          state: profile.state || prev.state || '',
          postCode: profile.postCode || prev.postCode || '',
          emergency1: {
            firstName: profile.emergencyFirstName || prev.emergency1.firstName || '',
            lastName: profile.emergencyLastName || prev.emergency1.lastName || '',
            email: profile.emergencyEmail || prev.emergency1.email || '',
            mobile: profile.emergencyMobile || prev.emergency1.mobile || '',
            landline: profile.emergencyLandline || prev.emergency1.landline || '',
            relationship: profile.emergencyRelation || prev.emergency1.relationship || '',
          },
          emergency2: prev.emergency2,
          shirtSize: prev.shirtSize,
          medicalCondition: profile.medicalInfo?.medicalCondition || prev.medicalCondition || '',
          medications: profile.medicalInfo?.medications || prev.medications || '',
          medicationAllergies: profile.medicalInfo?.medicationAllergies || prev.medicationAllergies || '',
          foodAllergies: profile.medicalInfo?.foodAllergies || prev.foodAllergies || '',
          dietaryRequirements: profile.medicalInfo?.dietaryRequirements || prev.dietaryRequirements || '',
          medicareNumber: profile.medicalInfo?.medicareNumber || prev.medicareNumber || '',
          medicarePosition: profile.medicalInfo?.medicarePosition || prev.medicarePosition || '',
          licenseNumber: profile.licenceNumber || prev.licenseNumber || '',
          licenseState: profile.licenceState || prev.licenseState || '',
          licenseValid: prev.licenseValid,
        }));
        autofillDataRef.current = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          gender: profile.gender,
          email: profile.email,
          birthday: profile.birthday,
          occupation: profile.occupation,
          mobile: profile.mobile,
          landline: profile.landline,
          address: profile.streetAddress,
          address2: profile.streetAddress2,
          city: profile.city,
          state: profile.state,
          postCode: profile.postCode,
          emergency1: {
            firstName: profile.emergencyFirstName,
            lastName: profile.emergencyLastName,
            email: profile.emergencyEmail,
            mobile: profile.emergencyMobile,
            landline: profile.emergencyLandline,
            relationship: profile.emergencyRelation,
          },
          medicalCondition: profile.medicalInfo?.medicalCondition,
          medications: profile.medicalInfo?.medications,
          medicationAllergies: profile.medicalInfo?.medicationAllergies,
          foodAllergies: profile.medicalInfo?.foodAllergies,
          dietaryRequirements: profile.medicalInfo?.dietaryRequirements,
          medicareNumber: profile.medicalInfo?.medicareNumber,
          medicarePosition: profile.medicalInfo?.medicarePosition,
          licenseNumber: profile.licenceNumber,
          licenseState: profile.licenceState,
        };
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setFetchingProfile(false);
      }
    };
    fetchUserProfile();
  }, []);

  const saveField = async (field, value) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      await axios.patch(`/userProfile/${userId}`, { [field]: value });
    } catch (err) {
      console.warn("Auto-save failed:", field);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    autofillDataRef.current[field] = value;
    saveField(field, value);
  };

  const handleNestedInputChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: { ...prev[parentField], [childField]: value }
    }));
    if (!autofillDataRef.current[parentField]) autofillDataRef.current[parentField] = {};
    autofillDataRef.current[parentField][childField] = value;
    saveField(`${parentField}.${childField}`, value);
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 7) {
      if (!formData.termsAgreed) newErrors.termsAgreed = 'You must agree';
      if (formData.termsConfirmation !== 'I AGREE') newErrors.termsConfirmation = 'Type "I AGREE"';
      if (!formData.paymentOption) newErrors.paymentOption = 'Select payment option';
      if (!formData.bikeChoice) newErrors.bikeChoice = 'Please select whether to use your own bike or hire';
      if (formData.bikeChoice === 'own') {
        if (!formData.bikeMake) newErrors.bikeMake = 'Bike make is required';
        if (!formData.bikeModel) newErrors.bikeModel = 'Bike model is required';
        if (!formData.bikeYear) newErrors.bikeYear = 'Bike year is required';
      }
      if (formData.bikeChoice === 'hire' && !formData.hireBike) {
        newErrors.hireBike = 'Please select a bike to hire';
      }
      if (!formData.bikeHire) newErrors.bikeHire = 'Please indicate if you need to hire a bike';
      if (!formData.licenseValid) newErrors.licenseValid = 'Please indicate if your license is valid';
      if (formData.licenseValid === 'No') newErrors.licenseValid = 'A valid license is required to register';
      if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
      if (!formData.licenseState) newErrors.licenseState = 'State of issue is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 || validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const calculateTotalPayment = () => {
    const HIRE_DAYS = 3;
    const TRAINING_FEE = 1190;
    const PARTNER_FEE = 149;
    const ADD_ON_RATES = {
      excessReduction: 15,
      tyreProtection: 15,
      touringWindscreen: 5,
      panniers: 15,
    };
    const bikeHireTotal = formData.hireBike
      ? parseFloat(formData.hireBike.split('$')[1]?.replace('/day', '')) * HIRE_DAYS
      : 0;
    const addOnsTotal = formData.addOns?.reduce((sum, addon) => {
      return sum + (ADD_ON_RATES[addon] || 0) * HIRE_DAYS;
    }, 0) || 0;
    const subtotal = TRAINING_FEE +
      (formData.hasPartner === 'Yes' ? PARTNER_FEE : 0) +
      bikeHireTotal +
      addOnsTotal;
    const giftVoucherAmount = formData.giftVoucher && !isNaN(parseFloat(formData.giftVoucher))
      ? parseFloat(formData.giftVoucher)
      : 0;
    let baseAmount = formData.paymentOption === 'full' ? subtotal : 499;
    baseAmount = Math.max(0, baseAmount - giftVoucherAmount);
    const merchantFee = Math.round(baseAmount * 0.03 * 100) / 100;
    return baseAmount + merchantFee;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setLoading(true);
    setApiError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please log in.');
      const payload = {
        personalDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          confirmEmail: formData.confirmEmail,
          birthday: formData.birthday,
          occupation: formData.occupation,
          mobile: formData.mobile,
          landline: formData.landline,
          address: formData.address,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          postCode: formData.postCode,
          phonePlatform: formData.phonePlatform,
          phoneModel: formData.phoneModel,
          hasGPS: formData.hasGPS,
          hasFacebook: formData.hasFacebook,
          hasPhoneMount: formData.hasPhoneMount,
          canChargePhone: formData.canChargePhone,
        },
        emergencyContacts: {
          emergency1: formData.emergency1,
          emergency2: formData.emergency2,
          shirtSize: formData.shirtSize,
        },
        medicalInfo: {
          medicalCondition: formData.medicalCondition,
          medicalDescription: formData.medicalDescription,
          medications: formData.medications,
          regularMedication: formData.regularMedication,
          medicationDetails: formData.medicationDetails,
          medicationAllergies: formData.medicationAllergies,
          medicationAllergyDetails: formData.medicationAllergyDetails,
          foodAllergies: formData.foodAllergies,
          foodAllergyDetails: formData.foodAllergyDetails,
          dietaryRequirements: formData.dietaryRequirements,
          medicareNumber: formData.medicareNumber,
          medicarePosition: formData.medicarePosition,
        },
        experience: {
          previousTraining: formData.previousTraining,
          recentTraining: formData.recentTraining,
          trainingDetails: formData.trainingDetails,
          offRoadExperience: formData.offRoadExperience,
          experienceLevel: formData.experienceLevel,
          confidenceIssues: formData.confidenceIssues,
        },
        trainingState: formData.trainingState,
        trainingDate: formData.trainingDate,
        nonRidingPartner: {
          hasPartner: formData.hasPartner,
          partnerName: formData.partnerName,
          partnerMealPackage: formData.partnerMealPackage,
        },
        bikeDetails: {
          bikeChoice: formData.bikeChoice,
          bikeMake: formData.bikeMake,
          bikeModel: formData.bikeModel,
          bikeYear: formData.bikeYear,
          bikeHire: formData.bikeHire,
          hireBike: formData.hireBike,
          addOns: formData.addOns,
        },
        licenseDetails: {
          licenseValid: formData.licenseValid,
          licenseNumber: formData.licenseNumber,
          licenseState: formData.licenseState,
        },
        tyreOrders: {
          requiresTyres: formData.requiresTyres,
          frontTyre: formData.frontTyre,
          rearTyre: formData.rearTyre,
          preferredBrand: formData.preferredBrand,
          secondBrand: formData.secondBrand,
          wheelType: formData.wheelType,
          tyreManagement: formData.tyreManagement,
        },
        payment: {
          paymentOption: formData.paymentOption === 'full' ? 'Full Payment' : 'Deposit',
          giftVoucher: formData.giftVoucher || '',
          totalPayment: Number(calculateTotalPayment()) || 0,
        },
        terms: {
          termsAgreed: formData.termsAgreed,
          termsConfirmation: formData.termsConfirmation,
        },
      };
      const response = await axios.post('/mdpPhase1Registrations/create', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const { paymentSessionId } = response.data;
      if (paymentSessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: paymentSessionId });
        if (error) throw error;
      } else {
        alert('Registration successful!');
        navigate('/mdp-phase2/success');
      }
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        setApiError(errorData.errors.join(' | '));
      } else {
        setApiError(errorData?.message || err.message || 'Submission failed');
      }
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">REGISTRATION FORM MDP PHASE I</h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '14%'}}></div>
          </div>
          <p className="text-sm text-gray-600">Step 1 of 7 - Welcome & Important Information</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">READ THE FOLLOWING BEFORE YOU START</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">THIS IS THE MASTERCLASS ADVENTURE RIDER DEVELOPMENT PROGRAM REGISTRATION PAGE - THIS IS NOT THE PAGE TO REQUEST COURSE INFORMATION.</h3>
            <p className="text-red-700">To request information about this event <a href="#" className="underline font-bold">CLICK HERE</a></p>
          </div>
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
        <div className="flex justify-between">
          <Link to="/off-road-training-detail" className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training
          </Link>
          <button
            onClick={nextStep}
            disabled={fetchingProfile}
            className={`px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg ${fetchingProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {fetchingProfile ? 'Loading profile...' : 'Start Registration →'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (currentStep === 1) return renderStep1();
    const stepComponents = [
      null,
      Step3PersonalDetails,
      Step4EmergencyContacts,
      Step5MedicalInfo,
      Step6Experience,
      Step7TrainingDate,
      Step8BikeDetails,
    ];
    const CurrentStepComponent = stepComponents[currentStep - 1];
    if (!CurrentStepComponent) return <div>Step {currentStep} not found</div>;
    return (
      <CurrentStepComponent
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        onNestedInputChange={handleNestedInputChange}
        onNext={nextStep}
        onPrev={prevStep}
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        navigate={navigate}
        formRef={formRef}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {apiError && <p className="text-red-500 text-center p-4 bg-red-50">{apiError}</p>}
      {loading && <p className="text-blue-500 text-center">Processing...</p>}
      {fetchingProfile && <p className="text-blue-500 text-center">Loading your saved profile...</p>}
      {renderCurrentStep()}
      <h2 className="text-center mt-12 mb-8 text-gray-700 text-lg font-semibold tracking-wide">
        Technical difficulties?{" "}
        <span className="text-green-600 font-bold hover:text-green-700 transition-colors duration-200">
          Call us now 02 4072 4511
        </span>
      </h2>
    </div>
  );
};

export default MDPPhase1Registration;
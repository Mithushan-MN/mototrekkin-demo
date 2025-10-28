import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, CreditCard, Star, AlertTriangle, Shield, Bike } from 'lucide-react';
import imgCrf250 from '../../assets/bikes/HONDA CRF250 RALLY.jpg';
import imgBmw310 from '../../assets/bikes/BMW 310 GS.jpg';
import imgCb500x from '../../assets/bikes/HONDA CB500X.jpg';

const RegistrationPage = () => {
  const location = useLocation();
  // Detect phase from query string if present
  const queryParams = new URLSearchParams(location.search);
  const queryPhase = queryParams.get('phase');
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'experience', 'comprehensive', 'detailed', 'tyre', 'final', 'maintenance'
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
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
    // Removed secondary emergency contact
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
    
    // New Experience Fields
    attendedTraining: '',
    recentTrainingSixMonths: '',
    offRoadExperienceDescription: '',
    ridingExperienceLevel: '',
    confidenceConcerns: '',
    
    // Training Date
    completedPhase1: '',
    completedPhase2: '',
    completedBothPhases: '',
    partnerMealPackage: '',
    groupRiding: '',
    
    // Final Step - Terms and Payment
    termsAgreed: false,
    termsConfirmation: '',
    paymentOption: '',
    giftVoucher: '',
    termsText: '',
    
    // Comprehensive Form Fields (final values)
    trainingDate: (queryPhase === '2')
      ? 'OCTOBER 24th + 25th + 26th Phase II Hunter Valley NSW 2322'
      : 'NOVEMBER 28th + 29th + 30th Phase III HUNTER VALLEY NSW 2322',
    trainingState: 'HUNTER VALLEY NSW 2322',
    phase: queryPhase === '2' ? '2' : '3',
    groupMembers: '',
    hasPartner: '',
    partnerName: '',
    accommodationPreference: '',
    bikeChoice: '',
    bikeMake: '',
    bikeModel: '',
    bikeYear: '',
    bikeHire: '',
    hireBike: '',
    addOns: [],
    licenseValid: '',
    licenseNumber: '',
    licenseExpiry: { day: '', month: '', year: '' },
    licenseState: '',
    requiresTyres: '',
    frontTyre: { width: '', height: '', rim: '' },
    rearTyre: { width: '', height: '', rim: '' },
    preferredBrand: '',
    secondBrand: '',
    wheelType: '',
    tyreManagement: ''
  });

  // Pricing constants and helpers
  const TRAINING_FEE_PHASE2 = 990;
  const TRAINING_FEE_PHASE3 = 1190;
  const PARTNER_FEE = 149;
  const NON_REFUNDABLE_DEPOSIT = 499; // Default for Phase 2
  const NON_REFUNDABLE_DEPOSIT_PHASE3 = 729; // Phase 3 specific deposit
  const HIRE_DAYS = 2; // shown in UI
  const MERCHANT_FEE_FULL = 16.83; // Default for Phase 2
  const MERCHANT_FEE_FULL_PHASE3 = 28.05; // Phase 3 specific full payment fee
  const MERCHANT_FEE_DEPOSIT = 8.48; // Default for Phase 2
  const MERCHANT_FEE_DEPOSIT_PHASE3 = 12.39; // Phase 3 specific deposit fee

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  const getBikeDailyRate = () => {
    if (!formData.hireBike) return 0;
    const match = formData.hireBike.match(/\$([0-9]+)\/day/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const ADD_ON_RATES = {
    excessReduction: 15,
    tyreProtection: 15,
    touringWindscreen: 5,
    panniers: 15
  };

  const ADD_ON_LABELS = {
    excessReduction: 'Excess Reduction',
    tyreProtection: 'Tyre Protection',
    touringWindscreen: 'Touring Windscreen (Tall)',
    panniers: 'Panniers'
  };

  const getAddOnsDailyRate = () => {
    if (!Array.isArray(formData.addOns)) return 0;
    return formData.addOns.reduce((sum, key) => sum + (ADD_ON_RATES[key] || 0), 0);
  };

  const bikeHireTotal = getBikeDailyRate() * HIRE_DAYS;
  const addOnsTotal = getAddOnsDailyRate() * HIRE_DAYS;
  const partnerFee = formData.hasPartner === 'Yes' ? PARTNER_FEE : 0;
  const trainingFee = formData.phase === '2' ? TRAINING_FEE_PHASE2 : TRAINING_FEE_PHASE3;
  const subtotal = trainingFee + partnerFee + bikeHireTotal + addOnsTotal;
  
  // Use Phase 3 specific fees when phase is 3
  const isPhase3 = formData.phase === '3';
  const currentDeposit = isPhase3 ? NON_REFUNDABLE_DEPOSIT_PHASE3 : NON_REFUNDABLE_DEPOSIT;
  const currentMerchantFeeFull = isPhase3 ? MERCHANT_FEE_FULL_PHASE3 : MERCHANT_FEE_FULL;
  const currentMerchantFeeDeposit = isPhase3 ? MERCHANT_FEE_DEPOSIT_PHASE3 : MERCHANT_FEE_DEPOSIT;
  
  const fullPaymentTotal = subtotal + currentMerchantFeeFull;
  const depositPaymentTotal = currentDeposit + currentMerchantFeeDeposit;

  // Bike image mapping and helpers for inline preview
  const BIKE_IMAGES = {
    'HONDA CRF250 RALLY': imgCrf250,
    'BMW 310 GS': imgBmw310,
    'HONDA CB500X': imgCb500x,
  };

  const getSelectedBikeInfo = () => {
    if (!formData.hireBike) return null;
    const name = formData.hireBike.split(' - ')[0];
    return { name, src: BIKE_IMAGES[name] };
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};
    
    // Personal Details Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'This field is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'This field is required.';
    if (!formData.gender) newErrors.gender = 'This field is required.';
    if (!formData.email.trim()) newErrors.email = 'This field is required.';
    if (!formData.confirmEmail.trim()) newErrors.confirmEmail = 'This field is required.';
    if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match.';
    if (!formData.mobile.trim()) newErrors.mobile = 'This field is required.';
    if (!formData.birthday.day) newErrors['birthday.day'] = 'This field is required.';
    if (!formData.birthday.month) newErrors['birthday.month'] = 'This field is required.';
    if (!formData.birthday.year) newErrors['birthday.year'] = 'This field is required.';
    if (!formData.occupation.trim()) newErrors.occupation = 'This field is required.';
    if (!formData.address.trim()) newErrors.address = 'This field is required.';
    if (!formData.city.trim()) newErrors.city = 'This field is required.';
    if (!formData.state) newErrors.state = 'This field is required.';
    if (!formData.postCode.trim()) newErrors.postCode = 'This field is required.';
    if (!formData.phonePlatform) newErrors.phonePlatform = 'This field is required.';
    if (!formData.phoneModel.trim()) newErrors.phoneModel = 'This field is required.';
    if (!formData.hasGPS) newErrors.hasGPS = 'This field is required.';
    if (!formData.hasFacebook) newErrors.hasFacebook = 'This field is required.';
    if (!formData.hasPhoneMount) newErrors.hasPhoneMount = 'This field is required.';
    if (!formData.canChargePhone) newErrors.canChargePhone = 'This field is required.';
    
    // Emergency Contacts Validation
    if (!formData.emergency1.firstName.trim()) newErrors['emergency1.firstName'] = 'This field is required.';
    if (!formData.emergency1.lastName.trim()) newErrors['emergency1.lastName'] = 'This field is required.';
    if (!formData.emergency1.email.trim()) newErrors['emergency1.email'] = 'This field is required.';
    if (!formData.emergency1.mobile.trim()) newErrors['emergency1.mobile'] = 'This field is required.';
    if (!formData.emergency1.relationship.trim()) newErrors['emergency1.relationship'] = 'This field is required.';
    // Secondary emergency contact removed
    if (!formData.shirtSize) newErrors.shirtSize = 'This field is required.';
    
    // Medical Information Validation
    if (!formData.regularMedication) newErrors.regularMedication = 'This field is required.';
    if (!formData.medicationAllergies) newErrors.medicationAllergies = 'This field is required.';
    if (!formData.foodAllergies) newErrors.foodAllergies = 'This field is required.';
    if (!formData.dietaryRequirements.trim()) newErrors.dietaryRequirements = 'This field is required.';
    
    // Conditional validation for medication allergy details
    if (formData.medicationAllergies === 'yes' && !formData.medicationAllergyDetails.trim()) {
      newErrors.medicationAllergyDetails = 'This field is required.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateComprehensiveForm = () => {
    const newErrors = {};

    // Training Date validation
    if (!formData.trainingDate) {
      newErrors.trainingDate = 'This field needs to be filled';
    }

    // Group Riding validation
    if (!formData.groupRiding) {
      newErrors.groupRiding = 'This field needs to be filled';
    }

    // Group Members validation (only if group riding is Yes)
    if (formData.groupRiding === 'Yes' && !formData.groupMembers.trim()) {
      newErrors.groupMembers = 'This field needs to be filled';
    }

    // Partner validation
    if (!formData.hasPartner) {
      newErrors.hasPartner = 'This field needs to be filled';
    }

    // Partner Name validation (only if partner is Yes)
    if (formData.hasPartner === 'Yes' && !formData.partnerName.trim()) {
      newErrors.partnerName = 'This field needs to be filled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setErrors({});
    
    if (!validateForm()) {
      // Find the first field with an error and scroll to it
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (fieldElement) {
          fieldElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          // Focus the field after scrolling
          setTimeout(() => {
            fieldElement.focus();
          }, 500);
        }
      }
      return;
    }
    
    // If validation passes, go to experience page
    setCurrentStep('experience');
    // Scroll to top after successful submission
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderField = (name, label, type = 'text', options = {}, required = false) => {
    const hasError = errors[name];
    const value = name.includes('.') ? formData[name.split('.')[0]][name.split('.')[1]] : formData[name];
    
    return (
      <div className={hasError ? 'ring-2 ring-red-200 rounded-xl p-3 bg-red-50/50' : ''}>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <option value="">{options.placeholder || 'Select...'}</option>
            {options.options?.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange}
            rows={options.rows || 3}
            required={required}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white resize-none ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder={options.placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder={options.placeholder}
          />
        )}
        {hasError && (
          <p className="text-red-600 text-sm mt-2 flex items-center font-medium">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const renderRadioGroup = (name, label, options, required = false) => {
    const hasError = errors[name];
    
    return (
      <div className={hasError ? 'ring-2 ring-red-200 rounded-xl p-4 bg-red-50/50' : 'p-2'}>
        <label className="block text-sm font-semibold text-gray-800 mb-4">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex flex-wrap gap-6">
          {options.map(option => (
            <label key={option.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={formData[name] === option.value}
                onChange={handleInputChange}
                required={required}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">{option.label}</span>
            </label>
          ))}
        </div>
        {hasError && (
          <p className="text-red-600 text-sm mt-3 flex items-center font-medium">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const renderExperiencePage = () => (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">EXPERIENCE</h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full" style={{width: '42%'}}></div>
        </div>
        <p className="text-sm text-gray-600">Step 3 of 7 - 42%</p>
      </div>

      {/* Experience Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={(e) => {
          e.preventDefault();
          setCurrentStep('comprehensive');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <div className="space-y-8">
            {/* Question 1: Professional Training */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Have you ever attended a professional off road motorcycle training course? <span className="text-red-500">(Required)</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendedTraining"
                    value="Yes"
                    checked={formData.attendedTraining === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendedTraining"
                    value="No"
                    checked={formData.attendedTraining === 'No'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">No</span>
                </label>
              </div>

              {/* Follow-up Question: Recent Training */}
              {formData.attendedTraining === 'Yes' && (
                <div className="mt-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    If yes, was your training course completed in the last 6 months? <span className="text-red-500">(Required)</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recentTrainingSixMonths"
                        value="Yes"
                        checked={formData.recentTrainingSixMonths === 'Yes'}
                        onChange={handleInputChange}
                        className="mr-3 w-5 h-5"
                      />
                      <span className="text-lg">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recentTrainingSixMonths"
                        value="No"
                        checked={formData.recentTrainingSixMonths === 'No'}
                        onChange={handleInputChange}
                        className="mr-3 w-5 h-5"
                      />
                      <span className="text-lg">No</span>
                    </label>
                  </div>

                  {/* Training Details Text Area */}
                  {formData.recentTrainingSixMonths === 'Yes' && (
                    <div className="mt-6">
                      <label className="block text-lg font-semibold text-gray-800 mb-4">
                        Please detail course content such as advanced sand course etc. <span className="text-red-500">(Required)</span>
                      </label>
                      <textarea
                        name="trainingDetails"
                        value={formData.trainingDetails}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                        placeholder="Please describe the course content, such as advanced sand course, rocky terrain, river crossings, etc..."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Question 2: Off Road Experience */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Explain how much off road experience you have. It's okay if you don't have a lot of experience but we need to know. <span className="text-red-500">(Required)</span>
              </label>
              <textarea
                name="offRoadExperienceDescription"
                value={formData.offRoadExperienceDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                placeholder="Please describe your off-road motorcycle experience..."
              />
            </div>

            {/* Question 3: Riding Experience Level */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Overall, how would you personally rate your off road riding experience. <span className="text-red-500">(Required)</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ridingExperienceLevel"
                    value="Beginner"
                    checked={formData.ridingExperienceLevel === 'Beginner'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Beginner</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ridingExperienceLevel"
                    value="Intermediate"
                    checked={formData.ridingExperienceLevel === 'Intermediate'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Intermediate</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ridingExperienceLevel"
                    value="Extreme"
                    checked={formData.ridingExperienceLevel === 'Extreme'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Extreme</span>
                </label>
              </div>
            </div>

            {/* Question 4: Confidence Concerns */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Is there anything you feel you are not confident with that could cause an issue for you on this adventure ride? <span className="text-red-500">(Required)</span>
              </label>
              <textarea
                name="confidenceConcerns"
                value={formData.confidenceConcerns}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                placeholder="Please describe any concerns or areas where you feel less confident..."
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => {
                setCurrentStep('form');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              PREVIOUS
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">NEXT</span>
              <Star className="w-5 h-5 ml-3" />
            </button>
          </div>
        </form>
      </div>
      
      {/* no modal, inline preview used */}
    </div>
  );

  const renderComprehensiveForm = () => (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Step 4 of 7</span>
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '57%'}}></div>
            </div>
          </div>
          <span className="text-sm text-gray-600">57%</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">TRAINING DATE</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={(e) => {
          e.preventDefault();
          
          // Clear any previous errors
          setErrors({});
          
          if (!validateComprehensiveForm()) {
            // Find the first field with an error and scroll to it
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
              const element = document.getElementById(firstErrorField);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
              }
            }
            return;
          }
          
          setCurrentStep('detailed');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          
          {/* Training Date Section */}
          <div className="mb-8">
            <label htmlFor="trainingDate" className="block text-lg font-semibold text-gray-800 mb-4">
              Choose which training date that you want to attend. <span className="text-red-500">(Required)</span>
            </label>
            {formData.phase === '2' ? (
              <input
                type="text"
                id="trainingDate"
                name="trainingDate"
                value={formData.trainingDate}
                readOnly
                className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-lg ${
                  errors.trainingDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            ) : (
              <select
                id="trainingDate"
                name="trainingDate"
                value={formData.trainingDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg ${
                  errors.trainingDate ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">CHOOSE A DATE</option>
                <option value="NOVEMBER 28th + 29th + 30th Phase III HUNTER VALLEY NSW 2322">NOVEMBER 28th + 29th + 30th Phase III HUNTER VALLEY NSW 2322</option>
              </select>
            )}
            {errors.trainingDate && (
              <p className="text-red-500 text-sm mt-2">{errors.trainingDate}</p>
            )}
          </div>

          {/* Hotel Details Section */}
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              We recommend booking your stay at the Molly Morgan Motor Inn for the night of the course, as it's conveniently located near the training venue.
            </p>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Hotel Details:</h3>
              <p className="text-gray-700">Molly Morgan Motor Inn</p>
              <p className="text-gray-700">329 New England Highway, East Maitland NSW 2323</p>
              <p className="text-gray-700">Phone: +61 2 4933 5422</p>
            </div>
          </div>

          {/* Riding with a Group Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">RIDING WITH A GROUP</h2>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Are you planning to ride this event with a mate or several friends? i.e a group <span className="text-red-500">(Required)</span>
            </label>
            <div className="flex space-x-6">
              <label htmlFor="groupRiding-yes" className="flex items-center">
                <input
                  type="radio"
                  id="groupRiding-yes"
                  name="groupRiding"
                  value="Yes"
                  checked={formData.groupRiding === 'Yes'}
                  onChange={handleInputChange}
                  className="mr-3 w-5 h-5"
                />
                <span className="text-lg">Yes</span>
              </label>
              <label htmlFor="groupRiding-no" className="flex items-center">
                <input
                  type="radio"
                  id="groupRiding-no"
                  name="groupRiding"
                  value="No"
                  checked={formData.groupRiding === 'No'}
                  onChange={handleInputChange}
                  className="mr-3 w-5 h-5"
                />
                <span className="text-lg">No</span>
              </label>
            </div>
            {errors.groupRiding && (
              <p className="text-red-500 text-sm mt-2">{errors.groupRiding}</p>
            )}

            {/* Conditional Group Members Input */}
            {formData.groupRiding === 'Yes' && (
              <div className="mt-6">
                <label htmlFor="groupMembers" className="block text-lg font-bold text-gray-800 mb-4">
                  Enter the names of people you know are in your group <span className="text-red-500 italic">(Required)</span>
                </label>
                <textarea
                  id="groupMembers"
                  name="groupMembers"
                  value={formData.groupMembers}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none shadow-sm ${
                    errors.groupMembers ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter the names of your group members..."
                />
                {errors.groupMembers && (
                  <p className="text-red-500 text-sm mt-2">{errors.groupMembers}</p>
                )}
              </div>
            )}
          </div>

          {/* Non-riding Partner Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">NON-RIDING PARTNER</h2>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Do you wish to register a non-riding partner? <span className="text-red-500">(Required)</span>
            </label>
            <div className="flex space-x-6">
              <label htmlFor="hasPartner-yes" className="flex items-center">
                <input
                  type="radio"
                  id="hasPartner-yes"
                  name="hasPartner"
                  value="Yes"
                  checked={formData.hasPartner === 'Yes'}
                  onChange={handleInputChange}
                  className="mr-3 w-5 h-5"
                />
                <span className="text-lg">Yes</span>
              </label>
              <label htmlFor="hasPartner-no" className="flex items-center">
                <input
                  type="radio"
                  id="hasPartner-no"
                  name="hasPartner"
                  value="No"
                  checked={formData.hasPartner === 'No'}
                  onChange={handleInputChange}
                  className="mr-3 w-5 h-5"
                />
                <span className="text-lg">No</span>
              </label>
            </div>
            {errors.hasPartner && (
              <p className="text-red-500 text-sm mt-2">{errors.hasPartner}</p>
            )}

            {/* Conditional Partner Name Input */}
            {formData.hasPartner === 'Yes' && (
              <div className="mt-6">
                <label htmlFor="partnerName" className="block text-lg font-bold text-gray-800 mb-4">
                  Your partner's name <span className="text-red-500">(Required)</span>
                </label>
                <input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm ${
                    errors.partnerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your partner's name"
                />
                {errors.partnerName && (
                  <p className="text-red-500 text-sm mt-2">{errors.partnerName}</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => {
                setCurrentStep('experience');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              PREVIOUS
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">NEXT</span>
              <Star className="w-5 h-5 ml-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDetailedForm = () => (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <img 
          src="https://www.mototrekkin.com.au/wp-content/uploads/Adventure-Rider-MDP-Logo-04-500x500.png" 
          alt="MDP Logo" 
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">REGISTRATION FORM MDP PHASE II</h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full" style={{width: '71%'}}></div>
        </div>
        <p className="text-sm text-gray-600">Step 5 of 7 - 71%</p>
      </div>

      {/* Maintenance Notice removed */}

      {/* Detailed Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={(e) => {
          e.preventDefault();
          setCurrentStep('tyre');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          

          {/* Training Date Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Date</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="trainingState" className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose which state you want to have your training. <span className="text-red-500">(Required)</span>
                </label>
                <select
                  id="trainingState"
                  name="trainingState"
                  value={formData.trainingState}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                  <option value="">CHOOSE A STATE</option>
                  <option value="HUNTER VALLEY NSW 2322">HUNTER VALLEY NSW 2322</option>
                </select>
              </div>
              <div>
                <label htmlFor="trainingDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Choose which training date that you want to attend. <span className="text-red-500">(Required)</span>
                </label>
                {formData.phase === '2' ? (
                  <input
                    type="text"
                    id="trainingDate"
                    name="trainingDate"
                    value={formData.trainingDate}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-800"
                  />
                ) : (
                  <select
                    id="trainingDate"
                    name="trainingDate"
                    value={formData.trainingDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  >
                    <option value="">CHOOSE A DATE</option>
                    <option value="NOVEMBER 28th + 29th + 30th Phase III HUNTER VALLEY NSW 2322">NOVEMBER 28th + 29th + 30th Phase III HUNTER VALLEY NSW 2322</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Bike Details Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bike Details</h2>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Would you like to:
              </label>
              <div className="flex space-x-6">
                <label htmlFor="bikeChoice-own" className="flex items-center">
                  <input
                    type="radio"
                    id="bikeChoice-own"
                    name="bikeChoice"
                    value="own"
                    checked={formData.bikeChoice === 'own'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Use my own motorcycle</span>
                </label>
                <label htmlFor="bikeChoice-hire" className="flex items-center">
                  <input
                    type="radio"
                    id="bikeChoice-hire"
                    name="bikeChoice"
                    value="hire"
                    checked={formData.bikeChoice === 'hire'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Hire a Moto Trekkin Motorcycle</span>
                </label>
              </div>
            </div>

            {formData.bikeChoice === 'own' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="bikeMake" className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Make <span className="text-red-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="bikeMake"
                    name="bikeMake"
                    value={formData.bikeMake}
                    onChange={handleInputChange}
                    placeholder="Enter bike make (e.g., Honda, BMW)"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="bikeModel" className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Model <span className="text-red-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="bikeModel"
                    name="bikeModel"
                    value={formData.bikeModel}
                    onChange={handleInputChange}
                    placeholder="Enter bike model (e.g., CRF250, GS1200)"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="bikeYear" className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Year <span className="text-red-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="bikeYear"
                    name="bikeYear"
                    value={formData.bikeYear}
                    onChange={handleInputChange}
                    placeholder="Enter bike year (e.g., 2020, 2021)"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                {/* no bike image in billing */}
              </div>
            )}

            {formData.bikeChoice === 'hire' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Choose which motorbike you wish to hire. <span className="text-red-500">(Required)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Honda CRF250 Rally */}
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      formData.hireBike === 'HONDA CRF250 RALLY - $205/day' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleInputChange({ target: { name: 'hireBike', value: 'HONDA CRF250 RALLY - $205/day' } })}
                  >
                    <div className="w-full bg-gray-100 rounded-lg p-4 mb-3 h-48 flex items-center justify-center">
                      <img src={imgCrf250} alt="Honda CRF250 Rally" className="h-40 object-contain rounded pointer-events-none" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">(1 remaining)</p>
                      <p className="font-semibold text-gray-800">HONDA CRF250 RALLY</p>
                      <p className="text-lg font-bold text-blue-600">$205/day</p>
                    </div>
                  </div>

                  {/* BMW 310 GS */}
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      formData.hireBike === 'BMW 310 GS - $215/day' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleInputChange({ target: { name: 'hireBike', value: 'BMW 310 GS - $215/day' } })}
                  >
                    <div className="w-full bg-gray-100 rounded-lg p-4 mb-3 h-48 flex items-center justify-center">
                      <img src={imgBmw310} alt="BMW 310 GS" className="h-40 object-contain rounded pointer-events-none" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">(1 remaining)</p>
                      <p className="font-semibold text-gray-800">BMW 310 GS</p>
                      <p className="text-lg font-bold text-blue-600">$215/day</p>
                    </div>
                  </div>

                  {/* Honda CB500X */}
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      formData.hireBike === 'HONDA CB500X - $230/day' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleInputChange({ target: { name: 'hireBike', value: 'HONDA CB500X - $230/day' } })}
                  >
                    <div className="w-full bg-gray-100 rounded-lg p-4 mb-3 h-48 flex items-center justify-center">
                      <img src={imgCb500x} alt="Honda CB500X" className="h-40 object-contain rounded pointer-events-none" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">(1 remaining)</p>
                      <p className="font-semibold text-gray-800">HONDA CB500X</p>
                      <p className="text-lg font-bold text-blue-600">$230/day</p>
                    </div>
                  </div>
                </div>

                {/* Inline large preview below the tiles */}
                {getSelectedBikeInfo() && (
                  <div className="mt-8">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center">
                      <img
                        src={getSelectedBikeInfo().src}
                        alt={getSelectedBikeInfo().name}
                        className="w-full max-w-4xl h-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Add-on Options - Only show when a bike is selected */}
                {formData.hireBike && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Add-on Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="excessReduction"
                          checked={formData.addOns.includes('excessReduction')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...formData.addOns, 'excessReduction']
                              : formData.addOns.filter(item => item !== 'excessReduction');
                            handleInputChange({ target: { name: 'addOns', value: addOns } });
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Excess Reduction - $15/day</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="tyreProtection"
                          checked={formData.addOns.includes('tyreProtection')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...formData.addOns, 'tyreProtection']
                              : formData.addOns.filter(item => item !== 'tyreProtection');
                            handleInputChange({ target: { name: 'addOns', value: addOns } });
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Tyre Protection - $15/day</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="touringWindscreen"
                          checked={formData.addOns.includes('touringWindscreen')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...formData.addOns, 'touringWindscreen']
                              : formData.addOns.filter(item => item !== 'touringWindscreen');
                            handleInputChange({ target: { name: 'addOns', value: addOns } });
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Touring Windscreen (Tall) - $5/day</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="panniers"
                          checked={formData.addOns.includes('panniers')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...formData.addOns, 'panniers']
                              : formData.addOns.filter(item => item !== 'panniers');
                            handleInputChange({ target: { name: 'addOns', value: addOns } });
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Panniers - $15/day</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Driver's Licence Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Driver's Licence Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Is your licence currently valid? <span className="text-red-500">(Required)</span>
                </label>
                <div className="flex space-x-4">
                  <label htmlFor="licenseValid-yes" className="flex items-center">
                    <input
                      type="radio"
                      id="licenseValid-yes"
                      name="licenseValid"
                      value="Yes"
                      checked={formData.licenseValid === 'Yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Yes</span>
                  </label>
                  <label htmlFor="licenseValid-no" className="flex items-center">
                    <input
                      type="radio"
                      id="licenseValid-no"
                      name="licenseValid"
                      value="No"
                      checked={formData.licenseValid === 'No'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                  Licence Number <span className="text-red-500">(Required)</span>
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your licence number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="licenseState" className="block text-sm font-semibold text-gray-700 mb-2">
                  State of Issue <span className="text-red-500">(Required)</span>
                </label>
                <select
                  id="licenseState"
                  name="licenseState"
                  value={formData.licenseState}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                  <option value="">Select State</option>
                  <option value="ACT">ACT</option>
                  <option value="NSW">NSW</option>
                  <option value="VIC">VIC</option>
                  <option value="QLD">QLD</option>
                  <option value="NT">NT</option>
                  <option value="WA">WA</option>
                  <option value="TAS">TAS</option>
                  <option value="SA">SA</option>
                </select>
              </div>
            </div>
          </div>


          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => {
                setCurrentStep('comprehensive');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              PREVIOUS
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">NEXT</span>
              <Star className="w-5 h-5 ml-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderTyrePage = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Step 6 of 7</span>
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
            </div>
          </div>
          <span className="text-sm text-gray-600">85%</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">TYRE ORDERS</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={(e) => {
          e.preventDefault();
          // Validate tyre requirement selection
          const newErrors = {};
          if (!formData.requiresTyres) newErrors.requiresTyres = 'Please select an option.';
          if (formData.requiresTyres === 'yes') {
            if (!formData.frontTyre.width) newErrors['frontTyre.width'] = 'Required';
            if (!formData.frontTyre.height) newErrors['frontTyre.height'] = 'Required';
            if (!formData.frontTyre.rim) newErrors['frontTyre.rim'] = 'Required';
            if (!formData.rearTyre.width) newErrors['rearTyre.width'] = 'Required';
            if (!formData.rearTyre.height) newErrors['rearTyre.height'] = 'Required';
            if (!formData.rearTyre.rim) newErrors['rearTyre.rim'] = 'Required';
            if (!formData.preferredBrand.trim()) newErrors.preferredBrand = 'Required';
            if (!formData.wheelType) newErrors.wheelType = 'Required';
            if (!formData.tyreManagement) newErrors.tyreManagement = 'Required';
          }
          if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
          setErrors({});
          setCurrentStep('final');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          
          {/* Tyre Information */}
          <div className="mb-8">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Moto Trekkin can supply a new set of off-road knobby tyres for your motorcycle ready for fitting at the event check-in. Making your event tyre management very easy. Moto Trekkin can transport the tyres you arrive on at the event on to the end of the event for re fitting, or ship them to you home address for the cost of a courier. Simply choose below if you would like a new set of tyres ready and waiting to be fitted at the event check-in. We will provide you with a detailed tyre quote for you to accept followed by a tyre invoice. Once paid your tyre order will be confirmed.
            </p>
          </div>

          {/* Tyre Requirement Question */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Do you require tyres? <span className="text-red-500">(Required)</span>
            </label>
              {errors.requiresTyres && (
                <p className="text-red-500 text-sm mb-2">{errors.requiresTyres}</p>
              )}
            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="requiresTyres"
                  value="no"
                  checked={formData.requiresTyres === 'no'}
                  onChange={handleInputChange}
                  className="mr-3 w-5 h-5 mt-1"
                />
                <span className="text-lg">
                  NO. I will arrange my own tyres and arrive on a new set of 100% off road knobby tyres with not more than 3% wear. I understand that 60/40 50/50 or any other combination of road /trail tyres other than a set of full block knobby tyres will not pass through scrutineering and I will be prevented from commencing the event.
                </span>
              </label>
              <label className="flex items-start">
                <input
                  type="radio"
                  name="requiresTyres"
                  value="yes"
                  checked={formData.requiresTyres === 'yes'}
                  onChange={handleInputChange}
                  className="mr-3 w-5 h-5 mt-1"
                />
                <span className="text-lg">
                  YES. Please provide me with a quote for tyres as per my selection below. I will not be charged for the tyres until I formally accept the quote provided. Once accepted I understand payment will be required before an order is placed.
                </span>
              </label>
            </div>
          </div>

          {/* Tyre Size Section - Only show when YES is selected */}
          {formData.requiresTyres === 'yes' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">TYRE SIZE</h2>
              
              {/* Front Tyre Size */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">FRONT TYRE SIZE</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Width <span className="text-red-500">(Required)</span>
                    </label>
                    <select
                      name="frontTyreWidth"
                      value={formData.frontTyre.width}
                      onChange={(e) => handleInputChange({ target: { name: 'frontTyre', value: { ...formData.frontTyre, width: e.target.value } } })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors['frontTyre.width'] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Width</option>
                      <option value="80">80</option>
                      <option value="90">90</option>
                      <option value="100">100</option>
                      <option value="110">110</option>
                      <option value="120">120</option>
                      <option value="130">130</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Height/Profile <span className="text-red-500">(Required)</span>
                    </label>
                    <select
                      name="frontTyreHeight"
                      value={formData.frontTyre.height}
                      onChange={(e) => handleInputChange({ target: { name: 'frontTyre', value: { ...formData.frontTyre, height: e.target.value } } })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors['frontTyre.height'] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Height</option>
                      <option value="60">60</option>
                      <option value="70">70</option>
                      <option value="80">80</option>
                      <option value="90">90</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rim Size <span className="text-red-500">(Required)</span>
                    </label>
                    <select
                      name="frontTyreRim"
                      value={formData.frontTyre.rim}
                      onChange={(e) => handleInputChange({ target: { name: 'frontTyre', value: { ...formData.frontTyre, rim: e.target.value } } })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors['frontTyre.rim'] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Rim Size</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Rear Tyre Size */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">REAR TYRE SIZE</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Width <span className="text-red-500">(Required)</span>
                    </label>
                    <select
                      name="rearTyreWidth"
                      value={formData.rearTyre.width}
                      onChange={(e) => handleInputChange({ target: { name: 'rearTyre', value: { ...formData.rearTyre, width: e.target.value } } })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors['rearTyre.width'] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Width</option>
                      <option value="130">130</option>
                      <option value="140">140</option>
                      <option value="150">150</option>
                      <option value="170">170</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Height/Profile <span className="text-red-500">(Required)</span>
                    </label>
                    <select
                      name="rearTyreHeight"
                      value={formData.rearTyre.height}
                      onChange={(e) => handleInputChange({ target: { name: 'rearTyre', value: { ...formData.rearTyre, height: e.target.value } } })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors['rearTyre.height'] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Height</option>
                      <option value="60">60</option>
                      <option value="70">70</option>
                      <option value="80">80</option>
                      <option value="90">90</option>
                      <option value="100">100</option>
                      <option value="110">110</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rim Size <span className="text-red-500">(Required)</span>
                    </label>
                    <select
                      name="rearTyreRim"
                      value={formData.rearTyre.rim}
                      onChange={(e) => handleInputChange({ target: { name: 'rearTyre', value: { ...formData.rearTyre, rim: e.target.value } } })}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors['rearTyre.rim'] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Rim Size</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Brands */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Tyre Brand & Model <span className="text-red-500">(Required)</span>
                    </label>
                    <input
                      type="text"
                      name="preferredBrand"
                      value={formData.preferredBrand}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.preferredBrand ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter preferred brand and model"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Second Preferred Tyre Brand & Model
                    </label>
                    <input
                      type="text"
                      name="secondBrand"
                      value={formData.secondBrand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter second preferred brand and model"
                    />
                  </div>
                </div>
              </div>

              {/* Wheel Type */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Wheel Type <span className="text-red-500">(Required)</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wheelType"
                      value="Tubeless rims"
                      checked={formData.wheelType === 'Tubeless rims'}
                      onChange={handleInputChange}
                      className={`mr-3 w-5 h-5 ${errors.wheelType ? 'ring-2 ring-red-300' : ''}`}
                    />
                    <span className="text-lg">Tubeless rims</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wheelType"
                      value="Tubed rims"
                      checked={formData.wheelType === 'Tubed rims'}
                      onChange={handleInputChange}
                      className={`mr-3 w-5 h-5 ${errors.wheelType ? 'ring-2 ring-red-300' : ''}`}
                    />
                    <span className="text-lg">Tubed rims</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wheelType"
                      value="Tubed rims with rim locks"
                      checked={formData.wheelType === 'Tubed rims with rim locks'}
                      onChange={handleInputChange}
                      className={`mr-3 w-5 h-5 ${errors.wheelType ? 'ring-2 ring-red-300' : ''}`}
                    />
                    <span className="text-lg">Tubed rims with rim locks</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tyre Management Section - Only show when YES is selected */}
          {formData.requiresTyres === 'yes' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">TYRE MANAGEMENT</h2>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  If you require your arrival tyres to be transported to the final destination for re-fitment for the journey home, you must purchase our Wheel Removal and Refitting Service - WRARS. This pays for the labour of refitting your arrival tyres.
                </p>
                <p className="text-gray-700 mb-4">
                  If you DO NOT require our WRARS at the final destination, you have two options for the management of your arrival tyres.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Dispose of your arrival tyres at the event start ($12.00 per tyre)</li>
                  <li>Ship your arrival tyres home via courier ($75.00 per pair)</li>
                </ul>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Choose an option below for your arrival tyres: <span className="text-red-500">(Required)</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="tyreManagement"
                      value="WRARS"
                      checked={formData.tyreManagement === 'WRARS'}
                      onChange={handleInputChange}
                      className={`mr-3 w-5 h-5 mt-1 ${errors.tyreManagement ? 'ring-2 ring-red-300' : ''}`}
                    />
                    <span className="text-lg">
                      $100 WRARS at the event destination to refit my arrival tyres for the journey home
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="tyreManagement"
                      value="DISPOSE"
                      checked={formData.tyreManagement === 'DISPOSE'}
                      onChange={handleInputChange}
                      className={`mr-3 w-5 h-5 mt-1 ${errors.tyreManagement ? 'ring-2 ring-red-300' : ''}`}
                    />
                    <span className="text-lg">
                      $24.00 DISPOSE after fitting at the event sign-on
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="tyreManagement"
                      value="SHIP"
                      checked={formData.tyreManagement === 'SHIP'}
                      onChange={handleInputChange}
                      className={`mr-3 w-5 h-5 mt-1 ${errors.tyreManagement ? 'ring-2 ring-red-300' : ''}`}
                    />
                    <span className="text-lg">
                      $75.00 SHIP from the event sign-on to my home
                    </span>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">
                  <strong>Please note:</strong> we do not fit tyres not sourced and supplied by Moto Trekkin.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => {
                setCurrentStep('detailed');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              PREVIOUS
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">NEXT</span>
              <Star className="w-5 h-5 ml-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderFinalPage = () => (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <img 
          src="https://www.mototrekkin.com.au/wp-content/uploads/Adventure-Rider-MDP-Logo-04-500x500.png" 
          alt="MDP Logo" 
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">REGISTRATION FORM MDP PHASE III</h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
        </div>
        <p className="text-sm text-gray-600">Step 7 of 7 - 100%</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={(e) => {
          e.preventDefault();
          setCurrentStep('maintenance');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          
          {/* Event Information PDF (Step 8 viewer) */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Information PDF</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="/pdfs/MDP-Phase2-Information.pdf#toolbar=1&navpanes=1&scrollbar=1"
                  title="MDP Event Information PDF"
                  className="w-full h-full rounded"
                />
              </div>
              <div className="mt-3 flex gap-3">
                <a href="/pdfs/MDP-Phase2-Information.pdf" target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Open Fullscreen</a>
                <a href="/pdfs/MDP-Phase2-Information.pdf" download className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">Download PDF</a>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={(e) => handleInputChange({ target: { name: 'termsAgreed', value: e.target.checked } })}
                  className="mr-3 w-5 h-5 mt-1"
                />
                <span className="text-lg">
                  I have read and agree to the <strong>Moto Trekkin Transport Terms and Conditions</strong> <span className="text-red-500">(Required)</span>
                </span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                If you have read, understood and agree to the event Moto Trekkin Transport Terms and Conditions, type in "I AGREE" <span className="text-red-500">(Required)</span>
              </label>
              <input
                type="text"
                name="termsConfirmation"
                value={formData.termsConfirmation}
                onChange={handleInputChange}
                placeholder="Type 'I AGREE' here"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          

          {/* Payment Summary Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>
            
            {/* Payment Option */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Payment Option <span className="text-red-500">(Required)</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="full"
                    checked={formData.paymentOption === 'full'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Full Payment</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="deposit"
                    checked={formData.paymentOption === 'deposit'}
                    onChange={handleInputChange}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Deposit (Non-refundable). Balance is due 14 days prior to the event.</span>
                </label>
              </div>
            </div>

            {/* Gift Voucher */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gift Voucher (optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="giftVoucher"
                  value={formData.giftVoucher}
                  onChange={handleInputChange}
                  placeholder="If you have a gift voucher, enter it here for a special discount"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    // Handle gift voucher application
                    console.log('Applying gift voucher:', formData.giftVoucher);
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Summary Table */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Training course</span>
                  <span className="font-semibold">{formatCurrency(trainingFee)}</span>
                </div>
                {formData.hasPartner === 'Yes' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Non-riding Partner Joining Fee</span>
                    <span className="font-semibold">{formatCurrency(partnerFee)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Bike Hire for {HIRE_DAYS} DAYS</span>
                  <span className="font-semibold">{formatCurrency(bikeHireTotal)}</span>
                </div>
                {Array.isArray(formData.addOns) && formData.addOns.length > 0 && (
                  <>
                    {formData.addOns.map((key) => (
                      <div key={key} className="flex justify-between items-center py-2">
                        <span className="text-gray-700">{ADD_ON_LABELS[key]} for {HIRE_DAYS} DAYS</span>
                        <span className="font-semibold">{formatCurrency((ADD_ON_RATES[key] || 0) * HIRE_DAYS)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-2 border-t border-gray-200">
                      <span className="text-gray-700">Add-ons Subtotal</span>
                      <span className="font-semibold">{formatCurrency(addOnsTotal)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Subtotal</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            {formData.paymentOption === 'full' && (
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Full Payment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Merchant Fee</span>
                    <span className="font-semibold">{formatCurrency(currentMerchantFeeFull)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-300">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(fullPaymentTotal)}</span>
                  </div>
                </div>

                {/* no bike image in billing */}
              </div>
            )}

            {formData.paymentOption === 'deposit' && (
              <div className="bg-orange-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Non-Refundable Deposit</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bike Hire Balance</span>
                    <span className="font-semibold">{formatCurrency(Math.max(bikeHireTotal - currentDeposit, 0))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Add-ons Balance</span>
                    <span className="font-semibold">{formatCurrency(addOnsTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Non-Refundable Deposit</span>
                    <span className="font-semibold">{formatCurrency(currentDeposit)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Merchant Fee</span>
                    <span className="font-semibold">{formatCurrency(currentMerchantFeeDeposit)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-300">
                    <span className="text-lg font-bold text-gray-900">Amount to Pay</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(depositPaymentTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Remaining Balance</span>
                    <span className="font-semibold">{formatCurrency(Math.max(subtotal - currentDeposit, 0))}</span>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => {
                setCurrentStep('tyre');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              PREVIOUS
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">SUBMIT REGISTRATION</span>
              <Star className="w-5 h-5 ml-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderMaintenancePage = () => (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-8 shadow-lg">
          <AlertTriangle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Registration Received
        </h1>
        <p className="text-xl text-gray-600 mb-8 font-medium">
          Thank you for your interest in the Masterclass Development Program
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
      </div>

      {/* Maintenance Notice */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-10 mb-12 shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="ml-6">
            <h3 className="font-bold text-orange-800 mb-4 text-2xl">Registration Processing</h3>
            <div className="space-y-4 text-orange-700">
              <p className="text-lg">We are currently processing your registration. Your form has been received and saved successfully.</p>
              <p className="text-lg">Our team will review your registration details and contact you within 24-48 hours to complete the registration process.</p>
              <p className="text-lg font-semibold">Thank you for your patience and understanding.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg mb-12 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Registration Summary
          </h2>
          <p className="text-gray-600 text-center mt-2">Your submitted information</p>
        </div>
        <div className="p-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <p><span className="font-semibold">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="font-semibold">Email:</span> {formData.email}</p>
                <p><span className="font-semibold">Mobile:</span> {formData.mobile}</p>
                <p><span className="font-semibold">Location:</span> {formData.city}, {formData.state}</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                Emergency Contacts
              </h3>
              <div className="space-y-3 text-gray-700">
                <p><span className="font-semibold">Primary Contact:</span> {formData.emergency1.firstName} {formData.emergency1.lastName}</p>
                <p><span className="font-semibold">Relationship:</span> {formData.emergency1.relationship}</p>
                <p><span className="font-semibold">Shirt Size:</span> {formData.shirtSize}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-12 shadow-lg">
        <h3 className="font-bold text-blue-800 mb-4 text-xl">Need Immediate Assistance?</h3>
        <p className="text-blue-700 mb-6 text-lg">
          If you have any urgent questions about your registration, please don't hesitate to contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a 
            href="tel:0240724511" 
            className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Phone className="w-5 h-5 mr-3" />
            Call: 02 4072 4511
          </a>
          <a 
            href="mailto:info@mototrekkin.com.au" 
            className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Mail className="w-5 h-5 mr-3" />
            Email Support
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <button
          onClick={() => {
            setCurrentStep('pre-form');
            setShowForm(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 mr-6"
        >
          <ArrowLeft className="w-5 h-5 mr-3" />
          Back to Registration
        </button>
        
        <Link
          to="/off-road-training-detail"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Bike className="w-5 h-5 mr-3" />
          View Training Details
        </Link>
      </div>
    </div>
  );


  const renderAllFormSections = () => (
    <div className="space-y-12">
      {renderPersonalDetails()}
      {renderEmergencyContacts()}
      {renderMedicalInfo()}
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="mb-16">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
            <User className="w-5 h-5 text-white" />
          </div>
          Personal Details
        </h2>
        <p className="text-gray-600 ml-14">Please provide your personal information</p>
      </div>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={errors.firstName ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               First Name <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>
          
          <div className={errors.lastName ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Last Name <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
          
          <div className={errors.gender ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Gender <span className="text-red-600 italic">(Required)</span>
             </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.gender}
              </p>
            )}
          </div>
          
          <div className={errors.email ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Email <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div className={errors.confirmEmail ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Re-Enter Email <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.confirmEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Re-enter your email"
            />
            {errors.confirmEmail && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.confirmEmail}
              </p>
            )}
          </div>
          
          <div className={errors.mobile ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Mobile Number <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="+61 4XX XXX XXX"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.mobile}
              </p>
            )}
          </div>
        </div>

        {/* Birthday */}
        <div className={(errors['birthday.day'] || errors['birthday.month'] || errors['birthday.year']) ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Birthday <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Day</label>
              <select
                name="birthday.day"
                value={formData.birthday.day}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['birthday.day'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              {errors['birthday.day'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['birthday.day']}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Month</label>
              <select
                name="birthday.month"
                value={formData.birthday.month}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['birthday.month'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              {errors['birthday.month'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['birthday.month']}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Year</label>
              <select
                name="birthday.year"
                value={formData.birthday.year}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['birthday.year'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Year</option>
                {Array.from({ length: 80 }, (_, i) => {
                  const year = new Date().getFullYear() - 18 - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
              {errors['birthday.year'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['birthday.year']}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={errors.occupation ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Occupation <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.occupation ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Your occupation"
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.occupation}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Landline
            </label>
            <input
              type="tel"
              name="landline"
              value={formData.landline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              placeholder="Landline number (optional)"
            />
          </div>
          
          <div className={`lg:col-span-2 ${errors.address ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}`}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Street Address <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Street address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.address}
              </p>
            )}
          </div>
          
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address Line 2
            </label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
          </div>
          
          <div className={errors.city ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               City <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.city}
              </p>
            )}
          </div>
          
          <div className={errors.state ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               State <span className="text-red-600 italic">(Required)</span>
             </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select State</option>
              <option value="ACT">ACT</option>
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="NT">NT</option>
              <option value="WA">WA</option>
              <option value="TAS">TAS</option>
              <option value="SA">SA</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.state}
              </p>
            )}
          </div>
          
          <div className={errors.postCode ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Post Code <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.postCode ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Post code"
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.postCode}
              </p>
            )}
          </div>
        </div>

        {/* Phone Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={errors.phonePlatform ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Phone Platform <span className="text-red-600 italic">(Required)</span>
             </label>
            <select
              name="phonePlatform"
              value={formData.phonePlatform}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.phonePlatform ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select Platform</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="other">Other</option>
            </select>
            {errors.phonePlatform && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.phonePlatform}
              </p>
            )}
          </div>
          
          <div className={errors.phoneModel ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Phone Model <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="phoneModel"
              value={formData.phoneModel}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.phoneModel ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Phone model"
            />
            {errors.phoneModel && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.phoneModel}
              </p>
            )}
          </div>
        </div>

        {/* Phone Capabilities */}
        <div className="space-y-4">
          {renderRadioGroup('hasGPS', 'Does your phone have built-in GPS?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
          
          {renderRadioGroup('hasFacebook', 'We communicate extensively using Facebook. Do you have a Facebook account?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
          
          {renderRadioGroup('hasPhoneMount', 'Do you have a phone mount on your motorcycle that allows you to see your phone while riding?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
          
          {renderRadioGroup('canChargePhone', 'Do you have the capacity to charge your phone while riding?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
        </div>
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="mb-16">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
            <Phone className="w-5 h-5 text-white" />
          </div>
          Emergency Contact Details
        </h2>
        <p className="text-gray-600 ml-14">Please provide emergency contact information</p>
      </div>
      
      <div className="space-y-8">
        {/* Emergency Contact 1 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Next of Kin / Emergency Contact 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={errors['emergency1.firstName'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                 NOK1 First Name <span className="text-red-600 italic">(Required)</span>
               </label>
              <input
                type="text"
                name="emergency1.firstName"
                value={formData.emergency1.firstName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.firstName'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.firstName'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.firstName']}
                </p>
              )}
            </div>
            <div className={errors['emergency1.lastName'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Last Name <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="text"
                name="emergency1.lastName"
                value={formData.emergency1.lastName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.lastName'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.lastName'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.lastName']}
                </p>
              )}
            </div>
            <div className={errors['emergency1.email'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Email <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="email"
                name="emergency1.email"
                value={formData.emergency1.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.email'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.email'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.email']}
                </p>
              )}
            </div>
            <div className={errors['emergency1.mobile'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Mobile Number <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="tel"
                name="emergency1.mobile"
                value={formData.emergency1.mobile}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.mobile'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.mobile'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.mobile']}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Landline
              </label>
              <input
                type="tel"
                name="emergency1.landline"
                value={formData.emergency1.landline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className={errors['emergency1.relationship'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Relationship <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="text"
                name="emergency1.relationship"
                value={formData.emergency1.relationship}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.relationship'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., Spouse, Parent, Sibling"
              />
              {errors['emergency1.relationship'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.relationship']}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Contact 2 removed */}

        {/* Shirt Size */}
        <div className={errors.shirtSize ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred shirt size <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map(size => (
              <label key={size} className="flex items-center">
                <input
                  type="radio"
                  name="shirtSize"
                  value={size}
                  checked={formData.shirtSize === size}
                  onChange={handleInputChange}
                  required
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
          {errors.shirtSize && (
            <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {errors.shirtSize}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderMedicalInfo = () => (
    <div className="mb-16">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-8 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
            <Shield className="w-5 h-5 text-white" />
          </div>
          Medical Information
        </h2>
        <p className="text-gray-600 ml-14">Please provide your medical information for safety purposes</p>
      </div>
      
      <div className="space-y-6">
        <div>
          {renderRadioGroup('medicalCondition', 'Do you suffer a medical condition we need to know about?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], false)}
          {formData.medicalCondition === 'yes' && (
            <div className="mt-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Please describe your condition. All information is treated as highly confidential and is only viewed by our medical team in the event of an emergency involving you.
              </label>
              <textarea
                name="medicalDescription"
                value={formData.medicalDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe your medical condition..."
              />
            </div>
          )}
        </div>
        
         {formData.medicalCondition === 'yes' && (
           <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Please describe any medications you take the dosages and frequency.
             </label>
             <textarea
               name="medications"
               value={formData.medications}
               onChange={handleInputChange}
               rows={3}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
               placeholder="List your medications, dosages, and frequency..."
             />
           </div>
         )}
        
        {renderRadioGroup('regularMedication', 'Do you take any regular medication?', [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ], true)}
        {formData.regularMedication === 'yes' && (
            <div className="mt-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Please tell us which medication you take regularly.
              </label>
              <textarea
                name="medicationDetails"
                value={formData.medicationDetails}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                placeholder="List your regular medications..."
              />
            </div>
          )}
        
        {renderRadioGroup('medicationAllergies', 'Do you have any allergies to medication?', [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ], true)}
        {formData.medicationAllergies === 'yes' && (
          <div className={`mt-3 ${errors.medicationAllergyDetails ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Please tell us any allergies you have to medication. <span className="text-red-600 italic">(Required)</span>
            </label>
            <textarea
              name="medicationAllergyDetails"
              value={formData.medicationAllergyDetails}
              onChange={handleInputChange}
              rows={2}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.medicationAllergyDetails ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="List your medication allergies..."
            />
            {errors.medicationAllergyDetails && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.medicationAllergyDetails}
              </p>
            )}
          </div>
        )}
        
        {renderRadioGroup('foodAllergies', 'Do you have any food or other allergies?', [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ], true)}
        {formData.foodAllergies === 'yes' && (
          <div className="mt-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Please provide us with a list of your allergies below.
            </label>
            <textarea
              name="foodAllergyDetails"
              value={formData.foodAllergyDetails}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              placeholder="List your food and other allergies..."
            />
          </div>
        )}
        
        {renderField('dietaryRequirements', 'What are your dietary requirements?', 'text', { 
          placeholder: 'e.g., None, Vegetarian, Vegan, Gluten-free, etc.' 
        }, true)}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Medicare Number
            </label>
            <input
              type="text"
              name="medicareNumber"
              value={formData.medicareNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
            />
          </div>
           <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Medicare Card Position
             </label>
             <select
               name="medicarePosition"
               value={formData.medicarePosition}
               onChange={handleInputChange}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
             >
               <option value="">Select Position</option>
               {Array.from({ length: 9 }, (_, i) => (
                 <option key={i + 1} value={i + 1}>{i + 1}</option>
               ))}
             </select>
           </div>
        </div>
      </div>
    </div>
  );





  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-200/20 rounded-full translate-x-40 -translate-y-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-indigo-200/20 rounded-full -translate-x-32 translate-y-32 blur-3xl"></div>
      </div>
      
      {/* Header */}
      <div className="relative bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            to="/off-road-training-detail"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 font-semibold group"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
              <ArrowLeft size={20} className="group-hover:text-blue-600 transition-colors" />
            </div>
            Back to Training Details
          </Link>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {currentStep === 'form' && (
          /* Registration Form - All Sections on One Page */
          <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 bg-purple-100 rounded-full opacity-50"></div>
            
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-12 py-12">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 shadow-2xl">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4">Registration Form</h2>
                <p className="text-blue-100 text-xl font-light max-w-2xl mx-auto">Please fill in all required fields to complete your registration and join our program</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-12" noValidate>
              {renderAllFormSections()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-16 pt-8 border-t-2 border-gray-200">
                      <Link
                        to="/off-road-training-detail"
                        className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
                      >
                        <ArrowLeft className="w-5 h-5 mr-3" />
                        Back to Training
                      </Link>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-lg">Next</span>
                  <Star className="w-5 h-5 ml-3" />
                </button>
              </div>
            </form>
          </div>
        )}
        {currentStep === 'experience' && renderExperiencePage()}
        {currentStep === 'comprehensive' && renderComprehensiveForm()}
        {currentStep === 'detailed' && renderDetailedForm()}
        {currentStep === 'tyre' && renderTyrePage()}
        {currentStep === 'final' && renderFinalPage()}
        {currentStep === 'maintenance' && renderMaintenancePage()}

        {/* Contact Information - Only show on form step */}
        {currentStep === 'form' && (
          <div className="mt-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl border border-gray-200 shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-600 rounded-full -translate-x-12 -translate-y-12"></div>
            </div>
            
            <div className="relative p-16 text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl mb-8 shadow-2xl">
                <Phone className="w-10 h-10 text-white" />
              </div>
              
              {/* Heading */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
                Our experienced team is here to assist you with any questions about registration or the training program.
              </p>
              
              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <a 
                  href="tel:0240724511" 
                  className="group flex items-center justify-center px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                    <div className="text-left">
                      <div className="text-base font-bold">Call Us</div>
                      <div className="text-sm opacity-90">02 4072 4511</div>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@mototrekkin.com.au" 
                  className="group flex items-center justify-center px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 mr-4 group-hover:animate-pulse" />
                    <div className="text-left">
                      <div className="text-base font-bold">Email Us</div>
                      <div className="text-sm opacity-90">Get Support</div>
                    </div>
                  </div>
                </a>
              </div>
              
              {/* Additional Info */}
              <div className="mt-10 pt-8 border-t border-gray-300">
                <p className="text-gray-600 font-medium">
                  Available Monday to Friday, 8AM - 5PM
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  We typically respond within 2-4 hours during business hours
                </p>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;

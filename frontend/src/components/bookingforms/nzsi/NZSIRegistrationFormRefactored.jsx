import React, { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import { loadStripe } from '@stripe/stripe-js';
import { format } from 'date-fns';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';
import Step8 from './steps/Step8';
import Step9 from './steps/Step9';
import Step10 from './steps/Step10';
import Step11 from './steps/Step11';
import Step12 from './steps/Step12';
import { fetchMotorcycles } from './motorcycles';

const stripePromise = loadStripe('pk_test_51Q5xX9FSb9wGlBwSQN4WE9bFcWqUxWeJ8EmyimzBG77QPTPEhvd62fXTxkr1qipe5Z4OZAlWZyw3otmiQRTPZiIA008HheOzhj');

const NZSIRegistrationFormRefactored = () => {
  console.log('NZSIRegistrationFormRefactored: Component loaded');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [bikesLoading, setBikesLoading] = useState(true);

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
    postCode: '',
    country: 'Australia',
    state: '',
    phonePlatform: '',
    phoneModel: '',
    hasGPS: '',
    hasFacebook: '',
    emergency1FirstName: '',
    emergency1LastName: '',
    emergency1Email: '',
    emergency1Mobile: '',
    emergency1Landline: '',
    emergency1Relationship: '',
    emergency2FirstName: '',
    emergency2LastName: '',
    emergency2Email: '',
    emergency2Mobile: '',
    emergency2Landline: '',
    emergency2Relationship: '',
    hasMedicalCondition: '',
    medicalCondition: '',
    medications: '',
    hasMedicationAllergies: '',
    medicationAllergies: '',
    hasFoodAllergies: '',
    foodAllergies: '',
    dietaryRequirements: '',
    hasHealthFund: '',
    healthFundName: '',
    healthFundNumber: '',
    hasAmbulanceCover: '',
    medicareNumber: '',
    medicarePosition: '',
    hasTraining: '',
    recentTraining: '',
    trainingDetails: '',
    offRoadExperience: '',
    experienceLevel: '',
    confidenceAreas: '',
    motorcycle: {
      hireOption: '',
      selectedMotorcycle: '',
      ownBike: {
        make: '',
        model: '',
        year: '',
        registrationNumber: '',
        stateOrRegion: '',
        odometer: '',
        serviceUpToDate: '',
        serviceIntention: '',
        hasUnresolvedIssues: '',
        issuesDetails: '',
        hasComprehensiveInsurance: '',
        fuelCapacity: '',
        estimatedRange: ''
      }
    },
    licenceValid: '',
    licenceNumber: '',
    licenceExpiryDate: null,
    licenceState: '',
    licenceFile: null,
    hydration: [],
    electronicEquipment: [],
    upperProtective: [],
    lowerProtective: [],
    bootBrand: '',
    mechanicalRelated: [],
    shirtSize: '',
    accommodationPreference: '',
    registerPartner: '',
    ridingWithGroup: '',
    groupMembers: '',
    giftVoucherCode: '',
    agreeToTerms: false,
    termsAgreement: '',
    payment: {
      paymentOption: ''
    }
  });

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        console.log('NZSIRegistrationFormRefactored: Fetching bikes');
        const bikeData = await fetchMotorcycles();
        setBikes(bikeData);
        console.log('NZSIRegistrationFormRefactored: Bikes fetched', bikeData.length);
      } catch (err) {
        console.error('NZSIRegistrationFormRefactored: Fetch bikes error', err.message);
        setApiError('Failed to load motorcycles. Please try again.');
      } finally {
        setBikesLoading(false);
      }
    };
    fetchBikes();
  }, []);

  const steps = [
    { number: 1, title: 'Introduction', completed: currentStep > 1 },
    { number: 2, title: 'Personal Details', completed: currentStep > 2 },
    { number: 3, title: 'Emergency Contacts', completed: currentStep > 3 },
    { number: 4, title: 'Medical Info', completed: currentStep > 4 },
    { number: 5, title: 'Experience', completed: currentStep > 5 },
    { number: 6, title: 'Motorcycle', completed: currentStep > 6 },
    { number: 7, title: 'Licence', completed: currentStep > 7 },
    { number: 8, title: 'Equipment', completed: currentStep > 8 },
    { number: 9, title: 'Accommodation', completed: currentStep > 9 },
    { number: 10, title: 'Group', completed: currentStep > 10 },
    { number: 11, title: 'Terms', completed: currentStep > 11 },
    { number: 12, title: 'Payment', completed: currentStep > 12 }
  ];

  const handleInputChange = (e, section = null) => {
    const { name, value, type, checked, files } = e.target;
    console.log(`handleInputChange: ${name} changed to ${type === 'file' ? files[0]?.name : value || checked}`, { section });
    
    if (type === 'checkbox' && ['hydration', 'electronicEquipment', 'upperProtective', 'lowerProtective', 'mechanicalRelated'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 2:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.confirmEmail.trim()) newErrors.confirmEmail = 'Confirm email is required';
        if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match';
        if (!formData.birthday) newErrors.birthday = 'Birthday is required';
        if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.postCode.trim()) newErrors.postCode = 'Post code is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if ((formData.country === 'Australia' || formData.country === 'New Zealand') && !formData.state)
          newErrors.state = 'State is required';
        break;
      case 3:
        if (!formData.emergency1FirstName.trim()) newErrors.emergency1FirstName = 'Emergency contact 1 first name is required';
        if (!formData.emergency1LastName.trim()) newErrors.emergency1LastName = 'Emergency contact 1 last name is required';
        if (!formData.emergency1Email.trim()) newErrors.emergency1Email = 'Emergency contact 1 email is required';
        if (!formData.emergency1Mobile.trim()) newErrors.emergency1Mobile = 'Emergency contact 1 mobile is required';
        if (!formData.emergency1Relationship.trim()) newErrors.emergency1Relationship = 'Emergency contact 1 relationship is required';
        if (!formData.emergency2FirstName.trim()) newErrors.emergency2FirstName = 'Emergency contact 2 first name is required';
        if (!formData.emergency2LastName.trim()) newErrors.emergency2LastName = 'Emergency contact 2 last name is required';
        if (!formData.emergency2Email.trim()) newErrors.emergency2Email = 'Emergency contact 2 email is required';
        if (!formData.emergency2Mobile.trim()) newErrors.emergency2Mobile = 'Emergency contact 2 mobile is required';
        if (!formData.emergency2Relationship.trim()) newErrors.emergency2Relationship = 'Emergency contact 2 relationship is required';
        break;
      case 4:
        if (!formData.hasMedicalCondition) newErrors.hasMedicalCondition = 'Medical condition question is required';
        if (formData.hasMedicalCondition === 'Yes' && !formData.medicalCondition.trim())
          newErrors.medicalCondition = 'Medical condition details are required';
        if (!formData.hasMedicationAllergies) newErrors.hasMedicationAllergies = 'Medication allergies question is required';
        if (formData.hasMedicationAllergies === 'Yes' && !formData.medicationAllergies.trim())
          newErrors.medicationAllergies = 'Medication allergy details are required';
        if (!formData.hasFoodAllergies) newErrors.hasFoodAllergies = 'Food allergies question is required';
        if (formData.hasFoodAllergies === 'Yes' && !formData.foodAllergies.trim())
          newErrors.foodAllergies = 'Food allergy details are required';
        break;
      case 5:
        if (!formData.hasTraining) newErrors.hasTraining = 'Training question is required';
        if (formData.hasTraining === 'Yes' && !formData.recentTraining)
          newErrors.recentTraining = 'Recent training question is required';
        if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
        break;
      case 6:
        if (!formData.motorcycle.hireOption) newErrors.hireOption = 'Hire option is required';
        if (formData.motorcycle.hireOption === 'Hire a Motorcycle') {
          if (!formData.motorcycle.selectedMotorcycle) newErrors.selectedMotorcycle = 'Motorcycle selection is required';
          else {
            const selectedBike = bikes.find(bike => bike.name === formData.motorcycle.selectedMotorcycle);
            if (!selectedBike || !selectedBike.available || selectedBike.remaining <= 0) {
              newErrors.selectedMotorcycle = 'Selected motorcycle is not available or out of stock';
            }
          }
        } else if (formData.motorcycle.hireOption === 'Use my own motorcycle') {
          if (!formData.motorcycle.ownBike.make.trim()) newErrors.ownBikeMake = 'Bike make is required';
          if (!formData.motorcycle.ownBike.model.trim()) newErrors.ownBikeModel = 'Bike model is required';
          if (!formData.motorcycle.ownBike.year) newErrors.ownBikeYear = 'Bike year is required';
          if (!formData.motorcycle.ownBike.registrationNumber.trim()) newErrors.ownBikeRegistrationNumber = 'Registration number is required';
          if (!formData.motorcycle.ownBike.stateOrRegion.trim()) newErrors.ownBikeStateOrRegion = 'State/Region is required';
          if (!formData.motorcycle.ownBike.odometer) newErrors.ownBikeOdometer = 'Odometer reading is required';
          if (!formData.motorcycle.ownBike.serviceUpToDate) newErrors.ownBikeServiceUpToDate = 'Service schedule question is required';
          if (formData.motorcycle.ownBike.serviceUpToDate === 'No' && !formData.motorcycle.ownBike.serviceIntention)
            newErrors.ownBikeServiceIntention = 'Please confirm your intention to service the bike';
          if (!formData.motorcycle.ownBike.hasUnresolvedIssues) newErrors.ownBikeHasUnresolvedIssues = 'Unresolved issues question is required';
          if (formData.motorcycle.ownBike.hasUnresolvedIssues === 'Yes' && !formData.motorcycle.ownBike.issuesDetails.trim())
            newErrors.ownBikeIssuesDetails = 'Please explain the mechanical issues';
          if (!formData.motorcycle.ownBike.hasComprehensiveInsurance)
            newErrors.ownBikeHasComprehensiveInsurance = 'Insurance question is required';
          if (!formData.motorcycle.ownBike.fuelCapacity) newErrors.ownBikeFuelCapacity = 'Fuel capacity is required';
          if (!formData.motorcycle.ownBike.estimatedRange) newErrors.ownBikeEstimatedRange = 'Estimated full fuel range is required';
        }
        break;
      case 7:
        if (!formData.licenceValid) newErrors.licenceValid = 'Licence validity is required';
        if (!formData.licenceNumber.trim()) newErrors.licenceNumber = 'Licence number is required';
        if (!formData.licenceExpiryDate) newErrors.licenceExpiryDate = 'Licence expiry date is required';
        if (!formData.licenceState) newErrors.licenceState = 'Licence state is required';
        if (!formData.licenceFile || !(formData.licenceFile instanceof File)) newErrors.licenceFile = 'Licence file upload is required';
        break;
      case 8:
        if (formData.hydration.length === 0) newErrors.hydration = 'Hydration equipment is required';
        if (formData.electronicEquipment.length === 0) newErrors.electronicEquipment = 'Electronic equipment is required';
        if (formData.upperProtective.length === 0) newErrors.upperProtective = 'Upper protective equipment is required';
        if (formData.lowerProtective.length === 0) newErrors.lowerProtective = 'Lower protective equipment is required';
        if (!formData.bootBrand.trim()) newErrors.bootBrand = 'Boot brand is required';
        if (formData.mechanicalRelated.length === 0) newErrors.mechanicalRelated = 'Mechanical equipment is required';
        break;
      case 9:
        if (!formData.shirtSize) newErrors.shirtSize = 'Shirt size is required';
        if (!formData.accommodationPreference) newErrors.accommodationPreference = 'Accommodation preference is required';
        if (formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION' && !formData.registerPartner)
          newErrors.registerPartner = 'Partner registration question is required';
        break;
      case 10:
        if (!formData.ridingWithGroup) newErrors.ridingWithGroup = 'Group riding question is required';
        if (formData.ridingWithGroup === 'Yes' && !formData.groupMembers.trim())
          newErrors.groupMembers = 'Group members information is required';
        break;
      case 11:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        if (!formData.termsAgreement.trim()) newErrors.termsAgreement = 'Terms agreement text is required';
        break;
      case 12:
        if (!formData.payment?.paymentOption) newErrors.paymentOption = 'Payment option is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    console.log('validateStep:', { step, errors: newErrors, isValid: Object.keys(newErrors).length === 0 });
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalPayment = () => {
    const selectedBike = bikes.find(bike => bike.name === formData.motorcycle.selectedMotorcycle);
    const bikeHire = selectedBike && formData.motorcycle.hireOption === 'Hire a Motorcycle' ? selectedBike.price * 8 : 0;
    const eventPackage = formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION' ? 4890 : 3699;
    const partnerFee = formData.registerPartner === 'Yes' ? 4890 : 0;
    const subtotal = eventPackage + partnerFee + bikeHire;
    const discount = formData.payment?.paymentOption === 'Full Payment' ? 50 : 0;
    const afterDiscount = subtotal - discount;
    const merchantFee = formData.payment?.paymentOption === 'Deposit'
      ? (formData.registerPartner === 'Yes' ? 33.66 : 16.83)
      : (afterDiscount * 0.015 + 0.02).toFixed(2);
    const total = formData.payment?.paymentOption === 'Deposit'
      ? (formData.registerPartner === 'Yes' ? 990 + 990 + 33.66 : 990 + 16.83)
      : formData.payment?.paymentOption === 'Three Payments'
      ? ((subtotal / 3) + (subtotal / 3) * 0.015 + 0.02).toFixed(2)
      : (afterDiscount + parseFloat(merchantFee)).toFixed(2);
    console.log('calculateTotalPayment:', { eventPackage, partnerFee, bikeHire, subtotal, discount, merchantFee, total });
    return total;
  };

  // ✅ FIXED: COMPLETE handleSubmit with SEPARATE LICENCE FIELDS
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit: Form submission triggered', { formData, loading });
    
    if (!validateStep(currentStep)) {
      console.log('handleSubmit: Validation failed', errors);
      setApiError('Validation failed. Please check the form for errors.');
      return;
    }
    
    console.log('handleSubmit: Validation passed, proceeding with submission');
    setLoading(true);
    setApiError(null);

    try {
      const token = localStorage.getItem('token');
      console.log('handleSubmit: JWT token', token || 'No token found');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const validationErrors = [];
      if (!formData.firstName) validationErrors.push('First name is required.');
      if (!formData.lastName) validationErrors.push('Last name is required.');
      if (!formData.gender) validationErrors.push('Gender is required.');
      if (!formData.email) validationErrors.push('Email is required.');
      if (!formData.birthday) validationErrors.push('Birthday is required.');
      if (!formData.occupation) validationErrors.push('Occupation is required.');
      if (!formData.mobile) validationErrors.push('Mobile number is required.');
      if (!formData.address) validationErrors.push('Address is required.');
      if (!formData.city) validationErrors.push('City is required.');
      if (!formData.postCode) validationErrors.push('Postcode is required.');
      if (!formData.country) validationErrors.push('Country is required.');
      if (!formData.emergency1FirstName) validationErrors.push('Emergency contact 1 first name is required.');
      if (!formData.emergency1LastName) validationErrors.push('Emergency contact 1 last name is required.');
      if (!formData.emergency1Email) validationErrors.push('Emergency contact 1 email is required.');
      if (!formData.emergency1Mobile) validationErrors.push('Emergency contact 1 mobile is required.');
      if (!formData.emergency1Relationship) validationErrors.push('Emergency contact 1 relationship is required.');
      if (!formData.emergency2FirstName) validationErrors.push('Emergency contact 2 first name is required.');
      if (!formData.emergency2LastName) validationErrors.push('Emergency contact 2 last name is required.');
      if (!formData.emergency2Email) validationErrors.push('Emergency contact 2 email is required.');
      if (!formData.emergency2Mobile) validationErrors.push('Emergency contact 2 mobile is required.');
      if (!formData.emergency2Relationship) validationErrors.push('Emergency contact 2 relationship is required.');
      if (!formData.hasMedicalCondition) validationErrors.push('Medical condition status is required.');
      if (!formData.hasMedicationAllergies) validationErrors.push('Medication allergies status is required.');
      if (!formData.hasFoodAllergies) validationErrors.push('Food allergies status is required.');
      if (!formData.hasTraining) validationErrors.push('Training status is required.');
      if (!formData.experienceLevel) validationErrors.push('Experience level is required.');
      if (!formData.motorcycle.hireOption) validationErrors.push('Hire option is required.');
      if (!formData.licenceValid) validationErrors.push('Licence validity status is required.');
      if (!formData.licenceNumber) validationErrors.push('Licence number is required.');
      if (!formData.licenceExpiryDate) validationErrors.push('Licence expiry date is required.');
      if (!formData.licenceState) validationErrors.push('Licence state is required.');
      if (!formData.bootBrand) validationErrors.push('Boot brand is required.');
      if (!formData.shirtSize) validationErrors.push('Shirt size is required.');
      if (!formData.accommodationPreference) validationErrors.push('Accommodation preference is required.');
      if (!formData.ridingWithGroup) validationErrors.push('Riding with group status is required.');
      if (!formData.agreeToTerms) validationErrors.push('You must agree to the terms.');
      if (!formData.termsAgreement) validationErrors.push('Terms agreement is required.');
      if (!formData.payment?.paymentOption) validationErrors.push('Payment option is required.');
      
      const totalPayment = parseFloat(calculateTotalPayment());
      if (!totalPayment || isNaN(totalPayment)) validationErrors.push('Valid total payment is required.');

      if (validationErrors.length > 0) {
        console.log('handleSubmit: Validation errors', validationErrors);
        setApiError(validationErrors.join(' '));
        alert(validationErrors.join(' '));
        setLoading(false);
        return;
      }

      // ✅ FIXED: Create payload WITHOUT licenceDetails (send separately)
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
          postCode: formData.postCode,
          country: formData.country,
          state: formData.state,
          phonePlatform: formData.phonePlatform,
          phoneModel: formData.phoneModel,
          hasGPS: formData.hasGPS,
          hasFacebook: formData.hasFacebook
        },
        emergencyContacts: {
          emergency1: {
            firstName: formData.emergency1FirstName,
            lastName: formData.emergency1LastName,
            email: formData.emergency1Email,
            mobile: formData.emergency1Mobile,
            landline: formData.emergency1Landline,
            relationship: formData.emergency1Relationship
          },
          emergency2: {
            firstName: formData.emergency2FirstName,
            lastName: formData.emergency2LastName,
            email: formData.emergency2Email,
            mobile: formData.emergency2Mobile,
            landline: formData.emergency2Landline,
            relationship: formData.emergency2Relationship
          }
        },
        medicalInfo: {
          hasMedicalCondition: formData.hasMedicalCondition,
          medicalCondition: formData.medicalCondition,
          medications: formData.medications,
          hasMedicationAllergies: formData.hasMedicationAllergies,
          medicationAllergies: formData.medicationAllergies,
          hasFoodAllergies: formData.hasFoodAllergies,
          foodAllergies: formData.foodAllergies,
          dietaryRequirements: formData.dietaryRequirements,
          hasHealthFund: formData.hasHealthFund,
          healthFundName: formData.healthFundName,
          healthFundNumber: formData.healthFundNumber,
          hasAmbulanceCover: formData.hasAmbulanceCover,
          medicareNumber: formData.medicareNumber,
          medicarePosition: formData.medicarePosition
        },
        experience: {
          hasTraining: formData.hasTraining,
          recentTraining: formData.recentTraining,
          trainingDetails: formData.trainingDetails,
          offRoadExperience: formData.offRoadExperience,
          experienceLevel: formData.experienceLevel,
          confidenceAreas: formData.confidenceAreas
        },
        motorcycle: {
          hireOption: formData.motorcycle.hireOption,
          selectedMotorcycle: formData.motorcycle.selectedMotorcycle,
          ownBike: {
            make: formData.motorcycle.ownBike.make,
            model: formData.motorcycle.ownBike.model,
            year: formData.motorcycle.ownBike.year,
            registrationNumber: formData.motorcycle.ownBike.registrationNumber,
            stateOrRegion: formData.motorcycle.ownBike.stateOrRegion,
            odometer: formData.motorcycle.ownBike.odometer,
            serviceUpToDate: formData.motorcycle.ownBike.serviceUpToDate,
            serviceIntention: formData.motorcycle.ownBike.serviceIntention,
            hasUnresolvedIssues: formData.motorcycle.ownBike.hasUnresolvedIssues,
            issuesDetails: formData.motorcycle.ownBike.issuesDetails,
            hasComprehensiveInsurance: formData.motorcycle.ownBike.hasComprehensiveInsurance,
            fuelCapacity: formData.motorcycle.ownBike.fuelCapacity,
            estimatedRange: formData.motorcycle.ownBike.estimatedRange
          }
        },
        equipment: {
          hydration: formData.hydration,
          electronicEquipment: formData.electronicEquipment,
          upperProtective: formData.upperProtective,
          lowerProtective: formData.lowerProtective,
          bootBrand: formData.bootBrand,
          mechanicalRelated: formData.mechanicalRelated,
          shirtSize: formData.shirtSize
        },
        accommodation: {
          accommodationPreference: formData.accommodationPreference,
          shirtSize: formData.shirtSize,
          registerPartner: formData.registerPartner
        },
        group: {
          ridingWithGroup: formData.ridingWithGroup,
          groupMembers: formData.groupMembers,
          giftVoucherCode: formData.giftVoucherCode
        },
        terms: {
          agreeToTerms: formData.agreeToTerms,
          termsAgreement: formData.termsAgreement
        },
        payment: {
          paymentOption: formData.payment?.paymentOption,
          totalPayment: parseFloat(calculateTotalPayment())
        }
      };

      // ✅ FIXED: FormData - LICENCE FIELDS SENT SEPARATELY
      const formDataToSend = new FormData();
      
      // 1. Add licence file
      if (formData.licenceFile instanceof File) {
        console.log('handleSubmit: Adding licenceFile to FormData', {
          name: formData.licenceFile.name,
          size: formData.licenceFile.size,
          type: formData.licenceFile.type
        });
        if (!['image/jpeg', 'image/png', 'application/pdf'].includes(formData.licenceFile.type)) {
          throw new Error('Invalid file type. Please upload a JPEG, PNG, or PDF.');
        }
        formDataToSend.append('licenceFile', formData.licenceFile);
      } else {
        throw new Error('Licence file is required');
      }

      // ✅ FIXED: Send LICENCE FIELDS AS SEPARATE FIELDS
      formDataToSend.append('licenceValid', formData.licenceValid || 'Yes');
      formDataToSend.append('licenceNumber', formData.licenceNumber || '');
      formDataToSend.append('licenceExpiryDate', formData.licenceExpiryDate ? format(new Date(formData.licenceExpiryDate), 'yyyy-MM-dd') : '');
      formDataToSend.append('licenceState', formData.licenceState || '');

      // 2. Add ALL OTHER JSON fields (EXCLUDING licenceDetails)
      for (const key in payload) {
        if (Array.isArray(payload[key]) || typeof payload[key] === 'object') {
          formDataToSend.append(key, JSON.stringify(payload[key]));
        } else {
          formDataToSend.append(key, payload[key] || '');
        }
      }

      // DEBUG: Log FormData
      console.log('=== FORM DATA DEBUG ===');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value instanceof File ? `File: ${value.name}` : value}`);
      }
      console.log('====================');

      const response = await axios.post('/api/nzsiRegistrations/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('handleSubmit: Response received', response.data);
      const { registrationId, emailStatus, paymentSessionId } = response.data;
      console.log('handleSubmit: Registration created with ID:', registrationId);

      let message = 'Registration submitted successfully!';
      if (emailStatus) {
        const { userEmailSent, adminEmailSent, errors } = emailStatus;
        if (userEmailSent && adminEmailSent) {
          message += ' Confirmation emails sent to you and the admin.';
        } else if (userEmailSent) {
          message += ' Confirmation email sent to you, but admin email failed.';
        } else if (adminEmailSent) {
          message += ' Confirmation email sent to admin, but user email failed.';
        } else {
          message += ' Email notifications failed.';
        }
        if (errors?.length > 0) {
          console.warn('handleSubmit: Email errors:', errors);
          message += ' Some email notifications could not be sent.';
        }
      }

      if (paymentSessionId) {
        console.log('handleSubmit: Redirecting to Stripe checkout', paymentSessionId);
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: paymentSessionId });
        if (error) {
          console.error('handleSubmit: Stripe redirect error', error);
          throw new Error(`Stripe checkout failed: ${error.message}`);
        }
      } else {
        console.warn('handleSubmit: No payment session ID received');
        message += ' Registration created, but payment setup failed. Please contact support.';
      }

      alert(message);
      
      // Reset form
      setCurrentStep(1);
      setFormData({
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
        postCode: '',
        country: 'Australia',
        state: '',
        phonePlatform: '',
        phoneModel: '',
        hasGPS: '',
        hasFacebook: '',
        emergency1FirstName: '',
        emergency1LastName: '',
        emergency1Email: '',
        emergency1Mobile: '',
        emergency1Landline: '',
        emergency1Relationship: '',
        emergency2FirstName: '',
        emergency2LastName: '',
        emergency2Email: '',
        emergency2Mobile: '',
        emergency2Landline: '',
        emergency2Relationship: '',
        hasMedicalCondition: '',
        medicalCondition: '',
        medications: '',
        hasMedicationAllergies: '',
        medicationAllergies: '',
        hasFoodAllergies: '',
        foodAllergies: '',
        dietaryRequirements: '',
        hasHealthFund: '',
        healthFundName: '',
        healthFundNumber: '',
        hasAmbulanceCover: '',
        medicareNumber: '',
        medicarePosition: '',
        hasTraining: '',
        recentTraining: '',
        trainingDetails: '',
        offRoadExperience: '',
        experienceLevel: '',
        confidenceAreas: '',
        motorcycle: {
          hireOption: '',
          selectedMotorcycle: '',
          ownBike: {
            make: '',
            model: '',
            year: '',
            registrationNumber: '',
            stateOrRegion: '',
            odometer: '',
            serviceUpToDate: '',
            serviceIntention: '',
            hasUnresolvedIssues: '',
            issuesDetails: '',
            hasComprehensiveInsurance: '',
            fuelCapacity: '',
            estimatedRange: ''
          }
        },
        licenceValid: '',
        licenceNumber: '',
        licenceExpiryDate: null,
        licenceState: '',
        licenceFile: null,
        hydration: [],
        electronicEquipment: [],
        upperProtective: [],
        lowerProtective: [],
        bootBrand: '',
        mechanicalRelated: [],
        shirtSize: '',
        accommodationPreference: '',
        registerPartner: '',
        ridingWithGroup: '',
        groupMembers: '',
        giftVoucherCode: '',
        agreeToTerms: false,
        termsAgreement: '',
        payment: {
          paymentOption: ''
        }
      });
    } catch (err) {
      console.error('handleSubmit: Submission error', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack
      });
      const message = err.response?.data?.message || `Failed to submit registration or initiate payment: ${err.message}. Please try again or contact support.`;
      setApiError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 12) {
        console.log('nextStep: Moving to step', currentStep + 1);
        setCurrentStep(currentStep + 1);
      }
    } else {
      console.log('nextStep: Validation failed for step', currentStep, errors);
      alert('Please complete all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      console.log('prevStep: Moving to step', currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    console.log('renderStepContent: Rendering step', currentStep);
    const stepProps = { formData, handleInputChange, errors, calculateTotalPayment, motorcycles: bikes, bikesLoading };
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 {...stepProps} />;
      case 3: return <Step3 {...stepProps} />;
      case 4: return <Step4 {...stepProps} />;
      case 5: return <Step5 {...stepProps} />;
      case 6: return <Step6 {...stepProps} />;
      case 7: return <Step7 {...stepProps} />;
      case 8: return <Step8 {...stepProps} />;
      case 9: return <Step9 {...stepProps} />;
      case 10: return <Step10 {...stepProps} />;
      case 11: return <Step11 {...stepProps} />;
      case 12: return <Step12 {...stepProps} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-red-100 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-2">
              Registration Form NZ South Island 2025
            </h1>
            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm">Please correct the errors in the form before proceeding.</p>
            )}
          </div>
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Step {currentStep} of 12</span>
              <span className="text-xs sm:text-sm font-medium text-gray-700">{Math.round((currentStep / 12) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 12) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between mb-6 sm:mb-8 overflow-x-auto pb-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center min-w-0 flex-1 px-1 sm:px-2 ${
                  currentStep === step.number ? 'text-green-600' : step.completed ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-2 ${
                    currentStep === step.number
                      ? 'bg-green-500 text-white'
                      : step.completed
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  {step.completed ? '✓' : step.number}
                </div>
                <span className="text-xs sm:text-sm text-center leading-tight hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              <div className="flex justify-between mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1 || loading}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 ${
                    currentStep === 1 || loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  Previous
                </button>
                {currentStep < 12 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={loading}
                    className={`px-4 sm:px-6 py-2 sm:py-3 font-medium rounded-lg transition-colors duration-200 ${
                      loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 sm:px-6 py-2 sm:py-3 font-medium rounded-lg transition-colors duration-200 ${
                      loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Submit Registration'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NZSIRegistrationFormRefactored;
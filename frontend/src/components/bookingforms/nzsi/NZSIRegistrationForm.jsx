import React, { useState } from 'react';
import MedicalInfoSection from './MedicalInfoSection';

// Import bike images
import bmw1300GS from '../../assets/adventures/2025/NZSI/Bikes/BMW-1300-GS-A-1.webp';
import bmwF750GS from '../../assets/adventures/2025/NZSI/Bikes/BMW-F750GS_165031-scaled.webp';
import bmwF800GS from '../../assets/adventures/2025/NZSI/Bikes/BMW-F800GS.webp';
import bmwF850GS from '../../assets/adventures/2025/NZSI/Bikes/BMW-F850GS_165032-scaled.webp';
import bmwR1200GS from '../../assets/adventures/2025/NZSI/Bikes/BMW-R1200GS_GSA-_165034-scaled.webp';
import bmwR1200GSLow from '../../assets/adventures/2025/NZSI/Bikes/BMW R1200GS LOW.webp';
import bmwF850GSLowHigh from '../../assets/adventures/2025/NZSI/Bikes/BMW F850GS LOW  HIGH SEAT.webp';
import hondaCB500X from '../../assets/adventures/2025/NZSI/Bikes/Honda-CB500X_165042-scaled.webp';
import hondaNX500 from '../../assets/adventures/2025/NZSI/Bikes/HONDA-NX500-1.webp';
import yamahaTenere700 from '../../assets/adventures/2025/NZSI/Bikes/Yamaha-XTZ690-T7-Tenere-700_165048-scaled.webp';

const NZSIRegistrationForm = () => {
  console.log('NZSIRegistrationForm component loaded');
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Personal Details
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
    
    // Emergency Contacts
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
    
    // Medical Information
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
    
    // Experience
    hasTraining: '',
    recentTraining: '',
    trainingDetails: '',
    offRoadExperience: '',
    experienceLevel: '',
    confidenceAreas: '',
    
    // Motorcycle Selection
    selectedMotorcycle: '',
    
        // Payment
        paymentOption: '',
        partnerIncluded: false,
        // Motorcycle Selection
        hireOption: 'Hire a Motorcycle',
        
        // Driver's Licence Details
        licenceValid: '',
        licenceNumber: '',
        licenceExpiryDate: '',
        licenceState: '',
        
        // Safety & Navigation Equipment
        hydration: [],
        electronicEquipment: [],
        upperProtective: [],
        lowerProtective: [],
        bootBrand: '',
        mechanicalRelated: [],
        quadlockConfirmation: false,
        otherSafetyEquipment: '',
        phoneMount: '',
        phoneCharging: '',
        
        // Shirt Size & Accommodation
        shirtSize: '',
        accommodationPreference: '',
        registerPartner: '',
        partnerType: '',
        
        // Partner Details
        partnerFullName: '',
        partnerGender: '',
        partnerEmail: '',
        partnerMobile: '',
        partnerAddress: '',
        partnerAddress2: '',
        partnerCity: '',
        partnerState: '',
        partnerPostCode: '',
        partnerMedicalCondition: '',
        partnerMedicalConditionDescription: '',
        partnerMedicationsDescription: '',
        partnerRegularMedication: '',
        partnerRegularMedicationDescription: '',
        partnerMedicationAllergies: '',
        partnerMedicationAllergiesDescription: '',
        partnerFoodAllergies: '',
        partnerFoodAllergiesList: '',
        
        // Riding with a Group & Gift Voucher
        ridingWithGroup: '',
        groupMembers: '',
        giftVoucherCode: '',
        
        // Terms and Conditions
        agreeToTerms: false,
        termsAgreement: ''
  });

  const steps = [
    { number: 1, title: 'Information' },
    { number: 2, title: 'Personal Details' },
    { number: 3, title: 'Emergency Contacts' },
    { number: 4, title: 'Medical Information' },
    { number: 5, title: 'Experience' },
    { number: 6, title: 'Motorcycle Selection' },
    { number: 7, title: 'Driver\'s Licence Details' },
    { number: 8, title: 'Safety & Navigation Equipment' },
    { number: 9, title: 'Shirt Size & Accommodation' },
    { number: 10, title: 'Riding with a Group' },
    { number: 11, title: 'Terms and Conditions' },
    { number: 12, title: 'Payment Summary' }
  ];

  const motorcycles = [
    { 
      name: 'BMW R1250GS ADV', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'BMW 1300 GS ADV', 
      price: 440, 
      available: true, 
      remaining: 1, 
      image: bmw1300GS,
      specs: {
        mileage: 'Not Available',
        displacement: '1300 cc',
        engineType: 'Air/Liquid-cooled Four Stroke Flat Twin Engine, Double Overhead Camshaft, One Balance Shaft and Variable Engine Timing System BMW Shiftcam.',
        cylinders: '2',
        maxPower: 'Not Available',
        maxTorque: 'Not Available',
        frontBrake: 'Not Available',
        rearBrake: 'Not Available',
        fuelCapacity: '19 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW R1250GS', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'BMW R1200GS', 
      price: 279, 
      available: true, 
      remaining: 11, 
      image: bmwR1200GS,
      specs: {
        mileage: '16 kmpl',
        displacement: '1170 cc',
        engineType: 'Air/Liquid-cooled Four Stroke Flat Twin Engine, Double Overhead Camshaft, One Balance Shaft and Variable Engine Timing System BMW Shiftcam.',
        cylinders: '2',
        maxPower: '125 PS @ 7750 rpm',
        maxTorque: '125 Nm @ 6500 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '20 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW R1200GS LOW', 
      price: 279, 
      available: true, 
      remaining: 2, 
      image: bmwR1200GSLow,
      specs: {
        mileage: '16 kmpl',
        displacement: '1170 cc',
        engineType: 'Air/Liquid-cooled Four Stroke Flat Twin Engine, Double Overhead Camshaft, One Balance Shaft and Variable Engine Timing System BMW Shiftcam.',
        cylinders: '2',
        maxPower: '125 PS @ 7750 rpm',
        maxTorque: '125 Nm @ 6500 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '20 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW R1200GS ADV', 
      price: 279, 
      available: true, 
      remaining: 1, 
      image: bmwR1200GS,
      specs: {
        mileage: '16 kmpl',
        displacement: '1170 cc',
        engineType: 'Air/Liquid-cooled Four Stroke Flat Twin Engine, Double Overhead Camshaft, One Balance Shaft and Variable Engine Timing System BMW Shiftcam.',
        cylinders: '2',
        maxPower: '125 PS @ 7750 rpm',
        maxTorque: '125 Nm @ 6500 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '20 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW F850GS', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'BMW F850GS LOW / HIGH SEAT', 
      price: 259, 
      available: true, 
      remaining: 1, 
      image: bmwF850GSLowHigh,
      specs: {
        mileage: '24 kmpl',
        displacement: '853 cc',
        engineType: 'Water-cooled 4-Stroke In-line Two-cylinder Engine, Four Valves Per Cylinder, Two Overhead Camshafts, Dry Sump Lubrication',
        cylinders: '2',
        maxPower: '95.17 PS @ 8250 rpm',
        maxTorque: '92 Nm @ 6250 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '23 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW F850GS LOW SEAT', 
      price: 259, 
      available: true, 
      remaining: 1, 
      image: bmwF850GS,
      specs: {
        mileage: '24 kmpl',
        displacement: '853 cc',
        engineType: 'Water-cooled 4-Stroke In-line Two-cylinder Engine, Four Valves Per Cylinder, Two Overhead Camshafts, Dry Sump Lubrication',
        cylinders: '2',
        maxPower: '95.17 PS @ 8250 rpm',
        maxTorque: '92 Nm @ 6250 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '23 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW F750GS', 
      price: 229, 
      available: true, 
      remaining: 1, 
      image: bmwF750GS,
      specs: {
        mileage: '25 kmpl',
        displacement: '853 cc',
        engineType: 'Water-cooled 4-Stroke In-line Two-cylinder Engine, Four Valves Per Cylinder, Two Overhead Camshafts, Dry Sump Lubrication',
        cylinders: '2',
        maxPower: '77.49 PS @ 7500 rpm',
        maxTorque: '83 Nm @ 6000 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '15 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW F750GS LOW', 
      price: 229, 
      available: true, 
      remaining: 2, 
      image: bmwF750GS,
      specs: {
        mileage: '25 kmpl',
        displacement: '853 cc',
        engineType: 'Water-cooled 4-Stroke In-line Two-cylinder Engine, Four Valves Per Cylinder, Two Overhead Camshafts, Dry Sump Lubrication',
        cylinders: '2',
        maxPower: '77.49 PS @ 7500 rpm',
        maxTorque: '83 Nm @ 6000 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '15 L',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW F800GS', 
      price: 229, 
      available: true, 
      remaining: 1, 
      image: bmwF800GS,
      specs: {
        mileage: '---',
        displacement: '798 cc',
        engineType: 'Engine is liquid cooled with fuel injection',
        cylinders: '2',
        maxPower: '75 Bhp',
        maxTorque: '76 Nm',
        frontBrake: 'Double Disc',
        rearBrake: 'Disc',
        fuelCapacity: 'Not Available',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW F800GS LOW', 
      price: 229, 
      available: true, 
      remaining: 2, 
      image: bmwF800GS,
      specs: {
        mileage: '---',
        displacement: '798 cc',
        engineType: 'Engine is liquid cooled with fuel injection',
        cylinders: '2',
        maxPower: '75 Bhp',
        maxTorque: '76 Nm',
        frontBrake: 'Double Disc',
        rearBrake: 'Disc',
        fuelCapacity: 'Not Available',
        bodyType: 'Adventure Tourer Bikes'
      }
    },
    { 
      name: 'BMW F800GS ADV', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'BMW F800GS ADV LOW', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'Honda CB500X', 
      price: 179, 
      available: true, 
      remaining: 1, 
      image: hondaCB500X,
      specs: {
        mileage: '28 kmpl',
        displacement: '471.03 cc',
        engineType: '4 Stroke, SI Engine (Parallel Twin)',
        cylinders: '2',
        maxPower: '47.58 PS @ 8500 rpm',
        maxTorque: '43.2 Nm @ 6500 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '17.7 L',
        bodyType: 'Adventure Tourer Bikes, Off Road Bikes'
      }
    },
    { 
      name: 'Honda NX500', 
      price: 179, 
      available: true, 
      remaining: 1, 
      image: hondaNX500,
      specs: {
        mileage: '28 kmpl',
        displacement: '471.03 cc',
        engineType: '4 Stroke, SI Engine (Parallel Twin)',
        cylinders: '2',
        maxPower: '47.58 PS @ 8500 rpm',
        maxTorque: '43.2 Nm @ 6500 rpm',
        frontBrake: 'Disc',
        rearBrake: 'Disc',
        fuelCapacity: '17.7 L',
        bodyType: 'Adventure Tourer Bikes, Off Road Bikes'
      }
    },
    { 
      name: 'Honda CB500X ADV', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'Yamaha Tenere 700', 
      price: 209, 
      available: true, 
      remaining: 1, 
      image: yamahaTenere700,
      specs: {
        mileage: 'Not Available',
        displacement: '689 cc',
        engineType: 'Liquid-cooled, 4-stroke, DOHC, 4 valve, 2-cylinder',
        cylinders: '2',
        maxPower: 'Not Available',
        maxTorque: 'Not Available',
        frontBrake: 'Not Available',
        rearBrake: 'Not Available',
        fuelCapacity: '16 L',
        bodyType: 'Adventure Tourer Bikes, Off Road Bikes'
      }
    },
    { 
      name: 'Yamaha Tenere 700 ADV', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'Yamaha Tenere 700 LOW', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    },
    { 
      name: 'Yamaha Tenere 700 ADV LOW', 
      price: 0, 
      available: false, 
      remaining: 0, 
      image: null,
      specs: null
    }
  ];

  // Function to get the selected bike image
  const getSelectedBikeImage = () => {
    const selectedBike = motorcycles.find(bike => bike.name === formData.selectedMotorcycle);
    return selectedBike ? selectedBike.image : null;
  };

  // Function to get the selected bike specifications
  const getSelectedBikeSpecs = () => {
    const selectedBike = motorcycles.find(bike => bike.name === formData.selectedMotorcycle);
    return selectedBike ? selectedBike.specs : null;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && (name === 'hydration' || name === 'electronicEquipment' || name === 'upperProtective' || name === 'lowerProtective' || name === 'mechanicalRelated')) {
      // Handle checkbox arrays for equipment categories
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else if (type === 'checkbox') {
      // Handle regular checkboxes
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      // Handle text inputs, radio buttons, etc.
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 2: // Personal Details
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required to fill';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required to fill';
        if (!formData.gender) newErrors.gender = 'Gender is required to select';
        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required to fill';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.confirmEmail.trim()) {
          newErrors.confirmEmail = 'Confirm email is required to fill';
        } else if (formData.email !== formData.confirmEmail) {
          newErrors.confirmEmail = 'Email addresses do not match';
        }
        if (!formData.birthday) newErrors.birthday = 'Birthday is required to fill';
        if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required to fill';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required to fill';
        if (!formData.address.trim()) newErrors.address = 'Street address is required to fill';
        if (!formData.city.trim()) newErrors.city = 'City is required to fill';
        if (!formData.postCode.trim()) newErrors.postCode = 'Post code is required to fill';
        if (!formData.country) newErrors.country = 'Country is required to select';
        if ((formData.country === 'Australia' || formData.country === 'New Zealand') && !formData.state) {
          newErrors.state = formData.country === 'New Zealand' ? 'State/Region is required to select' : 'State is required to select';
        }
        if (!formData.phonePlatform) newErrors.phonePlatform = 'Phone platform is required to select';
        if (!formData.phoneModel.trim()) newErrors.phoneModel = 'Phone model is required to fill';
        if (!formData.hasGPS) newErrors.hasGPS = 'GPS question is required to answer';
        if (!formData.hasFacebook) newErrors.hasFacebook = 'Facebook question is required to answer';
        break;
        
      case 3: // Emergency Contacts
        if (!formData.emergency1FirstName.trim()) newErrors.emergency1FirstName = 'Emergency contact 1 first name is required';
        if (!formData.emergency1LastName.trim()) newErrors.emergency1LastName = 'Emergency contact 1 last name is required';
        if (!formData.emergency1Email.trim()) {
          newErrors.emergency1Email = 'Emergency contact 1 email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.emergency1Email)) {
          newErrors.emergency1Email = 'Emergency contact 1 email is invalid';
        }
        if (!formData.emergency1Relationship.trim()) newErrors.emergency1Relationship = 'Emergency contact 1 relationship is required';
        if (!formData.emergency2FirstName.trim()) newErrors.emergency2FirstName = 'Emergency contact 2 first name is required';
        if (!formData.emergency2LastName.trim()) newErrors.emergency2LastName = 'Emergency contact 2 last name is required';
        if (!formData.emergency2Email.trim()) {
          newErrors.emergency2Email = 'Emergency contact 2 email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.emergency2Email)) {
          newErrors.emergency2Email = 'Emergency contact 2 email is invalid';
        }
        if (!formData.emergency2Relationship.trim()) newErrors.emergency2Relationship = 'Emergency contact 2 relationship is required';
        break;
        
      case 4: // Medical Information
        if (!formData.hasMedicalCondition) newErrors.hasMedicalCondition = 'Medical condition question is required to answer';
        if (!formData.hasMedicationAllergies) newErrors.hasMedicationAllergies = 'Medication allergies question is required to answer';
        if (!formData.hasFoodAllergies) newErrors.hasFoodAllergies = 'Food allergies question is required to answer';
        if (!formData.hasHealthFund) newErrors.hasHealthFund = 'Health fund question is required to answer';
        if (!formData.medicareNumber.trim()) newErrors.medicareNumber = 'Medicare number is required to fill';
        if (!formData.medicarePosition.trim()) newErrors.medicarePosition = 'Medicare card position is required to fill';
        break;
        
      case 5: // Experience
        if (!formData.hasTraining) newErrors.hasTraining = 'Training question is required to answer';
        if (formData.hasTraining === 'Yes' && !formData.recentTraining) {
          newErrors.recentTraining = 'Recent training question is required to answer';
        }
        if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required to select';
        break;
        
          case 6: // Motorcycle Selection
            console.log('Validating step 6 - Motorcycle Selection');
            console.log('hireOption:', formData.hireOption);
            console.log('selectedMotorcycle:', formData.selectedMotorcycle);
            if (!formData.hireOption) newErrors.hireOption = 'Hire option is required to select';
            if (!formData.selectedMotorcycle) newErrors.selectedMotorcycle = 'Motorcycle selection is required';
            console.log('Step 6 errors:', newErrors);
            break;
            
          case 7: // Driver's Licence Details
            if (!formData.licenceValid) newErrors.licenceValid = 'Licence validity is required to answer';
            if (!formData.licenceNumber.trim()) newErrors.licenceNumber = 'Licence number is required to fill';
            if (!formData.licenceExpiryDate) newErrors.licenceExpiryDate = 'Licence expiry date is required to fill';
            if (!formData.licenceState) newErrors.licenceState = 'State of issue is required to select';
            break;
            
          case 8: // Safety & Navigation Equipment
            if (formData.hydration.length === 0) newErrors.hydration = 'Hydration equipment is required to select';
            if (formData.electronicEquipment.length === 0) newErrors.electronicEquipment = 'Electronic equipment is required to select';
            if (formData.upperProtective.length === 0) newErrors.upperProtective = 'Upper protective equipment is required to select';
            if (formData.lowerProtective.length === 0) newErrors.lowerProtective = 'Lower protective equipment is required to select';
            if (!formData.bootBrand.trim()) newErrors.bootBrand = 'Boot brand is required to fill';
            if (formData.mechanicalRelated.length === 0) newErrors.mechanicalRelated = 'Mechanical equipment is required to select';
            if (formData.mechanicalRelated.length === 0 && !formData.otherSafetyEquipment.trim()) newErrors.otherSafetyEquipment = 'Other safety equipment description is required to fill';
            if (!formData.phoneMount) newErrors.phoneMount = 'Phone mount question is required to answer';
            if (!formData.phoneCharging) newErrors.phoneCharging = 'Phone charging question is required to answer';
            break;
            
          case 9: // Shirt Size & Accommodation
            if (!formData.shirtSize) newErrors.shirtSize = 'Shirt size is required to select';
            if (!formData.accommodationPreference) newErrors.accommodationPreference = 'Accommodation preference is required to select';
            if (formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION' && !formData.registerPartner) {
              newErrors.registerPartner = 'Partner registration question is required to answer';
            }
            if (formData.registerPartner === 'Yes' && !formData.partnerType) {
              newErrors.partnerType = 'Partner type is required to select';
            }
            // Partner details validation
            if (formData.registerPartner === 'Yes') {
              if (!formData.partnerFullName.trim()) newErrors.partnerFullName = 'Partner full name is required';
              if (!formData.partnerGender) newErrors.partnerGender = 'Partner gender is required to select';
              if (!formData.partnerEmail.trim()) {
                newErrors.partnerEmail = 'Partner email is required';
              } else if (!/\S+@\S+\.\S+/.test(formData.partnerEmail)) {
                newErrors.partnerEmail = 'Partner email is invalid';
              }
              if (!formData.partnerMobile.trim()) newErrors.partnerMobile = 'Partner mobile number is required';
              if (!formData.partnerAddress.trim()) newErrors.partnerAddress = 'Partner street address is required';
              if (!formData.partnerCity.trim()) newErrors.partnerCity = 'Partner city is required';
              if (!formData.partnerState) newErrors.partnerState = 'Partner state is required to select';
              if (!formData.partnerPostCode.trim()) newErrors.partnerPostCode = 'Partner post code is required';
              if (!formData.partnerMedicalCondition) newErrors.partnerMedicalCondition = 'Partner medical condition question is required to answer';
              if (formData.partnerMedicalCondition === 'Yes' && !formData.partnerMedicalConditionDescription.trim()) {
                newErrors.partnerMedicalConditionDescription = 'Partner medical condition description is required';
              }
              if (formData.partnerMedicalCondition === 'Yes' && !formData.partnerMedicationsDescription.trim()) {
                newErrors.partnerMedicationsDescription = 'Partner medications description is required';
              }
              if (!formData.partnerRegularMedication) newErrors.partnerRegularMedication = 'Partner regular medication question is required to answer';
              if (formData.partnerRegularMedication === 'Yes' && !formData.partnerRegularMedicationDescription.trim()) {
                newErrors.partnerRegularMedicationDescription = 'Partner regular medication description is required';
              }
              if (!formData.partnerMedicationAllergies) newErrors.partnerMedicationAllergies = 'Partner medication allergies question is required to answer';
              if (formData.partnerMedicationAllergies === 'Yes' && !formData.partnerMedicationAllergiesDescription.trim()) {
                newErrors.partnerMedicationAllergiesDescription = 'Partner medication allergies description is required';
              }
              if (!formData.partnerFoodAllergies) newErrors.partnerFoodAllergies = 'Partner food allergies question is required to answer';
              if (formData.partnerFoodAllergies === 'Yes' && !formData.partnerFoodAllergiesList.trim()) {
                newErrors.partnerFoodAllergiesList = 'Partner food allergies list is required';
              }
            }
            break;
            
          case 10: // Riding with a Group
            if (!formData.ridingWithGroup) newErrors.ridingWithGroup = 'Group riding question is required to answer';
            if (formData.ridingWithGroup === 'Yes' && !formData.groupMembers.trim()) {
              newErrors.groupMembers = 'Group members information is required';
            }
            break;
            
          case 11: // Terms and Conditions
            if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
            if (!formData.termsAgreement.trim()) {
              newErrors.termsAgreement = 'Terms agreement text is required';
            } else if (formData.termsAgreement !== 'I AGREE') {
              newErrors.termsAgreement = 'You must type "I AGREE" exactly';
            }
            break;
            
          case 12: // Payment & Confirmation
            if (!formData.paymentOption) newErrors.paymentOption = 'Payment option is required';
            break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep < 12) {
      console.log('Current step:', currentStep);
      console.log('Form data for current step:', formData);
      const isValid = validateStep(currentStep);
      console.log('Validation result:', isValid);
      console.log('Current errors:', errors);
      
      if (isValid) {
        setCurrentStep(currentStep + 1);
        // Scroll to top when moving to next step
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        // Scroll to the first error field
        setTimeout(() => {
          const firstErrorField = document.querySelector('.border-red-500');
          if (firstErrorField) {
            firstErrorField.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
            firstErrorField.focus();
          }
        }, 100);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when moving to previous step
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Log the form data
      console.log('Form submitted with data:', formData);
      
      // Show success message
      alert('Registration submitted successfully! We will contact you soon.');
      
      // Scroll to top after successful submission
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      // Optionally redirect or reset the form
      // window.location.href = '/thank-you';
    } else {
      // Scroll to the first error field
      setTimeout(() => {
        const firstErrorField = document.querySelector('.border-red-500');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          firstErrorField.focus();
        }
      }, 100);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">READ THE FOLLOWING BEFORE YOU START</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-yellow-800 font-semibold">
                <strong>THIS IS THE NZSI EVENT REGISTRATION PAGE - THIS IS NOT THE PAGE TO REQUEST EVENT INFORMATION. To request information about this event CLICK HERE</strong>
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 text-gray-700">
              <p className="text-base sm:text-lg">
                Welcome to the New Zealand South Island 2025 (NZSI2025) registration page!
              </p>
              
              <p>
                You're about to secure your spot on one of the most unique and incredible off-road motorcycle adventures possible. There is nothing in Australia that compares to riding the incredible trails NZSI. And let's be honest, riding something different, other than the east coast of Australia, will be a refreshing change, right?
              </p>
              
              <p>
                In true Moto Trekkin form we've spent months planning, scoping and verifying the most achievable, yet most exciting and scenic routes available on the South Island of New Zealand. In the process we have circumnavigated the entire south island multiple times, also criss crossing the country in multiple directions to deliver a truly awesome motorcycle experience for you.
              </p>
              
              <p>
                The result is six breathtaking days of the best sealed and unsealed adventure riding routes available anywhere in the world. We've also planned adequate time each day for you to explore and enjoy the local offerings of NZSI.
              </p>
              
              <p>
                NZSI is open to the first fifty successful registrations, which is limited only by the number of hire motorcycles available. During registration you will choose your preferred motorcycle which will be included in the price presented to you at the completion of your online registration.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">ACCOMMODATION</h4>
              <p className="text-xs sm:text-sm text-blue-800">
                Camping is not available on this event. Shared and private accommodation are the only two options
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-green-800 mb-2">PAYMENT</h4>
              <p className="text-xs sm:text-sm text-green-800 mb-2">
                We are offering three payment options which are:
              </p>
              <div className="text-xs sm:text-sm text-green-800 space-y-1">
                <p><strong>Option 1</strong> - Three equal payments. Deposit upon registration followed by two additional equal payments scheduled on specific dates.</p>
                <p><strong>Option 2</strong> - Full payment at the time of completing your registration</p>
                <p><strong>Option 3</strong> - Payright - An interest free payment plan option over various length of time.</p>
              </div>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">COMPLETING YOUR REGISTRATION</h4>
              <p className="text-xs sm:text-sm text-gray-800">
                Completing your registration should take around 15 minutes and can be done using your desktop computer, tablet, or smartphone. Please ensure you provide accurate information when completing the form.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-orange-800 mb-2">INFORMATION RECOMMENDATION</h4>
              <p className="text-xs sm:text-sm text-orange-800">
                If you have not already done so please requested a copy of the full event information kit which outlines inclusions and pricing BEFORE you commence this registration process. Familiarise yourself with meal, accommodation and event inclusions as this event will have a different format and different inclusions to our previous events.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-red-800 mb-2">BEFORE MAKING PAYMENT</h4>
              <p className="text-xs sm:text-sm text-red-800">
                Please be aware that because of the nature of this event and the requirement for Moto Trekkin to book and pay for every aspect of the event in advance any payments you make are non refundable if you change your mind or your circumstances change. If this concerns you, or you are uncertain about your future commitments, DO NOT book this event.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-purple-800 mb-2">EVENT TERMS AND CONDITIONS</h4>
              <p className="text-xs sm:text-sm text-purple-800">
                Read the event terms and conditions when presented to you. To ensure fairness to all our participants, we administer our events in strict accordance with the event terms and conditions. Please invest the time necessary to read and understand how this particular event will be run.
              </p>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2">PREPARE BEFORE YOU BEGIN</h4>
              <p className="text-xs sm:text-sm text-indigo-800 mb-2">
                As part of the event registration process, you will need the following information. We recommend you have this information available prior to commencement.
              </p>
              <ul className="text-xs sm:text-sm text-indigo-800 list-disc list-inside space-y-1">
                <li>Passport details</li>
                <li>Medications you currently take</li>
                <li>Personal health and next of kin details</li>
                <li>Health fund name and membership number</li>
                <li>Medicare Number and position on your card</li>
                <li>Details of any ambulance cover if separate to health fund</li>
                <li>The expiry date of your licence</li>
                <li>A Visa or MasterCard to complete your payment</li>
                <li>Minimum deposit is 1/3 of your total ticket price.</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">DON'T LEAVE BLANK SPACES ANYWHERE ON EVERY REGISTRATION PAGE</h4>
              <p className="text-sm text-yellow-800">
                The information fields on the following pages need to be completed correctly, otherwise you will receive processing errors, or the payment process will not appear. If this happens to you, go back and check you haven't missed a field or inadvertently entered any information in the incorrect format. If you have technical difficulties, our phone number is at the bottom of each information page. You can call us anytime – even after hours if you're having any technical issues.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-800 mb-2">DECLINED PAYMENTS</h4>
              <p className="text-sm text-red-800">
                Please ensure you have the available funds on your card before you begin to prevent your registration form from reset to resetting.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">WHY WE REQUIRE THIS INFORMATION</h4>
              <p className="text-sm text-blue-800">
                In order to meet our duty of care, insurance requirements and to ensure your safety during this event, we are obligated to obtain specific personal health and other information from you. If you have an accident or a health incident of any kind on route, our paramedics and NZ Ambulance need to be aware of any medications, allergies or health conditions you have. Providing this important information to us could be critical to your care if needed. All the information you provide to us is kept in the strictest confidence and is only accessed by senior management with a valid reason, including our medical teams prior to, and during the event. If you do not provide this information you will not be able to complete your registration for this event.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <h4 className="text-lg font-semibold text-green-800 mb-2">YOUR SAFETY</h4>
              <p className="text-sm text-green-800">
                We need to be sure you have the the required riding experience, appropriate riding and safety equipment, the physical capacity and endurance, along with the mental toughness required enjoy this adventure. Please answer all of the questions honestly.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Personal Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Email *</label>
                <input
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.confirmEmail ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Birthday *</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.birthday ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              />
              {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occupation *</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.occupation ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              />
              {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.mobile ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Landline</label>
                <input
                  type="tel"
                  name="landline"
                  value={formData.landline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Code *</label>
                <input
                  type="text"
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.postCode ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.postCode && <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.country ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                >
                  <option value="">Choose your country</option>
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
              
              {(formData.country === 'Australia' || formData.country === 'New Zealand') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.country === 'New Zealand' ? 'State/Region *' : 'State *'}
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.state ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  >
                    <option value="">
                      {formData.country === 'New Zealand' ? 'CHOOSE YOUR STATE/REGION' : 'CHOOSE YOUR STATE'}
                    </option>
                    {formData.country === 'Australia' ? (
                      <>
                        <option value="ACT">ACT</option>
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="NT">NT</option>
                        <option value="WA">WA</option>
                        <option value="TAS">TAS</option>
                        <option value="SA">SA</option>
                      </>
                    ) : (
                      <>
                        <option value="AUK">AUK</option>
                        <option value="BOP">BOP</option>
                        <option value="CAN">CAN</option>
                        <option value="GIS">GIS</option>
                        <option value="HKB">HKB</option>
                        <option value="MWT">MWT</option>
                        <option value="MBH">MBH</option>
                        <option value="NSN">NSN</option>
                        <option value="NTL">NTL</option>
                        <option value="OTA">OTA</option>
                        <option value="STL">STL</option>
                        <option value="TKI">TKI</option>
                        <option value="TAS">TAS</option>
                        <option value="WKO">WKO</option>
                        <option value="WGN">WGN</option>
                        <option value="WTC">WTC</option>
                      </>
                    )}
                  </select>
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Platform *</label>
              <select
                name="phonePlatform"
                value={formData.phonePlatform}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">PLEASE CHOOSE FROM THE OPTIONS PROVIDED</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Model *</label>
              <input
                type="text"
                name="phoneModel"
                value={formData.phoneModel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Does your phone have built-in GPS? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasGPS"
                    value="Yes"
                    checked={formData.hasGPS === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasGPS"
                    value="No"
                    checked={formData.hasGPS === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a Facebook account? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasFacebook"
                    value="Yes"
                    checked={formData.hasFacebook === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasFacebook"
                    value="No"
                    checked={formData.hasFacebook === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contact Details</h3>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Next of Kin / Emergency Contact 1</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="emergency1FirstName"
                    value={formData.emergency1FirstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency1FirstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency1FirstName && <p className="text-red-500 text-sm mt-1">{errors.emergency1FirstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="emergency1LastName"
                    value={formData.emergency1LastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency1LastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency1LastName && <p className="text-red-500 text-sm mt-1">{errors.emergency1LastName}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="emergency1Email"
                    value={formData.emergency1Email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency1Email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency1Email && <p className="text-red-500 text-sm mt-1">{errors.emergency1Email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="emergency1Mobile"
                    value={formData.emergency1Mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Landline</label>
                  <input
                    type="tel"
                    name="emergency1Landline"
                    value={formData.emergency1Landline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                  <input
                    type="text"
                    name="emergency1Relationship"
                    value={formData.emergency1Relationship}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency1Relationship ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency1Relationship && <p className="text-red-500 text-sm mt-1">{errors.emergency1Relationship}</p>}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Next of Kin / Emergency Contact 2</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="emergency2FirstName"
                    value={formData.emergency2FirstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency2FirstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency2FirstName && <p className="text-red-500 text-sm mt-1">{errors.emergency2FirstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="emergency2LastName"
                    value={formData.emergency2LastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency2LastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency2LastName && <p className="text-red-500 text-sm mt-1">{errors.emergency2LastName}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="emergency2Email"
                    value={formData.emergency2Email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency2Email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency2Email && <p className="text-red-500 text-sm mt-1">{errors.emergency2Email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="emergency2Mobile"
                    value={formData.emergency2Mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Landline</label>
                  <input
                    type="tel"
                    name="emergency2Landline"
                    value={formData.emergency2Landline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                  <input
                    type="text"
                    name="emergency2Relationship"
                    value={formData.emergency2Relationship}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.emergency2Relationship ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    required
                  />
                  {errors.emergency2Relationship && <p className="text-red-500 text-sm mt-1">{errors.emergency2Relationship}</p>}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Medical Information</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800">
                Because we are venturing into remote areas where hospitals can be many hours away, it's important to advise us of any medical conditions you have, and any medications you take. This is to assist our medical team to understand your condition in the event of an illness or accident during the event. For your own safety, please disclose any and all conditions which affect your day to day capacity to ride a motorcycle, and or which we may need to know if a situation occurs.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you suffer a medical condition we need to know about? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasMedicalCondition"
                    value="Yes"
                    checked={formData.hasMedicalCondition === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasMedicalCondition"
                    value="No"
                    checked={formData.hasMedicalCondition === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.hasMedicalCondition && <p className="text-red-500 text-sm mt-1">{errors.hasMedicalCondition}</p>}
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any allergies to medication? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasMedicationAllergies"
                    value="Yes"
                    checked={formData.hasMedicationAllergies === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasMedicationAllergies"
                    value="No"
                    checked={formData.hasMedicationAllergies === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.hasMedicationAllergies && <p className="text-red-500 text-sm mt-1">{errors.hasMedicationAllergies}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any food or other allergies? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasFoodAllergies"
                    value="Yes"
                    checked={formData.hasFoodAllergies === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasFoodAllergies"
                    value="No"
                    checked={formData.hasFoodAllergies === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.hasFoodAllergies && <p className="text-red-500 text-sm mt-1">{errors.hasFoodAllergies}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a health fund? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasHealthFund"
                    value="Yes"
                    checked={formData.hasHealthFund === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasHealthFund"
                    value="No"
                    checked={formData.hasHealthFund === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.hasHealthFund && <p className="text-red-500 text-sm mt-1">{errors.hasHealthFund}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicare Number *</label>
                <input
                  type="text"
                  name="medicareNumber"
                  value={formData.medicareNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.medicareNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.medicareNumber && <p className="text-red-500 text-sm mt-1">{errors.medicareNumber}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicare Card Position *</label>
                <input
                  type="text"
                  name="medicarePosition"
                  value={formData.medicarePosition}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.medicarePosition ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  placeholder="123456789"
                  required
                />
                {errors.medicarePosition && <p className="text-red-500 text-sm mt-1">{errors.medicarePosition}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return <MedicalInfoSection formData={formData} handleInputChange={handleInputChange} errors={errors} />;

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Have you ever attended a professional off road motorcycle training course? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasTraining"
                    value="Yes"
                    checked={formData.hasTraining === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasTraining"
                    value="No"
                    checked={formData.hasTraining === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.hasTraining && <p className="text-red-500 text-sm mt-1">{errors.hasTraining}</p>}
            </div>

            {formData.hasTraining === 'Yes' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">If yes, was your training course completed in the last 6 months? *</label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recentTraining"
                        value="Yes"
                        checked={formData.recentTraining === 'Yes'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recentTraining"
                        value="No"
                        checked={formData.recentTraining === 'No'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                  {errors.recentTraining && <p className="text-red-500 text-sm mt-1">{errors.recentTraining}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Please detail course content such as advanced sand course etc.</label>
                  <textarea
                    name="trainingDetails"
                    value={formData.trainingDetails}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="WRITE N/A IF NOT APPLICABLE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Explain how much off road experience you have. It's okay if you don't have a lot of experience but we need to know.</label>
                  <textarea
                    name="offRoadExperience"
                    value={formData.offRoadExperience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="WRITE N/A IF NOT APPLICABLE"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall, how would you personally rate your off road riding experience. *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="Beginner"
                    checked={formData.experienceLevel === 'Beginner'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span className="font-medium">Beginner</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="Intermediate"
                    checked={formData.experienceLevel === 'Intermediate'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span className="font-medium">Intermediate</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value="Extreme"
                    checked={formData.experienceLevel === 'Extreme'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span className="font-medium">Extreme</span>
                </label>
              </div>
              {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Is there anything you feel you are not confident with that could cause an issue for you on this adventure ride?</label>
              <textarea
                name="confidenceAreas"
                value={formData.confidenceAreas}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="WRITE N/A IF NOT APPLICABLE"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Motorcycle Selection</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                Choose your preferred motorcycle. The price will be included in your total registration cost.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I would like to: *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hireOption"
                    value="Hire a Motorcycle"
                    checked={formData.hireOption === 'Hire a Motorcycle'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Hire a Motorcycle
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hireOption"
                    value="Use my own motorcycle"
                    checked={formData.hireOption === 'Use my own motorcycle'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Use my own motorcycle
                </label>
              </div>
              {errors.hireOption && <p className="text-red-500 text-sm mt-1">{errors.hireOption}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Choose which motorbike you wish to hire. (Required)</label>
              
              {/* Grid layout for motorcycles - 6 per row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                {motorcycles.map((bike, index) => (
                  <label
                    key={index}
                    className={`relative cursor-pointer group ${
                      !bike.available
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:shadow-lg transition-shadow duration-200'
                    } ${
                      formData.selectedMotorcycle === bike.name
                        ? 'ring-2 ring-blue-500 shadow-lg'
                        : ''
                    } border border-gray-300 rounded-lg p-3 sm:p-4`}
                  >
                    <input
                      type="radio"
                      name="selectedMotorcycle"
                      value={bike.name}
                      checked={formData.selectedMotorcycle === bike.name}
                      onChange={handleInputChange}
                      disabled={!bike.available}
                      className="sr-only"
                    />
                    
                    <div className={`bg-white rounded-lg border-2 p-3 sm:p-4 text-center transition-all duration-200 ${
                      formData.selectedMotorcycle === bike.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!bike.available ? 'border-gray-100' : ''}`}>
                      
                      {/* Bike Image */}
                      <div className="mb-3">
                        {bike.image ? (
                          <img
                            src={bike.image}
                            alt={bike.name}
                            className="w-full h-24 sm:h-32 object-cover rounded-md mx-auto"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-24 sm:h-32 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No Image</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Bike Details */}
                      <div className="space-y-1">
                        {!bike.available ? (
                          <div className="text-center">
                            <div className="text-red-500 font-semibold text-xs sm:text-sm mb-1">SOLD OUT</div>
                            <div className="text-gray-500 text-xs">{bike.name}</div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-gray-500 text-xs mb-1">({bike.remaining} remaining)</div>
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{bike.name}</div>
                            <div className="text-blue-600 font-bold text-xs sm:text-sm">${bike.price}/day</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.selectedMotorcycle && <p className="text-red-500 text-sm mt-2">{errors.selectedMotorcycle}</p>}
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Hire Date:</h4>
              <div className="text-sm text-gray-700">
                <p><strong>Collect on:</strong> 8th November 2025</p>
                <p><strong>Return on:</strong> 15th November 2025</p>
              </div>
            </div>

            {/* Selected Bike Image and Specifications */}
            {getSelectedBikeImage() && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Selected Motorcycle</h4>
                <div className="flex justify-center">
                  <img
                    src={getSelectedBikeImage()}
                    alt={formData.selectedMotorcycle}
                    className="max-w-full h-auto max-h-96 object-contain rounded-lg shadow-lg"
                  />
                </div>
                <p className="text-center text-gray-600 mt-2 font-medium">{formData.selectedMotorcycle}</p>
                
                {/* Bike Specifications */}
                {getSelectedBikeSpecs() && (
                  <div className="mt-4 sm:mt-6 bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">Specifications</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Mileage:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().mileage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Displacement:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().displacement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Cylinders:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().cylinders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Max Power:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().maxPower}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Max Torque:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().maxTorque}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Front Brake:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().frontBrake}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Rear Brake:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().rearBrake}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Fuel Capacity:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().fuelCapacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Body Type:</span>
                          <span className="text-xs sm:text-sm text-gray-800">{getSelectedBikeSpecs().bodyType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">Engine Type:</span>
                        <span className="text-sm text-gray-800 text-right max-w-xs">{getSelectedBikeSpecs().engineType}</span>
                      </div>
                    </div>
                    
                    {/* Daily Rate and Hire Date */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-center">
                          <h6 className="text-lg font-semibold text-blue-800 mb-2">Daily Rate</h6>
                          <p className="text-2xl font-bold text-blue-900">${motorcycles.find(bike => bike.name === formData.selectedMotorcycle)?.price}/day</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <h6 className="text-lg font-semibold text-blue-800 mb-2">Hire Date:</h6>
                          <div className="text-sm text-blue-700">
                            <p><strong>Collect on:</strong> 8th November 2025</p>
                            <p><strong>Return on:</strong> 15th November 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Driver's Licence Details</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Please note:</strong> You must have a valid driver's licence which is current at the time of commencing the event.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Is your licence currently valid? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="licenceValid"
                    value="Yes"
                    checked={formData.licenceValid === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="licenceValid"
                    value="No"
                    checked={formData.licenceValid === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.licenceValid && <p className="text-red-500 text-sm mt-1">{errors.licenceValid}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Licence Number *</label>
              <input
                type="text"
                name="licenceNumber"
                value={formData.licenceNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.licenceNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              />
              {errors.licenceNumber && <p className="text-red-500 text-sm mt-1">{errors.licenceNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Licence Expiry Date *</label>
              <input
                type="date"
                name="licenceExpiryDate"
                value={formData.licenceExpiryDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.licenceExpiryDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              />
              {errors.licenceExpiryDate && <p className="text-red-500 text-sm mt-1">{errors.licenceExpiryDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State of Issue *</label>
              <select
                name="licenceState"
                value={formData.licenceState}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.licenceState ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              >
                <option value="">CHOOSE YOUR STATE</option>
                <option value="ACT">ACT</option>
                <option value="NSW">NSW</option>
                <option value="VIC">VIC</option>
                <option value="QLD">QLD</option>
                <option value="NT">NT</option>
                <option value="WA">WA</option>
                <option value="TAS">TAS</option>
                <option value="SA">SA</option>
              </select>
              {errors.licenceState && <p className="text-red-500 text-sm mt-1">{errors.licenceState}</p>}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Safety & Navigation Equipment</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>You will be travelling in remote regions of NZ-SI and will require the following equipment. The following equipment is NOT included with your motorcycle hire. Please confirm you have the equipment listed below.</strong>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hydration *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="hydration"
                    value="2-3 Litre Hydro Back Pack"
                    checked={formData.hydration.includes('2-3 Litre Hydro Back Pack')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  2-3 Litre Hydro Back Pack
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="hydration"
                    value="None"
                    checked={formData.hydration.includes('None')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  None
                </label>
              </div>
              {errors.hydration && <p className="text-red-500 text-sm mt-1">{errors.hydration}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Electronic Equipment *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="electronicEquipment"
                    value="Personal Locating Beacon"
                    checked={formData.electronicEquipment.includes('Personal Locating Beacon')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Personal Locating Beacon
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="electronicEquipment"
                    value="Spot Tracker or similar"
                    checked={formData.electronicEquipment.includes('Spot Tracker or similar')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Spot Tracker or similar
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="electronicEquipment"
                    value="We will be using the GAIA GPS App to navigate during this event"
                    checked={formData.electronicEquipment.includes('We will be using the GAIA GPS App to navigate during this event')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  We will be using the GAIA GPS App to navigate during this event
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="electronicEquipment"
                    value="Powered phone mount located in full view for navigation"
                    checked={formData.electronicEquipment.includes('Powered phone mount located in full view for navigation')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Powered phone mount located in full view for navigation
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="electronicEquipment"
                    value="None"
                    checked={formData.electronicEquipment.includes('None')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  None
                </label>
              </div>
              {errors.electronicEquipment && <p className="text-red-500 text-sm mt-1">{errors.electronicEquipment}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upper Protective *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="upperProtective"
                    value="Armour inserts in jackets"
                    checked={formData.upperProtective.includes('Armour inserts in jackets')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Armour inserts in jackets
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="upperProtective"
                    value="Winter gloves (expect cold temps)"
                    checked={formData.upperProtective.includes('Winter gloves (expect cold temps)')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Winter gloves (expect cold temps)
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="upperProtective"
                    value="None"
                    checked={formData.upperProtective.includes('None')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  None
                </label>
              </div>
              {errors.upperProtective && <p className="text-red-500 text-sm mt-1">{errors.upperProtective}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lower Protective *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="lowerProtective"
                    value="Armour inserts in pants"
                    checked={formData.lowerProtective.includes('Armour inserts in pants')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Armour inserts in pants
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="lowerProtective"
                    value="Off-road boots"
                    checked={formData.lowerProtective.includes('Off-road boots')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Off-road boots
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="lowerProtective"
                    value="None"
                    checked={formData.lowerProtective.includes('None')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  None
                </label>
              </div>
              {errors.lowerProtective && <p className="text-red-500 text-sm mt-1">{errors.lowerProtective}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Please tell us what brand of boots you wear: *</label>
              <input
                type="text"
                name="bootBrand"
                value={formData.bootBrand}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.bootBrand ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              />
              {errors.bootBrand && <p className="text-red-500 text-sm mt-1">{errors.bootBrand}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mechanical Related *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Spare inner tube"
                    checked={formData.mechanicalRelated.includes('Spare inner tube')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Spare inner tube
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Tyre Repair Kit"
                    checked={formData.mechanicalRelated.includes('Tyre Repair Kit')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Tyre Repair Kit
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Tyre Levers"
                    checked={formData.mechanicalRelated.includes('Tyre Levers')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Tyre Levers
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Air Capsules"
                    checked={formData.mechanicalRelated.includes('Air Capsules')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Air Capsules
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Air Compressor"
                    checked={formData.mechanicalRelated.includes('Air Compressor')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Air Compressor
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Basic Tool Kit"
                    checked={formData.mechanicalRelated.includes('Basic Tool Kit')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Basic Tool Kit
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Jump Start Kit"
                    checked={formData.mechanicalRelated.includes('Jump Start Kit')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Jump Start Kit
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="mechanicalRelated"
                    value="Minimum fuel range of 350kms (Mandatory)"
                    checked={formData.mechanicalRelated.includes('Minimum fuel range of 350kms (Mandatory)')}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Minimum fuel range of 350kms (Mandatory)
                </label>
              </div>
              {errors.mechanicalRelated && <p className="text-red-500 text-sm mt-1">{errors.mechanicalRelated}</p>}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Quad Lock mounts are not provided with hire bikes. Tick below to confirm you will bring your own Quad lock mount suitable for the bar size of your selected hire motorcycle.</strong>
              </p>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="quadlockConfirmation"
                  checked={formData.quadlockConfirmation}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  I confirm I will supply a Quad Lock Mount and charging cable to be fitted to my hire motorcycle.
                </span>
              </label>
            </div>

            {formData.mechanicalRelated.length === 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe any other safety equipment you wish to carry *</label>
                <textarea
                  name="otherSafetyEquipment"
                  value={formData.otherSafetyEquipment}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.otherSafetyEquipment ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  required
                />
                {errors.otherSafetyEquipment && <p className="text-red-500 text-sm mt-1">{errors.otherSafetyEquipment}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a phone mount on your motorcycle that allows you to see your phone while riding? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="phoneMount"
                    value="Yes"
                    checked={formData.phoneMount === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="phoneMount"
                    value="No"
                    checked={formData.phoneMount === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.phoneMount && <p className="text-red-500 text-sm mt-1">{errors.phoneMount}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have the capacity to charge your phone while riding? *</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="phoneCharging"
                    value="Yes"
                    checked={formData.phoneCharging === 'Yes'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="phoneCharging"
                    value="No"
                    checked={formData.phoneCharging === 'No'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.phoneCharging && <p className="text-red-500 text-sm mt-1">{errors.phoneCharging}</p>}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Shirt Size & Accommodation</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred shirt size *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shirtSize"
                    value="S"
                    checked={formData.shirtSize === 'S'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  S
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shirtSize"
                    value="M"
                    checked={formData.shirtSize === 'M'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  M
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shirtSize"
                    value="L"
                    checked={formData.shirtSize === 'L'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  L
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shirtSize"
                    value="XL"
                    checked={formData.shirtSize === 'XL'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  XL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shirtSize"
                    value="2XL"
                    checked={formData.shirtSize === '2XL'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  2XL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shirtSize"
                    value="3XL"
                    checked={formData.shirtSize === '3XL'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  3XL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shirtSize"
                    value="4XL"
                    checked={formData.shirtSize === '4XL'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  4XL
                </label>
              </div>
              {errors.shirtSize && <p className="text-red-500 text-sm mt-1">{errors.shirtSize}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select your accommodation preference *</label>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodationPreference"
                    value="$3699 - SHARED ACCOMMODATION"
                    checked={formData.accommodationPreference === '$3699 - SHARED ACCOMMODATION'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">$3699 - SHARED ACCOMMODATION</div>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodationPreference"
                    value="$4890 - PRIVATE ACCOMMODATION"
                    checked={formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">$4890 - PRIVATE ACCOMMODATION</div>
                  </div>
                </label>
              </div>
              {errors.accommodationPreference && <p className="text-red-500 text-sm mt-1">{errors.accommodationPreference}</p>}
            </div>

            {/* Private Accommodation Details */}
            {formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION' && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">Private Accommodation Package includes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>All participants enjoy two nights of 5 star accommodation</li>
                    <li>Hotel accommodation 4 nights cabin/hotel/pub style rooms</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Partner Registration Section - Only for Private Accommodation */}
            {formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION' && (
              <div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">PARTNER</h4>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Would you like to register a partner to travel with you? *</label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="registerPartner"
                        value="Yes"
                        checked={formData.registerPartner === 'Yes'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="registerPartner"
                        value="No"
                        checked={formData.registerPartner === 'No'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                  {errors.registerPartner && <p className="text-red-500 text-sm mt-1">{errors.registerPartner}</p>}
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4">
                  <ul className="text-sm text-gray-800 space-y-1">
                    <li>• Available for private accommodation package only.</li>
                    <li>• Partner package is $1495, including all meals and other participant inclusions as listed in the event info kit.</li>
                    <li>• Including a partner or non-riding partner requires an additional 990 deposit at check out.</li>
                  </ul>
                </div>

                {/* Partner Type Selection */}
                {formData.registerPartner === 'Yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PLEASE CHOOSE *</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="partnerType"
                          value="Partner"
                          checked={formData.partnerType === 'Partner'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Partner
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="partnerType"
                          value="Partner in 4WD"
                          checked={formData.partnerType === 'Partner in 4WD'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Partner in 4WD
                      </label>
                    </div>
                    {errors.partnerType && <p className="text-red-500 text-sm mt-1">{errors.partnerType}</p>}

                    {/* Partner Information */}
                    <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mt-4">
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li>• Available for private accommodation package only.</li>
                        <li>• Partner package is $1495, including all meals and other participant inclusions as listed in the event info kit.</li>
                        <li>• Including a partner or non-riding partner requires an additional 990 deposit at check out.</li>
                      </ul>
                    </div>

                    {/* Partner Details Form */}
                    <div className="mt-6">
                      <h5 className="text-lg font-semibold text-gray-800 mb-4">Partner Details</h5>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="partnerFullName"
                            value={formData.partnerFullName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                              errors.partnerFullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                            }`}
                            required
                          />
                          {errors.partnerFullName && <p className="text-red-500 text-sm mt-1">{errors.partnerFullName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="partnerGender"
                                value="Male"
                                checked={formData.partnerGender === 'Male'}
                                onChange={handleInputChange}
                                className="mr-2"
                              />
                              Male
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="partnerGender"
                                value="Female"
                                checked={formData.partnerGender === 'Female'}
                                onChange={handleInputChange}
                                className="mr-2"
                              />
                              Female
                            </label>
                          </div>
                          {errors.partnerGender && <p className="text-red-500 text-sm mt-1">{errors.partnerGender}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            name="partnerEmail"
                            value={formData.partnerEmail}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                              errors.partnerEmail ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                            }`}
                            required
                          />
                          {errors.partnerEmail && <p className="text-red-500 text-sm mt-1">{errors.partnerEmail}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                          <input
                            type="tel"
                            name="partnerMobile"
                            value={formData.partnerMobile}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                              errors.partnerMobile ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                            }`}
                            required
                          />
                          {errors.partnerMobile && <p className="text-red-500 text-sm mt-1">{errors.partnerMobile}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                          <input
                            type="text"
                            name="partnerAddress"
                            value={formData.partnerAddress}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                              errors.partnerAddress ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                            }`}
                            required
                          />
                          {errors.partnerAddress && <p className="text-red-500 text-sm mt-1">{errors.partnerAddress}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address Line 2</label>
                          <input
                            type="text"
                            name="partnerAddress2"
                            value={formData.partnerAddress2}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                            <input
                              type="text"
                              name="partnerCity"
                              value={formData.partnerCity}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                                errors.partnerCity ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                              }`}
                              required
                            />
                            {errors.partnerCity && <p className="text-red-500 text-sm mt-1">{errors.partnerCity}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                            <select
                              name="partnerState"
                              value={formData.partnerState}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                                errors.partnerState ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                              }`}
                              required
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
                            {errors.partnerState && <p className="text-red-500 text-sm mt-1">{errors.partnerState}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Post Code *</label>
                          <input
                            type="text"
                            name="partnerPostCode"
                            value={formData.partnerPostCode}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                              errors.partnerPostCode ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                            }`}
                            required
                          />
                          {errors.partnerPostCode && <p className="text-red-500 text-sm mt-1">{errors.partnerPostCode}</p>}
                        </div>

                        {/* Partner Medical Information */}
                        <div className="mt-6">
                          <h6 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h6>
                          
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                              Because we are venturing into remote areas where hospitals can be many hours away, it's important to advise us of any medical conditions you have, and any medications you take. This is to assist our medical team to understand your condition in the event of an illness or accident during the event. For your own safety, please disclose any and all conditions which affect your day to day capacity to ride a motorcycle, and or which we may need to know if a situation occurs.
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Do you suffer a medical condition we need to know about? *</label>
                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerMedicalCondition"
                                    value="Yes"
                                    checked={formData.partnerMedicalCondition === 'Yes'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  Yes
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerMedicalCondition"
                                    value="No"
                                    checked={formData.partnerMedicalCondition === 'No'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  No
                                </label>
                              </div>
                              {errors.partnerMedicalCondition && <p className="text-red-500 text-sm mt-1">{errors.partnerMedicalCondition}</p>}
                              
                              {formData.partnerMedicalCondition === 'Yes' && (
                                <div className="mt-4 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Please describe your condition. All information is treated as highly confidential and is only viewed by our medical team in the event of an emergency involving you. *</label>
                                    <textarea
                                      name="partnerMedicalConditionDescription"
                                      value={formData.partnerMedicalConditionDescription}
                                      onChange={handleInputChange}
                                      rows={4}
                                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                                        errors.partnerMedicalConditionDescription ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                      }`}
                                      required
                                    />
                                    {errors.partnerMedicalConditionDescription && <p className="text-red-500 text-sm mt-1">{errors.partnerMedicalConditionDescription}</p>}
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Please describe any medications you take the dosages and frequency. *</label>
                                    <textarea
                                      name="partnerMedicationsDescription"
                                      value={formData.partnerMedicationsDescription}
                                      onChange={handleInputChange}
                                      rows={4}
                                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                                        errors.partnerMedicationsDescription ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                      }`}
                                      required
                                    />
                                    {errors.partnerMedicationsDescription && <p className="text-red-500 text-sm mt-1">{errors.partnerMedicationsDescription}</p>}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Do you take any regular medication? *</label>
                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerRegularMedication"
                                    value="Yes"
                                    checked={formData.partnerRegularMedication === 'Yes'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  Yes
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerRegularMedication"
                                    value="No"
                                    checked={formData.partnerRegularMedication === 'No'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  No
                                </label>
                              </div>
                              {errors.partnerRegularMedication && <p className="text-red-500 text-sm mt-1">{errors.partnerRegularMedication}</p>}
                              
                              {formData.partnerRegularMedication === 'Yes' && (
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Please tell us which medication you take regularly. *</label>
                                  <textarea
                                    name="partnerRegularMedicationDescription"
                                    value={formData.partnerRegularMedicationDescription}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                                      errors.partnerRegularMedicationDescription ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                    }`}
                                    required
                                  />
                                  {errors.partnerRegularMedicationDescription && <p className="text-red-500 text-sm mt-1">{errors.partnerRegularMedicationDescription}</p>}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any allergies to medication? *</label>
                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerMedicationAllergies"
                                    value="Yes"
                                    checked={formData.partnerMedicationAllergies === 'Yes'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  Yes
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerMedicationAllergies"
                                    value="No"
                                    checked={formData.partnerMedicationAllergies === 'No'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  No
                                </label>
                              </div>
                              {errors.partnerMedicationAllergies && <p className="text-red-500 text-sm mt-1">{errors.partnerMedicationAllergies}</p>}
                              
                              {formData.partnerMedicationAllergies === 'Yes' && (
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Please tell us any allergies you have to medication. *</label>
                                  <textarea
                                    name="partnerMedicationAllergiesDescription"
                                    value={formData.partnerMedicationAllergiesDescription}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                                      errors.partnerMedicationAllergiesDescription ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                    }`}
                                    required
                                  />
                                  {errors.partnerMedicationAllergiesDescription && <p className="text-red-500 text-sm mt-1">{errors.partnerMedicationAllergiesDescription}</p>}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any food or other allergies? *</label>
                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerFoodAllergies"
                                    value="Yes"
                                    checked={formData.partnerFoodAllergies === 'Yes'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  Yes
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="partnerFoodAllergies"
                                    value="No"
                                    checked={formData.partnerFoodAllergies === 'No'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                  />
                                  No
                                </label>
                              </div>
                              {errors.partnerFoodAllergies && <p className="text-red-500 text-sm mt-1">{errors.partnerFoodAllergies}</p>}
                              
                              {formData.partnerFoodAllergies === 'Yes' && (
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Please provide us with a list of your allergies below. *</label>
                                  <p className="text-sm text-gray-600 mb-2">List any food allergies, or foods you cannot eat for health reasons below</p>
                                  <p className="text-sm text-gray-500 mb-4">For example: allergic to nuts or seafood etc.</p>
                                  <textarea
                                    name="partnerFoodAllergiesList"
                                    value={formData.partnerFoodAllergiesList}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                                      errors.partnerFoodAllergiesList ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                    }`}
                                    required
                                  />
                                  {errors.partnerFoodAllergiesList && <p className="text-red-500 text-sm mt-1">{errors.partnerFoodAllergiesList}</p>}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

        
      case 10: // Riding with a Group
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Riding with a Group</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you planning to ride this event with a mate or several friends? i.e a group *</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ridingWithGroup"
                      value="Yes"
                      checked={formData.ridingWithGroup === 'Yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ridingWithGroup"
                      value="No"
                      checked={formData.ridingWithGroup === 'No'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                {errors.ridingWithGroup && <p className="text-red-500 text-sm mt-1">{errors.ridingWithGroup}</p>}
                
                {formData.ridingWithGroup === 'Yes' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter the first and last names of people you know are in your group *</label>
                    <p className="text-sm text-gray-600 mb-2">WRITE N/A IF NOT APPLICABLE</p>
                    <textarea
                      name="groupMembers"
                      value={formData.groupMembers}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                        errors.groupMembers ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      required
                    />
                    {errors.groupMembers && <p className="text-red-500 text-sm mt-1">{errors.groupMembers}</p>}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gift Voucher (optional)</label>
                <p className="text-sm text-gray-600 mb-2">If you have a gift voucher, enter it here for a special discount</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="giftVoucherCode"
                    value={formData.giftVoucherCode}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter gift voucher code"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 11: // Terms and Conditions
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Moto Trekkin Event Terms and Conditions</h3>
            
            {/* PDF Preview */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions Document</h4>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src="/pdfs/Moto-Trekkin-Event-Terms-and-Conditions-V1.01.26.pdf"
                  width="100%"
                  height="600"
                  className="border-0"
                  title="Moto Trekkin Event Terms and Conditions"
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>If the PDF doesn't load, you can <a href="/pdfs/Moto-Trekkin-Event-Terms-and-Conditions-V1.01.26.pdf" target="_blank" className="text-blue-600 hover:underline">download it here</a>.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Terms *</label>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className={`mt-1 mr-3 ${
                      errors.agreeToTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <span className="text-gray-700">
                    I have read and agree to the Moto Trekkin Transport Terms and Conditions
                  </span>
                </div>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">If you have read, understood and agree to the event, type in "I AGREE". *</label>
                <input
                  type="text"
                  name="termsAgreement"
                  value={formData.termsAgreement}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                    errors.termsAgreement ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                  }`}
                  placeholder="Type 'I AGREE' to confirm"
                  required
                />
                {errors.termsAgreement && <p className="text-red-500 text-sm mt-1">{errors.termsAgreement}</p>}
              </div>
            </div>
          </div>
        );
        
      case 12: // Payment Summary
        console.log('Rendering Payment Summary - Step 12');
        
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h3>
            
            {/* Simple Purchase Summary */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">PURCHASE SUMMARY</h4>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="text-lg font-semibold text-gray-900 mb-2">EVENT PACKAGE</h5>
                <div className="bg-gray-200 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {formData.accommodationPreference === '$3699 - SHARED ACCOMMODATION' 
                        ? 'SHARED ACCOMMODATION' 
                        : formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION'
                        ? 'PRIVATE ACCOMMODATION'
                        : 'ACCOMMODATION'
                      }
                    </span>
                    <span className="text-lg font-bold">
                      {formData.accommodationPreference === '$3699 - SHARED ACCOMMODATION' 
                        ? '$3,699.00' 
                        : formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION'
                        ? '$4,890.00'
                        : '$0.00'
                      }
                    </span>
                  </div>
                </div>
              </div>
              
              {formData.registerPartner === 'Yes' && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h5 className="text-lg font-semibold text-gray-900 mb-2">Partner Fee</h5>
                  <div className="bg-gray-200 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Partner Package</span>
                      <span className="text-lg font-bold">$1,495.00</span>
                    </div>
                  </div>
                </div>
              )}
              
              {formData.selectedMotorcycle && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h5 className="text-lg font-semibold text-gray-900 mb-2">Bike Hire</h5>
                  
                  {/* Small Bike Image */}
                  <div className="mb-4">
                    {(() => {
                      // Get the selected bike image based on the motorcycle name
                      const bikeImages = {
                        'BMW 1300 GS ADV': bmw1300GS,
                        'BMW R1200GS': bmwR1200GS,
                        'BMW F850GS': bmwF850GS,
                        'BMW F850GS LOW / HIGH SEAT': bmwF850GS,
                        'BMW F850GS LOW SEAT': bmwF850GS,
                        'BMW F750GS': bmwF750GS,
                        'BMW F750GS LOW': bmwF750GS,
                        'BMW F800GS': bmwF800GS,
                        'BMW F800GS LOW': bmwF800GS,
                        'BMW R1200GS LOW': bmwR1200GS,
                        'BMW R1200GS ADV': bmwR1200GS,
                        'Honda CB500X': hondaCB500X,
                        'Honda CB500X ADV': hondaCB500X,
                        'Yamaha Tenere 700': yamahaTenere700,
                        'Yamaha Tenere 700 LOW': yamahaTenere700,
                        'Yamaha Tenere 700 ADV': yamahaTenere700,
                        'Yamaha Tenere 700 ADV LOW': yamahaTenere700,
                        'Honda NX500': hondaNX500
                      };
                      
                      const imageSrc = bikeImages[formData.selectedMotorcycle];
                      
                      if (imageSrc) {
                        return (
                          <div className="flex items-center space-x-4">
                            <img
                              src={imageSrc}
                              alt={formData.selectedMotorcycle}
                              className="w-48 h-48 object-cover rounded-lg border border-gray-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300"
                              style={{ display: 'none' }}
                            >
                              <span className="text-gray-500 text-base">Image</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{formData.selectedMotorcycle}</p>
                              <p className="text-sm text-gray-600">8 days hire</p>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div className="flex items-center space-x-4">
                          <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                            <span className="text-gray-500 text-base">Image</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{formData.selectedMotorcycle}</p>
                            <p className="text-sm text-gray-600">8 days hire</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  
                  {/* Simple Bike Details */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h6 className="font-semibold text-gray-900 mb-3">Specifications</h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Motorcycle:</span>
                        <span>{formData.selectedMotorcycle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Hire Duration:</span>
                        <span>8 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Collection Date:</span>
                        <span>8th November 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Return Date:</span>
                        <span>15th November 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamic Bike Hire Pricing */}
                  <div className="bg-gray-200 p-3 rounded">
                    {(() => {
                      // Find the selected bike and get its price
                      const selectedBike = motorcycles.find(bike => bike.name === formData.selectedMotorcycle);
                      const dailyRate = selectedBike ? selectedBike.price : 0;
                      const totalPrice = dailyRate * 8; // 8 days
                      
                      return (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Bike Hire - {formData.selectedMotorcycle}</span>
                            <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Daily Rate: ${dailyRate}/day | 8 days | Collect: 8th Nov 2025, Return: 15th Nov 2025
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
            
            {/* Dynamic Payment Summary */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">PAYMENT SUMMARY</h4>
              
              <div className="bg-gray-100 p-6 rounded-lg">
                {(() => {
                  // Calculate dynamic totals
                  const eventPackage = formData.accommodationPreference === '$3699 - SHARED ACCOMMODATION' 
                    ? 3699 
                    : formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION'
                    ? 4890
                    : 0;
                  const partnerFee = formData.registerPartner === 'Yes' ? 1495 : 0;
                  
                  // Get selected bike price
                  const selectedBike = motorcycles.find(bike => bike.name === formData.selectedMotorcycle);
                  const bikeDailyRate = selectedBike ? selectedBike.price : 0;
                  const bikeHire = bikeDailyRate * 8; // 8 days
                  
                  const subtotal = eventPackage + partnerFee + bikeHire;
                  const discount = formData.paymentOption === 'Full Payment' ? 50 : 0;
                  const afterDiscount = subtotal - discount;
                  
                  // Show basic summary if no payment option selected
                  if (!formData.paymentOption) {
                    return (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Event Package:</span>
                          <span>${eventPackage.toFixed(2)}</span>
                        </div>
                        
                        {partnerFee > 0 && (
                          <div className="flex justify-between">
                            <span>Partner Fee:</span>
                            <span>${partnerFee.toFixed(2)}</span>
                          </div>
                        )}
                        
                        {bikeHire > 0 && (
                          <div className="flex justify-between">
                            <span>Bike Hire:</span>
                            <span>${bikeHire.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-semibold">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  // Different calculations based on payment option
                  if (formData.paymentOption === 'Deposit') {
                    // Deposit payment - fixed amounts (never change)
                    const participantDeposit = 990;
                    const partnerDeposit = formData.registerPartner === 'Yes' ? 990 : 0;
                    const totalDeposits = participantDeposit + partnerDeposit;
                    // Merchant fee is $16.83 for single participant, $33.66 for participant + partner
                    const merchantFee = formData.registerPartner === 'Yes' ? 33.66 : 16.83;
                    const amountToPay = totalDeposits + merchantFee;
                    const remainingBalance = subtotal - totalDeposits;
                    
                    return (
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-700">
                            Pay your $990 now to secure your place on the event. We will invoice you after registration and you can pay the balance anytime up until 60 days prior to the event.
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border">
                          <h5 className="font-semibold text-gray-900 mb-3">REQUIRED DEPOSIT</h5>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>${subtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span>Participant Deposit:</span>
                              <span>${participantDeposit.toFixed(2)}</span>
                            </div>
                            
                            {partnerDeposit > 0 && (
                              <div className="flex justify-between">
                                <span>Partner Deposit:</span>
                                <span>${partnerDeposit.toFixed(2)}</span>
                              </div>
                            )}
                            
                            <div className="flex justify-between">
                              <span>Merchant Fee:</span>
                              <span>${merchantFee.toFixed(2)}</span>
                            </div>
                            
                            <div className="border-t pt-2">
                              <div className="flex justify-between text-lg font-bold text-green-600">
                                <span>Amount to Pay:</span>
                                <span>${amountToPay.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Remaining Balance:</span>
                              <span>${remainingBalance.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    // Full Payment or Three Payments - dynamic calculation
                    let merchantFee = 0;
                    if (formData.paymentOption === 'Full Payment') {
                      // Calculate merchant fee as exactly 1.7% of amount after discount
                      merchantFee = Math.round(afterDiscount * 0.017 * 100) / 100;
                    } else if (formData.paymentOption === 'Three Payments') {
                      // Three Payments calculation - subtotal = Event Package + Partner Fee + Bike Hire
                      const total = eventPackage + partnerFee + bikeHire; // TOTAL = Event Package + Partner Fee + Bike Hire
                      const installment = Math.ceil((total / 3) * 100) / 100; // INSTALLMENT = TOTAL ÷ 3 (rounded up)
                      const merchantFeeAmount = installment * 0.017; // MERCHANT FEE = INSTALLMENT × 0.017
                      const amountDueToday = installment + merchantFeeAmount; // AMOUNT DUE TODAY = INSTALLMENT + MERCHANT FEE
                      const remainingBalance = installment * 2; // REMAINING BALANCE = INSTALLMENT × 2
                      
                      return (
                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-lg border">
                            <h5 className="font-semibold text-gray-900 mb-3">THREE PAYMENTS</h5>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${total.toFixed(2)}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span>Event Package:</span>
                                <span>${eventPackage.toFixed(2)}</span>
                              </div>
                              
                              {partnerFee > 0 && (
                                <div className="flex justify-between">
                                  <span>Partner Fee:</span>
                                  <span>${partnerFee.toFixed(2)}</span>
                                </div>
                              )}
                              
                              {bikeHire > 0 && (
                                <div className="flex justify-between">
                                  <span>Bike Hire:</span>
                                  <span>${bikeHire.toFixed(2)}</span>
                                </div>
                              )}
                              
                              <div className="space-y-1 mt-3">
                                <div className="flex justify-between">
                                  <span>PAYMENT 1 - DUE NOW:</span>
                                  <span>${installment.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                  <span>PAYMENT 2 - DUE 25TH MARCH 2025:</span>
                                  <span>${installment.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                  <span>PAYMENT 3 - DUE: 25TH JUNE 2025:</span>
                                  <span>${installment.toFixed(2)}</span>
                                </div>
                              </div>
                              
                              <div className="border-t pt-2">
                                <div className="flex justify-between">
                                  <span>MERCHANT FEE:</span>
                                  <span>${merchantFeeAmount.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between text-lg font-bold text-green-600">
                                  <span>AMOUNT TO PAY TODAY:</span>
                                  <span>${amountDueToday.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>REMAINING BALANCE:</span>
                                  <span>${remainingBalance.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    const total = afterDiscount + merchantFee;
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Event Package:</span>
                          <span>${eventPackage.toFixed(2)}</span>
                        </div>
                        
                        {partnerFee > 0 && (
                          <div className="flex justify-between">
                            <span>Partner Fee:</span>
                            <span>${partnerFee.toFixed(2)}</span>
                          </div>
                        )}
                        
                        {bikeHire > 0 && (
                          <div className="flex justify-between">
                            <span>Bike Hire:</span>
                            <span>${bikeHire.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-semibold">
                            <span>Subtotal:</span>
                            <span>${afterDiscount.toFixed(2)}</span>
                          </div>
                          
                          {discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Full Payment Discount:</span>
                              <span>-${discount.toFixed(2)}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between">
                            <span>Merchant Fee:</span>
                            <span>${merchantFee.toFixed(2)}</span>
                          </div>
                          
                          <div className="border-t pt-3">
                            <div className="flex justify-between text-xl font-bold text-green-600">
                              <span>Total:</span>
                              <span>${total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
            
            {/* Payment Options */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">PAYMENT & CONFIRMATION</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Option (Required) *</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="Full Payment"
                      checked={formData.paymentOption === 'Full Payment'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Full Payment (SAVE $50)</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="Deposit"
                      checked={formData.paymentOption === 'Deposit'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>$990 Deposit (Non-refundable)</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="Three Payments"
                      checked={formData.paymentOption === 'Three Payments'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Three Payments</span>
                  </label>
                </div>
                {errors.paymentOption && <p className="text-red-500 text-sm mt-1">{errors.paymentOption}</p>}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-red-100 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-2">Registration Form NZ South Island 2025</h1>
          </div>

          {/* Progress Bar */}
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

          {/* Step Navigation */}
          <div className="flex justify-between mb-6 sm:mb-8 overflow-x-auto pb-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center flex-shrink-0 ${
                  currentStep >= step.number ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                  currentStep >= step.number ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <span className="text-xs mt-1 text-center max-w-16 sm:max-w-none">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
                <button
                  type="button"
                  onClick={currentStep === 12 ? handleSubmit : nextStep}
                  className={`px-4 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
                    currentStep === 12
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {currentStep === 12 ? 'Submit' : 'Next'}
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NZSIRegistrationForm;
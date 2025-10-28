import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, CreditCard, Star, AlertTriangle, Shield, Bike, CheckCircle, XCircle } from 'lucide-react';

const MDPPhase3RegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Phase 1 & 2 Completion
    completedBothPhases: '',
    phaseConfirmation: '',
    
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
    trainingDate: 'NOVEMBER 28th + 29th + 30th Phase III Hunter Valley NSW 2322',
    
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
        if (!formData.completedBothPhases) newErrors.completedBothPhases = 'This field is required';
        break;
      case 2:
        if (!formData.firstName) newErrors.firstName = 'This field is required';
        if (!formData.lastName) newErrors.lastName = 'This field is required';
        if (!formData.gender) newErrors.gender = 'This field is required';
        if (!formData.email) newErrors.email = 'This field is required';
        if (!formData.confirmEmail) newErrors.confirmEmail = 'This field is required';
        if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match';
        if (!formData.birthday.day || !formData.birthday.month || !formData.birthday.year) newErrors.birthday = 'This field is required';
        if (!formData.occupation) newErrors.occupation = 'This field is required';
        if (!formData.mobile) newErrors.mobile = 'This field is required';
        if (!formData.address) newErrors.address = 'This field is required';
        if (!formData.city) newErrors.city = 'This field is required';
        if (!formData.state) newErrors.state = 'This field is required';
        if (!formData.postCode) newErrors.postCode = 'This field is required';
        if (!formData.phonePlatform) newErrors.phonePlatform = 'This field is required';
        if (!formData.phoneModel) newErrors.phoneModel = 'This field is required';
        if (!formData.hasGPS) newErrors.hasGPS = 'This field is required';
        if (!formData.hasFacebook) newErrors.hasFacebook = 'This field is required';
        if (!formData.hasPhoneMount) newErrors.hasPhoneMount = 'This field is required';
        if (!formData.canChargePhone) newErrors.canChargePhone = 'This field is required';
        break;
      case 2:
        if (!formData.phaseConfirmation) newErrors.phaseConfirmation = 'This field is required';
        break;
      // Add more validation steps as needed
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      // Redirect to the main registration form page with phase=3
      navigate('/registration?phase=3');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">REGISTRATION FORM MDP PHASE III</h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '12%'}}></div>
          </div>
          <p className="text-sm text-gray-600">Step 1 of 8 - 12%</p>
        </div>

        {/* Maintenance notice removed for consistency */}

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
              <p className="text-gray-700 mt-2 font-bold">The minimum deposit is $729.00 plus bank merchant fees ($12.39)</p>
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
          <h3 className="text-lg font-bold text-blue-900 mb-4">Have you completed Phase 1 and Phase 2? <span className="text-red-500">(Required)</span></h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="completedBothPhases"
                value="Yes"
                checked={formData.completedBothPhases === 'Yes'}
                onChange={(e) => handleInputChange('completedBothPhases', e.target.value)}
                className="mr-2"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="completedBothPhases"
                value="No"
                checked={formData.completedBothPhases === 'No'}
                onChange={(e) => handleInputChange('completedBothPhases', e.target.value)}
                className="mr-2"
              />
              <span>No</span>
            </label>
          </div>
          {formData.completedBothPhases === 'No' && (
            <p className="text-red-600 mt-2">You need to complete both Phase 1 and Phase 2 programs before you proceed to Phase 3.</p>
          )}
          {errors.completedBothPhases && <p className="text-red-500 text-sm mt-1">{errors.completedBothPhases}</p>}
        </div>


        <div className="flex justify-between">
          <Link to="/off-road-training-detail" className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training
          </Link>
          {formData.completedBothPhases === 'Yes' && (
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


        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          {formData.phaseConfirmation === 'Yes' && (
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

  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Details</h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: '37%'}}></div>
          </div>
          <p className="text-sm text-gray-600">Step 3 of 8 - 37%</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender <span className="text-red-500">(Required)</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Re-Enter Email <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="email"
              value={formData.confirmEmail}
              onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">You need to re-enter your email on the next field for confirmation.</p>
            {errors.confirmEmail && <p className="text-red-500 text-sm mt-1">{errors.confirmEmail}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birthday <span className="text-red-500">(Required)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={formData.birthday.day}
                onChange={(e) => handleNestedInputChange('birthday', 'day', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Day</option>
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={formData.birthday.month}
                onChange={(e) => handleNestedInputChange('birthday', 'month', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Month</option>
                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select
                value={formData.birthday.year}
                onChange={(e) => handleNestedInputChange('birthday', 'year', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Year</option>
                {Array.from({length: 80}, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Occupation <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Landline</label>
            <input
              type="tel"
              value={formData.landline}
              onChange={(e) => handleInputChange('landline', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address Line 2</label>
            <input
              type="text"
              value={formData.address2}
              onChange={(e) => handleInputChange('address2', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-red-500">(Required)</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose State</option>
              <option value="ACT">ACT</option>
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="NT">NT</option>
              <option value="WA">WA</option>
              <option value="TAS">TAS</option>
              <option value="SA">SA</option>
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Code <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              value={formData.postCode}
              onChange={(e) => handleInputChange('postCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.postCode && <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Platform <span className="text-red-500">(Required)</span>
            </label>
            <select
              value={formData.phonePlatform}
              onChange={(e) => handleInputChange('phonePlatform', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Platform</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Other">Other</option>
            </select>
            {errors.phonePlatform && <p className="text-red-500 text-sm mt-1">{errors.phonePlatform}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Model <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              value={formData.phoneModel}
              onChange={(e) => handleInputChange('phoneModel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneModel && <p className="text-red-500 text-sm mt-1">{errors.phoneModel}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Does your phone have built-in GPS? <span className="text-red-500">(Required)</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasGPS"
                  value="Yes"
                  checked={formData.hasGPS === 'Yes'}
                  onChange={(e) => handleInputChange('hasGPS', e.target.value)}
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasGPS"
                  value="No"
                  checked={formData.hasGPS === 'No'}
                  onChange={(e) => handleInputChange('hasGPS', e.target.value)}
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
            {errors.hasGPS && <p className="text-red-500 text-sm mt-1">{errors.hasGPS}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              We communicate extensively using Facebook. Do you have a Facebook account? <span className="text-red-500">(Required)</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasFacebook"
                  value="Yes"
                  checked={formData.hasFacebook === 'Yes'}
                  onChange={(e) => handleInputChange('hasFacebook', e.target.value)}
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasFacebook"
                  value="No"
                  checked={formData.hasFacebook === 'No'}
                  onChange={(e) => handleInputChange('hasFacebook', e.target.value)}
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
            {errors.hasFacebook && <p className="text-red-500 text-sm mt-1">{errors.hasFacebook}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you have a phone mount on your motorcycle that allows you to see your phone while riding? <span className="text-red-500">(Required)</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasPhoneMount"
                  value="Yes"
                  checked={formData.hasPhoneMount === 'Yes'}
                  onChange={(e) => handleInputChange('hasPhoneMount', e.target.value)}
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasPhoneMount"
                  value="No"
                  checked={formData.hasPhoneMount === 'No'}
                  onChange={(e) => handleInputChange('hasPhoneMount', e.target.value)}
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
            {errors.hasPhoneMount && <p className="text-red-500 text-sm mt-1">{errors.hasPhoneMount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you have the capacity to charge your phone while riding? <span className="text-red-500">(Required)</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="canChargePhone"
                  value="Yes"
                  checked={formData.canChargePhone === 'Yes'}
                  onChange={(e) => handleInputChange('canChargePhone', e.target.value)}
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="canChargePhone"
                  value="No"
                  checked={formData.canChargePhone === 'No'}
                  onChange={(e) => handleInputChange('canChargePhone', e.target.value)}
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
            {errors.canChargePhone && <p className="text-red-500 text-sm mt-1">{errors.canChargePhone}</p>}
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
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {/* Add more steps as needed */}
    </div>
  );
};

export default MDPPhase3RegistrationPage;

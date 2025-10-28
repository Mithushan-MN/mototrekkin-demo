import React from 'react';
import { User, Phone, Shield, AlertTriangle } from 'lucide-react';

/* --------------------------------------------------------------
   VALIDATION – called by the wizard (optional server‑side check)
   -------------------------------------------------------------- */
export const validate = (formData) => {
  const errors = {};

  // ---- personal ------------------------------------------------
  if (!formData.firstName) errors.firstName = 'First name is required';
  if (!formData.lastName) errors.lastName = 'Last name is required';
  if (!formData.gender) errors.gender = 'Gender is required';
  if (!formData.email) errors.email = 'Email is required';
  if (formData.email !== formData.confirmEmail) errors.confirmEmail = 'Emails do not match';
  if (!formData.mobile) errors.mobile = 'Mobile number is required';

  // ---- birthday ------------------------------------------------
  if (!formData.birthday?.day) errors['birthday.day'] = 'Day is required';
  if (!formData.birthday?.month) errors['birthday.month'] = 'Month is required';
  if (!formData.birthday?.year) errors['birthday.year'] = 'Year is required';

  // ---- address -------------------------------------------------
  if (!formData.occupation) errors.occupation = 'Occupation is required';
  if (!formData.address) errors.address = 'Street address is required';
  if (!formData.city) errors.city = 'City is required';
  if (!formData.state) errors.state = 'State is required';
  if (!formData.postCode) errors.postCode = 'Post code is required';

  // ---- phone ---------------------------------------------------
  if (!formData.phonePlatform) errors.phonePlatform = 'Phone platform is required';
  if (!formData.phoneModel) errors.phoneModel = 'Phone model is required';
  if (!formData.hasGPS) errors.hasGPS = 'GPS answer is required';
  if (!formData.hasFacebook) errors.hasFacebook = 'Facebook answer is required';
  if (!formData.hasPhoneMount) errors.hasPhoneMount = 'Phone mount answer is required';
  if (!formData.canChargePhone) errors.canChargePhone = 'Charging answer is required';

  // ---- emergency -----------------------------------------------
  if (!formData.emergency1?.firstName) errors['emergency1.firstName'] = 'First name is required';
  if (!formData.emergency1?.lastName) errors['emergency1.lastName'] = 'Last name is required';
  if (!formData.emergency1?.email) errors['emergency1.email'] = 'Email is required';
  if (!formData.emergency1?.mobile) errors['emergency1.mobile'] = 'Mobile is required';
  if (!formData.emergency1?.relationship) errors['emergency1.relationship'] = 'Relationship is required';
  if (!formData.shirtSize) errors.shirtSize = 'Shirt size is required';

  // ---- medical -------------------------------------------------
  if (!formData.medicalCondition) errors.medicalCondition = 'Medical condition answer is required';
  if (formData.medicalCondition === 'yes' && !formData.medicalDescription)
    errors.medicalDescription = 'Medical description is required';
  if (!formData.regularMedication) errors.regularMedication = 'Regular medication answer is required';
  if (formData.regularMedication === 'yes' && !formData.medicationDetails)
    errors.medicationDetails = 'Medication details are required';
  if (!formData.medicationAllergies) errors.medicationAllergies = 'Medication allergies answer is required';
  if (formData.medicationAllergies === 'yes' && !formData.medicationAllergyDetails)
    errors.medicationAllergyDetails = 'Allergy details are required';
  if (!formData.foodAllergies) errors.foodAllergies = 'Food allergies answer is required';
  if (!formData.dietaryRequirements) errors.dietaryRequirements = 'Dietary requirements are required';

  return errors;
};

/* --------------------------------------------------------------
   COMPONENT
   -------------------------------------------------------------- */
const Step1PersonalDetails = ({
  formData,
  errors,
  onInputChange,
  onNestedInputChange,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}) => {
  /* ---------- form submit handler ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      // let the browser show its native messages
      form.reportValidity();
      return;
    }

    // optional: run your own validation (adds custom messages)
    const customErrors = validate(formData);
    if (Object.keys(customErrors).length) {
      // you can surface them however you like – here we just block
      return;
    }

    onNext(); // everything OK → go to next step
  };

  /* ---------- helpers ---------- */
  const renderField = (name, label, type = 'text', opts = {}, required = false, colSpan = '') => {
    const isNested = name.includes('.');
    const value = isNested
      ? (formData[name.split('.')[0]]?.[name.split('.')[1]] || '')
      : (formData[name] || '');

    return (
      <div className={`${colSpan} ${errors[name] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}`}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => {
            if (isNested) {
              const [parent, child] = name.split('.');
              onNestedInputChange(parent, child, e.target.value);
            } else {
              onInputChange(name, e.target.value);
            }
          }}
          required={required}
          {...opts}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
            errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const renderTextarea = (name, label, required = false, rows = 3, placeholder = '') => (
    <div className={`${errors[name] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        name={name}
        value={formData[name] || ''}
        onChange={(e) => onInputChange(name, e.target.value)}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 resize-none ${
          errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
          <AlertTriangle className="w-4 h-4 mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  const renderRadioGroup = (name, question, options, required = false) => (
    <div className={errors[name] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {question} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="space-y-2">
        {options.map(({ value, label }) => (
          <label key={value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={value}
              checked={formData[name] === value}
              onChange={(e) => onInputChange(name, e.target.value)}
              required={required}
              className="mr-2"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
          <AlertTriangle className="w-4 h-4 mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  /* ---------- render ---------- */
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* ---- Header ---- */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            REGISTRATION FORM MDP PHASE III
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps} -{' '}
            {Math.round((currentStep / totalSteps) * 100)}%
          </p>
        </div>

        {/* ---- FORM ---- */}
        <form onSubmit={handleSubmit} noValidate>
          {/* ==== PERSONAL ==== */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <User className="w-5 h-5 text-white" />
                </div>
                Personal Details
              </h2>
              <p className="text-gray-600 ml-14">
                Please provide your personal information
              </p>
            </div>

            <div className="space-y-6">
              {/* basic */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderField('firstName', 'First Name', 'text', { placeholder: 'Enter your first name' }, true)}
                {renderField('lastName', 'Last Name', 'text', { placeholder: 'Enter your last name' }, true)}
                <div className={errors.gender ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={(e) => onInputChange('gender', e.target.value)}
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
                      <AlertTriangle className="w-4 h-4 mr-1" /> {errors.gender}
                    </p>
                  )}
                </div>

                {renderField('email', 'Email', 'email', { placeholder: 'your.email@example.com' }, true)}
                {renderField('confirmEmail', 'Re‑Enter Email', 'email', { placeholder: 'Re‑enter your email' }, true)}
                {renderField('mobile', 'Mobile Number', 'tel', { placeholder: '+61 4XX XXX XXX' }, true)}
              </div>

              {/* birthday */}
              <div className={(errors['birthday.day'] || errors['birthday.month'] || errors['birthday.year'])
                ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30'
                : ''}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Birthday <span className="text-red-600">*</span>
                </label>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Birthday <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['day', 'month', 'year'].map((part) => (
                    <div key={part}>
                      <label className="block text-xs text-gray-600 mb-1 capitalize">{part}</label>
                      <select
                        name={`birthday.${part}`}
                        value={formData.birthday?.[part] || ''}
                        onChange={(e) => onNestedInputChange('birthday', part, e.target.value)}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                          errors[`birthday.${part}`] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">
                          {part === 'day' ? 'Day' : part === 'month' ? 'Month' : 'Year'}
                        </option>
                        {part === 'day' &&
                          Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        {part === 'month' &&
                          Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        {part === 'year' &&
                          Array.from({ length: 80 }, (_, i) => {
                            const y = new Date().getFullYear() - 18 - i;
                            return (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* address */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderField('occupation', 'Occupation', 'text', { placeholder: 'Your occupation' }, true)}
                {renderField('landline', 'Landline', 'tel', { placeholder: 'Landline number (optional)' })}
                {renderField('address', 'Street Address', 'text', { placeholder: 'Street address' }, true, 'lg:col-span-2')}
                {renderField('address2', 'Street Address Line 2', 'text', { placeholder: 'Apartment, suite, unit, etc. (optional)' }, false, 'lg:col-span-2')}
                {renderField('city', 'City', 'text', { placeholder: 'City' }, true)}
                <div className={errors.state ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state || ''}
                    onChange={(e) => onInputChange('state', e.target.value)}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                      errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select State</option>
                    {['ACT', 'NSW', 'VIC', 'QLD', 'NT', 'WA', 'TAS', 'SA'].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                      <AlertTriangle className="w-4 h-4 mr-1" /> {errors.state}
                    </p>
                  )}
                </div>
                {renderField('postCode', 'Post Code', 'text', { placeholder: 'Post code' }, true)}
              </div>

              {/* phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className={errors.phonePlatform ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Platform <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="phonePlatform"
                    value={formData.phonePlatform || ''}
                    onChange={(e) => onInputChange('phonePlatform', e.target.value)}
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
                      <AlertTriangle className="w-4 h-4 mr-1" /> {errors.phonePlatform}
                    </p>
                  )}
                </div>
                {renderField('phoneModel', 'Phone Model', 'text', { placeholder: 'Phone model' }, true)}
              </div>

              {/* capabilities */}
              <div className="space-y-4">
                {renderRadioGroup('hasGPS', 'Does your phone have built‑in GPS?', [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }], true)}
                {renderRadioGroup('hasFacebook', 'We communicate extensively using Facebook. Do you have a Facebook account?', [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }], true)}
                {renderRadioGroup('hasPhoneMount', 'Do you have a phone mount on your motorcycle that allows you to see your phone while riding?', [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }], true)}
                {renderRadioGroup('canChargePhone', 'Do you have the capacity to charge your phone while riding?', [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }], true)}
              </div>
            </div>
          </section>

          {/* ==== EMERGENCY ==== */}
          <section className="mb-16">
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
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Next of Kin / Emergency Contact 1
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderField('emergency1.firstName', 'NOK1 First Name', 'text', {}, true)}
                  {renderField('emergency1.lastName', 'NOK1 Last Name', 'text', {}, true)}
                  {renderField('emergency1.email', 'NOK1 Email', 'email', {}, true)}
                  {renderField('emergency1.mobile', 'NOK1 Mobile Number', 'tel', {}, true)}
                  {renderField('emergency1.landline', 'NOK1 Landline', 'tel', {}, false)}
                  {renderField('emergency1.relationship', 'NOK1 Relationship', 'text', { placeholder: 'e.g., Spouse, Parent' }, true)}
                </div>
              </div>

              {renderRadioGroup('shirtSize', 'Preferred shirt size', [
                { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },
                { value: 'L', label: 'L' },
                { value: 'XL', label: 'XL' },
                { value: '2XL', label: '2XL' },
                { value: '3XL', label: '3XL' },
                { value: '4XL', label: '4XL' },
              ], true)}
            </div>
          </section>

          {/* ==== MEDICAL ==== */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-8 border border-purple-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Medical Information
              </h2>
              <p className="text-gray-600 ml-14">
                Please provide your medical information for safety purposes
              </p>
            </div>

            <div className="space-y-6">
              {renderRadioGroup('medicalCondition', 'Do you suffer a medical condition we need to know about?', [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ])}

              {formData.medicalCondition === 'yes' && (
                <>
                  {renderTextarea('medicalDescription', 'Please describe your condition. All information is treated as highly confidential.', false, 3, 'Describe your medical condition...')}
                  {renderTextarea('medications', 'Please describe any medications you take, the dosages and frequency.', false, 3, 'List medications, dosage, frequency...')}
                </>
              )}

              {renderRadioGroup('regularMedication', 'Do you take any regular medication?', [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ], true)}

              {formData.regularMedication === 'yes' && renderTextarea('medicationDetails', 'Please tell us which medication you take regularly.', false, 2, 'List your regular medications...')}

              {renderRadioGroup('medicationAllergies', 'Do you have any allergies to medication?', [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ], true)}

              {formData.medicationAllergies === 'yes' && renderTextarea('medicationAllergyDetails', 'Please tell us any allergies you have to medication.', true, 2, 'List your medication allergies...')}

              {renderRadioGroup('foodAllergies', 'Do you have any food or other allergies?', [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ], true)}

              {formData.foodAllergies === 'yes' && renderTextarea('foodAllergyDetails', 'Please provide us with a list of your allergies below.', false, 2, 'List your food and other allergies...')}

              {renderField('dietaryRequirements', 'What are your dietary requirements?', 'text', { placeholder: 'e.g., None, Vegetarian, Vegan, Gluten‑free' }, true)}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField('medicareNumber', 'Medicare Number', 'text')}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Medicare Card Position
                  </label>
                  <select
                    name="medicarePosition"
                    value={formData.medicarePosition || ''}
                    onChange={(e) => onInputChange('medicarePosition', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Position</option>
                    {Array.from({ length: 9 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* ---- NAVIGATION ---- */}
          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            >
              Previous
            </button>

            <button
              type="submit"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">NEXT</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1PersonalDetails;
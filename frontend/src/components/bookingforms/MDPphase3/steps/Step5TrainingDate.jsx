import React from 'react';
import { ArrowLeft, Star, AlertTriangle } from 'lucide-react';

/* --------------------------------------------------------------
   VALIDATION – called by the wizard
   -------------------------------------------------------------- */
export const validate = (formData) => {
  const errors = {};

  if (!formData.requiresTyres) {
    errors.requiresTyres = 'Please select an option';
  }

  if (formData.requiresTyres === 'yes') {
    if (!formData.frontTyre?.width) errors['frontTyre.width'] = 'Width is required';
    if (!formData.frontTyre?.height) errors['frontTyre.height'] = 'Height is required';
    if (!formData.frontTyre?.rim) errors['frontTyre.rim'] = 'Rim size is required';

    if (!formData.rearTyre?.width) errors['rearTyre.width'] = 'Width is required';
    if (!formData.rearTyre?.height) errors['rearTyre.height'] = 'Height is required';
    if (!formData.rearTyre?.rim) errors['rearTyre.rim'] = 'Rim size is required';

    if (!formData.preferredBrand) errors.preferredBrand = 'Preferred brand is required';
    if (!formData.wheelType) errors.wheelType = 'Wheel type is required';
    if (!formData.tyreManagement) errors.tyreManagement = 'Please choose a tyre-management option';
  }

  return errors;
};

/* --------------------------------------------------------------
   COMPONENT
   -------------------------------------------------------------- */
const Step9TyreOrders = ({
  formData,
  errors,
  onInputChange,
  onNestedInputChange,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}) => {
  /* ---------- form submit with validation ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const customErrors = validate(formData);
    if (Object.keys(customErrors).length > 0) {
      return;
    }

    onNext();
  };

  /* ---------- Reusable Nested Select ---------- */
  const NestedSelect = ({ parent, field, label, options, required = false, placeholder = 'Select…' }) => {
    const value = formData[parent]?.[field] || '';
    const errorKey = `${parent}.${field}`;

    return (
      <div className={errors[errorKey] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">(Required)</span>}
        </label>
        <select
          value={value}
          onChange={(e) => onNestedInputChange(parent, field, e.target.value)}
          required={required}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
            errors[errorKey] ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors[errorKey] && (
          <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {errors[errorKey]}
          </p>
        )}
      </div>
    );
  };

  /* ---------- Reusable Radio Group ---------- */
  const RadioGroup = ({ name, label, options, required = false }) => (
    <div className={errors[name] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
      <label className="block text-sm font-semibold text-gray-700 mb-4">
        {label} {required && <span className="text-red-500">(Required)</span>}
      </label>
      <div className="space-y-3">
        {options.map(({ value, text }) => (
          <label key={value} className="flex items-start cursor-pointer">
            <input
              type="radio"
              value={value}
              checked={formData[name] === value}
              onChange={(e) => onInputChange(name, e.target.value)}
              required={required}
              className="mr-3 w-5 h-5 mt-1 text-blue-600"
            />
            <span className="text-lg leading-tight">{text}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
          <AlertTriangle className="w-4 h-4 mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
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
          Step {currentStep} of {totalSteps} - {Math.round((currentStep / totalSteps) * 100)}%
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} noValidate>
          {/* Intro */}
          <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <p className="text-gray-700 leading-relaxed">
              Moto Trekkin can supply a new set of off-road knobby tyres for your
              motorcycle ready for fitting at the event check-in. Making your
              event tyre management very easy. Moto Trekkin can transport the
              tyres you arrive on at the event on to the end of the event for re
              fitting, or ship them to you home address for the cost of a courier.
              Simply choose below if you would like a new set of tyres ready and
              waiting to be fitted at the event check-in. We will provide you with
              a detailed tyre quote for you to accept followed by a tyre invoice.
              Once paid your tyre order will be confirmed.
            </p>
          </div>

          {/* Do you require tyres? */}
          <div className="mb-8">
            <RadioGroup
              name="requiresTyres"
              label="Do you require tyres?"
              required
              options={[
                {
                  value: 'no',
                  text:
                    'NO. I will arrange my own tyres and arrive on a new set of 100% off road knobby tyres with not more than 3% wear. I understand that 60/40 50/50 or any other combination of road /trail tyres other than a set of full block knobby tyres will not pass through scrutineering and I will be prevented from commencing the event.',
                },
                {
                  value: 'yes',
                  text:
                    'YES. Please provide me with a quote for tyres as per my selection below. I will not be charged for the tyres until I formally accept the quote provided. Once accepted I understand payment will be required before an order is placed.',
                },
              ]}
            />
          </div>

          {/* ==== TYRE SIZE SECTION (only when YES) ==== */}
          {formData.requiresTyres === 'yes' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                TYRE SIZE
              </h2>

              {/* Front Tyre */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  FRONT TYRE SIZE
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <NestedSelect
                    parent="frontTyre"
                    field="width"
                    label="Width"
                    required
                    options={[
                      { value: '80', label: '80' },
                      { value: '90', label: '90' },
                      { value: '100', label: '100' },
                      { value: '110', label: '110' },
                      { value: '120', label: '120' },
                      { value: '130', label: '130' },
                    ]}
                  />
                  <NestedSelect
                    parent="frontTyre"
                    field="height"
                    label="Height/Profile"
                    required
                    options={[
                      { value: '60', label: '60' },
                      { value: '70', label: '70' },
                      { value: '80', label: '80' },
                      { value: '90', label: '90' },
                      { value: '100', label: '100' },
                    ]}
                  />
                  <NestedSelect
                    parent="frontTyre"
                    field="rim"
                    label="Rim Size"
                    required
                    options={[
                      { value: '17', label: '17' },
                      { value: '18', label: '18' },
                      { value: '19', label: '19' },
                      { value: '20', label: '20' },
                      { value: '21', label: '21' },
                    ]}
                  />
                </div>
              </div>

              {/* Rear Tyre */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  REAR TYRE SIZE
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <NestedSelect
                    parent="rearTyre"
                    field="width"
                    label="Width"
                    required
                    options={[
                      { value: '130', label: '130' },
                      { value: '140', label: '140' },
                      { value: '150', label: '150' },
                      { value: '170', label: '170' },
                    ]}
                  />
                  <NestedSelect
                    parent="rearTyre"
                    field="height"
                    label="Height/Profile"
                    required
                    options={[
                      { value: '60', label: '60' },
                      { value: '70', label: '70' },
                      { value: '80', label: '80' },
                      { value: '90', label: '90' },
                      { value: '100', label: '100' },
                      { value: '110', label: '110' },
                    ]}
                  />
                  <NestedSelect
                    parent="rearTyre"
                    field="rim"
                    label="Rim Size"
                    required
                    options={[
                      { value: '17', label: '17' },
                      { value: '18', label: '18' },
                      { value: '19', label: '19' },
                      { value: '20', label: '20' },
                      { value: '21', label: '21' },
                    ]}
                  />
                </div>
              </div>

              {/* Preferred Brand */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={errors.preferredBrand ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Tyre Brand & Model{' '}
                      <span className="text-red-500">(Required)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.preferredBrand || ''}
                      onChange={(e) => onInputChange('preferredBrand', e.target.value)}
                      required
                      placeholder="Enter preferred brand and model"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                        errors.preferredBrand ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.preferredBrand && (
                      <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.preferredBrand}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Second Preferred Tyre Brand & Model
                    </label>
                    <input
                      type="text"
                      value={formData.secondBrand || ''}
                      onChange={(e) => onInputChange('secondBrand', e.target.value)}
                      placeholder="Enter second preferred brand and model"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Wheel Type */}
              <div className="mb-8">
                <RadioGroup
                  name="wheelType"
                  label="Wheel Type"
                  required
                  options={[
                    { value: 'Tubeless rims', text: 'Tubeless rims' },
                    { value: 'Tubed rims', text: 'Tubed rims' },
                    { value: 'Tubed rims with rim locks', text: 'Tubed rims with rim locks' },
                  ]}
                />
              </div>
            </>
          )}

          {/* ==== TYRE MANAGEMENT (only when YES) ==== */}
          {formData.requiresTyres === 'yes' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                TYRE MANAGEMENT
              </h2>

              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you require your arrival tyres to be transported to the final
                  destination for re-fitment for the journey home, you must purchase
                  our Wheel Removal and Refitting Service - WRARS. This pays for the
                  labour of refitting your arrival tyres.
                </p>
                <p className="text-gray-700 mb-4">
                  If you DO NOT require our WRARS at the final destination, you
                  have two options for the management of your arrival tyres.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Dispose of your arrival tyres at the event start ($12.00 per tyre)</li>
                  <li>Ship your arrival tyres home via courier ($75.00 per pair)</li>
                </ul>
              </div>

              <RadioGroup
                name="tyreManagement"
                label="Choose an option below for your arrival tyres:"
                required
                options={[
                  {
                    value: 'WRARS',
                    text: '$100 WRARS at the event destination to refit my arrival tyres for the journey home',
                  },
                  {
                    value: 'DISPOSE',
                    text: '$24.00 DISPOSE after fitting at the event sign-on',
                  },
                  {
                    value: 'SHIP',
                    text: '$75.00 SHIP from the event sign-on to my home',
                  },
                ]}
              />

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <p className="text-yellow-800">
                  <strong>Please note:</strong> we do not fit tyres not sourced and
                  supplied by Moto Trekkin.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={onPrev}
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
};

export default Step9TyreOrders;
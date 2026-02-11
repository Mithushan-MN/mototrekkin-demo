import React from 'react';

const MedicalInfoSection = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Medical Information</h3>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-800">
          Because we are venturing into remote areas where hospitals can be many hours away, it's important to advise us of any medical conditions you have, and any medications you take. This is to assist our medical team to understand your condition in the event of an illness or accident during the event. For your own safety, please disclose any and all conditions which affect your day to day capacity to ride a motorcycle, and or which we may need to know if a situation occurs.
        </p>
      </div>

      {/* Medical Condition Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Do you suffer a medical condition we need to know about? *</label>
        <div className="flex space-x-4">
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

      {/* Conditional Medical Condition Fields */}
      {formData.hasMedicalCondition === 'Yes' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Please describe your condition. All information is treated as highly confidential and is only viewed by our medical team in the event of an emergency involving you.</label>
            <textarea
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="WRITE N/A IF NOT APPLICABLE"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Please describe any medications you take the dosages and frequency.</label>
            <textarea
              name="medications"
              value={formData.medications}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="WRITE N/A IF NOT APPLICABLE"
            />
          </div>
        </>
      )}

      {/* Medication Allergies Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any allergies to medication? *</label>
        <div className="flex space-x-4">
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

      {/* Conditional Medication Allergies Field */}
      {formData.hasMedicationAllergies === 'Yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Please tell us any allergies you have to medication.</label>
          <textarea
            name="medicationAllergies"
            value={formData.medicationAllergies}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="WRITE N/A IF NOT APPLICABLE"
          />
        </div>
      )}

      {/* Food Allergies Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any food or other allergies? *</label>
        <div className="flex space-x-4">
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

      {/* Conditional Food Allergies Field */}
      {formData.hasFoodAllergies === 'Yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Please let us know about any dietary requirements you may have (e.g. allergies, health, religion)</label>
          <textarea
            name="dietaryRequirements"
            value={formData.dietaryRequirements}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="WRITE N/A IF NOT APPLICABLE"
          />
        </div>
      )}

      {/* Health Fund Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a health fund? *</label>
        <div className="flex space-x-4">
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

      {/* Conditional Health Fund Fields */}
      {formData.hasHealthFund === 'Yes' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Health Fund Name</label>
              <input
                type="text"
                name="healthFundName"
                value={formData.healthFundName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="WRITE N/A IF NOT APPLICABLE"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Health Fund Number</label>
              <input
                type="text"
                name="healthFundNumber"
                value={formData.healthFundNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="WRITE N/A IF NOT APPLICABLE"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Do you have ambulance cover within your health fund?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasAmbulanceCover"
                  value="Yes"
                  checked={formData.hasAmbulanceCover === 'Yes'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasAmbulanceCover"
                  value="No"
                  checked={formData.hasAmbulanceCover === 'No'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                No
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasAmbulanceCover"
                  value="Not Sure"
                  checked={formData.hasAmbulanceCover === 'Not Sure'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Not Sure
              </label>
            </div>
          </div>
        </>
      )}

      {/* Medicare Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <select
            name="medicarePosition"
            value={formData.medicarePosition}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              errors.medicarePosition ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
            }`}
            required
          >
            <option value="">Select position</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          {errors.medicarePosition && <p className="text-red-500 text-sm mt-1">{errors.medicarePosition}</p>}
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoSection;

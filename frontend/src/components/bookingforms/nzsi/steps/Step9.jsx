import React from 'react';

const Step9 = ({ formData, handleInputChange, errors }) => {
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
              <div className="font-semibold text-gray-900">$3699 - SHARED ACCOMMODATION</div>
              <div className="text-sm text-gray-600">Shared accommodation option</div>
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
              <div className="font-semibold text-gray-900">$4890 - PRIVATE ACCOMMODATION</div>
              <div className="text-sm text-gray-600">Private accommodation option</div>
            </div>
          </label>
        </div>
        {errors.accommodationPreference && <p className="text-red-500 text-sm mt-1">{errors.accommodationPreference}</p>}
      </div>

      {formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Do you want to register your partner for this event? *</label>
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
      )}
    </div>
  );
};

export default Step9;

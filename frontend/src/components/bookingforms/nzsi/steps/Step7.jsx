import React from 'react';

const Step7 = ({ formData, handleInputChange, errors }) => {
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Licence File *</label>
        <input
  type="file"
  name="licenceFile"
  accept="image/*,.pdf"
  onChange={handleInputChange}
  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
  required
/>
{errors.licenceFile && <p className="text-red-500 text-xs mt-1">{errors.licenceFile}</p>}
      </div>
    </div>
  );
};

export default Step7;

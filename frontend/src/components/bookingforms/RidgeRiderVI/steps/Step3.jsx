import React from 'react';

const Step3 = ({ formData, handleInputChange, errors }) => {
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
};

export default Step3;

import React from 'react';

const Step2 = ({ formData, handleInputChange, errors }) => {
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
};

export default Step2;

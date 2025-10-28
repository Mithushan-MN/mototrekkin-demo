import React, { useEffect } from 'react';

const Step6 = ({ formData, handleInputChange, errors, motorcycles, bikesLoading }) => {
  // Log formData.motorcycle.hireOption on render to verify state
  useEffect(() => {
    console.log('Step6: Current formData.motorcycle.hireOption:', formData.motorcycle.hireOption);
  }, [formData.motorcycle.hireOption]);

  // Function to get the selected bike image
  const getSelectedBikeImage = () => {
    const selectedBike = motorcycles?.find(bike => bike.name === formData.motorcycle.selectedMotorcycle);
    return selectedBike ? selectedBike.image : null;
  };

  // Function to get the selected bike specifications
  const getSelectedBikeSpecs = () => {
    const selectedBike = motorcycles?.find(bike => bike.name === formData.motorcycle.selectedMotorcycle);
    return selectedBike ? selectedBike.specs : null;
  };

  return (
    <div className="space-y-6" key={formData.motorcycle.hireOption}>
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
              checked={formData.motorcycle.hireOption === 'Hire a Motorcycle'}
              onChange={(e) => {
                console.log('Step6: hireOption changed to:', e.target.value);
                handleInputChange(e, 'motorcycle');
              }}
              className="mr-2 focus:ring-green-500"
            />
            Hire a Motorcycle
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hireOption"
              value="Use my own motorcycle"
              checked={formData.motorcycle.hireOption === 'Use my own motorcycle'}
              onChange={(e) => {
                console.log('Step6: hireOption changed to:', e.target.value);
                handleInputChange(e, 'motorcycle');
              }}
              className="mr-2 focus:ring-green-500"
            />
            Use my own motorcycle
          </label>
        </div>
        {errors.hireOption && (
          <p className="text-red-500 text-sm mt-2 font-medium">{errors.hireOption}</p>
        )}
      </div>

      {formData.motorcycle.hireOption === 'Hire a Motorcycle' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Choose which motorbike you wish to hire. (Required)</label>
          
          {bikesLoading ? (
            <div className="text-center text-gray-600">Loading motorcycles...</div>
          ) : !motorcycles || motorcycles.length === 0 ? (
            <div className="text-center text-red-500">No motorcycles available. Please try again later.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
              {motorcycles.map((bike, index) => (
                <label
                  key={index}
                  className={`relative cursor-pointer group ${
                    !bike.available || bike.remaining <= 0
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:shadow-lg transition-shadow duration-200'
                  } ${
                    formData.motorcycle.selectedMotorcycle === bike.name
                      ? 'ring-2 ring-blue-500 shadow-lg'
                      : ''
                  } border border-gray-300 rounded-lg p-3 sm:p-4`}
                >
                  <input
                    type="radio"
                    name="selectedMotorcycle"
                    value={bike.name}
                    checked={formData.motorcycle.selectedMotorcycle === bike.name}
                    onChange={(e) => {
                      console.log('Step6: selectedMotorcycle changed to:', e.target.value);
                      handleInputChange(e, 'motorcycle');
                    }}
                    disabled={!bike.available || bike.remaining <= 0}
                    className="sr-only"
                  />
                  
                  <div className={`bg-white rounded-lg border-2 p-3 sm:p-4 text-center transition-all duration-200 ${
                    formData.motorcycle.selectedMotorcycle === bike.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!bike.available || bike.remaining <= 0 ? 'border-gray-100' : ''}`}>
                    
                    {/* Bike Image */}
                    <div className="mb-3">
                      {bike.image ? (
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="w-full h-24 sm:h-32 object-cover rounded-md mx-auto"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-full h-24 sm:h-32 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                      <div className="w-full h-24 sm:h-32 bg-gray-200 rounded-md flex items-center justify-center hidden">
                        <span className="text-gray-400 text-sm">Image Failed to Load</span>
                      </div>
                    </div>
                    
                    {/* Bike Details */}
                    <div className="space-y-1">
                      {!bike.available || bike.remaining <= 0 ? (
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
          )}
          {errors.selectedMotorcycle && <p className="text-red-500 text-sm mt-2">{errors.selectedMotorcycle}</p>}
        </div>
      )}

      {formData.motorcycle.hireOption === 'Hire a Motorcycle' && (
        <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Hire Date:</h4>
          <div className="text-sm text-gray-700">
            <p><strong>Collect on:</strong> 8th November 2025</p>
            <p><strong>Return on:</strong> 15th November 2025</p>
          </div>
        </div>
      )}

      {formData.motorcycle.hireOption === 'Use my own motorcycle' && (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="text-lg font-semibold text-green-800 mb-2">Using Your Own Motorcycle</h4>
            <p className="text-sm text-green-700">Please provide your motorcycle details below.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bike make *</label>
              <input
                type="text"
                name="make"
                value={formData.motorcycle.ownBike.make}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.ownBikeMake && <p className="text-red-500 text-sm mt-1">{errors.ownBikeMake}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bike model *</label>
              <input
                type="text"
                name="model"
                value={formData.motorcycle.ownBike.model}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.ownBikeModel && <p className="text-red-500 text-sm mt-1">{errors.ownBikeModel}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bike year *</label>
              <input
                type="number"
                name="year"
                value={formData.motorcycle.ownBike.year}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.ownBikeYear && <p className="text-red-500 text-sm mt-1">{errors.ownBikeYear}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration number *</label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.motorcycle.ownBike.registrationNumber}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.ownBikeRegistrationNumber && <p className="text-red-500 text-sm mt-1">{errors.ownBikeRegistrationNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Region *</label>
              <select
                name="stateOrRegion"
                value={formData.motorcycle.ownBike.stateOrRegion}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select your state/region</option>
                <option value="AUK">AUK - Auckland</option>
                <option value="BOP">BOP - Bay of Plenty</option>
                <option value="CAN">CAN - Canterbury</option>
                <option value="CIS">CIS - Chatham Islands</option>
                <option value="HKB">HKB - Hawke's Bay</option>
                <option value="MWT">MWT - Manawatu-Wanganui</option>
                <option value="MBH">MBH - Marlborough</option>
                <option value="NSN">NSN - Nelson</option>
                <option value="NTL">NTL - Northland</option>
                <option value="OTA">OTA - Otago</option>
                <option value="STL">STL - Southland</option>
                <option value="TKI">TKI - Taranaki</option>
                <option value="TAS">TAS - Tasman</option>
                <option value="WKO">WKO - Waikato</option>
                <option value="WGN">WGN - Wellington</option>
                <option value="WTC">WTC - West Coast</option>
              </select>
              {errors.ownBikeStateOrRegion && <p className="text-red-500 text-sm mt-1">{errors.ownBikeStateOrRegion}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current odometer reading *</label>
              <input
                type="number"
                name="odometer"
                value={formData.motorcycle.ownBike.odometer}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.ownBikeOdometer && <p className="text-red-500 text-sm mt-1">{errors.ownBikeOdometer}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Is your motorcycle service schedule currently up to date? *</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="serviceUpToDate"
                  value="Yes"
                  checked={formData.motorcycle.ownBike.serviceUpToDate === 'Yes'}
                  onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                  className="mr-2 focus:ring-green-500"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="serviceUpToDate"
                  value="No"
                  checked={formData.motorcycle.ownBike.serviceUpToDate === 'No'}
                  onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                  className="mr-2 focus:ring-green-500"
                />
                No
              </label>
            </div>
            {errors.ownBikeServiceUpToDate && <p className="text-red-500 text-sm mt-1">{errors.ownBikeServiceUpToDate}</p>}
          </div>

          {formData.motorcycle.ownBike.serviceUpToDate === 'No' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Will you ensure your bike is serviced in preparation for the adventure? *</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="serviceIntention"
                    value="Yes"
                    checked={formData.motorcycle.ownBike.serviceIntention === 'Yes'}
                    onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                    className="mr-2 focus:ring-green-500"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="serviceIntention"
                    value="No"
                    checked={formData.motorcycle.ownBike.serviceIntention === 'No'}
                    onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                    className="mr-2 focus:ring-green-500"
                  />
                  No
                </label>
              </div>
              {errors.ownBikeServiceIntention && <p className="text-red-500 text-sm mt-1">{errors.ownBikeServiceIntention}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Does your bike have any unresolved mechanical issues? *</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasUnresolvedIssues"
                  value="Yes"
                  checked={formData.motorcycle.ownBike.hasUnresolvedIssues === 'Yes'}
                  onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                  className="mr-2 focus:ring-green-500"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasUnresolvedIssues"
                  value="No"
                  checked={formData.motorcycle.ownBike.hasUnresolvedIssues === 'No'}
                  onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                  className="mr-2 focus:ring-green-500"
                />
                No
              </label>
            </div>
            {errors.ownBikeHasUnresolvedIssues && <p className="text-red-500 text-sm mt-1">{errors.ownBikeHasUnresolvedIssues}</p>}
          </div>

          {formData.motorcycle.ownBike.hasUnresolvedIssues === 'Yes' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">If yes, please explain *</label>
              <textarea
                name="issuesDetails"
                value={formData.motorcycle.ownBike.issuesDetails}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={4}
              />
              {errors.ownBikeIssuesDetails && <p className="text-red-500 text-sm mt-1">{errors.ownBikeIssuesDetails}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Does your motorcycle have full comprehensive insurance? *</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasComprehensiveInsurance"
                  value="Yes"
                  checked={formData.motorcycle.ownBike.hasComprehensiveInsurance === 'Yes'}
                  onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                  className="mr-2 focus:ring-green-500"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasComprehensiveInsurance"
                  value="No"
                  checked={formData.motorcycle.ownBike.hasComprehensiveInsurance === 'No'}
                  onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                  className="mr-2 focus:ring-green-500"
                />
                No
              </label>
            </div>
            {errors.ownBikeHasComprehensiveInsurance && <p className="text-red-500 text-sm mt-1">{errors.ownBikeHasComprehensiveInsurance}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel capacity *</label>
              <select
                name="fuelCapacity"
                value={formData.motorcycle.ownBike.fuelCapacity}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select capacity</option>
                {[
                  '9L','10L','11L','12L','13L','14L','15L','16L','17L','18L','19L','20L','21L','22L','23L','24L','25L','26L','27L','28L','29L','30L','30L+'
                ].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.ownBikeFuelCapacity && <p className="text-red-500 text-sm mt-1">{errors.ownBikeFuelCapacity}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated full fuel range *</label>
              <select
                name="estimatedRange"
                value={formData.motorcycle.ownBike.estimatedRange}
                onChange={(e) => handleInputChange(e, 'motorcycle.ownBike')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select fuel range</option>
                <option value="100-200">100 - 200</option>
                <option value="200-300">200 - 300</option>
                <option value="300-400">300 - 400</option>
                <option value="400-500">400 - 500</option>
                <option value="500-600+">500 - 600+</option>
              </select>
              {errors.ownBikeEstimatedRange && <p className="text-red-500 text-sm mt-1">{errors.ownBikeEstimatedRange}</p>}
            </div>
          </div>
        </div>
      )}

      {formData.motorcycle.hireOption === 'Hire a Motorcycle' && getSelectedBikeImage() && !bikesLoading && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Selected Motorcycle</h4>
          <div className="flex justify-center">
            <img
              src={getSelectedBikeImage()}
              alt={formData.motorcycle.selectedMotorcycle}
              className="max-w-full h-auto max-h-96 object-contain rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center hidden">
              <span className="text-gray-400 text-sm">Image Failed to Load</span>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2 font-medium">{formData.motorcycle.selectedMotorcycle}</p>
          
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
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-center">
                    <h6 className="text-lg font-semibold text-blue-800 mb-2">Daily Rate</h6>
                    <p className="text-2xl font-bold text-blue-900">${motorcycles.find(bike => bike.name === formData.motorcycle.selectedMotorcycle)?.price}/day</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700"><strong>Collect on:</strong> 8th November 2025</p>
                    <p className="text-sm text-gray-700"><strong>Return on:</strong> 15th November 2025</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Step6;
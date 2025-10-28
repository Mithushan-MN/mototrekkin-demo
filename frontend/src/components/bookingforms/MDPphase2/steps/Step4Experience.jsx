import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import axios from '../../../../axiosConfig';

const Step8BikeDetails = ({ 
  formData, 
  errors,
  onInputChange,
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev 
}) => {
  const [localErrors, setLocalErrors] = useState({});
  const [bikes, setBikes] = useState([]);
  const [loadingBikes, setLoadingBikes] = useState(true);

  const bikeImages = {
    'HONDA CRF250 RALLY': '/assets/phase3bikes/bike-CRF250-Rally.jpg',
    'BMW 310 GS': '/assets/phase3bikes/G310-GS-1.jpg',
    'HONDA CB500X': '/assets/phase3bikes/Honda-CB500X-1.jpg'
  };

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get('/api/bikes');
        if (response.data.success) {
          setBikes(response.data.bikes);
        } else {
          console.error('Failed to fetch bikes:', response.data.message);
          setBikes([
            { _id: '1', name: 'HONDA CRF250 RALLY', dailyRate: 205, remaining: 1 },
            { _id: '2', name: 'BMW 310 GS', dailyRate: 215, remaining: 1 },
            { _id: '3', name: 'HONDA CB500X', dailyRate: 230, remaining: 1 }
          ]);
        }
      } catch (error) {
        console.error('Error fetching bikes:', error);
        setBikes([
          { _id: '1', name: 'HONDA CRF250 RALLY', dailyRate: 205, remaining: 1 },
          { _id: '2', name: 'BMW 310 GS', dailyRate: 215, remaining: 1 },
          { _id: '3', name: 'HONDA CB500X', dailyRate: 230, remaining: 1 }
        ]);
      } finally {
        setLoadingBikes(false);
      }
    };
    fetchBikes();
  }, []);

  const handleInputChange = (field, value) => {
    onInputChange(field, value);

    if (field === 'bikeChoice') {
      onInputChange('bikeHire', value === 'hire' ? 'Yes' : 'No');
      if (value === 'own') {
        onInputChange('hireBike', '');
        onInputChange('addOns', []);
      }
    } else if (field === 'hireBike') {
      onInputChange('bikeHire', value ? 'Yes' : 'No');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bikeChoice) {
      newErrors.bikeChoice = 'Please select whether to use your own bike or hire';
    }
    
    if (formData.bikeChoice === 'hire' && !formData.hireBike) {
      newErrors.hireBike = 'Please select a bike to hire';
    }
    
    if (formData.bikeChoice === 'own') {
      if (!formData.bikeMake) newErrors.bikeMake = 'Bike make is required';
      if (!formData.bikeModel) newErrors.bikeModel = 'Bike model is required';
      if (!formData.bikeYear) newErrors.bikeYear = 'Bike year is required';
    }
    
    if (!formData.licenseValid) {
      newErrors.licenseValid = 'Please indicate if your license is valid';
    } else if (formData.licenseValid === 'No') {
      newErrors.licenseValid = 'A valid license is required to register';
    }
    
    if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!formData.licenseState) newErrors.licenseState = 'State of issue is required';
    
    // if (!formData.trainingState) newErrors.trainingState = 'Please select a training state';
    // if (!formData.trainingDate) newErrors.trainingDate = 'Please select a training date';

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const getSelectedBikeInfo = () => {
    const selectedBike = bikes.find(bike => formData.hireBike === `${bike.name} - $${bike.dailyRate}/day`);
    return selectedBike ? { src: bikeImages[selectedBike.name], name: selectedBike.name } : null;
  };

  const renderDetailedForm = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <img 
          src="https://www.mototrekkin.com.au/wp-content/uploads/Adventure-Rider-MDP-Logo-04-500x500.png" 
          alt="MDP Logo" 
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">REGISTRATION FORM MDP PHASE III</h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{width: `${(currentStep / totalSteps) * 100}%`}}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps} - {Math.round((currentStep / totalSteps) * 100)}%
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Date</h2>
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Training Location
        </label>
        <p className="text-lg font-medium text-gray-900">
          {formData.trainingState}
        </p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Training Date
        </label>
        <p className="text-lg font-medium text-gray-900">
          {formData.trainingDate}
        </p>
      </div>
    </div>
  </div>
</div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bike Details</h2>
            <div className={errors.bikeChoice || localErrors.bikeChoice ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30 mb-6' : 'mb-6'}>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Would you like to:
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bikeChoice"
                    value="own"
                    checked={formData.bikeChoice === 'own'}
                    onChange={(e) => handleInputChange('bikeChoice', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Use my own motorcycle</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="bikeChoice"
                    value="hire"
                    checked={formData.bikeChoice === 'hire'}
                    onChange={(e) => handleInputChange('bikeChoice', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Hire a Moto Trekkin Motorcycle</span>
                </label>
              </div>
              {(errors.bikeChoice || localErrors.bikeChoice) && (
                <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.bikeChoice || localErrors.bikeChoice}
                </p>
              )}
            </div>

            {formData.bikeChoice === 'own' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={errors.bikeMake || localErrors.bikeMake ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Make <span className="text-red-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    name="bikeMake"
                    value={formData.bikeMake}
                    onChange={(e) => handleInputChange('bikeMake', e.target.value)}
                    placeholder="Enter bike make (e.g., Honda, BMW)"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      errors.bikeMake || localErrors.bikeMake ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {(errors.bikeMake || localErrors.bikeMake) && (
                    <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.bikeMake || localErrors.bikeMake}
                    </p>
                  )}
                </div>
                <div className={errors.bikeModel || localErrors.bikeModel ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Model <span className="text-red-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    name="bikeModel"
                    value={formData.bikeModel}
                    onChange={(e) => handleInputChange('bikeModel', e.target.value)}
                    placeholder="Enter bike model (e.g., CRF250, GS1200)"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      errors.bikeModel || localErrors.bikeModel ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {(errors.bikeModel || localErrors.bikeModel) && (
                    <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.bikeModel || localErrors.bikeModel}
                    </p>
                  )}
                </div>
                <div className={errors.bikeYear || localErrors.bikeYear ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bike Year <span className="text-red-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    name="bikeYear"
                    value={formData.bikeYear}
                    onChange={(e) => handleInputChange('bikeYear', e.target.value)}
                    placeholder="Enter bike year (e.g., 2020, 2021)"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                      errors.bikeYear || localErrors.bikeYear ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {(errors.bikeYear || localErrors.bikeYear) && (
                    <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.bikeYear || localErrors.bikeYear}
                    </p>
                  )}
                </div>
              </div>
            )}

            {formData.bikeChoice === 'hire' && (
              <div>
                <div className={errors.hireBike || localErrors.hireBike ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30 mb-4' : 'mb-4'}>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Choose which motorbike you wish to hire. <span className="text-red-500">(Required)</span>
                  </label>
                  {loadingBikes ? (
                    <p>Loading bikes...</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {bikes.map((bike) => {
                        const bikeKey = `${bike.name} - $${bike.dailyRate}/day`;
                        const isSelected = formData.hireBike === bikeKey;
                        return (
                          <div 
                            key={bike._id}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-300 hover:border-gray-400'
                            } ${bike.remaining === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => bike.remaining > 0 && handleInputChange('hireBike', bikeKey)}
                          >
                            <div className="w-full bg-gray-100 rounded-lg p-4 mb-3 h-48 flex items-center justify-center">
                              <img 
                                src={bikeImages[bike.name] || 'https://via.placeholder.com/300x200?text=Unknown'} 
                                alt={bike.name} 
                                className="h-40 object-contain rounded pointer-events-none" 
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600">({bike.remaining} remaining)</p>
                              <p className="font-semibold text-gray-800">{bike.name}</p>
                              <p className="text-lg font-bold text-blue-600">${bike.dailyRate}/day</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {(errors.hireBike || localErrors.hireBike) && (
                    <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.hireBike || localErrors.hireBike}
                    </p>
                  )}
                </div>

                {getSelectedBikeInfo() && (
                  <div className="mt-8">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center">
                      <img
                        src={getSelectedBikeInfo().src}
                        alt={getSelectedBikeInfo().name}
                        className="w-full max-w-4xl h-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                {formData.hireBike && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Add-on Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.addOns?.includes('excessReduction')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...(formData.addOns || []), 'excessReduction']
                              : (formData.addOns || []).filter(item => item !== 'excessReduction');
                            handleInputChange('addOns', addOns);
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Excess Reduction - $15/day</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.addOns?.includes('tyreProtection')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...(formData.addOns || []), 'tyreProtection']
                              : (formData.addOns || []).filter(item => item !== 'tyreProtection');
                            handleInputChange('addOns', addOns);
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Tyre Protection - $15/day</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.addOns?.includes('touringWindscreen')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...(formData.addOns || []), 'touringWindscreen']
                              : (formData.addOns || []).filter(item => item !== 'touringWindscreen');
                            handleInputChange('addOns', addOns);
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Touring Windscreen (Tall) - $5/day</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.addOns?.includes('panniers')}
                          onChange={(e) => {
                            const addOns = e.target.checked 
                              ? [...(formData.addOns || []), 'panniers']
                              : (formData.addOns || []).filter(item => item !== 'panniers');
                            handleInputChange('addOns', addOns);
                          }}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Panniers - $15/day</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Driver's Licence Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={errors.licenseValid || localErrors.licenseValid ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Is your licence currently valid? <span className="text-red-500">(Required)</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="licenseValid"
                      value="Yes"
                      checked={formData.licenseValid === 'Yes'}
                      onChange={(e) => handleInputChange('licenseValid', e.target.value)}
                      required
                      className="mr-2"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="licenseValid"
                      value="No"
                      checked={formData.licenseValid === 'No'}
                      onChange={(e) => handleInputChange('licenseValid', e.target.value)}
                      required
                      className="mr-2"
                    />
                    <span>No</span>
                  </label>
                </div>
                {(errors.licenseValid || localErrors.licenseValid) && (
                  <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.licenseValid || localErrors.licenseValid}
                  </p>
                )}
              </div>
              <div className={errors.licenseNumber || localErrors.licenseNumber ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Licence Number <span className="text-red-500">(Required)</span>
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  placeholder="Enter your licence number"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    errors.licenseNumber || localErrors.licenseNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {(errors.licenseNumber || localErrors.licenseNumber) && (
                  <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.licenseNumber || localErrors.licenseNumber}
                  </p>
                )}
              </div>
              <div className={errors.licenseState || localErrors.licenseState ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State of Issue <span className="text-red-500">(Required)</span>
                </label>
                <select
                  name="licenseState"
                  value={formData.licenseState}
                  onChange={(e) => handleInputChange('licenseState', e.target.value)}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                    errors.licenseState || localErrors.licenseState ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
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
                {(errors.licenseState || localErrors.licenseState) && (
                  <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.licenseState || localErrors.licenseState}
                  </p>
                )}
              </div>
            </div>
          </div>

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

  if (loadingBikes) {
    return <div className="text-center">Loading bikes...</div>;
  }

  return renderDetailedForm();
};

export default Step8BikeDetails;
import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

const Step5TrainingDate = ({ 
  formData, 
  errors,
  onInputChange,
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev 
}) => {
  const handleInputChange = (field, value) => {
    onInputChange(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const renderComprehensiveForm = () => (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
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

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          {/* Training Date Section */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Choose which training date that you want to attend. <span className="text-red-500">(Required)</span>
            </label>
            <input
              type="text"
              id="trainingDate"
              name="trainingDate"
              value={formData.trainingDate}
              readOnly
              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-lg ${
                errors.trainingDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.trainingDate && (
              <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                <span className="w-4 h-4 mr-1">⚠️</span>
                {errors.trainingDate}
              </p>
            )}
          </div>

          {/* Hotel Details Section */}
          <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <p className="text-gray-700 mb-4">
              We recommend booking your stay at the Molly Morgan Motor Inn for the night of the course, as it's conveniently located near the training venue.
            </p>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Hotel Details:</h3>
              <p className="text-gray-700">Molly Morgan Motor Inn</p>
              <p className="text-gray-700">329 New England Highway, East Maitland NSW 2323</p>
              <p className="text-gray-700">Phone: +61 2 4933 5422</p>
            </div>
          </div>

          {/* Riding with a Group Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">RIDING WITH A GROUP</h2>
            <div className={errors.groupRiding ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Are you planning to ride this event with a mate or several friends? i.e a group <span className="text-red-500">(Required)</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="groupRiding-yes"
                    name="groupRiding"
                    value="Yes"
                    checked={formData.groupRiding === 'Yes'}
                    onChange={(e) => handleInputChange('groupRiding', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="groupRiding-no"
                    name="groupRiding"
                    value="No"
                    checked={formData.groupRiding === 'No'}
                    onChange={(e) => handleInputChange('groupRiding', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">No</span>
                </label>
              </div>
              {errors.groupRiding && (
                <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.groupRiding}
                </p>
              )}
            </div>

            {/* Conditional Group Members Input */}
            {formData.groupRiding === 'Yes' && (
              <div className="mt-6">
                <div className={errors.groupMembers ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-lg font-bold text-gray-800 mb-4">
                    Enter the names of people you know are in your group <span className="text-red-500 italic">(Required)</span>
                  </label>
                  <textarea
                    id="groupMembers"
                    name="groupMembers"
                    value={formData.groupMembers}
                    onChange={(e) => handleInputChange('groupMembers', e.target.value)}
                    rows={6}
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none shadow-sm ${
                      errors.groupMembers ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter the names of your group members..."
                  />
                  {errors.groupMembers && (
                    <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.groupMembers}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Non-riding Partner Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">NON-RIDING PARTNER</h2>
            <div className={errors.hasPartner ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Do you wish to register a non-riding partner? <span className="text-red-500">(Required)</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="hasPartner-yes"
                    name="hasPartner"
                    value="Yes"
                    checked={formData.hasPartner === 'Yes'}
                    onChange={(e) => handleInputChange('hasPartner', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="hasPartner-no"
                    name="hasPartner"
                    value="No"
                    checked={formData.hasPartner === 'No'}
                    onChange={(e) => handleInputChange('hasPartner', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">No</span>
                </label>
              </div>
              {errors.hasPartner && (
                <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.hasPartner}
                </p>
              )}
            </div>

            {/* Conditional Partner Name Input */}
            {formData.hasPartner === 'Yes' && (
              <div className="mt-6">
                <div className={errors.partnerName ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                  <label className="block text-lg font-bold text-gray-800 mb-4">
                    Your partner's name <span className="text-red-500">(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="partnerName"
                    name="partnerName"
                    value={formData.partnerName}
                    onChange={(e) => handleInputChange('partnerName', e.target.value)}
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm ${
                      errors.partnerName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your partner's name"
                  />
                  {errors.partnerName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.partnerName}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
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

  return renderComprehensiveForm();
};

export default Step5TrainingDate;
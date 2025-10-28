import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

const Step4Experience = ({ 
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

  const renderExperiencePage = () => (
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

      {/* Experience Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Question 1: Professional Training */}
            <div className={errors.attendedTraining ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Have you ever attended a professional off road motorcycle training course? <span className="text-red-500">(Required)</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendedTraining"
                    value="Yes"
                    checked={formData.attendedTraining === 'Yes'}
                    onChange={(e) => handleInputChange('attendedTraining', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendedTraining"
                    value="No"
                    checked={formData.attendedTraining === 'No'}
                    onChange={(e) => handleInputChange('attendedTraining', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">No</span>
                </label>
              </div>
              {errors.attendedTraining && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.attendedTraining}
                </p>
              )}

              {/* Follow-up Question: Recent Training */}
              {formData.attendedTraining === 'Yes' && (
                <div className="mt-6">
                  <div className={errors.recentTrainingSixMonths ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      If yes, was your training course completed in the last 6 months? <span className="text-red-500">(Required)</span>
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="recentTrainingSixMonths"
                          value="Yes"
                          checked={formData.recentTrainingSixMonths === 'Yes'}
                          onChange={(e) => handleInputChange('recentTrainingSixMonths', e.target.value)}
                          required
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="recentTrainingSixMonths"
                          value="No"
                          checked={formData.recentTrainingSixMonths === 'No'}
                          onChange={(e) => handleInputChange('recentTrainingSixMonths', e.target.value)}
                          required
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-lg">No</span>
                      </label>
                    </div>
                    {errors.recentTrainingSixMonths && (
                      <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                        <span className="w-4 h-4 mr-1">⚠️</span>
                        {errors.recentTrainingSixMonths}
                      </p>
                    )}
                  </div>

                  {/* Training Details Text Area */}
                  {formData.recentTrainingSixMonths === 'Yes' && (
                    <div className="mt-6">
                      <div className={errors.trainingDetails ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
                        <label className="block text-lg font-semibold text-gray-800 mb-4">
                          Please detail course content such as advanced sand course etc. <span className="text-red-500">(Required)</span>
                        </label>
                        <textarea
                          name="trainingDetails"
                          value={formData.trainingDetails}
                          onChange={(e) => handleInputChange('trainingDetails', e.target.value)}
                          rows={6}
                          required
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none ${
                            errors.trainingDetails ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Please describe the course content, such as advanced sand course, rocky terrain, river crossings, etc..."
                        />
                        {errors.trainingDetails && (
                          <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                            <span className="w-4 h-4 mr-1">⚠️</span>
                            {errors.trainingDetails}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Question 2: Off Road Experience */}
            <div className={errors.offRoadExperienceDescription ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Explain how much off road experience you have. It's okay if you don't have a lot of experience but we need to know. <span className="text-red-500">(Required)</span>
              </label>
              <textarea
                name="offRoadExperienceDescription"
                value={formData.offRoadExperienceDescription}
                onChange={(e) => handleInputChange('offRoadExperienceDescription', e.target.value)}
                rows={6}
                required
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none ${
                  errors.offRoadExperienceDescription ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Please describe your off-road motorcycle experience..."
              />
              {errors.offRoadExperienceDescription && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.offRoadExperienceDescription}
                </p>
              )}
            </div>

            {/* Question 3: Riding Experience Level */}
            <div className={errors.ridingExperienceLevel ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Overall, how would you personally rate your off road riding experience. <span className="text-red-500">(Required)</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ridingExperienceLevel"
                    value="Beginner"
                    checked={formData.ridingExperienceLevel === 'Beginner'}
                    onChange={(e) => handleInputChange('ridingExperienceLevel', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Beginner</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ridingExperienceLevel"
                    value="Intermediate"
                    checked={formData.ridingExperienceLevel === 'Intermediate'}
                    onChange={(e) => handleInputChange('ridingExperienceLevel', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Intermediate</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ridingExperienceLevel"
                    value="Extreme"
                    checked={formData.ridingExperienceLevel === 'Extreme'}
                    onChange={(e) => handleInputChange('ridingExperienceLevel', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Extreme</span>
                </label>
              </div>
              {errors.ridingExperienceLevel && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.ridingExperienceLevel}
                </p>
              )}
            </div>

            {/* Question 4: Confidence Concerns */}
            <div className={errors.confidenceConcerns ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Is there anything you feel you are not confident with that could cause an issue for you on this adventure ride? <span className="text-red-500">(Required)</span>
              </label>
              <textarea
                name="confidenceConcerns"
                value={formData.confidenceConcerns}
                onChange={(e) => handleInputChange('confidenceConcerns', e.target.value)}
                rows={6}
                required
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none ${
                  errors.confidenceConcerns ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Please describe any concerns or areas where you feel less confident..."
              />
              {errors.confidenceConcerns && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.confidenceConcerns}
                </p>
              )}
            </div>
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

  return renderExperiencePage();
};

export default Step4Experience;
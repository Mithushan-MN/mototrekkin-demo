import React from 'react';

const Step5 = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Have you ever attended a professional off road motorcycle training course? *</label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="hasTraining"
              value="Yes"
              checked={formData.hasTraining === 'Yes'}
              onChange={handleInputChange}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hasTraining"
              value="No"
              checked={formData.hasTraining === 'No'}
              onChange={handleInputChange}
              className="mr-2"
            />
            No
          </label>
        </div>
        {errors.hasTraining && <p className="text-red-500 text-sm mt-1">{errors.hasTraining}</p>}
      </div>

      {formData.hasTraining === 'Yes' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">If yes, was your training course completed in the last 6 months? *</label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recentTraining"
                  value="Yes"
                  checked={formData.recentTraining === 'Yes'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="recentTraining"
                  value="No"
                  checked={formData.recentTraining === 'No'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors.recentTraining && <p className="text-red-500 text-sm mt-1">{errors.recentTraining}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Please detail course content such as advanced sand course etc.</label>
            <textarea
              name="trainingDetails"
              value={formData.trainingDetails}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="WRITE N/A IF NOT APPLICABLE"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Explain how much off road experience you have. It's okay if you don't have a lot of experience but we need to know.</label>
            <textarea
              name="offRoadExperience"
              value={formData.offRoadExperience}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="WRITE N/A IF NOT APPLICABLE"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Overall, how would you personally rate your off road riding experience. *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
            <input
              type="radio"
              name="experienceLevel"
              value="Beginner"
              checked={formData.experienceLevel === 'Beginner'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <span className="font-medium">Beginner</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
            <input
              type="radio"
              name="experienceLevel"
              value="Intermediate"
              checked={formData.experienceLevel === 'Intermediate'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <span className="font-medium">Intermediate</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer">
            <input
              type="radio"
              name="experienceLevel"
              value="Extreme"
              checked={formData.experienceLevel === 'Extreme'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <span className="font-medium">Extreme</span>
          </label>
        </div>
        {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Is there anything you feel you are not confident with that could cause an issue for you on this adventure ride?</label>
        <textarea
          name="confidenceAreas"
          value={formData.confidenceAreas}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="WRITE N/A IF NOT APPLICABLE"
        />
      </div>
    </div>
  );
};

export default Step5;

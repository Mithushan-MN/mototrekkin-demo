import React from 'react';

const Step11 = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Moto Trekkin Event Terms and Conditions</h3>
      
      {/* PDF Preview */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions Document</h4>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            src="/assets/Moto-Trekkin-Masterclass-event-terms-and-conditions-V1.22.01.15-1.pdf"
            width="100%"
            height="600"
            className="border-0"
            title="Moto Trekkin Event Terms and Conditions"
          />
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>If the PDF doesn't load, you can <a href="/assets/Moto-Trekkin-Masterclass-event-terms-and-conditions-V1.22.01.15-1.pdf" target="_blank" className="text-blue-600 hover:underline">download it here</a>.</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Terms *</label>
          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className={`mt-1 mr-3 ${
                errors.agreeToTerms ? 'border-red-500' : ''
              }`}
            />
            <span className="text-gray-700">
              I have read and agree to the Moto Trekkin Transport Terms and Conditions
            </span>
          </div>
          {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">If you have read, understood and agree to the event, type in "I AGREE". *</label>
          <input
            type="text"
            name="termsAgreement"
            value={formData.termsAgreement}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              errors.termsAgreement ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
            }`}
            placeholder="Type 'I AGREE' to confirm"
            required
          />
          {errors.termsAgreement && <p className="text-red-500 text-sm mt-1">{errors.termsAgreement}</p>}
        </div>
      </div>
    </div>
  );
};

export default Step11;

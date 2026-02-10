import React from 'react';
import { CreditCard } from 'lucide-react';

const Step8FinalReview = ({ 
  formData, 
  updateFormData, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious,
  trainingFee,
  currentDeposit
}) => {
  const HIRE_DAYS = 2;
  const PARTNER_FEE = 149;

  const getBikeDailyRate = () => {
    if (!formData.hireBike) return 0;
    const match = formData.hireBike.match(/\$([0-9]+)\/day/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const bikeHireTotal = getBikeDailyRate() * HIRE_DAYS;
  const partnerFee = formData.hasPartner === 'Yes' ? PARTNER_FEE : 0;
  const subtotal = trainingFee + partnerFee + bikeHireTotal;

  const handleInputChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Step 8/9</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Final Review & Payment</h2>
        <p className="text-gray-600">{currentStep} of {totalSteps}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Terms Agreement */}
        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={(e) => updateFormData({ termsAgreed: e.target.checked })}
            />
            <span className="ml-3">I agree to the terms and conditions</span>
          </label>
          <input
            type="text"
            name="termsConfirmation"
            value={formData.termsConfirmation}
            onChange={handleInputChange}
            placeholder="Type 'I AGREE'"
            className="w-full p-4 border rounded-lg"
          />
        </div>

        {/* Payment Option */}
        <div className="flex gap-6 mb-8">
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="full"
              checked={formData.paymentOption === 'full'}
              onChange={handleInputChange}
            />
            Full Payment (${subtotal.toFixed(2)})
          </label>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="deposit"
              checked={formData.paymentOption === 'deposit'}
              onChange={handleInputChange}
            />
            Deposit (${currentDeposit.toFixed(2)})
          </label>
        </div>

        {/* Payment Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-bold mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Training Fee</span>
              <span>${trainingFee.toFixed(2)}</span>
            </div>
            {formData.hasPartner === 'Yes' && (
              <div className="flex justify-between">
                <span>Partner Fee</span>
                <span>${PARTNER_FEE.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Bike Hire ({HIRE_DAYS} days)</span>
              <span>${bikeHireTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Gift Voucher */}
        <div className="flex gap-4">
          <input
            name="giftVoucher"
            value={formData.giftVoucher}
            onChange={handleInputChange}
            placeholder="Gift Voucher Code"
            className="flex-1 p-4 border rounded-lg"
          />
          <button type="button" className="px-6 py-4 bg-blue-600 text-white rounded-lg">
            Apply
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t">
          <button type="button" onClick={onPrevious} className="px-8 py-4 border rounded-xl">
            Previous
          </button>
          <button type="submit" className="px-8 py-4 bg-green-600 text-white rounded-xl">
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step8FinalReview;
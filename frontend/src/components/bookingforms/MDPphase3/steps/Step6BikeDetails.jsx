import React, { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';

// Constants
const HIRE_DAYS = 3;
const TRAINING_FEE = 990;
const PARTNER_FEE = 149;
const DEPOSIT_AMOUNT = 499;
const MERCHANT_FEE_RATE = 0.03; // 3%

const ADD_ON_RATES = {
  excessReduction: 15,
  tyreProtection: 15,
  touringWindscreen: 5,
  panniers: 15,
};

const ADD_ON_LABELS = {
  excessReduction: 'Excess Reduction',
  tyreProtection: 'Tyre Protection',
  touringWindscreen: 'Touring Windscreen',
  panniers: 'Panniers',
};

const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

const Step10FinalReview = ({
  formData,
  errors,
  onInputChange,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    onInputChange(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double-clicks

    setIsSubmitting(true);
    try {
      // simulate submission delay if needed
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onNext(); // proceed to next step
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false); // re-enable button on error
    }
  };

  // === CALCULATE TOTALS ===
  const bikeHireTotal = formData.hireBike
    ? parseFloat(formData.hireBike.split('$')[1]?.replace('/day', '')) * HIRE_DAYS
    : 0;

  const addOnsTotal = formData.addOns?.reduce((sum, addon) => {
    return sum + (ADD_ON_RATES[addon] || 0) * HIRE_DAYS;
  }, 0) || 0;

  const giftVoucherAmount = formData.giftVoucher && !isNaN(parseFloat(formData.giftVoucher))
    ? parseFloat(formData.giftVoucher)
    : 0;

  const subtotal = TRAINING_FEE +
    (formData.hasPartner === 'Yes' ? PARTNER_FEE : 0) +
    bikeHireTotal +
    addOnsTotal;

  // Base amount before merchant fee
  const baseAmount = formData.paymentOption === 'full'
    ? subtotal
    : DEPOSIT_AMOUNT;

  const amountAfterVoucher = Math.max(0, baseAmount - giftVoucherAmount);

  // Dynamic 3% Merchant Fee (rounded to nearest cent)
  const merchantFee = Math.round(amountAfterVoucher * MERCHANT_FEE_RATE * 100) / 100;

  const totalToPay = amountAfterVoucher + merchantFee;

  const remainingBalance = formData.paymentOption === 'deposit'
    ? Math.max(0, subtotal - DEPOSIT_AMOUNT)
    : 0;

  // === RENDER ===
  const renderFinalPage = () => (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <img
          src="https://www.mototrekkin.com.au/wp-content/uploads/Adventure-Rider-MDP-Logo-04-500x500.png"
          alt="MDP Logo"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">REGISTRATION FORM MDP PHASE III</h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps} - 100%
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          {/* Event Information PDF */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Information PDF</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="/assets/Moto-Trekkin-Masterclass-event-terms-and-conditions-V1.22.01.15-1.pdf"
                  title="MDP Event Information PDF"
                  className="w-full h-full rounded border"
                />
              </div>
              <div className="mt-3 flex gap-3">
                <a
                  href="/assets/Moto-Trekkin-Masterclass-event-terms-and-conditions-V1.22.01.15-1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300"
                >
                  Open Fullscreen
                </a>
                <a
                  href="/pdfs/MDP-Phase2-Information.pdf"
                  download
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-all duration-300"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>

            <div className={errors.termsAgreed ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30 mb-6' : 'mb-6'}>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.termsAgreed || false}
                  onChange={(e) => handleInputChange('termsAgreed', e.target.checked)}
                  required
                  className="mr-3 w-5 h-5 mt-1"
                />
                <span className="text-lg">
                  I have read and agree to the <strong>Moto Trekkin Transport Terms and Conditions</strong>{' '}
                  <span className="text-red-500">(Required)</span>
                </span>
              </label>
              {errors.termsAgreed && (
                <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                  Warning: {errors.termsAgreed}
                </p>
              )}
            </div>

            <div className={errors.termsConfirmation ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type "I AGREE" to confirm <span className="text-red-500">(Required)</span>
              </label>
              <input
                type="text"
                value={formData.termsConfirmation || ''}
                onChange={(e) => handleInputChange('termsConfirmation', e.target.value)}
                placeholder="Type 'I AGREE' here"
                required
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                  errors.termsConfirmation ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.termsConfirmation && (
                <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                  Warning: {errors.termsConfirmation}
                </p>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>

            {/* Payment Option */}
            <div className={errors.paymentOption ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30 mb-8' : 'mb-8'}>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Payment Option <span className="text-red-500">(Required)</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="full"
                    checked={formData.paymentOption === 'full'}
                    onChange={(e) => handleInputChange('paymentOption', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Full Payment</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="deposit"
                    checked={formData.paymentOption === 'deposit'}
                    onChange={(e) => handleInputChange('paymentOption', e.target.value)}
                    required
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-lg">Deposit (Non-refundable). Balance due 14 days prior.</span>
                </label>
              </div>
              {errors.paymentOption && (
                <p className="text-red-500 text-sm mt-2 flex items-center animate-pulse">
                  Warning: {errors.paymentOption}
                </p>
              )}
            </div>

            {/* Gift Voucher */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gift Voucher (optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={formData.giftVoucher || ''}
                  onChange={(e) => handleInputChange('giftVoucher', e.target.value)}
                  placeholder="Enter code for discount"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => console.log('Apply voucher:', formData.giftVoucher)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Summary Table */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Training Course</span>
                  <span className="font-semibold">{formatCurrency(TRAINING_FEE)}</span>
                </div>
                {formData.hasPartner === 'Yes' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Partner Fee</span>
                    <span className="font-semibold">{formatCurrency(PARTNER_FEE)}</span>
                  </div>
                )}
                {formData.bikeChoice === 'hire' && bikeHireTotal > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Bike Hire ({HIRE_DAYS} days)</span>
                    <span className="font-semibold">{formatCurrency(bikeHireTotal)}</span>
                  </div>
                )}
                {formData.addOns?.length > 0 && (
                  <>
                    {formData.addOns.map((addon) => (
                      <div key={addon} className="flex justify-between items-center py-2">
                        <span className="text-gray-700">{ADD_ON_LABELS[addon]} ({HIRE_DAYS} days)</span>
                        <span className="font-semibold">
                          {formatCurrency(ADD_ON_RATES[addon] * HIRE_DAYS)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-2 border-t border-gray-200">
                      <span className="text-gray-700">Add-ons Subtotal</span>
                      <span className="font-semibold">{formatCurrency(addOnsTotal)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Subtotal</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Gift Voucher Applied */}
            {giftVoucherAmount > 0 && (
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">Gift Voucher Applied</span>
                  <span className="font-semibold text-green-700">-{formatCurrency(giftVoucherAmount)}</span>
                </div>
              </div>
            )}

            {/* Full Payment */}
            {formData.paymentOption === 'full' && (
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Full Payment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Amount (after voucher)</span>
                    <span className="font-semibold">{formatCurrency(amountAfterVoucher)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Merchant Fee (3%)</span>
                    <span className="font-semibold">{formatCurrency(merchantFee)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-300">
                    <span className="text-lg font-bold text-gray-900">Total to Pay</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(totalToPay)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Deposit Payment */}
            {formData.paymentOption === 'deposit' && (
              <div className="bg-orange-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Non-Refundable Deposit</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Deposit</span>
                    <span className="font-semibold">{formatCurrency(DEPOSIT_AMOUNT)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Merchant Fee (3%)</span>
                    <span className="font-semibold">{formatCurrency(merchantFee)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-300">
                    <span className="text-lg font-bold text-gray-900">Amount to Pay Now</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(totalToPay)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <span>Remaining Balance (due 14 days prior)</span>
                    <span className="font-medium">{formatCurrency(remainingBalance)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Note */}
<div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg mt-10 mb-6">
  <p className="text-base">
    <strong>Note:</strong> After clicking the <span className="font-semibold">SUBMIT REGISTRATION</span> button, 
    a secure <span className="font-semibold">Stripe payment window</span> will appear. 
    Please complete your payment using your preferred card. 
    Once payment is successful, you will be automatically redirected to the confirmation page.
  </p>
</div>

        {/* Navigation */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-12 pt-8 border-t-2 border-gray-200">
  <button
    type="button"
    onClick={onPrev}
    className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
  >
    <ArrowLeft className="w-5 h-5 mr-3" />
    PREVIOUS
  </button>

  <button
    type="submit"
    disabled={
      isSubmitting ||
      !formData.termsAgreed ||
      formData.termsConfirmation !== 'I AGREE'
    }
    className={`w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
      isSubmitting ? 'cursor-wait' : ''
    }`}
  >
    <span className="text-lg">
      {isSubmitting ? 'Submitting…' : 'SUBMIT REGISTRATION'}
    </span>
    <Star className="w-5 h-5 ml-3" />
  </button>
</div>

        </form>
      </div>
    </div>
  );

  return renderFinalPage();
};

export default Step10FinalReview;
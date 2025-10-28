import React, { useEffect } from 'react';

const Step12 = ({ formData = {}, handleInputChange, errors = {}, calculateTotalPayment, motorcycles = [] }) => {
  // Log formData and errors to debug
  useEffect(() => {
    console.log('Step12: Received formData:', formData);
    console.log('Step12: formData.accommodationPreference:', formData.accommodationPreference);
    console.log('Step12: formData.registerPartner:', formData.registerPartner);
    console.log('Step12: formData.payment:', formData.payment);
    console.log('Step12: formData.motorcycle:', formData.motorcycle);
    console.log('Step12: errors:', errors);
  }, [formData, errors]);

  // ✅ FIXED: Use ROOT formData fields (NOT nested accommodation)
  const selectedBike = motorcycles.find(bike => bike.name === (formData.motorcycle?.selectedMotorcycle || ''));
  const bikeHire = selectedBike && formData.motorcycle?.hireOption === 'Hire a Motorcycle' ? selectedBike.price * 8 : 0;
  
  // ✅ FIXED: Use ROOT formData.accommodationPreference
  const eventPackage = formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION' ? 4890 : 3699;
  const partnerFee = formData.registerPartner === 'Yes' ? 4890 : 0;
  
  const subtotal = eventPackage + partnerFee + bikeHire;
  const discount = formData.payment?.paymentOption === 'Full Payment' ? 50 : 0;
  const afterDiscount = subtotal - discount;
  const merchantFee = formData.payment?.paymentOption === 'Deposit'
    ? (formData.registerPartner === 'Yes' ? 33.66 : 16.83)
    : (afterDiscount * 0.015 + 0.02).toFixed(2);
  const totalToPay = formData.payment?.paymentOption === 'Deposit'
    ? (formData.registerPartner === 'Yes' ? 990 + 990 + 33.66 : 990 + 16.83).toFixed(2)
    : formData.payment?.paymentOption === 'Three Payments'
    ? ((subtotal / 3) + (subtotal / 3) * 0.015 + 0.02).toFixed(2)
    : (afterDiscount + parseFloat(merchantFee)).toFixed(2);
  const remainingBalance = formData.payment?.paymentOption === 'Deposit'
    ? (subtotal - (formData.registerPartner === 'Yes' ? 990 + 990 : 990)).toFixed(2)
    : formData.payment?.paymentOption === 'Three Payments'
    ? ((subtotal * 2) / 3).toFixed(2)
    : 0;

  // Handle radio button change
const handlePaymentChange = (e) => {
  const { name, value } = e.target;
  console.log('Step12: Radio button changed:', { name, value });
  handleInputChange(e, 'payment');  // ✅ FIXED!
};

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h3>

      {/* Purchase Summary */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-900 mb-4">PURCHASE SUMMARY</h4>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h5 className="text-lg font-semibold text-gray-900 mb-2">EVENT PACKAGE</h5>
          <div className="bg-gray-200 p-3 rounded">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {formData.accommodationPreference === '$3699 - SHARED ACCOMMODATION'
                  ? 'SHARED ACCOMMODATION'
                  : formData.accommodationPreference === '$4890 - PRIVATE ACCOMMODATION'
                  ? 'PRIVATE ACCOMMODATION'
                  : 'ACCOMMODATION'}
              </span>
              <span className="text-lg font-bold">${eventPackage.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {formData.registerPartner === 'Yes' && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h5 className="text-lg font-semibold text-gray-900 mb-2">Partner Fee</h5>
            <div className="bg-gray-200 p-3 rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">Partner Package</span>
                <span className="text-lg font-bold">${partnerFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {formData.motorcycle?.selectedMotorcycle && formData.motorcycle?.hireOption === 'Hire a Motorcycle' && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h5 className="text-lg font-semibold text-gray-900 mb-2">Bike Hire</h5>
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                {selectedBike?.image ? (
                  <img
                    src={selectedBike.image}
                    alt={formData.motorcycle.selectedMotorcycle}
                    className="w-48 h-48 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                    <span className="text-gray-500 text-base">Image</span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{formData.motorcycle?.selectedMotorcycle || 'N/A'}</p>
                  <p className="text-sm text-gray-600">8 days hire</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h6 className="font-semibold text-gray-900 mb-3">Specifications</h6>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Motorcycle:</span>
                  <span>{formData.motorcycle?.selectedMotorcycle || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hire Duration:</span>
                  <span>8 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Collection Date:</span>
                  <span>8th November 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Return Date:</span>
                  <span>15th November 2025</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 p-3 rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">Bike Hire - {formData.motorcycle?.selectedMotorcycle || 'N/A'}</span>
                <span className="text-lg font-bold">${bikeHire.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Daily Rate: ${selectedBike ? selectedBike.price : 0}/day | 8 days | Collect: 8th Nov 2025, Return: 15th Nov 2025
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Summary */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-900 mb-4">PAYMENT SUMMARY</h4>
        <div className="bg-gray-100 p-6 rounded-lg">
          {formData.payment?.paymentOption === 'Deposit' ? (
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  Pay your $990 deposit now to secure your place on the event. We will invoice you after registration, and you can pay the balance anytime up until 60 days prior to the event.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-semibold text-gray-900 mb-3">REQUIRED DEPOSIT</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participant Deposit:</span>
                    <span>$990.00</span>
                  </div>
                  {partnerFee > 0 && (
                    <div className="flex justify-between">
                      <span>Partner Deposit:</span>
                      <span>$990.00</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Merchant Fee:</span>
                    <span>${merchantFee}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-xl font-bold text-green-600">
                      <span>TOTAL TO PAY:</span>
                      <span>${totalToPay}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Remaining Balance:</span>
                    <span>${remainingBalance}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : formData.payment?.paymentOption === 'Three Payments' ? (
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-semibold text-gray-900 mb-3">THREE PAYMENTS</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Event Package:</span>
                    <span>${eventPackage.toFixed(2)}</span>
                  </div>
                  {partnerFee > 0 && (
                    <div className="flex justify-between">
                      <span>Partner Fee:</span>
                      <span>${partnerFee.toFixed(2)}</span>
                    </div>
                  )}
                  {bikeHire > 0 && (
                    <div className="flex justify-between">
                      <span>Bike Hire:</span>
                      <span>${bikeHire.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="space-y-1 mt-3">
                    <div className="flex justify-between">
                      <span>PAYMENT 1 - DUE NOW:</span>
                      <span>${(subtotal / 3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PAYMENT 2 - DUE 25TH MARCH 2025:</span>
                      <span>${(subtotal / 3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PAYMENT 3 - DUE 25TH JUNE 2025:</span>
                      <span>${(subtotal / 3).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>Merchant Fee (Payment 1):</span>
                      <span>${((subtotal / 3) * 0.015 + 0.02).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-green-600">
                      <span>TOTAL TO PAY TODAY:</span>
                      <span>${totalToPay}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Remaining Balance:</span>
                      <span>${remainingBalance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Event Package:</span>
                <span>${eventPackage.toFixed(2)}</span>
              </div>
              {partnerFee > 0 && (
                <div className="flex justify-between">
                  <span>Partner Fee:</span>
                  <span>${partnerFee.toFixed(2)}</span>
                </div>
              )}
              {bikeHire > 0 && (
                <div className="flex justify-between">
                  <span>Bike Hire:</span>
                  <span>${bikeHire.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Full Payment Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Merchant Fee:</span>
                  <span>${merchantFee}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-green-600">
                    <span>TOTAL TO PAY:</span>
                    <span>${totalToPay}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Options */}
      <div className={`mb-8 ${errors.paymentOption ? 'border border-red-500 rounded-lg p-4' : ''}`}>
        <h4 className="text-xl font-bold text-gray-900 mb-4">PAYMENT & CONFIRMATION</h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Option (Required) *</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentOption"
                value="Full Payment"
                checked={formData.payment?.paymentOption === 'Full Payment'}
                onChange={handlePaymentChange}
                className="mr-2 focus:ring-green-500"
              />
              <span>Full Payment (SAVE $50)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentOption"
                value="Deposit"
                checked={formData.payment?.paymentOption === 'Deposit'}
                onChange={handlePaymentChange}
                className="mr-2 focus:ring-green-500"
              />
              <span>$990 Deposit (Non-refundable)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentOption"
                value="Three Payments"
                checked={formData.payment?.paymentOption === 'Three Payments'}
                onChange={handlePaymentChange}
                className="mr-2 focus:ring-green-500"
              />
              <span>Three Payments</span>
            </label>
          </div>
          {errors.paymentOption && (
            <p className="text-red-500 text-sm mt-2 font-medium bg-red-50 p-2 rounded">
              {errors.paymentOption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step12;
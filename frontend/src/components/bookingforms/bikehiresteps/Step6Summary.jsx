const Step6Summary = ({ formData, nextStep,prevStep }) => {
  // Example price calculations
  const bikePrice = formData.bike?.price || 0;
  const totalDays = formData.totalDays || 0;

  const subtotal = bikePrice * totalDays;
  const merchantFee = subtotal * 0.03; // 3% fee
  const total = subtotal + merchantFee;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Purchase Summary</h2>
      <div className="border p-4 rounded-md">
        <p><strong>Bike:</strong> {formData.bike?.name} - ${bikePrice}/day</p>
        <p><strong>Total Days:</strong> {totalDays}</p>
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>Merchant Fee (3%):</strong> ${merchantFee.toFixed(2)}</p>
        <p className="text-xl font-bold mt-2">TOTAL: ${total.toFixed(2)}</p>
      </div>

       <div className="flex justify-between mt-4">
  <button
    onClick={prevStep}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
  >
    Previous
  </button>
  <button
    onClick={nextStep}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Step6Summary;

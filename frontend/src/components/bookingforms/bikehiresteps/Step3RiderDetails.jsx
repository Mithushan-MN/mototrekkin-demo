const Step3RiderDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div className="space-y-4">
      <label className="block">
        Full Name
        <input
          type="text"
          value={formData.riderName || ""}
          onChange={(e) => setFormData({ ...formData, riderName: e.target.value })}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Email
        <input
          type="email"
          value={formData.riderEmail || ""}
          onChange={(e) => setFormData({ ...formData, riderEmail: e.target.value })}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Phone
        <input
          type="tel"
          value={formData.riderPhone || ""}
          onChange={(e) => setFormData({ ...formData, riderPhone: e.target.value })}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        License Number
        <input
          type="text"
          value={formData.licenseNumber || ""}
          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          className="border p-2 w-full"
        />
      </label>

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

export default Step3RiderDetails;

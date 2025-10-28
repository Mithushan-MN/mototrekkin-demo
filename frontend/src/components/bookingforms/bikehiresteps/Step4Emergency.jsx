const Step4Emergency = ({ formData, setFormData, nextStep,prevStep }) => {
  return (
    <div className="space-y-4">
      <label className="block">
        Emergency Contact Name
        <input
          type="text"
          value={formData.emergencyName || ""}
          onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Relationship
        <input
          type="text"
          value={formData.emergencyRelation || ""}
          onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Phone Number
        <input
          type="tel"
          value={formData.emergencyPhone || ""}
          onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
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

export default Step4Emergency;

import { useEffect } from "react";

const Step1Dates = ({ formData, setFormData, nextStep }) => {
  const hireDates = formData.hireDates || {};

  useEffect(() => {
    if (hireDates.pickupDate && hireDates.returnDate) {
      const start = new Date(hireDates.pickupDate);
      const end = new Date(hireDates.returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData({ ...formData, hireDates: { ...hireDates, totalDays: diffDays } });
    }
  }, [hireDates.pickupDate, hireDates.returnDate]);

  return (
    <div className="space-y-4">
      <label className="block">
        Pickup Date
        <input
          type="date"
          value={hireDates.pickupDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, hireDates: { ...hireDates, pickupDate: e.target.value } })
          }
          className="border p-2 w-full"
        />
      </label>
      <label className="block">
        Pickup Time
        <input
          type="time"
          value={hireDates.pickupTime || ""}
          onChange={(e) =>
            setFormData({ ...formData, hireDates: { ...hireDates, pickupTime: e.target.value } })
          }
          className="border p-2 w-full"
        />
      </label>
      <label className="block">
        Return Date
        <input
          type="date"
          value={hireDates.returnDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, hireDates: { ...hireDates, returnDate: e.target.value } })
          }
          className="border p-2 w-full"
        />
      </label>
      <label className="block">
        Return Time
        <input
          type="time"
          value={hireDates.returnTime || ""}
          onChange={(e) =>
            setFormData({ ...formData, hireDates: { ...hireDates, returnTime: e.target.value } })
          }
          className="border p-2 w-full"
        />
      </label>
      <div>
        <strong>Total Days:</strong> {hireDates.totalDays || 0}
      </div>

      <div className="flex justify-end mt-4">
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

export default Step1Dates;

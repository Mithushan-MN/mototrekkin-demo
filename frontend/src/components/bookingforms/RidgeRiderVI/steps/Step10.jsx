import React from 'react';

const Step10 = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Riding with a Group</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Are you planning to ride this event with a mate or several friends? i.e a group *</label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="ridingWithGroup"
                value="Yes"
                checked={formData.ridingWithGroup === 'Yes'}
                onChange={handleInputChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ridingWithGroup"
                value="No"
                checked={formData.ridingWithGroup === 'No'}
                onChange={handleInputChange}
                className="mr-2"
              />
              No
            </label>
          </div>
          {errors.ridingWithGroup && <p className="text-red-500 text-sm mt-1">{errors.ridingWithGroup}</p>}
          
          {formData.ridingWithGroup === 'Yes' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter the first and last names of people you know are in your group *</label>
              <p className="text-sm text-gray-600 mb-2">WRITE N/A IF NOT APPLICABLE</p>
              <textarea
                name="groupMembers"
                value={formData.groupMembers}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  errors.groupMembers ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                }`}
                required
              />
              {errors.groupMembers && <p className="text-red-500 text-sm mt-1">{errors.groupMembers}</p>}
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gift Voucher (optional)</label>
          <p className="text-sm text-gray-600 mb-2">If you have a gift voucher, enter it here for a special discount</p>
          <div className="flex gap-3">
            <input
              type="text"
              name="giftVoucherCode"
              value={formData.giftVoucherCode}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter gift voucher code"
            />
            <button
              type="button"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step10;

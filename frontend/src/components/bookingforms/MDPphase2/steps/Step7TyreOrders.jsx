import React from 'react';

const Step7TyreOrders = ({ 
  formData, 
  updateFormData, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious 
}) => {
  const handleInputChange = (e) => {
    if (e.target.name.includes('.')) {
      const [parent, child] = e.target.name.split('.');
      const newValue = e.target.value;
      updateFormData({
        [parent]: { ...formData[parent], [child]: newValue }
      });
    } else {
      updateFormData({ [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Step 7/9</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tyre Orders</h2>
        <p className="text-gray-600">{currentStep} of {totalSteps}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tyre Requirement */}
        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="radio"
              name="requiresTyres"
              value="no"
              checked={formData.requiresTyres === 'no'}
              onChange={handleInputChange}
            />
            <span className="ml-3">NO - I'll arrange my own tyres</span>
          </label>
          <label className="flex items-start">
            <input
              type="radio"
              name="requiresTyres"
              value="yes"
              checked={formData.requiresTyres === 'yes'}
              onChange={handleInputChange}
            />
            <span className="ml-3">YES - Provide tyre quote</span>
          </label>
        </div>

        {/* Tyre Details - Conditional */}
        {formData.requiresTyres === 'yes' && (
          <>
            {/* Front Tyre */}
            <div className="grid grid-cols-3 gap-6">
              <select name="frontTyre.width" value={formData.frontTyre.width} onChange={handleInputChange}>
                <option value="">Width</option>
                <option value="90">90</option>
                {/* ... */}
              </select>
              <select name="frontTyre.height" value={formData.frontTyre.height} onChange={handleInputChange}>
                <option value="">Height</option>
                {/* ... */}
              </select>
              <select name="frontTyre.rim" value={formData.frontTyre.rim} onChange={handleInputChange}>
                <option value="">Rim</option>
                {/* ... */}
              </select>
            </div>

            {/* Rear Tyre */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {/* Similar structure */}
            </div>

            {/* Tyre Brands */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <input
                name="preferredBrand"
                value={formData.preferredBrand}
                onChange={handleInputChange}
                placeholder="Preferred Brand"
              />
              <input
                name="secondBrand"
                value={formData.secondBrand}
                onChange={handleInputChange}
                placeholder="Second Choice"
              />
            </div>

            {/* Wheel Type */}
            <div className="flex gap-6 mt-8">
              <label>
                <input
                  type="radio"
                  name="wheelType"
                  value="Tubeless rims"
                  checked={formData.wheelType === 'Tubeless rims'}
                  onChange={handleInputChange}
                />
                Tubeless rims
              </label>
              {/* ... other options */}
            </div>

            {/* Tyre Management */}
            <div className="space-y-4 mt-8">
              <label className="flex items-start">
                <input
                  type="radio"
                  name="tyreManagement"
                  value="WRARS"
                  checked={formData.tyreManagement === 'WRARS'}
                  onChange={handleInputChange}
                />
                <span className="ml-3">$100 WRARS - Refit at destination</span>
              </label>
              {/* ... other options */}
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t">
          <button type="button" onClick={onPrevious} className="px-8 py-4 border rounded-xl">
            Previous
          </button>
          <button type="submit" className="px-8 py-4 bg-blue-600 text-white rounded-xl">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step7TyreOrders;
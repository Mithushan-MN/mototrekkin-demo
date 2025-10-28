import React from 'react';

const Step8 = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Safety & Navigation Equipment</h3>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>You will be travelling in remote regions of NZ-SI and will require the following equipment. The following equipment is NOT included with your motorcycle hire. Please confirm you have the equipment listed below.</strong>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hydration *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hydration"
              value="2-3 Litre Hydro Back Pack"
              checked={formData.hydration.includes('2-3 Litre Hydro Back Pack')}
              onChange={handleInputChange}
              className="mr-2"
            />
            2-3 Litre Hydro Back Pack
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hydration"
              value="None"
              checked={formData.hydration.includes('None')}
              onChange={handleInputChange}
              className="mr-2"
            />
            None
          </label>
        </div>
        {errors.hydration && <p className="text-red-500 text-sm mt-1">{errors.hydration}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Electronic Equipment *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="electronicEquipment"
              value="Personal Locating Beacon"
              checked={formData.electronicEquipment.includes('Personal Locating Beacon')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Personal Locating Beacon
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="electronicEquipment"
              value="Spot Tracker or similar"
              checked={formData.electronicEquipment.includes('Spot Tracker or similar')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Spot Tracker or similar
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="electronicEquipment"
              value="We will be using the GAIA GPS App to navigate during this event"
              checked={formData.electronicEquipment.includes('We will be using the GAIA GPS App to navigate during this event')}
              onChange={handleInputChange}
              className="mr-2"
            />
            We will be using the GAIA GPS App to navigate during this event
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="electronicEquipment"
              value="Powered phone mount located in full view for navigation"
              checked={formData.electronicEquipment.includes('Powered phone mount located in full view for navigation')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Powered phone mount located in full view for navigation
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="electronicEquipment"
              value="None"
              checked={formData.electronicEquipment.includes('None')}
              onChange={handleInputChange}
              className="mr-2"
            />
            None
          </label>
        </div>
        {errors.electronicEquipment && <p className="text-red-500 text-sm mt-1">{errors.electronicEquipment}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upper Protective *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="upperProtective"
              value="Armour inserts in jackets"
              checked={formData.upperProtective.includes('Armour inserts in jackets')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Armour inserts in jackets
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="upperProtective"
              value="Winter gloves (expect cold temps)"
              checked={formData.upperProtective.includes('Winter gloves (expect cold temps)')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Winter gloves (expect cold temps)
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="upperProtective"
              value="None"
              checked={formData.upperProtective.includes('None')}
              onChange={handleInputChange}
              className="mr-2"
            />
            None
          </label>
        </div>
        {errors.upperProtective && <p className="text-red-500 text-sm mt-1">{errors.upperProtective}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lower Protective *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="lowerProtective"
              value="Armour inserts in pants"
              checked={formData.lowerProtective.includes('Armour inserts in pants')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Armour inserts in pants
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="lowerProtective"
              value="Off-road boots"
              checked={formData.lowerProtective.includes('Off-road boots')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Off-road boots
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="lowerProtective"
              value="None"
              checked={formData.lowerProtective.includes('None')}
              onChange={handleInputChange}
              className="mr-2"
            />
            None
          </label>
        </div>
        {errors.lowerProtective && <p className="text-red-500 text-sm mt-1">{errors.lowerProtective}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Please tell us what brand of boots you wear: *</label>
        <input
          type="text"
          name="bootBrand"
          value={formData.bootBrand}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
            errors.bootBrand ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
          }`}
          required
        />
        {errors.bootBrand && <p className="text-red-500 text-sm mt-1">{errors.bootBrand}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mechanical Related *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="mechanicalRelated"
              value="Tyre repair kit"
              checked={formData.mechanicalRelated.includes('Tyre repair kit')}
              onChange={handleInputChange}
              className="mr-2"
            />
            Tyre repair kit
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="mechanicalRelated"
              value="None"
              checked={formData.mechanicalRelated.includes('None')}
              onChange={handleInputChange}
              className="mr-2"
            />
            None
          </label>
        </div>
        {errors.mechanicalRelated && <p className="text-red-500 text-sm mt-1">{errors.mechanicalRelated}</p>}
      </div>
    </div>
  );
};

export default Step8;

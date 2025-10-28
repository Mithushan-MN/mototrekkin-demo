import React from 'react';

const EarMoldBookingForm = () => {
  return (
    <form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            placeholder="First Name (Required)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Last Name (Required)"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
          <input
            type="tel"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Mobile Number (Required)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
          <input
            type="email"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Email Address (Required)"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">I want my insta-mould plugs to be <span className="text-red-500">*</span></label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="radio" name="plugType" value="standard" required className="mr-2" />
            Standard Plug (No music No wires)
          </label>
          <label className="flex items-center">
            <input type="radio" name="plugType" value="single" required className="mr-2" />
            Single Micro Speaker Drivers (Mono Sound)
          </label>
          <label className="flex items-center">
            <input type="radio" name="plugType" value="dual" required className="mr-2" />
            Dual Micro Speaker Drivers (Best for Stereo Surround Sound)
          </label>
          <label className="flex items-center">
            <input type="radio" name="plugType" value="bluetoothSingle" required className="mr-2" />
            Bluetooth Wireless Single Driver
          </label>
          <label className="flex items-center">
            <input type="radio" name="plugType" value="bluetoothDual" required className="mr-2" />
            Bluetooth Wireless Dual Driver
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">MAKE AN ASSESSMENT BOOKING</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please note that ear and hearing protection assessments are completed in store only at Thornton NSW.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Choose your preferred date: <span className="text-red-500">*</span></label>
            <input
              type="date"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Choose your preferred time: <span className="text-red-500">*</span></label>
            <div className="mt-1 flex items-center">
              <input
                type="number"
                min="1"
                max="12"
                required
                className="w-16 border-gray-300 rounded-md shadow-sm mr-2 p-2"
                placeholder="1"
              />
              <span className="mx-1">:</span>
              <input
                type="number"
                min="0"
                max="59"
                required
                className="w-16 border-gray-300 rounded-md shadow-sm mr-2 p-2"
                placeholder="1"
              />
              <select
                required
                className="border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    <div className='flex gap-6 justify-between'>
        <button
        type="submit"
        className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full shadow-md hover:bg-yellow-600 transition-colors"
      >
        SUBMIT
      </button>
      <button
        type="submit"
        className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full shadow-md hover:bg-yellow-600 transition-colors"
      >
       
BACK TO PREVIOUS PAGE

      </button>
    </div>
      
    </form>
  );
};
export default EarMoldBookingForm
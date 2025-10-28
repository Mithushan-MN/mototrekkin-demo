import React from 'react';
import reqBoxImg from '../../../assets/training/offroad_banner1/req_box.webp';

const RequestInfoKit = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Side - Action Image with Feathered Effect */}
          <div className="relative overflow-hidden">
            <img
              src={reqBoxImg}
              alt="Adventure rider in action"
              className="w-full h-full object-cover"
            />
            {/* Feathered gradient overlay to blend into black box */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80"></div>
          </div>

          {/* Right Side - Form Box */}
          <div className="bg-black p-12 flex flex-col justify-center relative">
            {/* Feathered edge effect on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black"></div>
            
            <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
              COMPLETE YOUR DETAILS TO RECEIVE THE FULL MASTERCLASS DEVELOPMENT PROGRAM INFORMATION KIT VIA DOWNLOAD
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                REQUEST INFO KIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestInfoKit;

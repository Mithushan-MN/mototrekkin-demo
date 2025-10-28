import React from 'react';

const NZSIRegistration = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Info Kit Request Form */}
          <div className="bg-teal-800 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold text-teal-800 mb-8 text-center uppercase">
                COMPLETE DETAILS BELOW TO RECEIVE INFO KIT VIA EMAIL
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input 
                      type="text" 
                      className="w-full px-6 py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-lg"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      className="w-full px-6 py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-lg"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input 
                      type="tel" 
                      className="w-full px-6 py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-lg"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      className="w-full px-6 py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-lg"
                      placeholder="Email"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105 uppercase"
                  >
                    REQUEST INFO KIT
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NZSIRegistration;

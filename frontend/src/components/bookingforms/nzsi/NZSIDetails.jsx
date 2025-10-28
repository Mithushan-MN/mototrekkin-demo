import React from 'react';
import { Link } from 'react-router-dom';

const NZSIDetails = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-black text-gray-900 mb-6 animate-bounce">NZSI RALLYE</h2>
            <p className="text-2xl text-gray-700 font-semibold animate-fade-in-up">NEW ZEALAND SOUTH ISLAND</p>
            <p className="text-xl text-gray-600 mt-4 animate-fade-in-up">8TH - 15TH NOVEMBER 2025</p>
            
            {/* Click to Register Button */}
            <div className="mt-8">
              <Link 
                to="/adventures/nzsi-2025/registration"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-12 rounded-xl text-2xl shadow-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-green-500/50 animate-pulse hover:animate-none"
              >
                CLICK TO REGISTER
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Route Information */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                  <span className="text-2xl">🏔️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Route Type</h3>
              </div>
              <p className="text-gray-700 text-center">
                The most exciting, scenic, twisty, 5-star combination of gravel, sealed and private roads.
              </p>
            </div>

            {/* Skill Level */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <span className="text-2xl">🏍️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Rider Skill Level</h3>
              </div>
              <p className="text-gray-700 text-center">
                Intermediate skilled suitable
              </p>
            </div>

            {/* Daily Distance */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl">📏</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Daily Distance</h3>
              </div>
              <p className="text-gray-700 text-center text-3xl font-bold">
                350 kms
              </p>
            </div>
          </div>

          {/* Inclusions Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-bounce">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Seven days of brilliant scenic trails</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Quality accommodation</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Welcome Dinner</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Motorcycle hire</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Mechanical support</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Luggage support</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Verified routes</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-yellow-500 text-xl">✓</span>
                <span className="text-gray-700">Partners accepted</span>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-12 text-center">
            <div className="bg-yellow-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h3>
              <p className="text-lg text-gray-700 mb-6">Multiple options: Request info kit for all details</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
                Request Info Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NZSIDetails;

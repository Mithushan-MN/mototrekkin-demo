import React from 'react';
import { Link } from 'react-router-dom';

const PromotionalBanner = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-2xl md:text-3xl font-medium text-gray-800 italic leading-relaxed">
              Without a doubt, this is the most comprehensive adventure rider training program
              <br />
              <span className="text-gray-600">available to Australian Adventure Riders</span>
            </p>
          </div>
          {/* <div className="flex-shrink-0">
            <Link 
              to="/registration"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              REGISTER HERE
            </Link>
          </div> */}
          <div className="flex-shrink-0">
            <a 
              href="#calender"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              REGISTER HERE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;

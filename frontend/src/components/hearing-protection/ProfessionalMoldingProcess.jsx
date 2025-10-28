import React from 'react';
import earplugs1 from '../../assets/hearingprotection/earplugs1.webp';

const ProfessionalMoldingProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1 animate-slide-in-left">
            <img 
              src={earplugs1} 
              alt="Custom molded hearing protection products" 
              className="w-full max-w-lg mx-auto lg:mx-0 h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 lg:order-2 animate-slide-in-right">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Professional Custom Molding Process
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 animate-fade-in-up animation-delay-200">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ear Assessment</h3>
                  <p className="text-gray-600">Professional evaluation of your hearing and ear canal structure</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-fade-in-up animation-delay-400">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Impressions</h3>
                  <p className="text-gray-600">Precise ear canal impressions for perfect fit and comfort</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-fade-in-up animation-delay-600">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Manufacturing</h3>
                  <p className="text-gray-600">Medical-grade materials crafted to your exact specifications</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 animate-fade-in-up animation-delay-800">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fitting & Testing</h3>
                  <p className="text-gray-600">Final fitting and performance testing to ensure perfect results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalMoldingProcess;

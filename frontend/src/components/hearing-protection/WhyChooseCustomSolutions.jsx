import React from 'react';
import { Shield, Volume2, CheckCircle, Zap } from 'lucide-react';

const WhyChooseCustomSolutions = () => {
  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
          Why Choose Our Custom Solutions?
        </h3>
        <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-200">
          Professional-grade hearing protection with cutting-edge technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in animation-delay-200">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-yellow-600" size={32} />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">30dB Protection</h4>
          <p className="text-gray-600">Industry-leading noise reduction while preserving important sounds</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in animation-delay-400">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="text-yellow-600" size={32} />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Filtering</h4>
          <p className="text-gray-600">Advanced acoustic technology for clear communication</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in animation-delay-600">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-yellow-600" size={32} />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Perfect Fit</h4>
          <p className="text-gray-600">Custom molded from ear impressions for ultimate comfort</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in animation-delay-800">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="text-yellow-600" size={32} />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Bluetooth Ready</h4>
          <p className="text-gray-600">Optional wireless connectivity for music and calls</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseCustomSolutions;

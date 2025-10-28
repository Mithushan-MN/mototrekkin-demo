import React from 'react';
import { Headphones } from 'lucide-react';
import img3 from '../../assets/hearingprotection/img3.webp';

const MotoTrekkinCustomEarProtection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              MOTO TREKKIN CUSTOM MOLDED EAR PROTECTION
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="animate-fade-in-up animation-delay-200">
                Moto Trekkin custom insta-molds are designed to protect motorcyclists 
                from long term hearing damage caused by wind noise. Each custom mold 
                is molded for your inner ear, so they fit perfectly and comfortably every 
                time.
              </p>
              <p className="animate-fade-in-up animation-delay-400">
                Our motorcyclist custom ear moulds are made from a secret blend of 
                premium noise cancelling materials designed to reduce specific wind 
                noise frequencies, while not filtering out all of your engine or exhaust 
                notes.
              </p>
              <p className="animate-fade-in-up animation-delay-600">
                It's high tech hearing protect, with our without a music option. We even 
                offer wireless bluetooth ear molds. <strong className="text-yellow-600">Prices start from $80</strong>
              </p>
            </div>
            
            <div className="mt-8 animate-fade-in-up animation-delay-800">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <Headphones size={20} className="inline mr-2" />
                Order Custom Ear Protection
              </button>
            </div>
          </div>
          <div className="text-center animate-slide-in-right">
            <img 
              src={img3} 
              alt="MotoTrekkin custom molded ear protection" 
              className="w-full max-w-lg mx-auto h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotoTrekkinCustomEarProtection;

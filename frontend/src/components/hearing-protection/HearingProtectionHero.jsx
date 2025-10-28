import React from 'react';
import { Download, Calendar } from 'lucide-react';
import hearingprotectionbg from '../../assets/hearingProtection.webp';
import instructionpdf from "../../assets/MT-CUSTOM-MOLDED-EAR-PROTECTION.pdf"

const HearingProtectionHero = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${hearingprotectionbg})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6 animate-fade-in-up">
          <span className="inline-block bg-yellow-500/20 backdrop-blur-sm text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">
            🎧 Professional Hearing Solutions
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-500 mb-6 drop-shadow-2xl leading-tight animate-fade-in-up animation-delay-200">
          HEARING PROTECTION
          <span className="block text-white">FOR EVERYONE</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
          Custom molded solutions for motorcycle riders, industrial workers, light sleepers, 
          and everyone in between. Experience the difference professional hearing protection makes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            <a
      href={instructionpdf} 
      download="info-kit.pdf"
      
    >
            <Download size={20} className="inline mr-2" />
            DOWNLOAD INFO KIT
            </a>
          </button>
          <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-lg text-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            <a href="/hearing-protection/ear-mold-booking">
            <Calendar size={20} className="inline mr-2" />
            BOOK CONSULTATION
            </a>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HearingProtectionHero;

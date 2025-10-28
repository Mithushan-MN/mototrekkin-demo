import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dirtBikeRider from '../../assets/adventures/dirt-bike-rider.jpg';
import nzsiBanner from '../../assets/adventures/2025/NZSI-BANNERS-DESKTOP-1.webp';

const NZSIHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${dirtBikeRider})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto py-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
             
            
            {/* Main Title */}
            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-wider text-yellow-400 drop-shadow-2xl">
              NEW ZEALAND
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-wider text-white drop-shadow-xl">
              SOUTH ISLAND
            </h2>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl max-w-4xl mx-auto mb-12 leading-relaxed font-bold text-yellow-300 drop-shadow-lg">
              Adventure riding paradise – and you're invited!
            </p>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/adventures/nzsi-2025/registration"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-12 rounded-xl text-2xl shadow-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-green-500/50 animate-pulse hover:animate-none"
                onClick={() => console.log('Registration button clicked')}
              >
                CLICK TO REGISTER
              </Link>
              <Link 
                to="/adventures/2025-event-calendar"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold py-6 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105"
              >
                BACK TO EVENTS
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Banner Section */}
      <section className="w-full">
        <img 
          src={nzsiBanner} 
          alt="NZSI Rallye Banner"
          className="w-full h-auto object-cover"
        />
      </section>
    </div>
  );
};

export default NZSIHero;

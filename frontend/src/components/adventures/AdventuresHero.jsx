import React, { useEffect, useRef } from 'react';
import dirtBikeRider from '../../assets/dirt-bike-rider.jpg';

const AdventuresHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${dirtBikeRider})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60 z-0 animate-gradient-shift"></div>
      
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-60 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-40 animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-bounce opacity-50 animate-float animation-delay-800"></div>
        <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-30 animate-float animation-delay-1200"></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-40 animate-float animation-delay-600"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-8 h-8 border-2 border-yellow-400 rounded-full animate-spin-slow opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 border-2 border-orange-400 rounded-full animate-spin-slow animation-delay-400 opacity-40"></div>
        <div className="absolute top-1/2 left-10 w-4 h-4 bg-yellow-500 rotate-45 animate-pulse opacity-50"></div>
      </div>

      {/* Content with enhanced animations */}
      <div className="relative z-10 text-center px-4 transform transition-all duration-1000 hover:scale-105">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
            <span className="inline-block animate-slide-in-left animation-delay-200 hover:scale-110 transition-transform duration-500">
              MOTORCYCLE
            </span>
            <br />
            <span className="inline-block animate-slide-in-right animation-delay-400 hover:scale-110 transition-transform duration-500">
              ADVENTURES
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-600 hover:text-white transition-colors duration-300">
            Discover new destinations, challenge yourself, and make unforgettable memories with us.
          </p>
          
          <div className="animate-scale-in animation-delay-800">
            <a
              href="#adventures-content"
              className="btn-primary group"
            >
              Explore Adventures
              <span className="btn-arrow group-hover:translate-x-2">→</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator with animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center hover:border-yellow-400 transition-colors duration-300">
          <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-yellow-500 text-sm mt-2 animate-pulse">Scroll Down</p>
      </div>

    </section>
  );
};

export default AdventuresHero;

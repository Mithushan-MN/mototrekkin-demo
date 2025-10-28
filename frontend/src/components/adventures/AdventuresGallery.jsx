import React, { useEffect, useRef, useState } from 'react';
import adventure2025 from "../../assets/event2025.webp"
import adventure2026 from "../../assets/event2026.webp";

const AdventuresGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="event-schedule" className="py-20 bg-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-yellow-500/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-orange-500/5 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-500/5 rounded-full animate-bounce"></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-6 h-6 border-2 border-yellow-400 rounded-full animate-spin-slow opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-orange-400 rotate-45 animate-pulse opacity-30"></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-yellow-500 rounded-full animate-bounce opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={galleryRef} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 hover:scale-105 transition-transform duration-500">
            <span className="bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 bg-clip-text text-transparent animate-gradient-shift">
              Scheduled Events
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Join our carefully planned motorcycle adventures. Choose from our range of events designed for every skill level.
          </p>
        </div>
        
        {/* Enhanced Split Screen Layout - 2025 and 2026 Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[800px] lg:h-[900px]">
          {/* 2025 Events Panel */}
         
          <div 
            className={`relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-1000 ${
              isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0 translate-y-10'
            } ${hoveredCard === '2025' ? 'scale-105 shadow-3xl' : ''}`}
            onMouseEnter={() => setHoveredCard('2025')}
            onMouseLeave={() => setHoveredCard(null)}
          >
             <a href="/event-calendar-2025">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${adventure2025})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />
            
            {/* Animated overlay elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-50"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="animate-slide-in-left animation-delay-400">
                <h3 className="text-8xl md:text-9xl font-black text-yellow-500 mb-4 drop-shadow-2xl group-hover:text-yellow-400 transition-colors duration-300">
                  2025
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-yellow-100 transition-colors duration-300">
                  SCHEDULED EVENTS
                </p>
                <div className="space-y-2 text-lg">
                  <p className="font-semibold group-hover:text-yellow-200 transition-colors duration-300">• Spring Adventure Ride - March 15-17</p>
                  <p className="font-semibold group-hover:text-yellow-200 transition-colors duration-300">• Summer Off-Road Challenge - June 20-22</p>
                  <p className="font-semibold group-hover:text-yellow-200 transition-colors duration-300">• Autumn Scenic Tour - October 10-12</p>
                </div>
                <div className="mt-6">
                  <a href="/event-calendar-2025">
                  <button className="bg-yellow-500  cursor-pointer hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-500/25 hover:shadow-2xl">
                    View 2025 Events
                  </button>
                  </a>
                </div>
              </div>
            </div>
            </a>
          </div>

          {/* 2026 Events Panel */}
          <div 
            className={`relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-1000 ${
              isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0 translate-y-10'
            } ${hoveredCard === '2026' ? 'scale-105 shadow-3xl' : ''}`}
            onMouseEnter={() => setHoveredCard('2026')}
            onMouseLeave={() => setHoveredCard(null)}
          >
             <a href="/event-calendar-2026">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${adventure2026})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />
            
            {/* Animated overlay elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-50"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="animate-slide-in-right animation-delay-600">
                <h3 className="text-8xl md:text-9xl font-black text-yellow-500 mb-4 drop-shadow-2xl group-hover:text-yellow-400 transition-colors duration-300">
                  2026
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-yellow-100 transition-colors duration-300">
                  SCHEDULED EVENTS
                </p>
                <div className="space-y-2 text-lg">
                  <p className="font-semibold group-hover:text-yellow-200 transition-colors duration-300">• New Year Adventure - January 15-17</p>
                  <p className="font-semibold group-hover:text-yellow-200 transition-colors duration-300">• Spring Mountain Expedition - April 5-7</p>
                  <p className="font-semibold group-hover:text-yellow-200 transition-colors duration-300">• Summer Coastal Cruise - August 15-17</p>
                </div>
                <div className="mt-6">
                   <a href="/event-calendar-2026">
                  <button className="bg-yellow-500  cursor-pointer hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-500/25 hover:shadow-2xl">
                    View 2026 Events
                  </button>
                  </a>
                </div>
              </div>
            </div>
            </a>
          </div>
          
        </div>
        
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <a
            href="#contact"
            className="btn-primary group"
          >
            Get Started Today
            <span className="btn-arrow group-hover:translate-x-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdventuresGallery;

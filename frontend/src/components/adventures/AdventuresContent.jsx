import React, { useEffect, useRef, useState } from 'react';
import motoFreestyle from '../../assets/adventures/moto-freestyle.jpg';
import adventureImage from "../../assets/helmet-mobile1.png";

const AdventuresContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="adventures-content
    " className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced background animated elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-500/10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-400/5 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-orange-400/5 rounded-full animate-float animation-delay-400"></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 right-20 w-6 h-6 border-2 border-yellow-400 rounded-full animate-spin-slow opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-orange-400 rotate-45 animate-pulse opacity-40"></div>
        <div className="absolute top-1/2 right-10 w-3 h-3 bg-yellow-500 rounded-full animate-bounce opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center lg:text-left hover:scale-105 transition-transform duration-500">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient-shift">
                On road and off-road adventures
              </span>
            </h2>
            
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'}`}>
              <p className="text-xl text-white/90 leading-relaxed mb-8 hover:text-white transition-colors duration-300">
                Enjoy a range of premium on- and off-road motorcycle events designed for maximum enjoyment. 
                We offer events for all budgets, from weekend rides to significant events over five days.
              </p>
              
              <p className="text-lg text-white/80 leading-relaxed mb-8 hover:text-white/90 transition-colors duration-300">
                All the motorcycle action is here. You can visit our event schedule for more details and 
                download a detailed information kit for each event. If you have questions, we're always here to help. 
                Call us during business hours Monday to Friday.
              </p>
            </div>
            
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#event-schedule"
                  className="btn-primary group"
                >
                  View Event Schedule
                  <span className="btn-arrow group-hover:translate-x-2">→</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-yellow-500 border-2 border-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-500/25 hover:shadow-xl group"
                >
                  Download Info Kit
                  <span className="ml-2 group-hover:scale-110 transition-transform duration-300">📋</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Enhanced Image with animations */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 group">
              <img 
                src={adventureImage} 
                alt="Motorcycle Adventure" 
                className="w-full h-64 sm:h-80 md:h-96 lg:h-120 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
              <div className="absolute bottom-4 left-4 text-white transform group-hover:translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors duration-300">Adventure Awaits</h3>
                <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">Join our next expedition</p>
              </div>
              
              {/* Animated overlay elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdventuresContent;

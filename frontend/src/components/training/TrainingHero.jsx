import React from 'react';
import hero2 from '../../assets/training/hero/hero2.jpg';

const TrainingHero = () => {
  return (
    <section 
      className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${hero2})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6 animate-fade-in-up">
          <span className="inline-block bg-yellow-500/20 backdrop-blur-sm text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">
            🏍️ Professional Training
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-500 mb-6 drop-shadow-2xl leading-tight animate-fade-in-up animation-delay-200">
          MOTORCYCLE TRAINING
          <span className="block text-white">PROGRAMS</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
          Master the art of motorcycle riding with our comprehensive training programs. 
          From beginners to advanced riders, we have the perfect course for you.
        </p>
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

export default TrainingHero;

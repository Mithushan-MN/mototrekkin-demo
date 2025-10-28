import React from 'react';

const TrainingCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-black to-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-yellow-500 mb-6 animate-fade-in-up">
          Ready to Start Your Training Journey?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Join hundreds of riders who have improved their skills and safety with our professional training programs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <a
            href="tel:0240724511"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Call Now: 02 4072 4511
          </a>
          <a
            href="mailto:adventure@mototrekkin.com.au"
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrainingCTA;

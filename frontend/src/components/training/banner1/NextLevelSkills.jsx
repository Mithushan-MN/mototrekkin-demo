import React from 'react';
import { Award, Users, Target, Shield, Zap, Star } from 'lucide-react';

const NextLevelSkills = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase animate-fade-in-up">
              🏍️ Masterclass Development Program
            </span>
          </div>

          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            NEXT LEVEL
            <span className="block text-5xl md:text-6xl mt-2">OFF-ROAD SKILLS</span>
          </h2>

          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed animate-fade-in-up animation-delay-600 max-w-6xl mx-auto">
            Australia's most comprehensive adventure rider development program
          </p>
        </div>

        {/* Program Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-800">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">COMPETENCY-BASED</h3>
            <p className="text-white/90 leading-relaxed">
              Reach desired skill levels before progressing to the next phase. Quality over quantity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-1000">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">ONE-ON-ONE COACHING</h3>
            <p className="text-white/90 leading-relaxed">
              Personal feedback and individual attention to maximize your learning potential.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-1200">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">DEFENCE FORCE APPROVED</h3>
            <p className="text-white/90 leading-relaxed">
              Selected by Australian Defence Force for special forces personnel training.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-20">
          <div className="relative rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto border-4 border-yellow-500/30 animate-fade-in-up animation-delay-1400">
            <div className="aspect-video">
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/834248730?h=337e2ec8b4"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-3xl"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              ></iframe>
            </div>
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Program Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up animation-delay-1600">
            <h3 className="text-4xl font-bold text-white mb-8">
              Three-Phase Development Program
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-lg">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Phase I - Foundation</h4>
                  <p className="text-white/90 leading-relaxed">
                    Build fundamental skills and confidence through structured learning and practice.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-400 mb-2">Phase II - Advanced</h4>
                  <p className="text-white/90 leading-relaxed">
                    Develop advanced techniques and master complex riding scenarios.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-400 mb-2">Phase III - Mastery</h4>
                  <p className="text-white/90 leading-relaxed">
                    Achieve expert-level skills and become a confident adventure rider.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animation-delay-1800">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                Program Benefits
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center text-white/90">
                  <Zap className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>Enhanced safety and confidence</span>
                </li>
                <li className="flex items-center text-white/90">
                  <Zap className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>Improved skill level and agility</span>
                </li>
                <li className="flex items-center text-white/90">
                  <Zap className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>Professional instruction and feedback</span>
                </li>
                <li className="flex items-center text-white/90">
                  <Zap className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>Dedicated training facilities</span>
                </li>
                <li className="flex items-center text-white/90">
                  <Zap className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>Tangible learning outcomes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Program Information */}
        <div className="mt-20 animate-fade-in-up animation-delay-2000">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 max-w-6xl mx-auto mb-12">
            <h4 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
              About the Masterclass Development Program
            </h4>
            
            <div className="space-y-6 text-white/90 leading-relaxed">
              <p className="text-lg">
                We've spent years developing and fine-tuning one of Australia's most comprehensive rider development programs. We call it the Masterclass Development Program (MDP).
              </p>
              
              <p className="text-lg">
                It consists of three separate weekends spread over time, designed to build your skills and confidence through one-on-one coaching and personal feedback. The MDP is a competency-based program which means you need to reach a desired skill level before being permitted to progress to the next level. This program not only delivers value for money but also tangible learning outcomes. Your skill level, agility and confidence will improve.
              </p>
              
              <p className="text-lg">
                Our MDP is so comprehensive that the Australian Defence Force selected Moto Trekkin to provide advanced off-road motorcycle rider training to several special forces personnel.
              </p>
              
              <p className="text-lg">
                If you own and ride an adventure motorcycle and want the attitude, knowledge and skills to ride with greater safety, confidence and enjoyment, the Moto Trekkin MDP is for you. All three phases of the MDP are conducted in NSW at a dedicated adventure rider training facility. Phase I is also conducted periodically in QLD and VIC. Check the available dates below.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up animation-delay-2200">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              Ready to start your training journey? Join hundreds of riders who have improved their skills and safety with our professional training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById('course-dates');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Star className="w-5 h-5 inline mr-2" />
                VIEW COURSE DATES
              </button>
              <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-lg text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                DOWNLOAD INFO KIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextLevelSkills;

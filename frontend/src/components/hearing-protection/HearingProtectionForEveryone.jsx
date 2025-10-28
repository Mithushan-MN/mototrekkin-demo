import React from 'react';
import earplug1 from '../../assets/hearingprotection/earplugs/1.webp';
import earplug2 from '../../assets/hearingprotection/earplugs/2.webp';
import earplug3 from '../../assets/hearingprotection/earplugs/3.webp';
import earplug4 from '../../assets/hearingprotection/earplugs/4.webp';
import earplug5 from '../../assets/hearingprotection/earplugs/5.webp';
import earplug6 from '../../assets/hearingprotection/earplugs/6.webp';
import earplug7 from '../../assets/hearingprotection/earplugs/7.webp';
import earplug8 from '../../assets/hearingprotection/earplugs/8.webp';
import earplug9 from '../../assets/hearingprotection/earplugs/9.webp';
import earplug10 from '../../assets/hearingprotection/earplugs/10.webp';
import earplug11 from '../../assets/hearingprotection/earplugs/11.webp';
import earplug12 from '../../assets/hearingprotection/earplugs/12.webp';

const HearingProtectionForEveryone = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase animate-fade-in-up">
              🎧 Universal Solutions
            </span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            HEARING PROTECTION
            <span className="block text-5xl md:text-6xl mt-2">FOR EVERYONE</span>
          </h2>
          
          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-8">
            <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed animate-fade-in-up animation-delay-600">
              Here at Moto Trekkin, we offer hearing protection for industrial applications, motorcycle riders, 
              for peaceful sleeping, personal applications, industrial, shooters, swimmers etc.
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 animate-fade-in-up animation-delay-800">
              <p className="text-xl text-gray-700 leading-relaxed">
                If you have a nagging partner that drives you nuts this is the perfect solution! All of our molded 
                hearing protection products come with the options of basic, single driver (mono), dual driver 
                (surround Stereo, and even bluetooth.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Earplug Images Grid */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up animation-delay-1000">
            Our Custom Solutions Gallery
          </h3>
          <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-1200">
            Each piece is uniquely crafted for your perfect fit
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-200 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug1} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-300 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug2} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-400 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug3} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-500 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug4} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-600 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug5} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-700 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug6} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-800 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug7} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-900 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug8} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-1000 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug9} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-1100 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug10} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-1200 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug11} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
          <div className="group aspect-square overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-scale-in animation-delay-1300 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
            <div className="relative w-full h-full">
              <img src={earplug12} alt="Custom molded earplug" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Custom Molded
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HearingProtectionForEveryone;

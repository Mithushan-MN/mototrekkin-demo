import React from 'react';
import { FileText, Download, Mail, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const ProgramInformation = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase animate-fade-in-up">
              📋 Complete Program Details
            </span>
          </div>

          <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            PROGRAM INFORMATION
          </h3>

          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed animate-fade-in-up animation-delay-600 max-w-4xl mx-auto">
            Everything you need to know about the Masterclass Development Program
          </p>
        </div>

        {/* Information Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Main Information Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-all duration-300 animate-fade-in-up animation-delay-800">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Information Kit Details</h4>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                The learning outcomes, inclusions, and the required program investment can be found in the full MDP information kit. The kit is too large to email.
              </p>
              <p className="text-lg">
                To overcome this, you can request a download link to be emailed to you using the "Course Information" box below. Simply complete your details to receive the download link.
              </p>
            </div>
          </div>

          {/* Process Information Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-all duration-300 animate-fade-in-up animation-delay-1000">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Download Process</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">
                  Once you click submit, you will immediately receive a confirmation email with the download link.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">
                  If you don't receive an email in thirty seconds, check your entry along with your spam and/or junk folders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 mb-16 animate-fade-in-up animation-delay-1200">
          <div className="text-center mb-8">
            <h4 className="text-3xl font-bold text-gray-900 mb-4">
              What's Included in the Information Kit
            </h4>
            <p className="text-lg text-gray-700">
              Complete your details below to obtain a comprehensive information kit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">📅</span>
              </div>
              <h5 className="font-bold text-gray-900 mb-2">Course Dates</h5>
              <p className="text-gray-700 text-sm">Available training dates for 2025</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📍</span>
              </div>
              <h5 className="font-bold text-gray-900 mb-2">Training Locations</h5>
              <p className="text-gray-700 text-sm">NSW, QLD, and VIC venues</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📋</span>
              </div>
              <h5 className="font-bold text-gray-900 mb-2">Program Inclusions</h5>
              <p className="text-gray-700 text-sm">What's covered in each phase</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">💰</span>
              </div>
              <h5 className="font-bold text-gray-900 mb-2">Investment Details</h5>
              <p className="text-gray-700 text-sm">Program costs and payment options</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up animation-delay-1400">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-yellow-500 mr-3" />
              <h4 className="text-2xl font-bold text-gray-900">Ready to Get Started?</h4>
            </div>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We look forward to welcoming you to the MDP soon. Complete your details below to obtain a comprehensive information kit which contains dates, states, venues, inclusions and investment in the program.
            </p>

            <a href="#contactforinfo">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center">
              <ArrowRight className="w-5 h-5 mr-2" />
              REQUEST INFORMATION KIT
            </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramInformation;

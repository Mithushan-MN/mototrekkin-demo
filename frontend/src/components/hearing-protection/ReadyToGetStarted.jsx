import React from 'react';
import { Phone, Mail, Award, Users, Shield } from 'lucide-react';

const ReadyToGetStarted = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-200">
            Book your consultation today and experience the difference
          </p>
        </div>


        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-12 text-center text-white animate-scale-in animation-delay-800">
          <h2 className="text-4xl font-bold text-yellow-500 mb-6">
            Don't Wait - Protect Your Hearing Today!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their hearing experience. 
            Book your consultation now and take the first step towards better hearing protection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="tel:0240724511"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <Phone size={20} className="inline mr-2" />
              Call Now: 02 4072 4511
            </a>
            <a
              href="mailto:adventure@mototrekkin.com.au"
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <Mail size={20} className="inline mr-2" />
              Email Us
            </a>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-white/70">
            <div className="flex items-center">
              <Award className="text-yellow-400 mr-2" size={16} />
              Professional Service
            </div>
            <div className="flex items-center">
              <Users className="text-yellow-400 mr-2" size={16} />
              1000+ Happy Customers
            </div>
            <div className="flex items-center">
              <Shield className="text-yellow-400 mr-2" size={16} />
              Medical Grade Quality
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToGetStarted;

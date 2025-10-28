import React from 'react';
import { MapPin, Phone, Clock, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const AdventuresContact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-500/10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500/10 rounded-full animate-bounce"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ready to start your next adventure? Contact us today to learn more about our upcoming events and book your spot.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-fade-in-up animation-delay-200">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-yellow-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Visit our physical store:</h4>
                    <p className="text-white/90">
                      Unit 4/46 Sandringham Ave,<br />
                      Thornton, NSW, 2322
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="text-yellow-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone Number:</h4>
                    <a href="tel:0240724511" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      02 4072 4511
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="text-yellow-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email Address:</h4>
                    <a href="mailto:info@mototrekkin.com.au" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      CLICK HERE TO EMAIL US
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="text-yellow-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Opening hours:</h4>
                    <p className="text-white/90">
                      Mon-Fri: 8AM-5PM<br />
                      Sat: 9AM-Noon<br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Media & Quick Actions */}
          <div className="animate-fade-in-up animation-delay-400">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">Connect With Us</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-4">Follow us on social media:</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/20">
                  <h4 className="font-semibold text-white mb-4">Quick Actions:</h4>
                  <div className="space-y-3">
                    <a
                      href="#event-schedule"
                      className="block w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
                    >
                      View Event Schedule
                    </a>
                    <a
                      href="tel:0240724511"
                      className="block w-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
                    >
                      Call Us Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 animate-fade-in-up animation-delay-600">
          <p className="text-white/80 text-lg">
            Ready to embark on your next motorcycle adventure? 
            <span className="text-yellow-400 font-semibold"> Contact us today!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdventuresContact;

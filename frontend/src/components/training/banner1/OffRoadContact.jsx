import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const OffRoadContact = () => {
  return (
    <section id='contactforinfo' className="py-20 bg-gradient-to-r from-black to-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-yellow-500 mb-6">
          Ready to Start Your Training Journey?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join hundreds of riders who have improved their skills and safety with our professional training programs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="tel:0240724511"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Phone size={20} className="inline mr-3" />
            Call Us: 02 4072 4511
          </a>
          <a
            href="mailto:training@mototrekkin.com.au"
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
          >
            <Mail size={20} className="inline mr-3" />
            Email Us
          </a>
        </div>
        <div className="text-center text-white/70">
          <p className="mb-2"><strong>Visit our physical store:</strong></p>
          <p className="mb-4">Unit 4/46 Sandringham Ave, Thornton, NSW, 2322</p>
          <p><strong>Opening hours:</strong> Mon-Fri: 8AM-5PM | Sat: 9AM-Noon | Sun: Closed</p>
        </div>
      </div>
    </section>
  );
};

export default OffRoadContact;

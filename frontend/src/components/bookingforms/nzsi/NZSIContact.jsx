import React from 'react';

const NZSIContact = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Store Info */}
          <div>
            <h3 className="text-3xl font-bold mb-8">Visit our physical store:</h3>
            <div className="space-y-6">
              <div>
                <p className="text-lg font-semibold mb-2">Address:</p>
                <p className="text-gray-300">
                  Unit 4/46 Sandringham Ave,<br />
                  Thornton, NSW, 2322
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Email Address:</p>
                <a href="mailto:info@mototrekkin.com.au" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  CLICK HERE TO EMAIL US
                </a>
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">Phone Number:</p>
                <a href="tel:0240724511" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  02 4072 4511
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-3xl font-bold mb-8">Opening hours:</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Mon-Fri:</span>
                <span className="text-yellow-500">8AM-5PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sat:</span>
                <span className="text-yellow-500">9AM-Noon</span>
              </div>
              <div className="flex justify-between">
                <span>Sun:</span>
                <span className="text-red-500">Closed</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">Visit us on:</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-yellow-500 hover:text-yellow-400 text-2xl transition-colors">
                  📘
                </a>
                <a href="#" className="text-yellow-500 hover:text-yellow-400 text-2xl transition-colors">
                  📷
                </a>
                <a href="#" className="text-yellow-500 hover:text-yellow-400 text-2xl transition-colors">
                  🐦
                </a>
                <a href="#" className="text-yellow-500 hover:text-yellow-400 text-2xl transition-colors">
                  📺
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NZSIContact;

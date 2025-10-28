import React from 'react';

const NZSIDescription = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                Adventure riding paradise – and you're invited!
              </h2>
              
              <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
                <p className="font-medium">
                  Join us for breathtaking mountain passes. Untamed coastline. Trails that make your heart race. Off-road motorcycle adventures this epic don't come around often – and we've designed the ultimate one for you.
                </p>
                
                <p>
                  We've scouted every corner of the South Island, handpicking the perfect blend of on-road sweepers and off-road trails. Between rides, you'll soak in New Zealand's jaw-dropping scenery, from snow-capped peaks to crystal lakes – with time built in to explore, relax, and enjoy the magic.
                </p>
                
                <p className="font-semibold text-gray-800">
                  All the planning? Done. All the logistics? Sorted. All you need to do is fly in, ride, and live the dream.
                </p>
                
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <p className="text-lg font-bold text-gray-800">
                    But here's the catch – <span className="text-yellow-600">only 30 spots</span> are available. That's the maximum number of adventure bikes we can accommodate, and once they're gone, they're gone.
                  </p>
                </div>
                
                <p className="text-xl font-semibold text-gray-800">
                  If you're ready to level up your riding, discover new trails, and collect landscapes you'll never forget, this is your moment.
                </p>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Ride?</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Get the full details – pricing, inclusions, dates – in our Event Information Kit.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-yellow-600">
                      <span className="text-2xl">🏔️</span>
                      <span className="font-semibold">Mountain Passes</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-yellow-600">
                      <span className="text-2xl">🌊</span>
                      <span className="font-semibold">Coastal Trails</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-yellow-600">
                      <span className="text-2xl">🏍️</span>
                      <span className="font-semibold">Adventure Bikes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NZSIDescription;

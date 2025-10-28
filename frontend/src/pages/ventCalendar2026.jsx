import React from 'react'
import eventBanner1 from '../assets/ridge-rider-2026.jpg';
import eventBanner2 from '../assets/ROAD-RALLYE-2026.webp';
import eventBanner3 from '../assets/NZSI-BANNERS-2026.webp';

const EventCalendar2026 = () => {
  return (
    <div className=" py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-6">2026 EVENT CALENDAR</h2>
      <hr className="w-30 border-t-3 border-yellow-500 mx-auto mb-6" />
      <p className="text-center text-gray-600 mb-4">
        GET READY FOR AN EXHILARATING RIDE AS WE GEAR UP FOR THE MOTO TREKKIN 2026 EVENTS!
      </p>
      <p className="text-center text-gray-600 mb-4">
        Anticipation is running high as we prepare to roll into the next year with even more adrenaline-pumping action and unforgettable two-wheeled adventures.
      </p>
      <p className="text-center text-gray-600 mb-6">
        Our dedicated team has been hard at work crafting an electrifying lineup of off-road motorcycle events that will leave you on the edge of your seat.
      </p>
      <p className="text-center text-gray-600 mb-6">
        The rumble of engines, the thrill of the trails, and the camaraderie of fellow riders await you. Join us on this epic ride at Moto Trekkin 2026 Events - it's time to rev up and make memories that will last a lifetime!
      </p>
      <div className=' flex flex-col gap-6'>

      
        <div className="relative group w-full max-w-7xl mx-auto">
            <a href="/event-calendar-2026/RidgeRider2026" className="block">
            <img
            src={eventBanner1}
            alt="2025 Event Banner"
            className="w-full h-28 md:h-48 object-fit rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black/0 flex items-center justify-center 
                            transition-all duration-300 rounded-lg group-hover:bg-black/40">
            <span className="text-white text-4xl font-bold  bg-opacity-80 
                            px-4 py-2 rounded opacity-0 transition-opacity duration-300 
                            group-hover:opacity-100">
                CLICK HERE TO VIEW THIS EVENT
            </span>
            </div>
            </a>
        </div>
        <div className="relative group w-full max-w-7xl mx-auto">
            <img
            src={eventBanner2}
            alt="2025 Event Banner"
            className="w-full h-28 md:h-48 object-fit rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-red-500/0 flex items-center justify-center 
                            transition-all duration-300 rounded-lg group-hover:bg-red-500/40">
            <span className="text-red-600 text-4xl font-bold  bg-opacity-80 
                            px-4 py-2 rounded opacity-0 transition-opacity duration-300 
                            group-hover:opacity-100">
                
            </span>
            </div>
        </div>
        <div className="relative group w-full max-w-7xl mx-auto">
          <a href="/event-calendar-2026/NzSouthIsland2026" className="block">
            <img
            src={eventBanner3}
            alt="2025 Event Banner"
            className="w-full h-28 md:h-48 object-fit rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black/0 flex items-center justify-center 
                            transition-all duration-300 rounded-lg group-hover:bg-black/40">
            <span className="text-white text-4xl font-bold  bg-opacity-80 
                            px-4 py-2 rounded opacity-0 transition-opacity duration-300 
                            group-hover:opacity-100">
                CLICK HERE TO VIEW THIS EVENT
            </span>
            </div>
            </a>
        </div>

        </div>
    </div>
  )
}

export default EventCalendar2026
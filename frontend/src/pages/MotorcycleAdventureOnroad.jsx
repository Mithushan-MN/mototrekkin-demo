import React from "react";
import servicecenterbg from "../assets/bikehire.webp";
import event2025 from "../assets/event2025.webp";
import event2026 from "../assets/event2026.webp";
import adventureImage from "../assets/helmet-mobile1.png";
import { Link } from "react-router-dom";

const MotorcycleAdventureOnroad = () => {
  return (
    <>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${servicecenterbg})`,
        }}
      >
        {/* Overlay for dark effect */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
           ONROAD MOTORCYCLE ADVENTURES
          </h1>
          <p className="text-xl">
            Discover new destinations, challenge yourself, and make
            unforgettable memories with us.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 ">
          <Link to="/onroad-event-calendar-2025" className="group">
            <div className="relative overflow-hidden ">
              <img
                src={event2025}
                alt="2025 Scheduled Events"
                className="w-full h-80vh object-cover transition-all duration-300 group-hover:border-4 group-hover:border-yellow-500"
              />
            </div>
          </Link>
          <Link to="#" className="group">
            <div className="relative overflow-hidden ">
              <img
                src={event2026}
                alt="2026 Scheduled Events"
                className="w-full h-80vh object-cover transition-all duration-300 group-hover:border-4 group-hover:border-yellow-500"
              />
            </div>
          </Link>
        </div>
      </section>

      <section>
  <div className="bg-gray-100 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-4 sm:gap-6">
    <div className="md:w-1/2 mb-6 md:mb-0">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
        ON ROAD ADVENTURES
      </h2>
      <hr className="w-32 sm:w-48 md:w-64 border-t-4 border-yellow-500 mb-4" />
      <p className="mb-4 text-gray-700 text-sm sm:text-base md:text-lg text-justify">
        Enjoy a range of premium on- and off-road motorcycle events designed for maximum enjoyment. We offer events for all budgets, from weekend rides to significant events over five days.
      </p>
      <p className="text-gray-700 text-sm sm:text-base md:text-lg text-justify">
        All the motorcycle action is here. You can visit our event schedule for more details and download a detailed information kit for each event. If you have questions, we're always here to help. Call us during business hours Monday to Friday.
      </p>
    </div>
    <div className="md:w-1/2">
      <img
        src={adventureImage}
        alt="Motorcycle Adventure"
        className="w-full h-64 sm:h-80 md:h-96 lg:h-120 object-cover rounded-lg shadow-md"
      />
    </div>
  </div>
</section>
    </>
  );
};

export default MotorcycleAdventureOnroad;

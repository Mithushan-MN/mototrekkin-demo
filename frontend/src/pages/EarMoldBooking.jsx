import React from "react";
import moldbg from "../assets/earmold.jpg";
import event2025 from "../assets/event2025.webp";
import event2026 from "../assets/event2026.webp";
import adventureImage from "../assets/helmet-mobile1.png";
import { Link } from "react-router-dom";
import EarMoldBookingForm from "../components/bookingforms/EarMoldBookingForm";

const EarMoldBooking = () => {
  return (
    <>
      <section
        className="relative h-100 bg-cover bg-right flex items-center justify-center"
        style={{
          backgroundImage: `url(${moldbg})`,
        }}
      >
        {/* Overlay for dark effect */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            CUSTOM MULDED EAR PROTECTION
          </h1>
          <p className="text-xl max-w-5xl mx-auto">
            Custom-molded ear protection ensures a safe and comfortable ride by
            significantly reducing wind noise while allowing you to hear
            important sounds.
          </p>
        </div>
      </section>

      <section>
        <div className="bg-gray-100 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row  max-w-7xl mx-auto gap-4 sm:gap-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl font-bold text-black mb-4">
              INSTA-MOLD IN EAR MUSIC MONITOR & HEADSET
            </h2>
            <hr className="w-32 sm:w-48 md:w-64 border-t-4 border-yellow-500 mb-4" />
            <p className="mb-4 text-gray-700 text-sm sm:text-base md:text-lg text-justify">
              Did you know that travelling along at 100km per hour on an open
              road the wind noise is as loud as 104 decibels? That amount of
              noise for a prolonged period of time can cause fatigue, headaches,
              loss of concentration, ringing in the ears and even long term
              hearing damage, leading to a form of industrial deafness. There
              are no second chances with your hearing, once it’s gone it’s gone
              forever.
            </p>
            <p className="mb-4 text-gray-700 text-sm sm:text-base md:text-lg text-justify">
              With a pair of Earmold Australia®™ Insta-Mold®™ premium silicone
              custom made hearing protection for Motorcyclist in your ears you
              will greatly reduce ride noise while protecting your long term
              hearing – All while still hearing your engine and the exhaust
              notes.
            </p>
            <p className="mb-4 text-gray-700 text-sm sm:text-base md:text-lg text-justify">
              Each ear mould is moulded to your ears for the perfect fit while
              you wait. You can choose a basic ear mould, an ear mould with
              wired speakers or a blue tooth version. The choice is yours.
            </p>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg text-justify">
              Ear moulds are a brilliant investment to improve ride comfort and
              to protect your long term hearing.
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

      <div className="py-6">
        <h2 className=" text-center text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
          CUSTOM MOULDED PRODUCT
          <span className="block text-xl md:text-4xl mt-2">
            IN STORE PURCHASE ONLY
          </span>
        </h2>

        <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
        </div>

        <EarMoldBookingForm />
      </div>
    </>
  );
};

export default EarMoldBooking;

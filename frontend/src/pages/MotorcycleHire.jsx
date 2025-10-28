import React from "react";
import bannerImg from "../assets/hire/DESKTOP_Motorcycle-Hire-1.jpg";
import eventImg from "../assets/hire/bh-landing-01.jpg";
import trainingImg from "../assets/hire/bh-landing-02.jpg";
import exploreImg from "../assets/hire/hire-to-explore.webp";
import bike1 from "../assets/hire/bike-CRF250-Rally.jpg";
import bike2 from "../assets/hire/G310-GS-1.jpg";
import bike3 from "../assets/hire/Honda-CB500X-1.jpg";
import MotorcycleHireForm from "../components/bookingforms/MotorcycleHireForm";

const MotorcycleHire = () => {
  return (
    <section className="max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="relative w-full pt-10 px-2">
        <img
          src={bannerImg}
          alt="Off-Road Motorcycle Hire"
          className="w-full h-28 md:h-48 object-fill rounded-lg"
        />
        
      </div>

      {/* 3 Column Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 max-w-6xl mx-auto p-2">
  {/* Card 1 */}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-hidden">
      <img
        src={eventImg}
        alt="Hire for Events"
        className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        HIRE FOR EVENTS
      </h3>
      <p className="text-gray-600 text-lg">
        Hire your choice of motorcycle and join us on any of our off-road
        events. Available for weekend, or week-long events.
      </p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-hidden">
      <img
        src={trainingImg}
        alt="Hire for Training"
        className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        HIRE FOR TRAINING
      </h3>
      <p className="text-gray-600 text-lg">
        If you’ve owned a road bike and want a new lease on life or want
        to improve your off-road skills to boost your confidence.
      </p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-hidden">
      <img
        src={exploreImg}
        alt="Hire to Explore"
        className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        HIRE TO EXPLORE
      </h3>
      <p className="text-gray-600 text-lg">
        Ride in luxury and with plenty of power for one or two up, on any
        one of our BMW 1200 or 1250' BMW GS fleet.
      </p>
    </div>
  </div>
</div>


        <div className="flex flex-col lg:flex-row p-6 justify-between items-center bg-white max-w-6xl mx-auto mb-6">
            <div className=" p-6 text-left ">
                <h3 className="text-xl font-bold text-yellow-500 mb-2">
                Ride to your heart’s content
                </h3>
                <h2 className="text-gray-800 text-2xl">
                Moto Trekkin Off-road Adventures
                </h2>
                <h2 className="text-gray-800 text-m mt-2">
                Join us for the most incredible off-road motorcycle adventures Australia has to offer.
                </h2>
            </div>
        <div className="p-6">
          <a href="/event-calendar-2025" className="">
                <button className="bg-yellow-500 py-4 px-4 w-40 rounded-lg hover:bg-gray-900 hover:text-white cursor-pointer">
                    Event Details
                </button>
                </a>
            </div>
          </div>

{/* 3 Column bikes */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 max-w-6xl mx-auto p-2">
  {/* bike 1 */}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-hidden">
      <img
        src={bike1}
        alt="Hire for Events"
        className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">CRF250 Rally</h3>
      <p className="text-gray-600 text-sm">$205.00 /day</p>
    </div>
  </div>

  {/* bike 2 */}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-hidden">
      <img
        src={bike2}
        alt="Hire for Training"
        className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">BMW G310 GS</h3>
      <p className="text-gray-600 text-sm">$215.00 /day</p>
    </div>
  </div>

  {/* bike 3 */}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-hidden">
      <img
        src={bike3}
        alt="Hire to Explore"
        className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Honda CB500X</h3>
      <p className="text-gray-600 text-sm">$230.00 /day</p>
    </div>
  </div>
</div>


{/* hire section */}
<div className="flex flex-col justify-center items-center">
    <h1 className="text-4xl text-yellow-600">START HERE</h1>
    <MotorcycleHireForm/>
</div>


    </section>
  );
};

export default MotorcycleHire;

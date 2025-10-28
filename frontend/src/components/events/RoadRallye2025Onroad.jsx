import React, { useState } from 'react'
import nziRallyImage from '../../assets/ROADRALLLT2025ONROAD.webp';
import galimg1 from "../../assets/gallery/ridgeridergallery/Aidan-Barry-5D62FC57-BC22-4ECF-9E59-2E8D1C0C83BA-scaled.webp"
import galimg2 from "../../assets/gallery/ridgeridergallery/Aidan-Barry-39BFF78E-81E1-47D8-AC66-C329BF8B76C2-scaled.webp"
import galimg3 from "../../assets/gallery/ridgeridergallery/Aidan-Barry-46D6E61F-0887-4632-A059-5F65B88D814F-scaled.webp"
import galimg4 from "../../assets/gallery/ridgeridergallery/Christopher-Mifsud-0B94230E-629E-486F-BA4E-ABBE96BF2B80-scaled.webp"
import galimg5 from "../../assets/gallery/ridgeridergallery/Christopher-Mifsud-2AE8CA75-BF14-488F-9838-5EA56D202EE3-scaled.webp"
import galimg6 from "../../assets/gallery/ridgeridergallery/Craig-Roberts-Thomson-5CFD236E-72F7-43C6-BB2F-D7E9F71558FE-scaled.webp"
import galimg7 from "../../assets/gallery/ridgeridergallery/Geoff-Guy-C059DE30-BA85-4A5D-AB9F-A2194F6EAD70-scaled.webp"
import galimg8 from "../../assets/gallery/ridgeridergallery/Jason-Marshall-1F58E621-2AEB-4936-9C9C-D55713892616-scaled.webp"
import galimg9 from "../../assets/gallery/ridgeridergallery/Jason-Marshall-3B33AE44-BA83-4491-B3D5-8317D57F1035-scaled.webp"
import galimg10 from "../../assets/gallery/ridgeridergallery/Jason-Marshall-3EB7A737-C5E4-4F7F-8D9B-48B95DBA6A21-scaled.webp"
import galimg11 from "../../assets/gallery/ridgeridergallery/Jason-Marshall-4986C9AE-85FE-4CAD-9E24-4417DEBB9D9E-scaled.webp"
import galimg12 from "../../assets/gallery/ridgeridergallery/Jason-Marshall-CA3E5EFC-E9DE-43CE-879E-2A7A76019D9C-scaled.webp"
import galimg13 from "../../assets/gallery/ridgeridergallery/Jason-Pryor-Lookout-scaled.webp"
import galimg14 from "../../assets/gallery/ridgeridergallery/Jason-Pryor-Mt-Emu-2-scaled.webp"
import galimg15 from "../../assets/gallery/ridgeridergallery/Jason-Pryor-Mt-Emu-drone-scaled.webp"
import galimg16 from "../../assets/gallery/ridgeridergallery/Jason-Pryor-Welcome-dinner-scaled.webp"


const RoadRallye2025Onroad = () => {

    const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    galimg1,
    galimg2,
    galimg3,
    galimg4,
    galimg5,
    galimg6,
    galimg7,
    galimg8,
    galimg9,
    galimg10,
    galimg11,
    galimg12,
    galimg13,
    galimg14,
    galimg15,
    galimg16,
    
  ]; 


  return (
    <div className=" py-12 px-4 max-w-7xl mx-auto">
      {/* Banner at the top */}
      <img
            src={nziRallyImage}
            alt="NZSI Rally 2025"
            className="w-full h-28 md:h-48  rounded-lg shadow-md mb-4"
          />

      {/* Register Button */}
      <div className="text-center mb-6">
  <button className="bg-red-500 text-white px-10 py-3 rounded-lg text-lg font-semibold animate-zoom hover:bg-red-600 transition-colors duration-300">
    REGISTER NOW
  </button>
</div>

      {/* roadrallyetext + image section */}
<div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8 pt-20">
  <div className="lg:w-1/2 text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">ROAD RALLYE</h2>
        <hr className="w-32 border-t-2 border-yellow-500  mb-4" />
        
        <p className="text-gray-600 mb-4">
          In September 2025, motorcycle riders from all over the country will descend into the Hunter Valley of NSW to start one of the largest-ever motorcycle road rallies the Australian motorcycle community has yet seen.
          </p>
        
        <p className="text-gray-600 mb-4">
          The five-day ride is between the iconic Hunter Valley and the majestic Yarra Valley near Melbourne. The event is open to all registered, street-legal motorcycles, including roadsters, touring, sports, dual sport adventure, cruisers, scooters, scramblers, spiders and Harleys. In fact, this event is open to any motorcycle that wheels and can handle the distance. If she’s registered and reliable, you’re welcome to register.
          </p>
        <p className="text-gray-600 mb-4">
          It’s an excellent opportunity to grab your group of mates together and make it a fun week away from the daily grind. Groups are welcome to raise money for their preferred charity and are provided the opportunity to register a supported charity.You can download the information kit to obtain all the full event details, including dates, cost inclusions, and accommodation options.
          </p>
        
      </div>
      <div className="lg:w-1/2">
        <h3 className="text-2xl font-bold text-[#640564] mb-4 text-center">ROAD RALLYE IMAGES</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-24 object-cover rounded shadow-sm hover:opacity-90 transition-opacity duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Modal for full image view */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative">
            <img src={selectedImage} alt="Full View" className="max-w-3xl max-h-[80vh] object-contain" />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-gray-800 bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

    </div>


      {/* Event Details */}
      <div className=" flex flex-col md:flex-row items-center gap-6">
        <div className="py-8 px-4 bg-white w-full md:w-1/2 rounded-lg">
          <div className="space-y-2 text-gray-600">
            <p><strong>ROUTE TYPE:</strong> All routes are suitable for intermediate skilled riders of larger adventure motorcycles.</p>
            <p><strong>BREAKOUT ROUTES</strong> If you’re a more advanced rider we offer more technically challenging breakout routes.</p>
            <p><strong>AVERAGE DAILY DISTANCE:</strong> 350 kms</p>
            <p><strong>RIDER SKILL LEVEL NEEDED</strong> Intermediate skilled suitable</p>
            <p><strong>PRICING:</strong> All inclusive from $2490.00
Request info kit for all pricing and accommodation options</p>
            
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className=" py-8 px-4 max-w-3xl mx-auto">
      <div className="bg-[#640564] text-white p-4 rounded-t-lg text-center">
        <h2 className="text-xl font-semibold">COMPLETE DETAILS BELOW TO RECEIVE INFO KIT VIA EMAIL</h2>
      </div>
      <div className="border-4 border-[#640564] p-6 rounded-b-lg shadow-md">
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:#640564"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:[#640564]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:[#640564]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:[#640564]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#640564] text-white p-2 rounded-md hover:bg-[#530153] transition-colors duration-300"
          >
            REQUEST INFO KIT
          </button>
        </form>
      </div>
    </div>
        </div>
      </div>

      {/* Embedded Videos */}
      {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/A0auX-6yWwE?autoplay=1&amp;feature=oembed" // Replace with actual video URL
            title="Video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/pHNXDOK3IoQ?feature=oembed" // Replace with actual video URL
            title="Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div> */}



    <div className='max-w-6xl mx-auto justify-center items-center '>
        <p className="text-gray-600 mb-4 font-bold">
          CHECK THE INCLUSIONS BELOW AND REGISTER EARLY.
        </p>
        <div className='flex flex-col md:flex-row gap-0 md:gap-40'>
    <p className="text-gray-600 mb-0 md:mb-6">
        – 5 days of premium adventure trails<br/>
        – 2 nights of 5-star quality accommodation<br/>
        – 4 nights of 3-4 star accommodation<br/>
        – 3-course buffet welcome dinner<br/>
        – Welcome dinner entertainment<br/>
        – 3-course buffet farewell dinner<br/>
        – All permits to access the region<br/>
        – Detailed route & navigation support<br/>
        – Daily route sheets provided<br/>
        – Nightly route and event briefings<br/>
        – Non-stop incredible scenery<br/>
        – Routes pre-ridden and checked for larger adventure motorcycle suitability
      
    </p>
    <p className="text-gray-600 mb-6">
        – Mechanical and tire support<br/>
        – Professional medical support<br/>
        – Gear transport<br/>
        – Safety sweep truck on route<br/>
        – Motorcycle recovery if needed*<br/>
        – Route options for more advanced riders<br/>
        – Discounted event tires<br/>
        – Free tire fitting<br/>
        – A downloadable copy of the event video<br/>
        – Event T-shirt<br/>
        – Rider Goodie Bag<br/>
      
    </p>
</div>
        
      
        
        <p className="text-gray-600 mb-6 font-bold underline">
      Special Offer. Ride with us on five major week-long events over 5 years and receive one Australian adventure FREE!

</p>
    </div>

    {/* Register Button */}
      <div className="text-center mb-6">
        <button className="bg-red-500 animate-zoom text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-300">
          REGISTER NOW
        </button>
      </div>


    </div>








  );
};

export default RoadRallye2025Onroad;
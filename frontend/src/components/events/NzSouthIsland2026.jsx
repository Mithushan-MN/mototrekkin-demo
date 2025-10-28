import React, { useState } from 'react'
import nziRallyImage from '../../assets/NZSI-BANNERS-DESKTOP-1.webp';
import galimg1 from "../../assets/gallery/20230217.webp"
import galimg2 from "../../assets/gallery/20230219_100505-Large.webp"
import galimg3 from "../../assets/gallery/20230219_104304-Large.webp"
import galimg4 from "../../assets/gallery/20230219_121123-Large.webp"
import galimg5 from "../../assets/gallery/20230219_082017-scaled.webp"
import galimg6 from "../../assets/gallery/20230219_121157-Large.webp"
import galimg7 from "../../assets/gallery/20230219_121702-Large.webp"
import galimg8 from "../../assets/gallery/20230219_123129-Large.webp"
import galimg9 from "../../assets/gallery/20230219_134504-Large.webp"
import galimg10 from "../../assets/gallery/20230219_153500-Large.webp"
import galimg11 from "../../assets/gallery/20230219_154537-Large.webp"
import galimg12 from "../../assets/gallery/20230219_160323-Large.webp"
import galimg13 from "../../assets/gallery/20230219_171049-Large.webp"
import galimg14 from "../../assets/gallery/20230219_172645-Large.webp"
import galimg15 from "../../assets/gallery/20230221_132950-scaled.webp"
import galimg16 from "../../assets/gallery/20230221_141750-Large.webp"
import galimg17 from "../../assets/gallery/20230221_144401-Large.webp"
import galimg18 from "../../assets/gallery/20230221_144430-Large.webp"
import galimg19 from "../../assets/gallery/20230221_144853-Large.webp"
import galimg20 from "../../assets/gallery/20230221_175054-Large.webp"
import galimg21 from "../../assets/gallery/cbd46c9c6f1ef4490c881d9b3d69f0b9e6d70f5e05328c3b3b2f9628c6e21ec8-Large.webp"
import galimg22 from "../../assets/gallery/danseys-pass-3-Large.webp"
import galimg23 from "../../assets/gallery/pc300457-Large.webp"
import galimg24 from "../../assets/gallery/queenstown-nz-Large.webp"

const NzSouthIsland2026 = () => {

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
    galimg17,
    galimg18,
    galimg19,
    galimg20,
    galimg21,
    galimg22,
    galimg23,
    galimg24,
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
        <button className="bg-green-700 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition-colors duration-300">
          REGISTER NOW
        </button>
      </div>

      {/* Event Details */}
      <div className=" flex flex-col md:flex-row items-center gap-6">
        <div className="py-8 px-4 bg-white w-full md:w-1/2 rounded-lg">
          <div className="space-y-2 text-gray-600">
            <p><strong>ROUTE TYPE:</strong> The most exciting, scenic, twisty, 5-star combination of gravel, sealed and private roads.</p>
            <p><strong>RIDER SKILL LEVEL NEEDED:</strong> Intermediate skilled suitable</p>
            <p><strong>AVERAGE DAILY DISTANCE:</strong> 350 kms</p>
            <p><strong>PRICING:</strong> Request info kit for all pricing and accommodation options</p>
            <p><strong>INCLUSIONS:</strong> Seven days of brilliant scenic trails, 
Quality accommodation,
Welcome and farewell dinners, 
Motorcycle hire, 
Mechanical support, 
Luggage support, 
Verified routes and Full details within info kit</p>
            
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className=" py-8 px-4 max-w-3xl mx-auto">
      <div className="bg-teal-600 text-white p-4 rounded-t-lg text-center">
        <h2 className="text-xl font-semibold">COMPLETE DETAILS BELOW TO RECEIVE INFO KIT VIA EMAIL</h2>
      </div>
      <div className="border-4 border-teal-600 p-6 rounded-b-lg shadow-md">
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            REQUEST INFO KIT
          </button>
        </form>
      </div>
    </div>
        </div>
      </div>

      

<div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8 pt-10">
  <div className="lg:w-1/2 text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">NEW ZEALAND SOUTH ISLAND</h2>
        <hr className="w-16 border-t-2 border-yellow-500 mx-auto mb-4" />
        <p className="text-lg text-gray-600 mb-4">
          Off-Road motorcycle adventures this good are rare.
        </p>
        <p className="text-gray-600 mb-4">
        We have circumnavigated and crisscrossed NZSi, to ensure you not only experience the best combination of on and off-road adventure riding, but we’ve also programmed time to view and enjoy the best this glorious country offers. We’ve taken care of everything for you; all you need to do is fly in and out.
        </p>
        <p className="text-gray-600 mb-4">
         The event is limited to the first 50 tickets sold, the maximum number of adventure motorcycles we can secure. If you’re ready to take your adventure riding to the next level, with fresh trails and tonnes of visual landscape candy, this event is for you.
         </p>
        <p className="text-gray-600 mb-4">
        Full details, including pricing, inclusions, and dates, are detailed in the event information kit. Complete the box below to receive a link to download the info kit.
        </p>
        <p className="text-gray-600 mb-4 font-black">
Special Offer. Ride with us on five major week long events over 5 years and receive one Australian adventure FREE!
</p>
        
      </div>
      <div className="lg:w-1/2">
        <h3 className="text-2xl font-bold text-teal-600 mb-4 text-center">IMAGE GALLERY</h3>
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

    {/* Embedded Videos */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
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
      </div>

    {/* Register Button */}
      <div className="text-center mb-6">
        <button className="bg-green-700 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition-colors duration-300">
          REGISTER NOW
        </button>
      </div>
    </div>
  );
};

export default NzSouthIsland2026;
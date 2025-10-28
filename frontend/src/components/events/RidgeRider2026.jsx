import React, { useState } from 'react'
import nziRallyImage from '../../assets/ridge-rider-2026.jpg';
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
import galimg17 from "../../assets/gallery/ridgeridergallery/Keith-Turnbull-inbound2377100810272101360-1-scaled.webp"
import galimg18 from "../../assets/gallery/ridgeridergallery/Keith-Turnbull-inbound2377100810272101360-scaled.webp"
import galimg19 from "../../assets/gallery/ridgeridergallery/Max-Barnes-20220429_063350-scaled.webp"
import galimg20 from "../../assets/gallery/ridgeridergallery/Nathan-Bourne-00B31462-0074-4801-8EED-E36E8AF53CD5-scaled.webp"
import galimg21 from "../../assets/gallery/ridgeridergallery/Nathan-Bourne-0A89B5FF-3460-43AE-ACDC-9786C1D54B70.jpg"
import galimg22 from "../../assets/gallery/ridgeridergallery/Nathan-Bourne-0F95EF43-214C-462E-B612-C4B87CF777E8-scaled.webp"
import galimg23 from "../../assets/gallery/ridgeridergallery/Peter-Shoobridge-0DBE3F86-DF6F-4447-8BC4-C42480407314-scaled.webp"
import galimg24 from "../../assets/gallery/ridgeridergallery/Peter-Shoobridge-1C6B7DDC-B607-4DC1-9CA1-7165B8546430-scaled.webp"

const RidgeRider2026 = () => {

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
        <button className="bg-[#640564] text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-[#4c014c] transition-colors duration-300">
          REGISTER NOW
        </button>
      </div>

      {/* Event Details */}
      <div className=" flex flex-col md:flex-row items-center gap-6">
        <div className="py-8 px-4 bg-white w-full md:w-1/2 rounded-lg">
          <div className="space-y-2 text-gray-600">
            <p><strong>ROUTE TYPE:</strong> All routes are suitable for intermediate skilled riders of larger adventure motorcycles.</p>
            <p><strong>BREAKOUT ROUTES</strong> If you’re a more advanced rider we offer more technically challenging breakout routes.</p>
            <p><strong>AVERAGE DAILY DISTANCE:</strong> 350 kms</p>
            <p><strong>PRICING:</strong> All inclusive from $2999
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
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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

<div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8 pt-20">
  <div className="lg:w-1/2 text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">YARRA VALLEY TO HUNTER VALLEY</h2>
        <hr className="w-16 border-t-2 border-yellow-500 mx-auto mb-4" />
        <p className="text-lg text-gray-600 mb-4 font-bold">
         Get Ready for the Ride of a Lifetime: Ridge Rider VI – Valley to Valley!
        </p>
        <p className="text-gray-600 mb-4">
          The countdown is on to the most thrilling, scenic, and unforgettable week you’ll ever have on an adventure bike!Ridge Rider VI (RR-VI) marks the sixth epic chapter in our renowned Ridge Rider series — Moto Trekkin’s premium off-road motorcycle events for passionate, intermediate-level adventure riders. If you ride a larger dual-sport motorcycle and crave serious trail time with your mates, RR-VI is the event your bike was built for.
Every year, hundreds of riders with every brand or motorcycle and from every background gather for five days of pure riding bliss — think winding trails, hidden gems, and jaw-dropping landscapes, all masterfully mapped for maximum throttle-twisting joy.
        </p>
        <p className="text-gray-600 mb-4 font-bold">
          New Route, New Rush: Valley to Valley, May 2026
        </p>
        <p className="text-gray-600 mb-4">
          This year’s theme: Valley to Valley — a dream ride from Victoria’s lush Yarra Valley to the sun-kissed countryside of New South Wales’ Hunter Valley. Along the way, you’ll carve through Australia’s most iconic wine regions, winding past vineyards, forested climbs, twisty backroads, and trails so off-the-map that most riders never even know they exist.

This isn’t just a ride — it’s an immersive adventure through some of the most stunning terrain on the continent.

Scroll down for video highlights from previous Ridge Rider events — and hit like & subscribe to stay updated on the wild rides ahead!
        </p>
        
      </div>
      <div className="lg:w-1/2">
        <h3 className="text-2xl font-bold text-[#640564] mb-4 text-center">RRII EVENT IMAGES</h3>
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

    <div className='max-w-6xl mx-auto'>
        <p className="text-gray-600 mb-4 font-bold">
          Who Can Ride? You Can.
        </p>
        <p className="text-gray-600 mb-4">
          If you’re an intermediate-skilled rider on a larger dual-sport or adventure motorcycle — you’re in.Unlike brand-restricted events, Moto Trekkin is proudly brand-agnostic. Whether you’re riding a BMW, KTM, Yamaha, Honda, Triumph or anything else — we’re all here for the same reason: to chase the ride of a lifetime, together. Bring your mates, no matter what they ride.
        </p>
        <p className="text-gray-600 mb-6 font-bold">
          How It Works
        </p>
        <p className="text-gray-600 mb-6">
          Our routes are meticulously planned by riders, for riders. You’ll follow an intermediate-level core track, with three optional breakout routes for those craving even more technical terrain.The 2026 course delivers five days of riding brilliance — from vineyard trails to backcountry bliss — with each day ending at a clean, comfortable, pre-booked accommodation, ready and waiting for your arrival.
        </p>
        <p className="text-gray-600 mb-6 font-bold">
         We’ve got you covered with:
        </p>
        <p className="text-gray-600 mb-6">
         – Luggage transport between stops<br/>
– A 10:1 rider-to-support ratio<br/>
– On-site mechanical and medical support<br/>
– Professional crew guiding your journey<br/>
– We handle the logistics — you handle the ride.
</p>
        <p className="text-gray-600 mb-6 font-bold">
        Pricing, Inclusions & What’s Next
        </p>
        <p className="text-gray-600 mb-6">
        Ready to learn more? Simply enter your details into the purple box above (or below) and we’ll email your official information pack — complete with pricing, inclusions, key dates, and more.Book your ticket and you’ll also get access to exclusive vehicle transport deals, designed to make getting to the start line easy, affordable, and stress-free.
</p>
        <p className="text-gray-600 mb-6 font-bold">
       Join the Pack
        </p>
        <p className="text-gray-600 mb-6">
       Over the past five years, nearly a thousand riders have discovered why Moto Trekkin events are the gold standard for off-road adventure.
In May 2026, it’s your turn.
</p>
        <p className="text-gray-600 mb-6 font-bold">
       Yarra to Hunter. Backroads to bliss. Adventure to remember.
This is Ridge Rider VI. And it’s going to hit new heights of EPIC!!

</p>
        <p className="text-gray-600 mb-6 font-bold underline">
      Special Offer. Ride with us on five major week-long events over 5 years and receive one Australian adventure FREE!

</p>
    </div>

    {/* Register Button */}
      <div className="text-center mb-6">
        <button className="bg-[#640564] text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-[#4e014e] transition-colors duration-300">
          REGISTER NOW
        </button>
      </div>

 {/* Embedded Videos */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/ilcFA6_OEWM?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=https%3A%2F%2Fwww.mototrekkin.com.au&widgetid=1&forigin=https%3A%2F%2Fwww.mototrekkin.com.au%2Fmotorcycle-adventures%2Fridge-rider-2026%2F&aoriginsup=0&gporigin=https%3A%2F%2Fwww.mototrekkin.com.au%2F2026-event-calendar%2F&vf=1"// Replace with actual video URL
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
            src="https://www.youtube.com/embed/pHNXDOK3IoQ?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=https%3A%2F%2Fwww.mototrekkin.com.au&widgetid=2&forigin=https%3A%2F%2Fwww.mototrekkin.com.au%2Fmotorcycle-adventures%2Fridge-rider-2026%2F&aoriginsup=0&gporigin=https%3A%2F%2Fwww.mototrekkin.com.au%2F2026-event-calendar%2F&vf=1" // Replace with actual video URL
            title="Video 2"
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
            src="https://www.youtube.com/embed/Lun6U2NYbG8?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=https%3A%2F%2Fwww.mototrekkin.com.au&widgetid=3&forigin=https%3A%2F%2Fwww.mototrekkin.com.au%2Fmotorcycle-adventures%2Fridge-rider-2026%2F&aoriginsup=0&gporigin=https%3A%2F%2Fwww.mototrekkin.com.au%2F2026-event-calendar%2F&vf=1"
            title="Video 3"
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
            src="https://www.youtube.com/embed/pHNXDOK3IoQ?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=https%3A%2F%2Fwww.mototrekkin.com.au&widgetid=2&forigin=https%3A%2F%2Fwww.mototrekkin.com.au%2Fmotorcycle-adventures%2Fridge-rider-2026%2F&aoriginsup=0&gporigin=https%3A%2F%2Fwww.mototrekkin.com.au%2F2026-event-calendar%2F&vf=1" // Replace with actual video URL
            title="Video 4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>



    </div>
  );
};

export default RidgeRider2026;
// CardSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CardSlider.css"; 

import rriv from "../assets/RRIV.webp"
import rrv from "../assets/RRV-Logo-updated.webp"
import NZSI from "../assets/NZSI-new-SEPT-2024-logo.webp"
import adventurerider from "../assets/Adventure-Rider-Store.webp"


const cards = [
  {
    id: 1,
    img: rriv,
    title: "RRIV",
    text: "Our RRIV Canberra – Coffs successfully completed with over 160 participants. Thank you and congratulations to all those participants for a great week of adventure riding full of views and smiles. We cant wait to see you and hopefully some new faces on our next RRV.",
  },
  {
    id: 2,
    img: NZSI,
    title: "NZSI II Dates Confirmed",
    text: "With the most exciting, scenic, twisty routes around the New Zealand South Island. A week full of off-road adventure riding through the iconic and unimaginable landscapes. Full details, including pricing, inclusions, and dates, are detailed in the event information kit. Final tickets.",
  },
  {
    id: 3,
    img: rrv,
    title: "RRV TASMANIA",
    text: "Devils Island Tasmania locked in for RRV for 2025. With routes already being scouted to give participants the best trip full of off-road adventure running 4th of May to the 9th of May 2025. More information coming soon.",
  },
  {
    id: 4,
    img: adventurerider,
    title: "MT Website Store Coming Soon",
    text: "Our Moto Trekkin Online store is in the process of being updated to give our customers the best experience b both in store and online with all the riding gear you need. Coming soon.",
  },
];

export default function CardSlider() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
           MOTO TREKKIN NEWS
          </h2>
          <hr className="mt-4 w-full mx-auto border-t-4 border-yellow-500 rounded-full" />
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
        //   pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          className="custom-swiper py-4"
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="bg-white rounded-xl text-center shadow-md p-6  flex flex-col h-100">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

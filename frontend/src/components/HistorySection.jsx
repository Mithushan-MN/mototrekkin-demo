import React from 'react';
import historyImage from '../assets/history.webp';

const HistorySection = () => {
  return (
    <div className="relative bg-cover bg-center h-full " style={{ backgroundImage: `url(${historyImage})` }}>
      <div className="absolute inset-0 bg-yellow-600/70"></div>
      <div className="relative z-10 max-w-6xl mx-auto py-30 px-4 text-white">
        <h1 className="text-4xl font-bold mb-6">HISTORY OF MOTO TREKKIN</h1>
        <p className="mb-4 text-justify">
          Moto Trekkin began in 2016 with the first off-road adventure ride to Uluru and Alice Springs, now known as the Desert Storm Event. 
          This desert adventure had 60 participants and was the first of many Moto Trekkin off-road adventure experiences. Since 2016, we have 
          completed off-road events with up to 250 participants and have added international events to our annual event schedule.
        </p>
        <p className="mb-4 text-justify">
          In 2022, we introduced the Moto Trekkin Garage, a one-stop specialist service centre catering to all brands of motorcycles, both on-
          road and off-road. This facility provides the convenience of a comprehensive range of motorcycle services under one roof. It ensures 
          that your motorcycle is in the hands of our expert technicians, guaranteeing top-notch service and care at a cost far lower than 
          dealerships offer.
        </p>
        <p className='text-justify'>
          Please explore our website to see a full range of services offered by our team here at Moto Trekkin.
        </p>
      </div>
    </div>
  );
};

export default HistorySection;
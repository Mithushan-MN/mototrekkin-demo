import React from 'react';
import { Link } from 'react-router-dom';
import riderJackets from '../assets/rider-jacket-2.webp';
import riderGloves from '../assets/ridergloves.webp';
import riderBoots from '../assets/riderboots.webp';
import techAir5 from '../assets/tech-air-5.webp';
import earMould from '../assets/earplugs.webp';
import bags from '../assets/rider-bags.webp';
import womensApparel from '../assets/womens-apparel2.webp';
import touring from '../assets/touring.webp';
import rimRepair from '../assets/rimrepair.webp';
import offRoadTyres from '../assets/offroadtyre.webp';
import roadTyres from '../assets/road-tyres.webp';
import bikeHire from '../assets/bikehire.webp';

const GearGrid = () => {
  const gearItems = [
    { label: 'RIDER JACKETS', image: riderJackets, link: 'https://store.mototrekkin.com.au/riding-gear/' },
    { label: 'RIDER GLOVES', image: riderGloves, link: 'https://store.mototrekkin.com.au/riding-gear/' },
    { label: 'RIDER BOOTS', image: riderBoots, link: 'https://store.mototrekkin.com.au/riding-gear/' },
    { label: 'TECH-AIR® 5', image: techAir5, link: 'https://store.mototrekkin.com.au/riding-gear/' },
    { label: 'EAR MOULD', image: earMould, link: '/hearing-protection' },
    { label: 'BAGS', image: bags, link: 'https://store.mototrekkin.com.au/bags/' },
    { label: 'WOMEN’S APPAREL', image: womensApparel, link: 'https://store.mototrekkin.com.au/womens/' },
    { label: 'TOURING', image: touring, link: 'https://store.mototrekkin.com.au/' },
    { label: 'RIM REPAIR', image: rimRepair, link: 'https://store.mototrekkin.com.au/rim-repair/' },
    { label: 'OFF ROAD TYRES', image: offRoadTyres, link: 'https://store.mototrekkin.com.au/tyres/' },
    { label: 'ROAD TYRES', image: roadTyres, link: 'https://store.mototrekkin.com.au/tyres/' },
    { label: 'BIKE HIRE', image: bikeHire, link: '/MotorcycleHire' },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Gear & Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gearItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-yellow-500 text-xl font-semibold text-center px-2">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GearGrid;
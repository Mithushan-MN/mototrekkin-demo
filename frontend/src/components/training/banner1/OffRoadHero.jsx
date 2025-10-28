import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import heroImg from '../../../assets/training/offroad_banner1/hero/heroimg.jpg';
import banner1 from '../../../assets/training/banner1-2.webp';

const OffRoadHero = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-yellow-500/20 backdrop-blur-sm text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">
              🏍️ Professional Training
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-500 mb-6 drop-shadow-2xl leading-tight">
            OFF-ROAD RIDER TRAINING CENTRE
            <span className="block text-white text-2xl md:text-3xl">MASTERCLASS DEVELOPMENT PROGRAM</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            Master the art of adventure riding with our comprehensive training programs designed
            to enhance your skills, safety, and confidence on any terrain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#calender">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              VIEW PROGRAMS
            </button>
            </a>
            {/* <a href="/contact"></a>
            <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-lg text-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              CONTACT US
            </button> */}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/training"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Training
          </Link>
        </div>
      </div>

      {/* Banner Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={banner1}
              alt="Off-Road Rider Training Centre"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default OffRoadHero;

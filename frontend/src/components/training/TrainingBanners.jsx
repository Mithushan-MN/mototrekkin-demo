import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award } from 'lucide-react';
import banner1 from '../../assets/training/banner1.webp';
import banner2 from '../../assets/training/banner2.webp';
import banner3 from '../../assets/training/banner3.webp';

const TrainingBanners = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase animate-fade-in-up">
              🏍️ Professional Training
            </span>
          </div>

          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            TRAINING PROGRAMS
            <span className="block text-5xl md:text-6xl mt-2">FOR EVERY RIDER</span>
          </h2>

          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed animate-fade-in-up animation-delay-600 max-w-6xl mx-auto">
            Master the art of motorcycle riding with our comprehensive training programs designed 
            to enhance your skills, safety, and confidence on the road.
          </p>
        </div>

        {/* Training Banners Grid */}
        <div className="space-y-8">
          {/* Banner 1 - Off-Road Rider Training Centre */}
          <Link to="/off-road-training-detail" className="block">
            <div className="rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <img
                src={banner1}
                alt="Off-Road Rider Training Centre"
                className="w-full h-auto object-contain"
              />
            </div>
          </Link>

          {/* Banner 2 - Off-Road Private Clinic */}
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={banner2}
              alt="Off-Road Private Clinic"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Banner 3 - Road Craft Training */}
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={banner3}
              alt="Road Craft Training"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingBanners;

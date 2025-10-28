import React, { useState } from 'react';
import { X } from 'lucide-react';
import trainingImg1 from '../../../assets/training/offroad_banner1/1.jpeg';
import trainingImg2 from '../../../assets/training/offroad_banner1/2.jpeg';
import trainingImg3 from '../../../assets/training/offroad_banner1/3.jpeg';
import trainingImg4 from '../../../assets/training/offroad_banner1/4.webp';
import trainingImg5 from '../../../assets/training/offroad_banner1/5.webp';
import trainingImg6 from '../../../assets/training/offroad_banner1/6.webp';
import trainingImg7 from '../../../assets/training/offroad_banner1/7.webp';
import trainingImg8 from '../../../assets/training/offroad_banner1/8.webp';
import trainingImg9 from '../../../assets/training/offroad_banner1/9.webp';
import trainingImg10 from '../../../assets/training/offroad_banner1/10.jpeg';
import trainingImg11 from '../../../assets/training/offroad_banner1/IMG_1873-Large-300x300.webp';
import trainingImg12 from '../../../assets/training/offroad_banner1/IMG_1881-Large-300x300.webp';

const TrainingGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const trainingImages = [
    trainingImg1, trainingImg2, trainingImg3, trainingImg4,
    trainingImg5, trainingImg6, trainingImg7, trainingImg8,
    trainingImg9, trainingImg10, trainingImg11, trainingImg12
  ];

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              TRAINING GALLERY
            </h2>
            <p className="text-xl text-gray-600">
              Experience the action and see our students in training
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trainingImages.map((image, index) => (
              <div 
                key={index}
                className="group aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(image)}
              >
                <img
                  src={image}
                  alt="Off-road training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-gray-100 backdrop-blur-sm bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-gray-800 hover:text-gray-600 transition-colors bg-white rounded-full p-2 shadow-lg"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Training gallery"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingGallery;

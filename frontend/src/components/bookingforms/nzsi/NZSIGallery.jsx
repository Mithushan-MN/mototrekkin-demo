import React, { useState } from 'react';

// Import gallery images with correct paths
import gallery1 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230217_173242-scaled-300x300.jpg';
import gallery2 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_082017-scaled-300x300.jpg';
import gallery3 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_100505-Large-300x300.webp';
import gallery4 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_104304-Large-300x300.webp';
import gallery5 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_121123-Large-300x300.webp';
import gallery6 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_121157-Large-300x300.webp';
import gallery7 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_121702-Large-300x300.webp';
import gallery8 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_123129-Large-300x300.webp';
import gallery9 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_134504-Large-300x300.webp';
import gallery10 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_134939-Large-300x300.webp';
import gallery11 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_135033-Large-300x300.webp';
import gallery12 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_153500-Large-300x300.webp';
import gallery13 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_154537-Large-300x300.webp';
import gallery14 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_160323-Large-300x300.webp';
import gallery15 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_171049-Large-300x300.webp';
import gallery16 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230219_172645-Large-300x300.webp';
import gallery17 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_132950-scaled-300x300.jpg';
import gallery18 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_141750-Large-300x300.webp';
import gallery19 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_144401-Large-300x300.webp';
import gallery20 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_144430-Large-300x300.webp';
import gallery21 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_144853-Large-300x300.webp';
import gallery22 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_175054-Large-300x300.webp';
import gallery23 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_175143-Large-300x300.webp';
import gallery24 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/20230221_175541-Large-300x300.webp';
import gallery25 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/38-milford-sound-scenic-cruise.DHR7gA-300x300.webp';
import gallery26 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/cbd46c9c6f1ef4490c881d9b3d69f0b9e6d70f5e05328c3b3b2f9628c6e21ec8-Large-300x300.webp';
import gallery27 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/danseys-pass-3-Large-300x300.webp';
import gallery28 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/NOV-MDP-47-Large-300x300.webp';
import gallery29 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/pc300457-Large-300x300.webp';
import gallery30 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/queenstown-nz-Large-300x300.webp';
import gallery31 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/Shotover-Canyon-1-Large-300x300.webp';
import gallery32 from '../../assets/adventures/2025/NZSI/IMAGE GALLERY/Spirit-of-Milford-getting-under-Stirling-Falls-in-Milford-Sound-Large-300x300.webp';

const NZSIGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const galleryImages = [
    gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8,
    gallery9, gallery10, gallery11, gallery12, gallery13, gallery14, gallery15, gallery16,
    gallery17, gallery18, gallery19, gallery20, gallery21, gallery22, gallery23, gallery24,
    gallery25, gallery26, gallery27, gallery28, gallery29, gallery30, gallery31, gallery32
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Image Gallery */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">IMAGE GALLERY</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="relative cursor-pointer group rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setShowGallery(true);
                  }}
                >
                  <div className="aspect-square w-full">
                    <img 
                      src={image} 
                      alt={`NZSI Adventure Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', image);
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.innerHTML = '<span class="text-gray-500 text-sm">Image not available</span>';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                    <span className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full">
                      View Image
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button 
                onClick={() => setShowGallery(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-10 rounded-lg text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-500/25"
              >
                View Full Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button 
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90"
            >
              ×
            </button>
            <img 
              src={galleryImages[currentImageIndex]} 
              alt={`Gallery ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90"
            >
              ‹
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-70 px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NZSIGallery;

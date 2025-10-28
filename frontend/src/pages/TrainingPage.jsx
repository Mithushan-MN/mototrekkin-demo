import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TrainingHero from '../components/training/TrainingHero';
import TrainingBanners from '../components/training/TrainingBanners';
import TrainingCTA from '../components/training/TrainingCTA';

const TrainingPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <TrainingHero />

      {/* Back Button */}
      <div className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Training Banners Section */}
      <TrainingBanners />

      {/* Call to Action Section */}
      <TrainingCTA />
    </div>
  );
};

export default TrainingPage;

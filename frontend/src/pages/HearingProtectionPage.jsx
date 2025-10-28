import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HearingProtectionHero from '../components/hearing-protection/HearingProtectionHero';
import MotoTrekkinCustomEarProtection from '../components/hearing-protection/MotoTrekkinCustomEarProtection';
import ProfessionalMoldingProcess from '../components/hearing-protection/ProfessionalMoldingProcess';
import HearingProtectionForEveryone from '../components/hearing-protection/HearingProtectionForEveryone';
import WhyChooseCustomSolutions from '../components/hearing-protection/WhyChooseCustomSolutions';
import ReadyToGetStarted from '../components/hearing-protection/ReadyToGetStarted';

const HearingProtectionPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Enhanced Hero Section */}
      <HearingProtectionHero />

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

      {/* MotoTrekkin Custom Ear Protection Section */}
      <MotoTrekkinCustomEarProtection />

      {/* Professional Custom Molding Process */}
      <ProfessionalMoldingProcess />

      {/* Hearing Protection for Everyone Section */}
      <HearingProtectionForEveryone />
      
      {/* Why Choose Our Custom Solutions Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <WhyChooseCustomSolutions />
        </div>
      </section>

      {/* Ready to Get Started Section - Final */}
      <ReadyToGetStarted />
    </div>
  );
};

export default HearingProtectionPage;
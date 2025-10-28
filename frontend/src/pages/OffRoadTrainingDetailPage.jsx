import React, { useEffect } from 'react';
import OffRoadHero from '../components/training/banner1/OffRoadHero';
import PromotionalBanner from '../components/training/banner1/PromotionalBanner';
import CourseDates from '../components/training/banner1/CourseDates';
import NextLevelSkills from '../components/training/banner1/NextLevelSkills';
import TrainingGallery from '../components/training/banner1/TrainingGallery';
import ProgramInformation from '../components/training/banner1/ProgramInformation';
import RequestInfoKit from '../components/training/banner1/RequestInfoKit';
import OffRoadContact from '../components/training/banner1/OffRoadContact';

const OffRoadTrainingDetailPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <OffRoadHero />
      <PromotionalBanner />
      <CourseDates />
      <NextLevelSkills />
      <ProgramInformation />
      <RequestInfoKit />
      <TrainingGallery />
      <OffRoadContact />
    </div>
  );
};

export default OffRoadTrainingDetailPage;

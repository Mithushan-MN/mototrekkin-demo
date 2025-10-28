import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopBubble = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const threshold = 300; // Show after scrolling 300px
      
      if (scrolled > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50 animate-bounce"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopBubble;

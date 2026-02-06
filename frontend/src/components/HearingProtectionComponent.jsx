import hearingprotectionbgDesktop from "../assets/hearingProtection2.webp";           // Your current wide image
import hearingprotectionbgMobile from "../assets/hearingProtection-mobile.webp";     // Create this

import { Link } from 'react-router-dom';

export default function HearingProtectionComponent() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Desktop Image – hidden on mobile */}
      <div
        className="absolute inset-0 hidden lg:block bg-cover bg-right bg-fixed"
        style={{ backgroundImage: `url(${hearingprotectionbgDesktop})` }}
      />

      {/* Mobile Image – hidden on desktop */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-right bg-fixed"
        style={{ backgroundImage: `url(${hearingprotectionbgMobile})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/40 to-black/70 z-10" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content – Right on desktop, center-bottom on mobile */}
      <div className="relative z-30 h-full flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 pb-24 lg:pb-0 lg:px-12 xl:px-20">
          <div className="flex justify-center lg:justify-end">
            <div className="text-center lg:text-right max-w-5xl mt-140 md:mt-0">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
                  <span className="inline-block animate-slide-in-left animation-delay-200">
                    CUSTOM MOLDED
                  </span>
                  <br />
                  <span className="inline-block animate-slide-in-right animation-delay-400">
                    HEARING PROTECTION
                  </span>
                </h1>

                <div className="animate-scale-in animation-delay-600">
                  <Link
                    to="/hearing-protection"
                    className="btn-primary"
                  >
                    Click To Shop
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spinning accent rings – desktop only */}
      <div className="absolute top-16 left-16 z-20 animate-spin-slow hidden lg:block">
        <div className="w-6 h-6 border-2 border-yellow-400 rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-16 right-16 z-20 animate-spin-slow animation-delay-400 hidden lg:block">
        <div className="w-4 h-4 border-2 border-red-400 rounded-full opacity-40"></div>
      </div>
    </section>
  );
}
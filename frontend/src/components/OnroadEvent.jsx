import roadeventbgDesktop from "../assets/roadevent2.webp";           // Wide desktop version
import roadeventbgMobile from "../assets/roadevent2-MOBILE.JPEG";       // Create this for mobile

export default function OnroadEvent() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Desktop Image - hidden on mobile */}
      <div
        className="absolute inset-0 hidden lg:block bg-cover bg-right bg-fixed"
        style={{ backgroundImage: `url(${roadeventbgDesktop})` }}
      />

      {/* Mobile Image hidden on desktop */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${roadeventbgMobile})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-black/70 via-black/50 to-black/60 z-10" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content Right on desktop, center-bottom on mobile */}
      <div className="relative z-30 h-full flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 pb-24 lg:pb-0 lg:px-12 xl:px-20">
          <div className="flex justify-center lg:justify-end">
            <div className="text-center lg:text-right max-w-4xl mt-140 md:mt-0">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
                  
                  <span className="inline-block animate-slide-in-right animation-delay-400">
                    ROAD EVENTS
                  </span>
                </h1>

                <div className="animate-scale-in animation-delay-600">
                  <a
                    href="/motorcycle-adventures-onroad"
                    className="btn-primary"
                  >
                    Let's Explore
                    <span className="btn-arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent dots only on larger screens */}
      <div className="absolute top-20 right-20 z-20 animate-float hidden lg:block">
        <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 left-20 z-20 animate-float animation-delay-400 hidden lg:block">
        <div className="w-3 h-3 bg-orange-400 rounded-full opacity-50"></div>
      </div> */
    </section>
  );
}
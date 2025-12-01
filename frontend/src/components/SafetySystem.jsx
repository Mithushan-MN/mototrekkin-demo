import SafetySystembgDesktop from "../assets/safetysystems2.png";           // Your current wide image
import SafetySystembgMobile from "../assets/safetysystems2-mobile.png";       // Create this (mobile-optimized)

export default function SafetySystem() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Desktop Image – hidden on mobile */}
      <div
        className="absolute inset-0 hidden lg:block bg-cover bg-right bg-fixed"
        style={{ backgroundImage: `url(${SafetySystembgDesktop})` }}
      />

      {/* Mobile Image – hidden on desktop */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${SafetySystembgMobile})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-10" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content – Right on desktop, center-bottom on mobile */}
      <div className="relative z-30 h-full flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 pb-24 lg:pb-0 lg:px-12 xl:px-20">
          <div className="flex justify-center lg:justify-end">
            <div className="text-center lg:text-right max-w-4xl mt-140 md:mt-0">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
                  <span className="inline-block animate-slide-in-left animation-delay-200">
                    SAFETY SYSTEMS
                  </span>
                </h1>

                <div className="animate-scale-in animation-delay-600">
                  <a
                    href="https://store.mototrekkin.com.au/protections/?_gl=1*11b5g4n*_gcl_au*NjI1OTAzNTYzLjE3NTgwODI2NzQuMzA3MDA4OTEyLjE3NTgxMDY1MjYuMTc1ODEwNjY4Mg.."
                    className="btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                    <span className="btn-arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
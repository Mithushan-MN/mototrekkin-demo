import TRAININGbgDesktop from "../assets/TRAINING-PAGE.png";        // Your original wide/desktop image
import TRAININGbgMobile from "../assets/TRAINING-PAGE-mobile.png";    // Create this cropped version

export default function RiderTraining() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Desktop Image - Hidden on mobile */}
      <div
        className="absolute inset-0 hidden lg:block bg-cover bg-left bg-fixed"
        style={{ backgroundImage: `url(${TRAININGbgDesktop})` }}
      />

      {/* Mobile Image - Hidden on desktop */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${TRAININGbgMobile})` }}
      />

      {/* Dark gradient overlay - works on both */}
      <div className="absolute inset-0 bg-gradient-to-tl from-black/70 via-black/50 to-black/60 z-10" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content - Responsive Layout */}
      <div className="relative z-30 h-full flex flex-col justify-center lg:justify-center lg:justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 pb-24 lg:pb-0 lg:px-12 xl:px-20">
          <div className="flex justify-center lg:justify-start">
            <div className="text-center mt-140 md:mt-0 lg:text-left max-w-4xl">
              <div className="animate-fade-in-up">
                <h1 className="text-3xl md:text-6xl lg:text-6xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
                  <span className="inline-block animate-slide-in-left animation-delay-200">
                    ADVANCED OFF ROAD
                  </span>
                  <br />
                  <span className="inline-block animate-slide-in-right animation-delay-400">
                    RIDER TRAINING
                  </span>
                </h1>

                <div className="animate-scale-in animation-delay-600">
                  <a
                    href="/off-road-training-detail"
                    className="btn-primary"
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

      {/* Floating dots */}
      <div className="absolute top-20 right-20 z-20 animate-float hidden lg:block">
        <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 left-20 z-20 animate-float animation-delay-400 hidden lg:block">
        <div className="w-3 h-3 bg-orange-400 rounded-full opacity-50"></div>
      </div>
    </section>
  );
}
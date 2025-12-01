import servicecenterbg from "../assets/servicecenter.png";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center lg:bg-top-right 
                    
                   flex flex-col justify-end lg:justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${servicecenterbg})`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 z-0"></div>

      {/* Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content - Right on desktop, Center-bottom on mobile */}
      <div className="relative z-20 w-full px-6 pb-20 sm:pb-24 md:pb-32 lg:pb-0 lg:px-12 xl:px-20">
        <div className="flex justify-center lg:justify-end">
          <div className="text-center lg:text-right max-w-4xl">
            <div className="animate-fade-in-up mt-140 md:mt-56 lg:mt-0">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
                <span className="inline-block animate-slide-in-left animation-delay-200">
                  MOTORCYCLE
                </span>
                <br />
                <span className="inline-block animate-slide-in-right animation-delay-400">
                  SERVICE CENTRE
                </span>
              </h1>

              <div className="animate-scale-in animation-delay-600">
                <a href="/services" className="btn-primary">
                  Learn More
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
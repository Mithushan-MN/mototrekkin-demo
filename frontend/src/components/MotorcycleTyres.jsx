import tyrebg from "../assets/tyre-banner.webp"

export default function MotorcycleTyres() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${tyrebg})`, 
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/40 to-black/70 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content with enhanced animations */}
      <div className="relative z-10 text-center px-4 transform transition-all duration-1000 hover:scale-105">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
            <span className="inline-block animate-slide-in-left animation-delay-200">
              MOTORCYCLE
            </span>
            <br />
            <span className="inline-block animate-slide-in-right animation-delay-400">
              TYRES
            </span>
          </h1>
          
          <div className="animate-scale-in animation-delay-600">
            <a
              href="https://store.mototrekkin.com.au/tyres/"
              className="btn-primary"
            >
              Shop Now
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Rotating elements */}
      <div className="absolute top-16 left-16 z-5 animate-spin-slow">
        <div className="w-6 h-6 border-2 border-yellow-400 rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-16 right-16 z-5 animate-spin-slow animation-delay-400">
        <div className="w-4 h-4 border-2 border-red-400 rounded-full opacity-40"></div>
      </div>
    </section>
  );
}

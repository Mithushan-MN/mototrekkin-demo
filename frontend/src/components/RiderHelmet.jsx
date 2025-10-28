import RiderHelmetbg from "../assets/helmets.webp"

export default function RiderHelmet() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${RiderHelmetbg})`, 
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-tl from-black/70 via-black/50 to-black/60 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content with enhanced animations */}
      <div className="relative z-10 text-center px-4 transform transition-all duration-1000 hover:scale-105">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
            <span className="inline-block animate-slide-in-left animation-delay-200">
              RIDER
            </span>
            <br />
            <span className="inline-block animate-slide-in-right animation-delay-400">
              HELMET
            </span>
          </h1>
          
          <div className="animate-scale-in animation-delay-600">
            <a
              href="https://store.mototrekkin.com.au/protections/?_gl=1*11b5g4n*_gcl_au*NjI1OTAzNTYzLjE3NTgwODI2NzQuMzA3MDA4OTEyLjE3NTgxMDY1MjYuMTc1ODEwNjY4Mg.."
              className="btn-primary"
            >
              Learn More
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 z-5 animate-float">
        <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 left-20 z-5 animate-float animation-delay-400">
        <div className="w-3 h-3 bg-orange-400 rounded-full opacity-50"></div>
      </div>
    </section>
  );
}

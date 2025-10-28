import servicecenterbg from "../assets/servicecenter.webp"

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${servicecenterbg})`, 
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-0"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-50"></div>
      </div>

      {/* Content with enhanced animations */}
      <div className="relative z-10 text-center px-4 transform transition-all duration-1000 hover:scale-105">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-4xl text-yellow-500 mb-8 drop-shadow-2xl leading-tight">
            <span className="inline-block animate-slide-in-left animation-delay-200">
              MOTORCYCLE
            </span>
            <br />
            <span className="inline-block animate-slide-in-right animation-delay-400">
              SERVICE CENTRE
            </span>
          </h1>
          
          <div className="animate-scale-in animation-delay-600">
            <a
              href="/services"
              className="btn-primary"
            >
              Learn More
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

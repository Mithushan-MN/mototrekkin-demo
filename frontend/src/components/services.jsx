export default function Section({ title, description, bgImage, videoSrc, buttonText, buttonLink }) {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center mb-2" 
      style={{
        backgroundImage: videoSrc ? "none" : `url(${bgImage})`,
      }}
    >
      {/* Video Background */}
      {videoSrc && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl flex flex-col items-center space-y-8">
        {title && (
          <h1 className="text-2xl md:text-4xl font-extrabold text-yellow-500 drop-shadow-lg">
            {title}
          </h1>
        )}

        {description && (
          <p className="text-base md:text-lg lg:text-xl text-gray-200">
            {description}
          </p>
        )}

       {buttonText && buttonLink && (
               <a
               href={buttonLink}
               className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full text-lg shadow-lg transition"
               >
    {buttonText}
  </a>
)}

      </div>
    </section>
  );
}

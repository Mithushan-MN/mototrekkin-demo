import React from 'react'
import servicecenterbg from "../assets/history.webp";

const Videos = () => {
  return (
    <>
          <section
            className="relative h-screen bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${servicecenterbg})`,
            }}
          >
            {/* Overlay for dark effect */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>
    
            {/* Content */}
            <div className="relative z-10 text-left md:text-center px-4 text-white max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
               OFF-ROAD ADVENTURE VIDEOS
              </h1>
              <p className="text-xl">
               Experience the adrenaline of our ‘Off-road Adventure Videos’ – a compilation of thrilling journeys through rugged terrains and breathtaking landscapes. 
              </p>
            </div>
          </section>

          {/* Embedded Videos */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/ilcFA6_OEWM?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=https%3A%2F%2Fwww.mototrekkin.com.au&widgetid=1&forigin=https%3A%2F%2Fwww.mototrekkin.com.au%2Fmotorcycle-adventures%2Fridge-rider-2026%2F&aoriginsup=0&gporigin=https%3A%2F%2Fwww.mototrekkin.com.au%2F2026-event-calendar%2F&vf=1"// Replace with actual video URL
            title="Video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/pHNXDOK3IoQ?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=https%3A%2F%2Fwww.mototrekkin.com.au&widgetid=2&forigin=https%3A%2F%2Fwww.mototrekkin.com.au%2Fmotorcycle-adventures%2Fridge-rider-2026%2F&aoriginsup=0&gporigin=https%3A%2F%2Fwww.mototrekkin.com.au%2F2026-event-calendar%2F&vf=1" // Replace with actual video URL
            title="Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Lun6U2NYbG8?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=3&playsinline=0&enablejsapi=1&origin=https%3A%2F%2Fwww.mototrekkin.com.au&widgetid=3&forigin=https%3A%2F%2Fwww.mototrekkin.com.au%2Fmotorcycle-adventures%2Fridge-rider-2026%2F&aoriginsup=0&gporigin=https%3A%2F%2Fwww.mototrekkin.com.au%2F2026-event-calendar%2F&vf=1"
            title="Video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/qqzJd6x4VDY?feature=oembed"
            title="Video 4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
           src="https://www.youtube.com/embed/Lun6U2NYbG8?feature=oembed"
            title="Video 4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>

    </>
  )
}

export default Videos
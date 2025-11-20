import React, { useEffect, useRef, useState } from 'react'
import HeroVideo from '../assets/mototrekkin-intro.mp4'

const HomeHero = () => {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const hasUserInteracted = useRef(false)  // ← NEW: track first interaction

  // Toggle via button only
  const toggleMute = (e) => {
    e.stopPropagation()  // ← PREVENT bubbling to document click
    if (!videoRef.current) return

    const video = videoRef.current
    const newMutedState = !video.muted
    video.muted = newMutedState
    setIsMuted(newMutedState)
  }

  // Auto-unmute ONCE on first real user interaction (mobile fix)
  useEffect(() => {
    const unlockAudio = () => {
      if (hasUserInteracted.current) return
      if (!videoRef.current) return

      hasUserInteracted.current = true
      videoRef.current.muted = false
      setIsMuted(false)

      // Remove listeners – we only needed this once
      document.removeEventListener('click', unlockAudio)
      document.removeEventListener('touchstart', unlockAudio)
    }

    document.addEventListener('click', unlockAudio)
    document.addEventListener('touchstart', unlockAudio)

    return () => {
      document.removeEventListener('click', unlockAudio)
      document.removeEventListener('touchstart', unlockAudio)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        // src={HeroVideo}
        src="/assets/mototrekkin-intro.mp4"
        autoPlay
        loop
        playsInline
        muted
        poster="/images/hero-fallback.jpg"
      />

      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Ride with Confidence
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 opacity-90">
            Premium gear, expert training, and unmatched safety for every journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services" className=" btn-primary ">
              Explore Services
            </a>
            <a href="/training" className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black text-white font-semibold rounded-lg transition">
              Start Training
            </a>
          </div>
        </div>
      </div>

      {/* MUTE / UNMUTE BUTTON — NOW PERFECT */}
      <button
        onClick={toggleMute}
        className="absolute bottom-10  md:bottom-18 right-6 md:right-10 z-20
                   flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-md 
                   rounded-full border border-white/30 hover:bg-black/70 
                   transition-all duration-300 hover:scale-110 shadow-2xl"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          /* Muted Icon */
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          /* Unmuted Icon + Animated Waves */
          <div className="relative">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <div className="absolute -right-9 top-1/2 -translate-y-1/2 flex gap-1">
              <span className="w-1 h-4 bg-white/70 rounded-full animate-soundwave"></span>
              <span className="w-1 h-6 bg-white/80 rounded-full animate-soundwave delay-100"></span>
              <span className="w-1 h-8 bg-white rounded-full animate-soundwave delay-200"></span>
            </div>
          </div>
        )}
        <span className="text-white text-sm font-medium ml-2">
          {isMuted ? 'Unmute' : 'Mute'}
        </span>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default HomeHero
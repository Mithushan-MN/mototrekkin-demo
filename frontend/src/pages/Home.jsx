// import React from 'react'
// import ServiceCenter from '../components/ServiceCenter'
// import RiderTraining from '../components/RiderTraining'
// import MotorcycleTyres from '../components/MotorcycleTyres'
// import OffroadEvent from '../components/OffroadEvent'
// import OnroadEvent from '../components/OnroadEvent'
// import RidingGear from '../components/RidingGear'
// import SafetySystem from '../components/SafetySystem'
// import RiderHelmet from '../components/RiderHelmet'
// import HearingProtectionComponent from '../components/HearingProtectionComponent'
// import GearGrid from '../components/GearGrid'
// import ProductShowcase from '../components/ProductShowcase'
// import CardSlider from '../components/CardSlider'
// import HistorySection from '../components/HistorySection'


// const Home = () => {
//   return (
//     <div>
//    <ServiceCenter/>
//    <RiderTraining/>
//    <MotorcycleTyres/>
//    <OffroadEvent/>
//    <OnroadEvent/>
//    <RidingGear/>
//    <SafetySystem/>
//    <RiderHelmet/>
//    <HearingProtectionComponent/>
//    <GearGrid/>
//    <ProductShowcase/>
//    <CardSlider/>
//    <HistorySection/>
//     </div>
//   )
// }

// export default Home


import React, { useEffect, useRef } from 'react'
import ServiceCenter from '../components/ServiceCenter'
import RiderTraining from '../components/RiderTraining'
import MotorcycleTyres from '../components/MotorcycleTyres'
import OffroadEvent from '../components/OffroadEvent'
import OnroadEvent from '../components/OnroadEvent'
import RidingGear from '../components/RidingGear'
import SafetySystem from '../components/SafetySystem'
import RiderHelmet from '../components/RiderHelmet'
import HearingProtectionComponent from '../components/HearingProtectionComponent'
import GearGrid from '../components/GearGrid'
import ProductShowcase from '../components/ProductShowcase'
import CardSlider from '../components/CardSlider'
import HistorySection from '../components/HistorySection'
import ScrollToTopBubble from '../components/ScrollToTopBubble'

const Home = () => {
  const sectionRefs = useRef([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          entry.target.classList.remove('opacity-0')
        }
      })
    }, observerOptions)

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [])

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient overlay for better visual hierarchy */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 -z-10"></div>
      
      {/* Smooth scrolling container */}
      <div className="scroll-smooth">
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <ServiceCenter/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <RiderTraining/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <MotorcycleTyres/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <OffroadEvent/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <OnroadEvent/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <RidingGear/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <SafetySystem/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <RiderHelmet/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <HearingProtectionComponent/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <GearGrid/>
        </div>
        
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <ProductShowcase/>
        </div>
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <CardSlider/>
        </div>
        <div ref={addToRefs} className="opacity-0 transition-all duration-1000">
          <HistorySection/>
        </div>    
      </div>
      
      {/* Simple scroll to top bubble */}
      <ScrollToTopBubble />
    </div>
  )
}

export default Home


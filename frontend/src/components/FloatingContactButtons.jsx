// src/components/FloatingContactButtons.jsx
import React, { useState } from 'react';

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      // Replace with your actual endpoint (Formspree, EmailJS, your API, etc.)
      const response = await fetch('https://mototrekkin-frontends.vercel.app/api/contact', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        alert('Thank you! We’ll get back to you soon.');
        setIsOpen(false);
        e.target.reset();
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
    }
  };

  return (
    <>
    {/* Floating Buttons - Always Visible */}
    <div className="fixed top-32 right-[-10px] md:right-[-10px] z-40 flex flex-col gap-4 transition-all duration-500 ">
      {/* Call Button */}
      <a
        href="tel:+61240724511"
        className=" btn-primary cursor-pointer flex items-center justify-center gap-3 bg-[#FFD800] hover:bg-yellow-400 text-black font-bold text-base md:text-lg px-6 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          />
        </svg>
        0240724511
      </a>

      {/* Contact Us Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary cursor-pointer bg-[#FFD800] hover:bg-yellow-400 text-black font-bold text-base md:text-lg px-6 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        CONTACT US
      </button>
    </div>

    {/* Overlay + Sliding Panel */}
    {isOpen && (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/30 z-50"
          onClick={() => setIsOpen(false)}
        />

        {/* Sliding Panel */}
        <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-500 ease-in-out translate-x-0">
          <div className="p-8 pt-20 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 text-5xl text-gray-600 hover:text-black transition"
            >
              ×
            </button>

            <h3 className="text-3xl font-bold text-center mb-8">Get in Touch</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message *"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none resize-none"
              />

              <button
                type="submit"
                className=" btn-primary w-full bg-[#FFD800] hover:bg-yellow-400 text-black font-bold text-xl py-5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </>
    )}
  </>);
};

export default FloatingContactButtons;
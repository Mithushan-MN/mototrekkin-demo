// src/components/FloatingContactButtons.jsx
import { Mail, Phone } from 'lucide-react';
import React, { useState } from 'react';

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ← new state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || undefined,
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
      alert('Name, email and message are required.');
      return;
    }

    setIsSubmitting(true); // ← disable & show loading

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you! We’ll get back to you soon.');
        setIsOpen(false);
        form.reset();
      } else {
        alert(result.error || 'Oops! Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false); // ← always re-enable button
    }
  };

  return (
    <>
      {/* Floating Buttons - Always Visible */}
      <div className="fixed top-32 right-[-10px] md:right-[-10px] z-40 flex flex-col gap-4 transition-all duration-500">
        {/* Call Button */}
        <a
          href="tel:+61240724511"
          className="btn-primary cursor-pointer flex items-center justify-center gap-3 bg-[#FFD800] hover:bg-yellow-400 text-black font-bold text-base md:text-lg px-6 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <Phone size={20} />
          <span className="hidden lg:block">0240724511</span>
        </a>

        {/* Contact Us Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary cursor-pointer gap-3 bg-[#FFD800] hover:bg-yellow-400 text-black font-bold text-base md:text-lg px-6 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <Mail size={20} />
          <span className="hidden lg:block">CONTACT US</span>
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
                disabled={isSubmitting} // optional: prevent close during submit
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
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message *"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full bg-[#FFD800] hover:bg-yellow-400 text-black font-bold text-xl py-5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-4 border-black border-t-transparent rounded-full"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingContactButtons;
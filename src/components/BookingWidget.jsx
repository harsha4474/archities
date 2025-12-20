import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your actual Calendly URL
  // To get your Calendly URL: Sign up at calendly.com and get your scheduling link
  const CALENDLY_URL = "https://calendly.com/your-username/30min";

  const openBooking = () => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeBooking = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Floating Booking Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={openBooking}
        className="fixed bottom-24 right-6 z-40 bg-premium-red text-white px-6 py-3 rounded-full shadow-2xl hover:bg-deep-blue transition-all hover:scale-105 font-semibold flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Book Consultation
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBooking}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-deep-blue to-premium-red text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Book Your Free Consultation</h3>
                  <p className="text-gray-100 text-sm">Select a convenient time for your design discussion</p>
                </div>
                <button
                  onClick={closeBooking}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Calendly Embed */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={CALENDLY_URL}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule Consultation"
                  className="w-full h-full"
                />
              </div>

              {/* Alternative: Manual Booking Info (if Calendly not set up) */}
              {/* Uncomment below if you want to show contact info instead of iframe */}
              {/*
              <div className="flex-1 overflow-auto p-8">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 text-sm">
                      <strong>Setup Required:</strong> Replace CALENDLY_URL in BookingWidget.jsx with your Calendly link
                    </p>
                  </div>

                  <h4 className="text-xl font-bold text-deep-blue mb-4">
                    Schedule Your Free Consultation
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Get personalized design advice and discuss your project requirements with our expert team.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-premium-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-deep-blue">Call/WhatsApp</p>
                        <a href="tel:+919030938830" className="text-premium-red hover:underline">+91 90309 38830</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-6 h-6 text-premium-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-deep-blue">Email</p>
                        <a href="mailto:info@archities.com" className="text-premium-red hover:underline">info@archities.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-deep-blue text-white rounded-lg">
                    <h5 className="font-semibold mb-2">Business Hours</h5>
                    <p className="text-sm">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-sm">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
              */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingWidget;

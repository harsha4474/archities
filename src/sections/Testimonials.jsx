import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-deep-blue mb-8">
          Client Testimonials
        </h3>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-off-white to-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="text-5xl text-premium-red mb-4 opacity-50">"</div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <span key={i} className="text-2xl text-premium-red">
                    ★
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-lg mb-6 italic">
                {currentTestimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-deep-blue to-premium-red rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-deep-blue">{currentTestimonial.name}</h4>
                  <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-deep-blue text-deep-blue hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-deep-blue text-deep-blue hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-premium-red' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;

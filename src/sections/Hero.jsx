import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Hyderabad Interiors",
      subtitle: "Designed Just for You",
      description: "Premium architectural interior design that transforms your vision into breathtaking reality",
      cta1: "Explore Interiors",
      cta2: "Get Free Consultation",
      image: "/images/renders/living-room-view-01.jpg"
    },
    {
      id: 2,
      title: "Transform Your",
      subtitle: "Living Spaces",
      description: "Expert craftsmanship meets innovative design to create spaces that inspire and delight",
      cta1: "View Portfolio",
      cta2: "Schedule Consultation",
      image: "/images/renders/bedroom-01.jpg"
    },
    {
      id: 3,
      title: "Your Dream Home",
      subtitle: "Awaits",
      description: "From concept to completion - we bring your interior design dreams to life with precision",
      cta1: "Our Services",
      cta2: "Get Started",
      image: "/images/renders/kitchen-dining-area.jpg"
    }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Fade Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/80 via-deep-blue/70 to-premium-red/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              {slides[currentSlide].title}
              <span className="block mt-2 text-off-white">{slides[currentSlide].subtitle}</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={() => scrollToSection('#portfolio')}
                className="group relative px-8 py-4 bg-white text-deep-blue rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10">{slides[currentSlide].cta1}</span>
                <motion.div
                  className="absolute inset-0 bg-premium-red"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  {slides[currentSlide].cta1}
                </span>
              </button>

              <button
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-deep-blue transition-all hover:scale-105"
              >
                {slides[currentSlide].cta2}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <div className="absolute left-4 right-4 top-1/2 transform -translate-y-1/2 flex justify-between items-center pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-all"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-all"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-3 bg-white'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white text-sm flex flex-col items-center gap-2"
          >
            <span>Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { renderVsRealityPairs } from '../data/renderVsReality';

const RenderVsReality = () => {
  const [selectedPair, setSelectedPair] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  // Only render if we have comparison pairs
  if (!renderVsRealityPairs || renderVsRealityPairs.length === 0) {
    return null;
  }

  const currentPair = renderVsRealityPairs[selectedPair];

  return (
    <section id="render-vs-reality" className="py-20 bg-gradient-to-b from-white to-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">
            Render vs Reality
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our 3D visualizations translate into stunning real-world executions
          </p>
        </motion.div>

        {/* Main Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div
            ref={containerRef}
            className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Reality Image (Background) */}
            <div className="absolute inset-0">
              <img
                src={currentPair.realityImage}
                alt={`${currentPair.title} - Reality`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                ✓ Reality
              </div>
            </div>

            {/* Render Image (Foreground - clipped) */}
            <div
              className="absolute inset-0 transition-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={currentPair.renderImage}
                alt={`${currentPair.title} - Render`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-premium-red text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                3D Render
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <svg className="w-6 h-6 text-deep-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 6l-6 6 6 6v-12zm8 12l6-6-6-6v12z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-deep-blue mb-2">{currentPair.title}</h3>
            <p className="text-gray-600 mb-2">{currentPair.category}</p>
            {currentPair.description && (
              <p className="text-gray-500 italic">{currentPair.description}</p>
            )}
          </div>
        </motion.div>

        {/* Thumbnail Navigation */}
        {renderVsRealityPairs.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderVsRealityPairs.map((pair, index) => (
              <motion.button
                key={pair.id}
                onClick={() => {
                  setSelectedPair(index);
                  setSliderPosition(50);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-lg overflow-hidden h-32 transition-all ${
                  index === selectedPair
                    ? 'ring-4 ring-premium-red shadow-xl'
                    : 'ring-2 ring-gray-200 hover:ring-deep-blue'
                }`}
              >
                <img
                  src={pair.renderImage}
                  alt={pair.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-2">
                  <p className="text-white text-sm font-semibold text-center">{pair.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RenderVsReality;

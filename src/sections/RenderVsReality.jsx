import { motion } from 'framer-motion';
import { useState } from 'react';

const RenderVsReality = () => {
  const [selectedPair, setSelectedPair] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const pairs = [
    {
      id: 1,
      title: "Living Room Transformation",
      renderImage: "/images/renders/living-room-tv-unit-01.jpg",
      realityImage: "/images/reality/tv-wall-execution-01.jpg",
      category: "Living Room",
      matchPercentage: 98
    },
    {
      id: 2,
      title: "Modern Kitchen Design",
      renderImage: "/images/renders/kitchen-01.jpg",
      realityImage: "/images/reality/kitchen-golden-hardware.jpg",
      category: "Kitchen",
      matchPercentage: 96
    },
    {
      id: 3,
      title: "Master Bedroom Suite",
      renderImage: "/images/renders/bedroom-01.jpg",
      realityImage: "/images/reality/bedroom-complete.jpg",
      category: "Bedroom",
      matchPercentage: 97
    }
  ];

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            Drag the slider to compare our 3D renders with the executed reality
          </p>
        </motion.div>

        {/* Interactive Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div
            className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl cursor-col-resize select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
          >
            {/* Reality Image (Bottom Layer) */}
            <img
              src={pairs[selectedPair].realityImage}
              alt={`${pairs[selectedPair].title} - Executed Reality`}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-4 right-4 px-4 py-2 bg-premium-red text-white rounded-lg font-semibold z-10">
              Executed Reality
            </div>

            {/* Render Image (Top Layer - Clipped) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={pairs[selectedPair].renderImage}
                alt={`${pairs[selectedPair].title} - 3D Render`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 left-4 px-4 py-2 bg-deep-blue text-white rounded-lg font-semibold">
                3D Render
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-0.5 h-6 bg-deep-blue"></div>
                  <div className="w-0.5 h-6 bg-deep-blue"></div>
                </div>
              </div>
            </div>

            {/* Match Percentage Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg z-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-deep-blue">
                  {pairs[selectedPair].matchPercentage}%
                </span>
                <span className="text-sm text-gray-600">Match</span>
              </div>
            </div>
          </div>

          {/* Title and Category */}
          <div className="text-center mt-8">
            <span className="inline-block px-4 py-2 bg-deep-blue/10 text-deep-blue rounded-full text-sm font-semibold mb-3">
              {pairs[selectedPair].category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-deep-blue">
              {pairs[selectedPair].title}
            </h3>
          </div>
        </motion.div>

        {/* Thumbnail Selector */}
        <div className="flex justify-center gap-4">
          {pairs.map((pair, index) => (
            <button
              key={pair.id}
              onClick={() => {
                setSelectedPair(index);
                setSliderPosition(50);
              }}
              className={`relative w-24 h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedPair === index
                  ? 'ring-4 ring-premium-red scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={pair.renderImage}
                alt={pair.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RenderVsReality;

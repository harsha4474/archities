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
      renderImage: "/images/renders/render-13.jpg",
      realityImage: "/images/reality/modular-kitchen-01.jpg",
      category: "Kitchen",
      matchPercentage: 96
    },
    {
      id: 3,
      title: "Master Bedroom Suite",
      renderImage: "/images/renders/bedroom-02.jpg",
      realityImage: "/images/reality/pooja-unit-execution.jpg",
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
    <section id="before-after" className="py-12 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-deep-blue mb-3 md:mb-4">
            Render vs Reality
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the precision of our execution. Drag the slider to compare our photorealistic 3D renders with the actual delivered spaces.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 md:gap-8 items-start mb-8 md:mb-12">
          {/* Interactive Comparison Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none group"
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
              <div className="absolute top-4 right-4 px-4 py-2 bg-premium-red text-white rounded-lg font-semibold z-10 shadow-lg">
                Reality
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
                <div className="absolute top-4 left-4 px-4 py-2 bg-deep-blue text-white rounded-lg font-semibold shadow-lg">
                  Render
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-deep-blue group-hover:scale-110 transition-transform">
                  <div className="flex gap-1.5">
                    <div className="w-1 h-7 bg-deep-blue rounded-full"></div>
                    <div className="w-1 h-7 bg-deep-blue rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Drag Instruction (shows initially and on hover) */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isDragging ? 0 : 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="bg-black/70 text-white px-6 py-3 rounded-full backdrop-blur-sm">
                  <p className="text-sm font-medium whitespace-nowrap">← Drag to compare →</p>
                </div>
              </motion.div>
            </div>

            {/* Project Info Below Slider */}
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-4 py-2 bg-deep-blue/10 text-deep-blue rounded-full text-sm font-semibold mb-3">
                  {pairs[selectedPair].category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-deep-blue">
                  {pairs[selectedPair].title}
                </h3>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-deep-blue to-premium-red text-white rounded-xl shadow-lg">
                  <span className="text-3xl font-bold">{pairs[selectedPair].matchPercentage}%</span>
                  <div className="text-left">
                    <div className="text-xs opacity-90">Accuracy</div>
                    <div className="text-sm font-semibold">Match</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Selector Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:sticky lg:top-24"
          >
            <h4 className="text-lg font-bold text-deep-blue mb-4">Select Project</h4>
            <div className="space-y-4">
              {pairs.map((pair, index) => (
                <button
                  key={pair.id}
                  onClick={() => {
                    setSelectedPair(index);
                    setSliderPosition(50);
                  }}
                  className={`w-full text-left transition-all duration-300 rounded-xl overflow-hidden ${
                    selectedPair === index
                      ? 'ring-4 ring-premium-red shadow-xl scale-105'
                      : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-deep-blue hover:shadow-lg'
                  }`}
                >
                  {/* Split Preview */}
                  <div className="relative h-32 overflow-hidden">
                    {/* Reality half */}
                    <div className="absolute inset-0 w-1/2 right-0">
                      <img
                        src={pair.realityImage}
                        alt={`${pair.title} - Reality`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-premium-red text-white text-xs rounded font-semibold">
                        Reality
                      </div>
                    </div>
                    {/* Render half */}
                    <div className="absolute inset-0 w-1/2 left-0">
                      <img
                        src={pair.renderImage}
                        alt={`${pair.title} - Render`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-deep-blue text-white text-xs rounded font-semibold">
                        Render
                      </div>
                    </div>
                    {/* Center divider */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white shadow-lg"></div>
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-deep-blue/70">
                        {pair.category}
                      </span>
                      <span className="text-sm font-bold text-deep-blue">
                        {pair.matchPercentage}%
                      </span>
                    </div>
                    <h5 className="font-semibold text-deep-blue text-sm">
                      {pair.title}
                    </h5>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-premium-red mb-2">98%</div>
            <div className="text-sm font-semibold text-deep-blue mb-1">Average Accuracy</div>
            <div className="text-xs text-gray-600">Across all completed projects</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-premium-red mb-2">100+</div>
            <div className="text-sm font-semibold text-deep-blue mb-1">Projects Delivered</div>
            <div className="text-xs text-gray-600">With render-to-reality precision</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-premium-red mb-2">3D</div>
            <div className="text-sm font-semibold text-deep-blue mb-1">Photorealistic Renders</div>
            <div className="text-xs text-gray-600">See exactly what you'll get</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RenderVsReality;

import { motion } from 'framer-motion';
import { useState } from 'react';

const RenderVsReality = () => {
  const [selectedPair, setSelectedPair] = useState(0);

  const pairs = [
    {
      id: 1,
      title: "Living Room Transformation",
      renderImage: "/images/renders/living-room-tv-unit-01.jpg",
      realityImage: "/images/reality/tv-wall-execution-01.jpg",
      category: "Living Room"
    },
    {
      id: 2,
      title: "Modern Kitchen Design",
      renderImage: "/images/renders/kitchen-01.jpg",
      realityImage: "/images/reality/kitchen-golden-hardware.jpg",
      category: "Kitchen"
    },
    {
      id: 3,
      title: "Master Bedroom Suite",
      renderImage: "/images/renders/bedroom-01.jpg",
      realityImage: "/images/reality/bedroom-complete.jpg",
      category: "Bedroom"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-2">
            From Vision to Reality
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            See how our 3D designs transform into stunning real-world spaces
          </p>
        </motion.div>

        {/* Compact Comparison Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4">
            {/* Render Image - Compact */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg group"
            >
              <img
                src={pairs[selectedPair].renderImage}
                alt={`${pairs[selectedPair].title} - 3D Render`}
                className="w-full h-48 md:h-72 object-cover"
              />
              <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-1 md:px-3 md:py-1.5 bg-deep-blue text-white rounded text-xs md:text-sm font-semibold">
                3D Render
              </div>
            </motion.div>

            {/* Reality Image - Compact */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg group"
            >
              <img
                src={pairs[selectedPair].realityImage}
                alt={`${pairs[selectedPair].title} - Executed Reality`}
                className="w-full h-48 md:h-72 object-cover"
              />
              <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-1 md:px-3 md:py-1.5 bg-premium-red text-white rounded text-xs md:text-sm font-semibold">
                Reality
              </div>
            </motion.div>
          </div>

          {/* Compact Title */}
          <div className="text-center mb-4">
            <h3 className="text-lg md:text-xl font-bold text-deep-blue">
              {pairs[selectedPair].title}
            </h3>
          </div>

          {/* Compact Thumbnail Selector */}
          <div className="flex justify-center gap-2 md:gap-3">
            {pairs.map((pair, index) => (
              <button
                key={pair.id}
                onClick={() => setSelectedPair(index)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden transition-all duration-300 ${
                  selectedPair === index
                    ? 'ring-2 md:ring-3 ring-premium-red scale-105'
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
        </motion.div>
      </div>
    </section>
  );
};

export default RenderVsReality;

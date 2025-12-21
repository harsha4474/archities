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
            From Vision to Reality
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our 3D designs transform into stunning real-world spaces
          </p>
        </motion.div>

        {/* Comparison Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Render Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl shadow-2xl group"
          >
            <img
              src={pairs[selectedPair].renderImage}
              alt={`${pairs[selectedPair].title} - 3D Render`}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4 px-4 py-2 bg-deep-blue text-white rounded-lg font-semibold">
              3D Render
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Reality Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl shadow-2xl group"
          >
            <img
              src={pairs[selectedPair].realityImage}
              alt={`${pairs[selectedPair].title} - Executed Reality`}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4 px-4 py-2 bg-premium-red text-white rounded-lg font-semibold">
              Executed Reality
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </motion.div>

        {/* Title and Category */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 bg-deep-blue/10 text-deep-blue rounded-full text-sm font-semibold mb-3">
            {pairs[selectedPair].category}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-deep-blue">
            {pairs[selectedPair].title}
          </h3>
        </motion.div>

        {/* Thumbnail Selector */}
        <div className="flex justify-center gap-4">
          {pairs.map((pair, index) => (
            <button
              key={pair.id}
              onClick={() => setSelectedPair(index)}
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

import { motion } from 'framer-motion';

const TrustedPartners = () => {
  const partners = [
    'Hettich',
    'Century Ply',
    'Greenlam',
    'Saint-Gobain',
    'Bosch',
    'Asian Paints',
    'O-General',
    'Orient Bell',
    'IKEA',
    'Jaguar'
  ];

  return (
    <section className="py-16 bg-deep-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Winning collaborations that produce winning designs
          </h2>
        </motion.div>

        {/* Partners Infinite Carousel */}
        <div className="relative overflow-hidden">
          {/* First Row */}
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="flex gap-12 mb-8"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 w-32 h-20 bg-white rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-700 font-bold text-base text-center px-3">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Second Row (reversed direction) */}
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="flex gap-12"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner}-reverse-${index}`}
                className="flex-shrink-0 w-32 h-20 bg-white rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-700 font-bold text-base text-center px-3">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;

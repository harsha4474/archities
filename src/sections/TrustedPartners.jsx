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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">
            Trusted Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with the world's leading brands to deliver exceptional quality
          </p>
        </motion.div>

        {/* Partners Grid - 2 rows of scrolling animation */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="flex gap-8 mb-8"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-deep-blue font-semibold text-sm text-center px-4">
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

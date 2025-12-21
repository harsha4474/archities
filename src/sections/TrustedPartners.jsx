import { motion } from 'framer-motion';

const TrustedPartners = () => {
  const partners = [
    { name: 'Hettich', color: '#E31E24' },
    { name: 'Century Ply', color: '#004B87' },
    { name: 'Greenlam', color: '#00A651' },
    { name: 'Saint-Gobain', color: '#0071CE' },
    { name: 'Bosch', color: '#EA0016' },
    { name: 'Asian Paints', color: '#FF0000' },
    { name: 'O-General', color: '#003DA5' },
    { name: 'Orient Bell', color: '#D32F2F' },
    { name: 'IKEA', color: '#0051BA' },
    { name: 'Jaguar', color: '#000000' }
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
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center px-4">
                  <div
                    className="font-bold text-lg mb-1"
                    style={{ color: partner.color }}
                  >
                    {partner.name.split(' ')[0]}
                  </div>
                  {partner.name.split(' ')[1] && (
                    <div
                      className="text-xs font-semibold tracking-wider"
                      style={{ color: partner.color }}
                    >
                      {partner.name.split(' ')[1]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;

import { motion } from 'framer-motion';

const TrustedPartners = () => {
  const partners = [
    { name: 'Hettich', logo: '/logos/hettich.png' },
    { name: 'Century Ply', logo: '/logos/century-ply.png' },
    { name: 'Greenlam', logo: '/logos/greenlam.png' },
    { name: 'Saint-Gobain', logo: '/logos/saint-gobain.png' },
    { name: 'Bosch', logo: '/logos/bosch.png' },
    { name: 'Asian Paints', logo: '/logos/asian-paints.png' },
    { name: 'O-General', logo: '/logos/o-general.png' },
    { name: 'Orient Bell', logo: '/logos/orient-bell.png' },
    { name: 'IKEA', logo: '/logos/ikea.png' },
    { name: 'Jaguar', logo: '/logos/jaguar.png' }
  ];

  return (
    <section className="py-10 md:py-16 bg-deep-blue">
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
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="flex gap-12"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-lg flex items-center justify-center p-4"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span
                  className="text-gray-700 font-bold text-sm text-center"
                  style={{ display: 'none' }}
                >
                  {partner.name}
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

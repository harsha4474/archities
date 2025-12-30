import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../data/services.jsx';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="py-12 md:py-20 bg-gradient-to-b from-off-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">
            Interior Design Services in Hyderabad
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete home interior solutions including modular kitchens, bedroom design, living rooms, and custom furniture - tailored to your lifestyle
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
            >
              {/* Background on Hover */}
              <div className="absolute inset-0 bg-deep-blue opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="mb-4 text-deep-blue group-hover:text-white transform group-hover:scale-105 transition-all duration-400">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-deep-blue group-hover:text-white transition-colors duration-400">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white transition-colors duration-400">
                  {service.description}
                </p>
              </div>

              {/* Border Animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-premium-red"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

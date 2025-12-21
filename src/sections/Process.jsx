import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { processSteps } from '../data/process.jsx';

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="process" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A transparent, step-by-step process designed for your peace of mind
          </p>
        </motion.div>

        {/* Horizontal Process Flow */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-5 gap-8"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 bg-deep-blue rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <span className="text-4xl">{step.icon}</span>
              </motion.div>

              {/* Step Number */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-premium-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                {step.id}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-deep-blue mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>

              {/* Arrow (not for last item) */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 text-deep-blue text-2xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-premium-red text-white rounded-full font-semibold text-lg hover:bg-deep-blue transition-colors duration-300 shadow-lg">
            BOOK A CONSULTATION
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;

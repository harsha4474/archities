import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6">
              Crafting Spaces,
              <span className="block text-premium-red">Creating Experiences</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              At Archities, we believe that exceptional interior design goes beyond aesthetics.
              It's about creating environments that inspire, comfort, and reflect your unique personality.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With years of expertise in architectural interior design, our team transforms ordinary
              spaces into extraordinary sanctuaries. From contemporary homes to sophisticated commercial
              spaces, we bring your vision to life with meticulous attention to detail.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-premium-red">500+</h3>
                <p className="text-gray-600 mt-2">Projects Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-premium-red">10+</h3>
                <p className="text-gray-600 mt-2">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-premium-red">450+</h3>
                <p className="text-gray-600 mt-2">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          {/* Images Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
                alt="Interior Design 1"
                className="w-full h-64 object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg shadow-lg mt-8"
            >
              <img
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80"
                alt="Interior Design 2"
                className="w-full h-64 object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg shadow-lg col-span-2"
            >
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"
                alt="Interior Design 3"
                className="w-full h-48 object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

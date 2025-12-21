import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ImageCompareSlider from '../components/ImageCompareSlider';
import { beforeAfterProjects } from '../data/beforeAfter';

const BeforeAfter = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = ['All', 'Residential', 'Kitchen'];

  const filteredProjects = selectedCategory === 'All'
    ? beforeAfterProjects
    : beforeAfterProjects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="before-after" className="py-20 bg-gradient-to-b from-white to-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">
            Render vs Reality
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            What you see is what you get. Experience our 95%+ design accuracy guarantee.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Drag the slider to compare our 3D renders with the actual executed projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-premium-red text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Comparison Slider */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <ImageCompareSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  beforeLabel="Render"
                  afterLabel="Reality"
                />
              </div>

              {/* Project Details */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="inline-block px-4 py-1 bg-premium-red/10 text-premium-red rounded-full text-sm font-semibold mb-4">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold text-deep-blue mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-deep-blue mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-premium-red mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-2xl font-bold text-premium-red">
                      {project.stats.accuracy}
                    </p>
                    <p className="text-xs text-gray-500">Design Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-deep-blue">
                      {project.stats.timeline}
                    </p>
                    <p className="text-xs text-gray-500">Completion Time</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">
                      {project.stats.area}
                    </p>
                    <p className="text-xs text-gray-500">Project Area</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <div className="bg-deep-blue text-white rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4">
              Your Vision, Perfectly Realized
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
              Experience the archities difference - where premium renders translate into stunning reality with 95%+ accuracy
            </p>
            <button
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-deep-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-premium-red hover:text-white transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Start Your Transformation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;

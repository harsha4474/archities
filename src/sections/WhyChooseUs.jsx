import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      id: 1,
      icon: "🎨",
      title: "Premium Design",
      description: "Bespoke designs that reflect sophistication and elegance in every detail"
    },
    {
      id: 2,
      icon: "⚡",
      title: "Fast Execution",
      description: "Timely project completion without compromising on quality or craftsmanship"
    },
    {
      id: 3,
      icon: "💎",
      title: "Quality Materials",
      description: "Only the finest materials and finishes for lasting beauty and durability"
    },
    {
      id: 4,
      icon: "🏆",
      title: "Expert Team",
      description: "Skilled professionals with years of experience in luxury interiors"
    },
    {
      id: 5,
      icon: "💰",
      title: "Transparent Pricing",
      description: "Clear, honest quotes with no hidden costs or surprise charges"
    },
    {
      id: 6,
      icon: "🤝",
      title: "End-to-End Support",
      description: "Comprehensive service from concept to final handover and beyond"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="why-choose-us" className="py-12 md:py-20 bg-gradient-to-b from-white to-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">
            Why Choose Archities as Your Interior Designer in Hyderabad?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by 85+ happy clients across Telangana & AP with 10+ years of interior design expertise
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="text-5xl mb-4"
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-deep-blue mb-3 group-hover:text-premium-red transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">
                {feature.description}
              </p>

              {/* Decorative line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-premium-red to-deep-blue"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

import { motion } from 'framer-motion';
import Testimonials from './Testimonials';
import FAQs from './FAQs';

const TestimonialsAndFAQs = () => {
  return (
    <section id="faq" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-deep-blue mb-3 md:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from our satisfied clients and answers to your common questions
          </p>
        </motion.div>

        {/* Side by Side Layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Testimonials Column */}
          <div>
            <Testimonials />
          </div>

          {/* FAQs Column */}
          <div>
            <FAQs />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndFAQs;

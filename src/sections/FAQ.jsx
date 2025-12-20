import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs, faqCategories } from '../data/faq';

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState(null);

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about working with archities
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-8 flex-wrap"
        >
          {faqCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setOpenFaqId(null); // Close all when switching categories
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-premium-red text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 flex justify-between items-center text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <span className="inline-block px-3 py-1 bg-premium-red/10 text-premium-red rounded-full text-xs font-semibold mb-2">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-deep-blue">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openFaqId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-premium-red"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openFaqId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-deep-blue to-premium-red rounded-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-100 mb-6">
            We're here to help! Get in touch with our team for personalized answers
          </p>
          <button
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-deep-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

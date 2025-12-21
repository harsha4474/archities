import { motion } from 'framer-motion';
import { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the cost of interior design services?",
      answer: "Our interior design services are customized based on your specific requirements, space size, and material choices. We offer transparent pricing with no hidden costs. Contact us for a free consultation and detailed quotation."
    },
    {
      question: "How long does the entire process take?",
      answer: "Typically, a complete interior design project takes 45-60 days from design approval to final installation. The timeline may vary based on project complexity and customization requirements."
    },
    {
      question: "Do you provide a warranty?",
      answer: "Yes! We provide a comprehensive 12-year warranty on all our interior work, covering materials and craftsmanship. We stand behind the quality of our work."
    },
    {
      question: "What areas do you service?",
      answer: "We primarily serve Hyderabad and surrounding areas. For projects outside this region, please contact us to discuss possibilities and logistics."
    },
    {
      question: "Can I customize the designs?",
      answer: "Absolutely! All our designs are fully customizable to match your personal style, functional needs, and budget. We work closely with you throughout the design process."
    },
    {
      question: "What is included in the initial consultation?",
      answer: "Our free initial consultation includes site visit, requirement analysis, preliminary design discussion, budget planning, and timeline estimation. No obligations required."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-deep-blue mb-8">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-deep-blue pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-premium-red flex-shrink-0"
                >
                  +
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQs;

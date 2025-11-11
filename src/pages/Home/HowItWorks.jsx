import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMessageCircle, FiStar } from "react-icons/fi"; // Using professional icons

// Define a primary color for the component
const PRIMARY_COLOR = "indigo"; // Tailwind color name for a professional feel

const steps = [
  {
    title: "Browse",
    description: "Find skills in your local area and compare providers.",
    icon: FiSearch,
  },
  {
    title: "Connect",
    description: "Message providers and book sessions.",
    icon: FiMessageCircle,
  },
  {
    title: "Review",
    description: "Rate experiences to help others choose.",
    icon: FiStar,
  },
];

const HowItWorks = () => {
  // Animation settings for the step cards
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <section className="py-20 overflow-hidden bg-gray-50">
      {/* --- Heading --- */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16">
        <span className={`text-${PRIMARY_COLOR}-600`}>Simple</span> Steps
      </h2>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* --- Connector Line (Hidden on mobile) --- */}
        <div className={`hidden md:block absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[85%] h-1 bg-gray-200 z-0`}>
          {/* Subtle dots for a dashed effect */}
          <div className="absolute inset-0 flex justify-between items-center">
            <div className={`w-3 h-3 rounded-full bg-${PRIMARY_COLOR}-400`}></div>
            <div className={`w-3 h-3 rounded-full bg-${PRIMARY_COLOR}-400`}></div>
            <div className={`w-3 h-3 rounded-full bg-${PRIMARY_COLOR}-400`}></div>
          </div>
        </div>

        {/* --- Steps Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon; // Get the professional icon component

            return (
              <motion.div
                key={index}
                className="relative"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={index}
              >
                <div
                  className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center 
                  transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 group`}
                >
                  {/* --- Step Counter Circle --- */}
                  <div
                    className={`w-14 h-14 rounded-full mb-6 
                    flex items-center justify-center font-extrabold text-2xl 
                    bg-${PRIMARY_COLOR}-50 text-${PRIMARY_COLOR}-600 
                    border-4 border-white shadow-md`}
                  >
                    {index + 1}
                  </div>

                  {/* --- Icon --- */}
                  <div className={`text-5xl mb-4 text-${PRIMARY_COLOR}-500 transition-colors duration-300 group-hover:text-${PRIMARY_COLOR}-700`}>
                    <IconComponent />
                  </div>

                  {/* --- Title --- */}
                  <h4 className="text-xl font-bold mb-3 text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
                    {step.title}
                  </h4>

                  {/* --- Description --- */}
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
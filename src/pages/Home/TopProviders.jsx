import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TopProviders = () => {
  const [providers, setProviders] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [showAllProviders, setShowAllProviders] = useState(false);

  useEffect(() => {
    fetch("/data/providers.json")
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((err) => console.error("Error loading providers:", err));
  }, []);

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProviders = () => setShowAllProviders((prev) => !prev);

  const visibleProviders = showAllProviders
    ? providers
    : providers.slice(0, 6);

  return (
    <section className="mt-16 py-12 bg-gradient-to-r from-gray-50 via-white to-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Top Rated Providers
      </h2>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {visibleProviders.map((provider, index) => {
          const isExpanded = expandedReviews[provider.id];
          const shortReview =
            provider.review.length > 100
              ? provider.review.slice(0, 100) + "..."
              : provider.review;

          return (
            <motion.div
              key={provider.id}
              className={`p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer bg-gradient-to-br ${provider.color}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Profile Info */}
              <div className="flex items-center mb-4 space-x-4">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-gray-600">{provider.skill}</p>
                  <p className="text-yellow-500 font-semibold text-sm">
                    {provider.rating} ⭐
                  </p>
                </div>
              </div>

              {/* Email */}
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-medium">Email:</span> {provider.email}
              </p>

              {/* Review */}
              <p className="text-sm text-gray-600 mb-3">
                {isExpanded ? provider.review : shortReview}
              </p>

              {/* Show More / Less for Review */}
              {provider.review.length > 100 && (
                <button
                  onClick={() => toggleReview(provider.id)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Show More / Less Providers */}
      <div className="flex justify-center mt-10">
        <button
          onClick={toggleProviders}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          {showAllProviders ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default TopProviders;

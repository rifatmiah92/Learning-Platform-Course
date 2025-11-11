import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaUserTie, 
  FaEnvelope,
  FaMoneyBillWave, 
  FaThList, 
  FaCalendarCheck,
  FaArrowLeft,
  FaBolt, 
} from "react-icons/fa"; 
import { motion } from "framer-motion"; 

// Helper component for styled facts
const DetailItem = ({ icon: Icon, label, value, colorClass = "text-gray-700" }) => (
  <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
    <Icon className={`mt-1 text-2xl ${colorClass}`} />
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

// Main Component
const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // MOCK DATA structure for fallback/testing purposes (Should ideally match your JSON structure)
  const MOCK_SKILL = {
    skillId: 1,
    skillName: "Web Development Masterclass",
    providerName: "Imran Khan",
    providerEmail: "imran@skillswap.com",
    price: 35,
    rating: 4.9,
    slotsAvailable: 4,
    description: "Learn full-stack web development using HTML, CSS, JavaScript, React, and Node.js. Build responsive, real-world websites from scratch. This comprehensive course includes interactive projects, lifetime access to resources, and one-on-one mentorship sessions.",
    image: "https://i.postimg.cc/Bnw6Dtcp/Devolopment.jpg",
    category: "Programming"
  };


  useEffect(() => {
    setLoading(true);

    setTimeout(() => { // Simulate network delay
        setSkill(MOCK_SKILL); 
        setLoading(false);
    }, 800);
  }, [id]);

  // --- Loading/Error States ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="text-lg font-medium text-gray-600 mt-4">
            Loading course details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gray-50">
        <p className="text-xl font-semibold text-red-600">
          {error || "Course data is unavailable."}
        </p>
      </div>
    );
  }

  // --- Main Render ---

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:grid lg:grid-cols-3">
          
          {/* --- LEFT COLUMN: Image and Main Content --- */}
          <div className="lg:col-span-2 p-8">
            {/* Image Banner */}
            <div className="mb-8 relative">
              <img
                src={skill.image}
                alt={skill.skillName}
                className="w-full h-96 object-cover rounded-2xl shadow-lg border-4 border-indigo-50"
              />
              <span className="absolute top-4 left-4 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-indigo-600 text-white shadow-md">
                <FaBolt className="mr-2" /> {skill.category}
              </span>
            </div>

            {/* Title and Description */}
            <div className="mb-10 border-b border-gray-200 pb-6">
              <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                {skill.skillName}
              </h1>
              <p className="mt-4 text-xl text-gray-700 leading-relaxed italic">
                {skill.description}
              </p>
            </div>

            {/* Detailed Provider Info Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-3">
                Provider Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DetailItem
                  icon={FaUserTie}
                  label="Taught By"
                  value={skill.providerName}
                  colorClass="text-indigo-600"
                />
                <DetailItem
                  icon={FaEnvelope}
                  label="Contact"
                  value={skill.providerEmail}
                  colorClass="text-cyan-600"
                />
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-indigo-200 text-base font-medium rounded-full text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition ease-in-out duration-300"
              >
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to all Courses
              </Link>
            </div>
          </div>
          
          {/* --- RIGHT COLUMN: Summary and CTA --- */}
          <div className="lg:col-span-1 bg-indigo-700 p-8 text-white">
            
            {/* Price Card */}
            <div className="text-center mb-10 bg-indigo-800 p-6 rounded-2xl shadow-xl border-b-4 border-yellow-400">
              <p className="text-sm uppercase font-semibold opacity-80">Investment</p>
              <p className="text-6xl font-extrabold mt-1 tracking-tighter">
                ${skill.price}
              </p>
              <p className="text-sm opacity-70 mt-2">One-time fee for lifetime access</p>
            </div>

            {/* Key Stats */}
            <div className="space-y-5 mb-10">
              <h3 className="text-xl font-bold border-b border-indigo-500 pb-2">Quick Facts</h3>
              <div className="flex items-center space-x-3">
                <FaStar className="text-yellow-400 text-xl" />
                <p className="text-lg font-semibold">Rating:</p>
                <p className="ml-auto text-lg font-extrabold">{skill.rating} / 5</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaCalendarCheck className="text-green-400 text-xl" />
                <p className="text-lg font-semibold">Slots Available:</p>
                <p className="ml-auto text-lg font-extrabold">{skill.slotsAvailable}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaThList className="text-cyan-400 text-xl" />
                <p className="text-lg font-semibold">Category:</p>
                <p className="ml-auto text-lg font-extrabold">{skill.category}</p>
              </div>
            </div>
            
            {/* Enrollment CTA */}
            <Link 
              to={`/enroll/${id}`} 
              className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-extrabold py-4 px-8 rounded-xl transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-2xl uppercase tracking-wider"
            >
              Enroll Now for ${skill.price}
            </Link>
            
            {/* --- MOTIVATIONAL MESSAGE ADDED HERE --- */}
            <div className="mt-4 text-center">
                <p className="text-sm font-semibold text-yellow-300">
                    ⚠️ Limited Slots Available! Don't miss your chance to master this skill.
                </p>
                <p className="mt-2 text-xs opacity-70">
                    Enrollment closes when spots fill up. 100% Satisfaction Guarantee.
                </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillDetails;
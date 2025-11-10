import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaUser,
  FaEnvelope,
  FaDollarSign,
  FaLayerGroup,
  FaCalendarCheck,
} from "react-icons/fa"; // Importing icons

// NOTE: No longer importing EnrollForm here

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Removed: const [showEnrollForm, setShowEnrollForm] = useState(false);
  // Removed: const handleEnrollClick = () => { ... }

  useEffect(() => {
    setLoading(true);

    fetch("/data/skills.json") // Assuming 'skills.json' is your data source
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const foundSkill = data.find((item) => item.skillId === parseInt(id));
        if (foundSkill) {
          setSkill(foundSkill);
        } else {
          setError("Skill not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch skill details:", err);
        setError("Failed to load skill details. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-lg font-medium text-gray-600 mt-4">
            Loading skill details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gray-50">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">
          No skill data available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={skill.image}
              alt={skill.skillName}
              className="h-96 w-full object-cover md:w-96 rounded-t-3xl md:rounded-l-3xl md:rounded-t-none"
            />
          </div>
          <div className="p-8 flex flex-col justify-between w-full">
            <div>
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-2">
                {skill.category}
              </div>
              <h2 className="block mt-1 text-4xl leading-tight font-extrabold text-gray-900">
                {skill.skillName}
              </h2>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                {skill.description}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                <div className="flex items-center">
                  <FaUser className="text-indigo-500 mr-3 text-xl" />
                  <span className="font-semibold">Provider:</span>{" "}
                  {skill.providerName}
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-indigo-500 mr-3 text-xl" />
                  <span className="font-semibold">Email:</span>{" "}
                  {skill.providerEmail}
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="text-green-600 mr-3 text-xl" />
                  <span className="font-semibold">Price:</span> ${skill.price}
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-3 text-xl" />
                  <span className="font-semibold">Rating:</span> {skill.rating}{" "}
                  / 5
                </div>
                <div className="flex items-center">
                  <FaCalendarCheck className="text-red-500 mr-3 text-xl" />
                  <span className="font-semibold">Slots Available:</span>{" "}
                  {skill.slotsAvailable}
                </div>
                <div className="flex items-center">
                  <FaLayerGroup className="text-purple-500 mr-3 text-xl" />
                  <span className="font-semibold">Category:</span>{" "}
                  {skill.category}
                </div>
              </div>
            </div>
            {/* NEW LINK TO SEPARATE ENROLLMENT PAGE */}
            <Link 
              to={`/enroll/${id}`} 
              className="inline-block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full my-5 transition duration-150 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Enroll in {skill.skillName}
            </Link>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-300 transform hover:-translate-y-1"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
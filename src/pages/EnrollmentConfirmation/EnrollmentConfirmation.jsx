import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FaCheckCircle, FaBookReader, FaArrowRight } from "react-icons/fa";

const MOCK_SKILL_DATA = { // Fallback data structure
    "skillName": "Course Name",
    "image": "https://via.placeholder.com/600x400?text=Course+Image",
    "description": "Details not loaded, but enrollment is confirmed."
};


const EnrollmentConfirmation = () => {
    const { id } = useParams();
    const location = useLocation();
    
    // Use state passed from the Enrollment Form
    const passedState = location.state || {}; 

    const [skillDetails, setSkillDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch full skill details to display photo/description
    useEffect(() => {
        setLoading(true);
        fetch("/data/skills.json") 
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                const foundSkill = data.find((item) => item.skillId === parseInt(id)); 
                if (foundSkill) {
                    setSkillDetails(foundSkill);
                } else {
                    setSkillDetails(MOCK_SKILL_DATA); // Use fallback
                }
                setLoading(false);
            })
            .catch(() => {
                setSkillDetails(MOCK_SKILL_DATA); // Use fallback on error
                setError("Could not load full course details.");
                setLoading(false);
            });
    }, [id]);

    const courseName = passedState.courseName || (skillDetails ? skillDetails.skillName : "Your Course");
    const image = skillDetails ? skillDetails.image : MOCK_SKILL_DATA.image;
    const description = skillDetails ? skillDetails.description : MOCK_SKILL_DATA.description;
    
    if (loading) {
        return (
             <div className="flex justify-center items-center h-[80vh] bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <p className="text-xl font-semibold text-gray-700 ml-4">
                    Preparing your enrollment page...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white p-10 rounded-2xl shadow-2xl border-4 border-green-400 animate-fadeInUp">
                
                {/* 1. Thank You Header */}
                <div className="text-center mb-10">
                    <FaCheckCircle className="text-7xl text-green-500 mx-auto mb-4 animate-scaleUp" />
                    <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                        Enrollment Successful!
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Thank you for enrolling in **{courseName}**! You are now ready to start your journey.
                    </p>
                </div>
                
                <hr className="mb-8" />
                
                {/* 2. Course Details Card */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-lg">
                    <div className="md:w-1/3">
                        <img 
                            src={image} 
                            alt={courseName} 
                            className="w-full h-48 object-cover rounded-lg shadow-md border-2 border-white"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h3 className="text-3xl font-bold text-indigo-600 mb-2">{courseName}</h3>
                        <p className="text-gray-700 leading-relaxed italic line-clamp-3">
                            {description.substring(0, 150)}...
                        </p>
                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                        
                        <div className="mt-6 flex items-center justify-start">
                            {/* 3. Start Learning Button */}
                            <Link
                                to="/profile?tab=my-courses" // Redirect to the user's course list
                                className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.03]"
                            >
                                <FaBookReader className="mr-3 h-5 w-5" />
                                Start Learning Now
                                <FaArrowRight className="ml-3 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-500">
                    <p>You will receive an email confirmation shortly with all course materials.</p>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentConfirmation;
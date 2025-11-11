import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FaCheckCircle, FaBookReader, FaArrowRight, FaDownload, FaSpinner } from "react-icons/fa"; 

// --- Constants: Updated with your course data ---
const MOCK_SKILL_DATA = {
    "skillId": 1,
    "skillName": "Web Development Masterclass",
    "providerName": "Imran Khan",
    "providerEmail": "imran@skillswap.com",
    "price": 35,
    "rating": 4.9,
    "slotsAvailable": 4,
    "description": "Learn full-stack web development using HTML, CSS, JavaScript, React, and Node.js. Build responsive, real-world websites from scratch.",
    "image": "https://i.postimg.cc/Bnw6Dtcp/Devolopment.jpg", 
    "category": "Programming"
};


const EnrollmentConfirmation = () => {
    const { id } = useParams();
    const location = useLocation();
    const passedState = location.state || {};

    const [skillDetails, setSkillDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for the download process: 'INITIAL', 'DOWNLOADING', 'DOWNLOADED'
    const [downloadStatus, setDownloadStatus] = useState('INITIAL');

    // Fetch skill details simulation
    useEffect(() => {
        setLoading(true);
        // Simulate fetch delay
        setTimeout(() => {
            setSkillDetails(MOCK_SKILL_DATA); 
            setLoading(false);
        }, 800);
        
    }, [id]);
    
    // Download Handler function
    const handleDownload = () => {
        if (downloadStatus === 'INITIAL') {
            setDownloadStatus('DOWNLOADING');
            // Simulate 3-second download process and popup notification
            setTimeout(() => {
                setDownloadStatus('DOWNLOADED');
                alert(`Success! The course materials for "${courseName}" have been downloaded.`);
            }, 3000);
        }
    };

    const getDownloadButtonContent = () => {
        switch (downloadStatus) {
            case 'DOWNLOADING':
                return (
                    <>
                        <FaSpinner className="mr-3 h-5 w-5 animate-spin" />
                        Downloading...
                    </>
                );
            case 'DOWNLOADED':
                return (
                    <>
                        <FaCheckCircle className="mr-3 h-5 w-5" />
                        Course Downloaded!
                    </>
                );
            case 'INITIAL':
            default:
                return (
                    <>
                        <FaDownload className="mr-3 h-5 w-5" />
                        Download Course
                    </>
                );
        }
    };

    // Derived values for display
    const courseName = passedState.courseName || (skillDetails ? skillDetails.skillName : MOCK_SKILL_DATA.skillName);
    const image = skillDetails ? skillDetails.image : MOCK_SKILL_DATA.image;
    const description = skillDetails ? skillDetails.description : MOCK_SKILL_DATA.description;

    const isDownloading = downloadStatus === 'DOWNLOADING';
    const isDownloaded = downloadStatus === 'DOWNLOADED';
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh] bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <p className="text-xl font-semibold text-gray-700 ml-4">
                    Preparing your course materials...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white p-10 rounded-2xl shadow-2xl border-4 border-indigo-400">
                
                {/* 1. Primary Thank You Message (Inline) */}
                <div className="text-center mb-10">
                    <FaCheckCircle className="text-7xl text-indigo-600 mx-auto mb-4 animate-scaleUp" />
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
                        
                        {/* 3. Action Buttons (Integrated Inline) */}
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            
                            {/* Start Learning Button - UPDATED SIZE (px-4 py-2, text-base) */}
                            <Link
                                to="/profile?tab=my-courses" 
                                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.03]"
                            >
                                <FaBookReader className="mr-3 h-5 w-5" />
                                Start Learning Now
                                <FaArrowRight className="ml-3 h-4 w-4" />
                            </Link>
                            
                            {/* Download Button - UPDATED SIZE (px-4 py-2, text-base) */}
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading || isDownloaded}
                                className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border text-base font-medium rounded-full shadow-md transition duration-500 ease-in-out 
                                ${isDownloading
                                    ? 'bg-yellow-500 text-white cursor-not-allowed'
                                    : isDownloaded
                                        ? 'bg-green-500 text-white cursor-default'
                                        : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50 hover:border-indigo-700'
                                    }`}
                            >
                                {getDownloadButtonContent()}
                            </button>
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
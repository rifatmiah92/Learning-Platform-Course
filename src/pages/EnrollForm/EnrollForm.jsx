import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { FaMoneyBillWave, FaCreditCard, FaLock, FaUser, FaEnvelope, FaBookOpen } from 'react-icons/fa';

// Mock JSON data for demonstration purposes in case the fetch fails or for price display
const MOCK_SKILL_DATA = {
    "skillId": 1,
    "skillName": "Web Development Masterclass",
    "price": 35.00,
    "image": "https://via.placeholder.com/600x400?text=Web+Dev+Course" // Added image for state passing
};

const EnrollForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); // Initialize useNavigate hook
    
    const [skill, setSkill] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    const initialFormData = {
        name: "",
        email: "",
        passion: "",
        course: "",
        paymentMethod: "credit",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    // --- Fetch Skill Data based on ID ---
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
                    setSkill(foundSkill);
                    setFormData(prevData => ({ ...prevData, course: foundSkill.skillName }));
                } else {
                    // Fallback to mock data if skill isn't found
                    setSkill(MOCK_SKILL_DATA);
                    setFormData(prevData => ({ ...prevData, course: MOCK_SKILL_DATA.skillName }));
                    setError("Skill data loaded from fallback source.");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch skill details:", err);
                // Fallback to mock data on fetch failure
                setSkill(MOCK_SKILL_DATA);
                setFormData(prevData => ({ ...prevData, course: MOCK_SKILL_DATA.skillName }));
                setError("Failed to load course details. Using default values.");
                setLoading(false);
            });
    }, [id]);

    const courseNames = [
        "Beginner Guitar Lessons", "Spoken English Practice", "Introduction to Python", 
        "Home Cooking: Italian Basics", "Digital Photography 101", "Yoga for Stress Relief", 
        "Excel for Business Analytics", "Pottery & Ceramics Basics", "React Framework Fundamentals", 
        "Conversational Spanish (A1)", "Introduction to Piano", "Sourdough Bread Making", 
        "Watercolor Painting Basics", "Mindfulness and Meditation", "Social Media Marketing Strategy", 
        "NOVIC Frontend Development Bootcamp",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const currentSkill = skill || MOCK_SKILL_DATA; // Ensure skill object is available

        // Simulate API call delay
        setTimeout(() => {
            setIsSubmitting(false);

            // Redirect to Confirmation Page upon successful "enrollment"
            navigate(`/enroll-success/${id}`, {
                state: { 
                    courseName: currentSkill.skillName, 
                    price: currentSkill.price, 
                    image: currentSkill.image // Pass essential data
                }
            });
            
            console.log("Enrollment Successful and Redirected:", formData);
            
        }, 2000); // 2 second submission animation
    };
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-gray-50">
                <div className="animate-pulse flex items-center space-x-3">
                    <FaBookOpen className="text-indigo-500 text-3xl"/>
                    <p className="text-xl font-semibold text-gray-700">
                        Loading course details...
                    </p>
                </div>
            </div>
        );
    }
    
    const currentCourseName = skill ? skill.skillName : formData.course;
    const coursePrice = skill ? skill.price : MOCK_SKILL_DATA.price;


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-2xl space-y-8 border border-gray-200 transform transition-all duration-500 hover:shadow-indigo-300/50">
                
                {/* Header Section with Price */}
                <div className="text-center transition-opacity duration-500 animate-fadeIn">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                        Secure Your Enrollment
                    </h2>
                    <p className="mt-2 text-lg text-indigo-600 font-bold flex justify-center items-center">
                        <FaBookOpen className="mr-2"/> Course: {currentCourseName}
                    </p>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg inline-block shadow-md border-2 border-green-200">
                        <span className="text-3xl font-extrabold text-green-700">
                            Total Price: ${coursePrice.toFixed(2)}
                        </span>
                    </div>
                </div>

                <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                    
                    {/* --- 1. Student Details Section --- */}
                    <div className="space-y-6 p-6 border border-indigo-200 rounded-lg bg-indigo-50 shadow-inner transition-all duration-300 hover:border-indigo-400">
                        <h3 className="text-xl font-bold text-indigo-700 flex items-center">
                            <FaUser className="mr-2"/> Personal Information
                        </h3>

                        {/* Name Field */}
                        <div className="animate-slideIn">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name" name="name" type="text" autoComplete="name" required
                                value={formData.name} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300"
                                placeholder="Your Full Name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="animate-slideIn delay-100">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email" name="email" type="email" autoComplete="email" required
                                value={formData.email} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Passion Field (Textarea) */}
                        <div className="animate-slideIn delay-200">
                            <label htmlFor="passion" className="block text-sm font-medium text-gray-700">Why are you interested in this skill?</label>
                            <textarea
                                id="passion" name="passion" rows="3"
                                value={formData.passion} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300"
                                placeholder="e.g., career change, personal hobby..."
                            ></textarea>
                        </div>
                        
                        {/* Course Selection Dropdown (Read-only/Pre-selected) */}
                        <div className="animate-slideIn delay-300">
                            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course Selection</label>
                            <select
                                id="course" name="course" required disabled 
                                value={formData.course} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed transition duration-300"
                            >
                                {skill && (<option value={skill.skillName}>{skill.skillName} (Pre-selected)</option>)}
                                {courseNames
                                    .filter(course => course !== currentCourseName)
                                    .map((course, index) => (<option key={index} value={course}>{course}</option>))}
                            </select>
                        </div>
                    </div>
                    
                    {/* --- 2. Payment Method Selection --- */}
                    <div className="space-y-4 p-6 border border-gray-300 rounded-lg bg-white shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-gray-700 flex items-center">
                            <FaCreditCard className="mr-2"/> Payment Method
                        </h3>
                        
                        <div className="flex space-x-4">
                            {/* Option: Credit/Debit Card */}
                            <label className={`flex items-center p-3 rounded-lg border-2 w-1/2 cursor-pointer transition-colors duration-300 ${formData.paymentMethod === 'credit' ? 'border-indigo-500 bg-indigo-50 shadow-lg' : 'border-gray-300 hover:bg-gray-50'}`}>
                                <input
                                    type="radio" name="paymentMethod" value="credit"
                                    checked={formData.paymentMethod === 'credit'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="ml-3 text-sm font-medium text-gray-900 flex items-center">
                                    <FaCreditCard className="mr-2"/> Debit or Credit Card
                                </span>
                            </label>

                            {/* Option: PayPal */}
                            <label className={`flex items-center p-3 rounded-lg border-2 w-1/2 cursor-pointer transition-colors duration-300 ${formData.paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-50 shadow-lg' : 'border-gray-300 hover:bg-gray-50'}`}>
                                <input
                                    type="radio" name="paymentMethod" value="paypal"
                                    checked={formData.paymentMethod === 'paypal'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="ml-3 text-sm font-medium text-gray-900 flex items-center">
                                    <FaMoneyBillWave className="mr-2"/> PayPal
                                </span>
                            </label>
                        </div>
                    </div>
                    
                    {/* --- 3. Conditional Payment Details --- */}
                    {formData.paymentMethod === 'credit' && (
                        <div className="space-y-6 p-6 border border-red-300 rounded-lg bg-red-50 shadow-inner animate-slideInFromTop">
                            <h3 className="text-xl font-bold text-red-700 flex items-center">
                                <FaLock className="mr-2"/> Card Details
                            </h3>

                            {/* Card Number */}
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input
                                    id="cardNumber" name="cardNumber" type="text" required
                                    value={formData.cardNumber} onChange={handleChange}
                                    placeholder="XXXX XXXX XXXX XXXX" pattern="[0-9]{16}" maxLength="16"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition duration-300"
                                />
                            </div>

                            {/* Card Holder Name */}
                            <div>
                                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                                <input
                                    id="cardName" name="cardName" type="text" required
                                    value={formData.cardName} onChange={handleChange}
                                    placeholder="Name on Card"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition duration-300"
                                />
                            </div>

                            <div className="flex space-x-4">
                                {/* Expiry Date */}
                                <div className="w-1/2">
                                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
                                    <input
                                        id="expiryDate" name="expiryDate" type="text" required
                                        value={formData.expiryDate} onChange={handleChange}
                                        placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/?([0-9]{2})" maxLength="5"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition duration-300"
                                    />
                                </div>
                                {/* CVV */}
                                <div className="w-1/2">
                                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                    <input
                                        id="cvv" name="cvv" type="text" required
                                        value={formData.cvv} onChange={handleChange}
                                        placeholder="123" pattern="[0-9]{3,4}" maxLength="4"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.paymentMethod === 'paypal' && (
                        <div className="p-6 text-center border-2 border-yellow-500 rounded-lg bg-yellow-50 shadow-lg animate-slideInFromTop">
                            <p className="text-lg font-medium text-yellow-800">
                                You will be redirected to PayPal to complete your secure payment of **${coursePrice.toFixed(2)}**.
                            </p>
                            <p className="mt-2 text-sm text-yellow-600">
                                (This is a mock payment step for demonstration.)
                            </p>
                        </div>
                    )}
                    
                    {/* --- 4. Submit Button --- */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white transition duration-300 ease-in-out transform ${
                                isSubmitting 
                                    ? 'bg-gray-500 cursor-not-allowed animate-pulse' 
                                    : 'bg-green-600 hover:bg-green-700 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Payment...
                                </>
                            ) : (
                                `Pay $${coursePrice.toFixed(2)} & Enroll Now`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnrollForm;
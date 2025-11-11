import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider"; // Adjust path as needed
import {
  FaEnvelope,
  FaSignOutAlt,
  FaBookOpen,
  FaGraduationCap, // New icon for courses
  FaUserCircle, // New icon for profile details
  FaCheckCircle, // For completed status
  FaHourglassHalf, // For in-progress status
  FaRegLightbulb, // For general tips/info
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos"; // For scroll animations
import "aos/dist/aos.css"; // AOS styles

const MyProfile = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user) {
      // Simulate fetching enrolled courses - Replace with actual API call
      const fetchEnrolledCourses = async () => {
        // In a real application, you'd fetch this from your backend based on user.uid
        // Example:
        // const res = await fetch(`YOUR_API_ENDPOINT/users/${user.uid}/enrolled-courses`);
        // const data = await res.json();
        // setEnrolledCourses(data);

        // Static data for demonstration
        const dummyCourses = [
          {
            id: "skill1",
            name: "Web Development Masterclass",
            instructor: "Imran Khan",
            status: "In Progress",
            category: "Programming",
            progress: 75,
          },
          {
            id: "skill5",
            name: "NOVIC Frontend Development Bootcamp",
            instructor: "Afsana Karim",
            status: "Completed",
            category: "Programming",
            progress: 100,
          },
          {
            id: "skill3",
            name: "Graphic Design for Beginners",
            instructor: "Nadia Sultana",
            status: "In Progress",
            category: "Design",
            progress: 40,
          },
          {
            id: "skill9",
            name: "AI & Robotics Basics",
            instructor: "Ruhul Amin",
            status: "Not Started",
            category: "AI & Robotics",
            progress: 0,
          },
        ];
        setEnrolledCourses(dummyCourses);
      };
      fetchEnrolledCourses();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header Section with Profile Card */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 p-10 text-white flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>{" "}
          {/* Subtle background pattern */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl transform hover:scale-105 transition-transform duration-300 relative z-10"
          >
            <img
              src={
                user?.photoURL || "https://i.ibb.co/L1X4wJb/default-profile.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-5xl font-extrabold mb-2 leading-tight"
          >
            Welcome, {user?.displayName?.split(" ")[0] || "Learner"}!
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-indigo-200 text-lg flex items-center gap-2 mt-2"
          >
            <FaEnvelope /> {user?.email}
          </motion.p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
          {/* User Details Card */}
          <motion.div
            className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4 border-indigo-100">
              <FaUserCircle className="text-indigo-600" /> My Details
            </h3>
            <div className="space-y-5 text-lg text-gray-700">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-indigo-700">Name:</span>
                <span className="flex-1 text-gray-800">
                  {user?.displayName || "Not set"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-indigo-700">Email:</span>
                <span className="flex-1 text-gray-800">
                  {user?.email || "Not set"}
                </span>
              </div>
              <div className="flex items-center gap-3 break-all">
                <span className="font-semibold text-indigo-700">User ID:</span>
                <span className="flex-1 text-gray-800">
                  {user?.uid || "Not set"}
                </span>
              </div>
              <div className="pt-4 mt-6 border-t border-indigo-100">
                <p className="text-sm italic text-gray-500 flex items-center gap-2">
                  <FaRegLightbulb className="text-yellow-500" /> Your unique
                  identifier in SkillSwap.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enrolled Courses Section */}
          <motion.div
            className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4 border-purple-100">
              <FaGraduationCap className="text-purple-600" /> My Enrolled
              Courses
            </h3>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-blue-100 flex flex-col justify-between h-full"
                  >
                    <div>
                      <h4 className="text-xl font-bold text-indigo-800 mb-2">
                        {course.name}
                      </h4>
                      <p className="text-md text-gray-600 mb-1">
                        Instructor:{" "}
                        <span className="font-medium">{course.instructor}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        Category:{" "}
                        <span className="font-medium text-purple-700">
                          {course.category}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-blue-100">
                      <span
                        className={`badge text-sm font-semibold px-3 py-1 ${
                          course.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : course.status === "In Progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.status === "Completed" && (
                          <FaCheckCircle className="mr-1" />
                        )}
                        {course.status === "In Progress" && (
                          <FaHourglassHalf className="mr-1" />
                        )}
                        {course.status}
                      </span>
                      {course.status === "In Progress" && (
                        <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-indigo-500 h-2.5 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      )}
                      {course.status === "Completed" && (
                        <span className="text-emerald-600 font-bold">100%</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
                <FaBookOpen className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 font-medium">
                  You are not currently enrolled in any courses.
                </p>
                <p className="text-md text-gray-500 mt-2">
                  Explore our courses and start learning today!
                </p>
                <button
                  onClick={() => navigate("/skills")} // Assuming you have a route for all skills
                  className="mt-6 btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg"
                >
                  Browse Skills
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer/Motivation Section */}
        <div className="bg-gradient-to-l from-indigo-600 to-purple-700 p-8 text-center text-white relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-2xl font-semibold italic max-w-2xl mx-auto z-10 relative"
          >
            "The beautiful thing about learning is that no one can take it away
            from you."
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-lg mt-4 text-indigo-200 z-10 relative"
          >
            — B.B. King
          </motion.p>
        </div>
      </motion.div>

      {/* Custom styles for the background pattern */}
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 6h28v28H2V6zm4 4h20v20H6V10zm30-4h28v28H36V6zm4 4h20v20H40V10zM2 36h28v28H2V36zm4 4h20v20H6V40zM36 36h28v28H36V36zm4 4h20v20H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default MyProfile;

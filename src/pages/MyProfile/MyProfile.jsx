import React from "react";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

const MyProfile = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- 1. Sidebar --- */}
      <aside className="w-64 bg-white shadow-xl p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700 mb-8 flex items-center">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </h1>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center p-3 text-lg font-medium text-gray-700 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition duration-150 bg-indigo-50 text-indigo-700"
            >
              <FaUserCircle className="mr-3" /> Profile
            </a>
          </nav>
        </div>

        <div className="mt-8">
          <a
            href="#"
            className="flex items-center p-3 text-lg font-medium text-red-600 rounded-lg hover:bg-red-50 transition duration-150"
          >
            <FaSignOutAlt className="mr-3" /> Log Out
          </a>
        </div>
      </aside>

      {/* --- 2. Main Content Area --- */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900">
            <FaUserCircle className="inline mr-2 text-indigo-600" /> User
            Profile
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your personal information and account details.
          </p>
        </header>

        <section className="space-y-8">
          {/* --- Profile Card --- */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="text-xl font-medium text-gray-900">John Doe</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email Address</p>
                <p className="text-xl font-medium text-gray-900">
                  john.doe@skillswap.com
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="text-xl font-medium text-gray-900">
                  Frontend Developer
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="text-xl font-medium text-gray-900">
                  January 2024
                </p>
              </div>
            </div>
            <button className="mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200">
              Edit Profile
            </button>
          </div>

          {/* --- Activity Section --- */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Recent Activity
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="text-gray-700">
                  Completed a React tutorial
                </span>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="text-gray-700">Updated profile picture</span>
                <span className="text-sm text-gray-400">Yesterday</span>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="text-gray-700">
                  Posted a new skill (Tailwind CSS)
                </span>
                <span className="text-sm text-gray-400">3 days ago</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyProfile;

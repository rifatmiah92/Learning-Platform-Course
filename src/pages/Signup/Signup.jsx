import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
  const auth = getAuth();
  // State to hold input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // UI state for loading and messaging
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear messages on user interaction
    setError("");
    setSuccessMessage("");
  };

  // Client-side validation
  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill in all fields.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // START LOADING STATE BEFORE THE ASYNCHRONOUS CALL
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // --- 1. FIREBASE SUCCESS ---
        const user = userCredential.user;
        console.log("User signed up successfully:", user);

        // UI UPDATE ON SUCCESS
        setSuccessMessage(`Welcome aboard, ${formData.name}! Account created.`);
        setFormData({ name: "", email: "", password: "" });
        setIsSubmitting(false);

        // You can remove the setTimeout simulation now.
      })
      .catch((error) => {
        // --- 2. FIREBASE FAILURE ---
        setIsSubmitting(false); // Stop loading state
        console.error("Firebase Auth Error:", error);
        // Display a user-friendly error
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("This email is already in use. Please sign in.");
            break;
          case "auth/weak-password":
            setError("The password must be 6 characters or longer.");
            break;
          case "auth/operation-not-allowed":
            setError(
              "Email/Password sign-in is disabled in Firebase settings."
            );
            break;
          default:
            setError(`Sign up failed: ${error.message}`);
            break;
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Get started in seconds.
        </p>

        {/* Message Display (Error or Success) */}
        {error && (
          <div
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        {successMessage && (
          <div
            className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
            role="status"
          >
            {successMessage}
          </div>
        )}

        {/* --- Sign-up Form --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="John Doe"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                // Loading spinner for visual feedback
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        {/* Link to Login Page */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

// --- Inline SVG Icons ---
// Replaced react-icons with inline SVGs for a self-contained component.

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const EnvelopeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

// Added EyeIcon and EyeOffIcon for password visibility
const EyeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const EyeOffIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.996 0 1.953-.138 2.863-.401M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
  </svg>
);

const GoogleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6c-2.15 1.45-4.9 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const FacebookIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" fill="#1877F2"/>
  </svg>
);


// NEW: Small, beautiful, pulsing dot loading animation
const LoadingSpinner = (props) => (
    <div {...props} className="flex items-center space-x-1.5 h-full">
      {/* Custom CSS for animation delays */}
      <style>
        {`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        .dot-pulse {
          animation: pulse 1.2s infinite ease-in-out;
        }
        `}
      </style>
      <div className="w-2 h-2 rounded-full bg-white dot-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 rounded-full bg-white dot-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 rounded-full bg-white dot-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
  

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password visibility

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // NEW: Toggle function for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Email signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      toast.success(`Welcome, ${formData.name}! 🎉`);
      setFormData({ name: "", email: "", password: "" });

      // Delay for smooth UX before redirect
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use")
        toast.error("This email is already registered.");
      else toast.error("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google ✅");
      navigate("/");
    } catch (error) {
      toast.error("Google signup failed. Try again!");
    }
  };

  // Facebook signup
  const handleFacebookSignup = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Facebook ✅");
      navigate("/");
    } catch (error) {
      toast.error("Facebook signup failed. Try again!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex items-center justify-center p-4 
                 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                 animate-gradient-xy"
    >
      {/* Animated Background Style */}
      <style>
        {`
          @keyframes gradient-xy {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-xy {
            background-size: 200% 200%;
            animation: gradient-xy 10s ease infinite;
          }
        `}
      </style>

      {/* Use the beautiful toaster you already had! */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-3xl border border-white/20
                   text-white"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-200 mb-6">
          Join our community in seconds
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative group">
            <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-300 transition-colors duration-300 group-focus-within:text-pink-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="block w-full pl-10 pr-3 py-3 
                         bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-300
                         focus:ring-pink-500 focus:border-pink-500 focus:bg-white/20
                         transition-all duration-300 focus:shadow-lg outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-300 transition-colors duration-300 group-focus-within:text-pink-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="block w-full pl-10 pr-3 py-3 
                         bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-300
                         focus:ring-pink-500 focus:border-pink-500 focus:bg-white/20
                         transition-all duration-300 focus:shadow-lg outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <LockIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-300 transition-colors duration-300 group-focus-within:text-pink-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (min. 6 characters)"
              className="block w-full pl-10 pr-10 py-3 
                         bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-300
                         focus:ring-pink-500 focus:border-pink-500 focus:bg-white/20
                         transition-all duration-300 focus:shadow-lg outline-none"
            />
            {/* Added show/hide password button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white transition-colors z-10"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Submit Button with NEW Spinner */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-xl text-lg font-bold text-white 
                       bg-gradient-to-r from-purple-600 to-pink-600 
                       hover:from-purple-700 hover:to-pink-700
                       hover:-translate-y-0.5 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-white/20
                       transition-all duration-300 ease-in-out active:scale-[0.98] 
                       disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <LoadingSpinner className="h-5" />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center justify-center">
          <div className="w-1/3 border-t border-white/20"></div>
          <span className="px-3 text-gray-200 text-sm">OR</span>
          <div className="w-1/3 border-t border-white/20"></div>
        </div>

        {/* Social Logins - Styled for Glassmorphism */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-3 py-3 w-full 
                       bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 
                       text-white font-medium transition-all duration-200"
          >
            <GoogleIcon className="h-5 w-5" /> Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFacebookSignup}
            className="flex items-center justify-center gap-3 py-3 w-full 
                       bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 
                       text-white font-medium transition-all duration-200"
          >
            <FacebookIcon className="h-6 w-6" /> Continue with Facebook
          </motion.button>
        </div>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-200">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-pink-300 hover:text-white hover:underline transition-colors duration-200"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
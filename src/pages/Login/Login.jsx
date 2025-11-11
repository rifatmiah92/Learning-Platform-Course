import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Essential for redirection

/* --- SVG Icons (kept from your original) --- */
const EmailIcon = (props) => (
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

/* --- Small Dot Loader (tiny & elegant) --- */
const SmallDotLoader = ({ size = 4, className = "" }) => {
  // "size" is tailwind spacing units (e.g., 3,4,5 -> h-3 w-3 etc.)
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-hidden>
      <span className={`inline-block h-${size} w-${size} rounded-full animate-bounce-short bg-white/90`} />
      <span className={`inline-block h-${size} w-${size} rounded-full animate-bounce-short animation-delay-100 bg-white/80`} />
      <span className={`inline-block h-${size} w-${size} rounded-full animate-bounce-short animation-delay-200 bg-white/70`} />
    </div>
  );
};

/* --- Toast component (self-contained, animated) --- */
const Toast = ({ show, onClose, title = "Success", message = "Logged in successfully!" }) => {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose(), 3500); // auto-dismiss after 3.5s
    return () => clearTimeout(t);
  }, [show, onClose]);

  return (
    <div
      aria-live="polite"
      className={`fixed inset-x-0 bottom-6 flex items-end justify-center pointer-events-none z-50`}
    >
      <div
        className={`pointer-events-auto w-full max-w-sm mx-4 transform transition-all duration-300 ${
          show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="rounded-xl bg-white/95 backdrop-blur-md border border-white/40 px-4 py-3 shadow-lg flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {/* small check icon */}
            <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{title}</div>
            <div className="text-sm text-gray-700">{message}</div>
          </div>
          <button
            onClick={onClose}
            className="ml-3 p-1 rounded-md hover:bg-gray-100 text-gray-600"
            aria-label="Dismiss toast"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- Main Login Component --- */
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  // We'll use toastState to trigger the toast
  const [toast, setToast] = useState({ show: false, title: "", message: "" });

  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter both email and password.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => setShowPassword((p) => !p);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Show toast success
      setToast({
        show: true,
        title: "Login Successful",
        message: `Welcome back! Redirecting...`,
      });

      // Redirect shortly after (keeps toast visible)
      setTimeout(() => {
        navigate("/");
      }, 1200);
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4
                    bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                    animate-gradient-xy">
      <style>
        {`
        @keyframes gradient-xy {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 10s ease infinite;
        }

        /* short bounce for the tiny loader */
        @keyframes bounce-short {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        .animate-bounce-short { animation: bounce-short 0.8s infinite ease-in-out; }
        .animation-delay-100 { animation-delay: 0.08s; }
        .animation-delay-200 { animation-delay: 0.16s; }

        /* Small helper to allow h-N w-N via template in JS is limited; using these common sizes */
        .h-3 { height: 0.75rem; }
        .w-3 { width: 0.75rem; }
        .h-4 { height: 1rem; }
        .w-4 { width: 1rem; }
        .h-5 { height: 1.25rem; }
        .w-5 { width: 1.25rem; }
        `}
      </style>

      <div
        className={`w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20
                    text-white transition-all duration-1000 ease-out
                    ${isMounted ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-2 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-center text-gray-200 mb-6">
          Sign in to access your dashboard.
        </p>

        {error && (
          <div className="p-3 mb-4 text-sm text-white bg-red-500/50 rounded-lg border-l-4 border-red-400" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-pink-400">
                <EmailIcon className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3
                           bg-white/10 border border-white/20 rounded-lg
                           text-white placeholder-gray-300
                           focus:ring-pink-500 focus:border-pink-500 focus:bg-white/20
                           transition-all duration-300 focus:shadow-md"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-pink-400">
                <LockIcon className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-10 py-3
                           bg-white/10 border border-white/20 rounded-lg
                           text-white placeholder-gray-300
                           focus:ring-pink-500 focus:border-pink-500 focus:bg-white/20
                           transition-all duration-300 focus:shadow-md"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 rounded bg-white/20"
                disabled={isSubmitting}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-100">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-pink-300 hover:text-white transition-colors duration-200">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg shadow-lg text-lg font-bold text-white
                         bg-gradient-to-r from-purple-600 to-pink-600
                         hover:from-purple-700 hover:to-pink-700
                         hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
                         transition-all duration-300 ease-in-out active:scale-[0.98]
                         disabled:opacity-60 disabled:hover:translate-y-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  {/* Small elegant loader instead of big spinner */}
                  <SmallDotLoader size={3} />
                  <span className="text-sm tracking-wide">Signing in</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-200">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-pink-300 hover:text-white hover:underline transition-colors duration-200">
              Sign up here
            </a>
          </p>
        </div>
      </div>

      {/* Toast - placed outside the card so it overlays nicely */}
      <Toast
        show={toast.show}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </div>
  );
};

export default Login;

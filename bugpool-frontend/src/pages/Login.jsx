import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { email, password } = formData;
    if (!email.includes("@") || !email.includes(".")) return "Please enter a valid email.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError, { position: "top-center", autoClose: 3000, theme: "dark" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      const { token, isProfileComplete } = res.data;

      if (!token) {
        throw new Error("No token received from the backend");
      }

      toast.success("Login successful! 🚀", { position: "top-center", autoClose: 3000, theme: "dark" });

      localStorage.setItem("token", token);
      


      if (!isProfileComplete) {
        // Show profile setup modal if profile is incomplete
        setShowProfileSetup(true);
      } else {
        setTimeout(() => navigate("/feed"), 3000);
      }
    } catch (err) {
      console.error("Login Error:", err);
      localStorage.removeItem("token"); // Ensure token is cleared if login fails
      const errorMsg = err.response?.data?.message || err.response?.data?.msg || "😭 Oops! Login failed.";
      toast.error(errorMsg, { position: "top-center", autoClose: 3000, theme: "dark" });
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-sm p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center text-green-500">Login</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-3 text-gray-400 bg-gray-800 border border-gray-400 rounded focus:outline-none focus:border-highlight"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-3 text-gray-400 bg-gray-800 border border-gray-400 rounded focus:outline-none focus:border-highlight"
            value={formData.password}
            onChange={handleChange}
          />
          
          <p className="text-center text-green-500">
            <Link to="/forgot-password" className="text-blue-400">Forgot Password?</Link>
          </p>

          <button type="submit" className="mt-12 w-full p-2 bg-green-500 border border-green-500 font-bold rounded hover:opacity-90" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full p-2 bg-blue-500 rounded mb-2">Login with Facebook</button>
          <button className="w-full p-2 bg-red-500 rounded">Login with Google</button>
        </div>

        <p className="mt-4 text-center text-green-500">
          No account? <Link to="/register" className="text-blue-400">Register here</Link>
        </p>
      </div>

      {/* Profile Setup Modal */}
      {showProfileSetup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-500">Complete Your Profile</h2>
            <p className="text-gray-400 mt-2">You need to complete your profile before using the app.</p>
            <button 
              className="mt-4 px-6 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white"
              onClick={() => navigate("/profile-setup")}
            >
              Go to Profile Setup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

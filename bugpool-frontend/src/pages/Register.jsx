import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); 
  };

  const validateInputs = () => {
    const { username, email, password } = formData;

    if (!username) return "Username cannot be empty.";
    if (!email.includes("@") || !email.includes(".")) return "Please enter a valid email.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, formData);
      console.log(res.data);

      toast.success(`Welcome aboard, ${formData.username}! 🚀 You're now part of the crew!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      setFormData({ username: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/login"); 
      },2000);
      

    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Registration failed. Try again.");

      toast.error("😭 Oops! Registration failed. Try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className="w-full max-w-sm p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center text-green-500">Register</h2>

      {errorMessage && (
        <div className="mt-4 mb-4 p-2 text-red-500  border border-red-600 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 bg-gray-800 border text-gray-400 border-gray-400 rounded focus:outline-none focus:border-highlight"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-gray-800 border text-gray-400 border-gray-400 rounded focus:outline-none focus:border-highlight"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-3 bg-gray-800 border text-gray-400 border-gray-400 rounded focus:outline-none focus:border-highlight"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-12 w-full p-2 bg-highlight text-green-500 border border-green-500 font-bold rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-4">
        <button className="w-full p-2 bg-blue-500 rounded mb-2">Register with Facebook</button>
        <button className="w-full p-2 bg-red-500 rounded">Register with Google</button>
      </div>

      <p className="mt-4 text-center text-green-500">
        Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
      </p>
    </div>
    </>
    
  );
};

export default Register;

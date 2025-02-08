import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate(); // Initialize useNavigate hook

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
      toast.error(validationError, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      console.log(res.data);

      toast.success("Login successful! 🚀", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });


      setTimeout(() => {
        navigate("/home"); 
      }, 3000);

    } catch (err) {
      console.error(err);

      // Show error toast with response message
      toast.error(err.response?.data?.msg || "😭 Oops! Login failed. Please check your credentials.", {
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
    
    <div className="w-full max-w-sm p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-highlight text-center text-green-500">Login</h2>

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
        <button
          type="submit"
          className="w-full p-2 bg-highlight text-green-500 border border-green-500 font-bold rounded hover:opacity-90"
          disabled={loading}
        >
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
  );
};

export default Login;

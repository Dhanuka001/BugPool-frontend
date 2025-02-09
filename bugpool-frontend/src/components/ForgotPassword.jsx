import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
      toast.success("Password reset link has been sent to your email!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error sending reset link. Please try again.", {
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
     <button onClick={() => navigate(-1)}
     className="absolute top-12 left-6 text-lg text-green-500 flex gap-2 items-center"><FaArrowLeft/>Go Back</button>
     <div className="w-full max-w-sm p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
      <ToastContainer />
     
      <h2 className="text-2xl font-bold text-center text-green-500">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-3 text-gray-400 bg-gray-800 border border-gray-400 rounded focus:outline-none focus:border-highlight"
          value={email}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full p-2 bg-highlight text-green-500 border border-green-500 font-bold rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Sending..." : "Get Reset Link"}
        </button>
      </form>
    </div>
    </>
    
  );
};

export default ForgotPassword;

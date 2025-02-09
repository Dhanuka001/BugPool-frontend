import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log("Sending newPassword:", newPassword);
    console.log("Token:", token);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
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

    console.log("TOKEN", token);
    console.log("PASSWORD", newPassword);

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        newPassword,
      });

      toast.success("Password reset successfully!,you're redirecting to login page!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Request Failed:", err);
      toast.error(err.response?.data?.msg || "Error resetting password.", {
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
      
      <h2 className="text-2xl font-bold text-center text-green-500">Reset Password</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          className="w-full p-2 mb-3 text-gray-400 bg-gray-800 border border-gray-400 rounded focus:outline-none focus:border-highlight"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          className="w-full p-2 mb-3 text-gray-400 bg-gray-800 border border-gray-400 rounded focus:outline-none focus:border-highlight"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-highlight text-green-500 border border-green-500 font-bold rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
    </>
  
  );
};

export default ResetPassword;

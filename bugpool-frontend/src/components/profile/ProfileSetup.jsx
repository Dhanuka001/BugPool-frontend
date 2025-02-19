import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    skills: [],
    githubLink: "",
    portfolio: "",
    profileImage: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("/avatar-placeholder.png");
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const steps = [
    { label: "Bio", field: "bio", placeholder: "Tell us about yourself" },
    { label: "Skills", field: "skills", placeholder: "Enter skills (comma-separated)" },
    { label: "GitHub", field: "githubLink", placeholder: "GitHub profile URL" },
    { label: "Portfolio", field: "portfolio", placeholder: "Portfolio website URL" },
    { label: "Profile Image", field: "profileImage", placeholder: "Image URL (unused now)" }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const { data } = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!data?.user) return;

        setUser(data.user);
        setFormData({
          bio: data.user.bio || "",
          skills: Array.isArray(data.user.skills) ? data.user.skills : [],
          githubLink: data.user.githubLink || "",
          portfolio: data.user.portfolio || "",
          profileImage: data.user.profileImage || ""
        });
        if (data.user.profileImage) {
          setPreviewImage(`${API_BASE_URL}/uploads/${data.user.profileImage}`);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [API_BASE_URL, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = async () => {
    setLoading(true);
    const oldPreview = previewImage;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      formDataToSend.append("githubLink", formData.githubLink);
      formDataToSend.append("portfolio", formData.portfolio);
      formDataToSend.append("profileImage", "");

      const { data } = await axios.put(`${API_BASE_URL}/user/profile`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (data?.user) {
        setUser(data.user);
        setImageFile(null);
        setPreviewImage("/avatar-placeholder.png");
      }
    } catch (error) {
      setPreviewImage(oldPreview);
    }
    setLoading(false);
  };

  const saveStep = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      formDataToSend.append("githubLink", formData.githubLink);
      formDataToSend.append("portfolio", formData.portfolio);

      if (imageFile) {
        formDataToSend.append("profileImage", imageFile);
      }

      const { data } = await axios.put(`${API_BASE_URL}/user/profile`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (data?.user) {
        setUser(data.user);
        if (data.user.isProfileComplete) {
          setSuccessMessage("✅ Profile setup completed! You're all set. 🎉");
          setTimeout(() => navigate("/home"), 2000);
        }
      }
    } catch (error) {}
    setLoading(false);
  };

  if (!user) {
    return <div className="text-center text-gray-400">Loading profile...</div>;
  }

  const currentStep = steps[step - 1];

  return (
    <div className="max-w-lg mx-auto p-12 border border-gray-500 text-gray-400 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center text-green-500 mb-4">Complete Your Profile</h2>

      {successMessage && (
        <div className="p-3 bg-green-500 text-white rounded-md mb-4">{successMessage}</div>
      )}

      {step < 5 && (
        <div>
          <label className="block font-semibold">{currentStep.label}</label>
          <input
            type="text"
            name={currentStep.field}
            value={formData[currentStep.field] || ""}
            onChange={handleChange}
            placeholder={currentStep.placeholder}
            className="w-full p-2 text-gray-400 border rounded mt-2"
          />
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col items-center mt-4">
          <div
            className="relative w-24 h-24 rounded-full border border-gray-400 overflow-hidden mb-3 cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handlePlaceholderClick}
          >
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {hover && previewImage !== "/avatar-placeholder.png" && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-around">
                <FaEdit
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="text-white text-xl cursor-pointer"
                />
                <FaTrash
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage();
                  }}
                  className="text-white text-xl cursor-pointer"
                />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setStep(step - 1)}
            disabled={loading}
          >
            Back
          </button>
        )}

        {step < 5 ? (
          <div className="space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                saveStep();
                setStep(step + 1);
              }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Next"}
            </button>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded"
              onClick={() => setStep(step + 1)}
              disabled={loading}
            >
              Skip
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={saveStep}
            disabled={loading}
          >
            {loading ? "Saving..." : "Finish Setup"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;

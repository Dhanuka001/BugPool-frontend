import { useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('bio', bio);
      formData.append('skills', skills);
      formData.append('githubLink', githubLink);
      formData.append('portfolio', portfolio);
      formData.append('profileImage', profileImage);

      await axios.put(`${API_BASE_URL}/user/profile`, formData,
         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      alert('Profile updated!');
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-4 p-4">
      <div>
        <label className="block">Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Skills</label>
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">GitHub Link</label>
        <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Portfolio</label>
        <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block">Profile Image</label>
        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save</button>
    </form>
  );
};

export default EditProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="text-center text-red-600">{error}</div>;

  if (!profile) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Your Profile</h2>
      <div className="space-y-4">
        <p><span className="font-semibold text-gray-700">ID:</span> {profile.id}</p>
        <p><span className="font-semibold text-gray-700">Name:</span> {profile.name}</p>
        <p><span className="font-semibold text-gray-700">Email:</span> {profile.email}</p>
        <p><span className="font-semibold text-gray-700">Phone:</span> {profile.phone}</p>
        <p><span className="font-semibold text-gray-700">Role:</span> 
          <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
            profile.role === 'admin' ? 'bg-red-100 text-red-600' :
            profile.role === 'super admin' ? 'bg-yellow-100 text-yellow-600' :
            'bg-green-100 text-green-600'
          }`}>
            {profile.role}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Profile;

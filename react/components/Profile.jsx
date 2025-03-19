import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Profile = () => {
  const { user } =useAuth();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const fetchUserData = async () => {
    //   if (!user || !user.id) return;
      try {
        const response = await fetch(`http://localhost:3000/api/employees/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {profileData ? (
        <div>
          <p><strong>First Name:</strong> {profileData.first_name}</p>
          <p><strong>Last Name:</strong> {profileData.last_name}</p>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Phone Number:</strong> {profileData.phone}</p>
          <p><strong>Location:</strong> {profileData.location}</p>
          <p><strong>Job Role:</strong> {profileData.job}</p>
          <p><strong>Salary:</strong> {profileData.salary}</p>
        </div>
      ) : (
        <p>User data not available.</p>
      )}
    </div>
  );
};

export default Profile;
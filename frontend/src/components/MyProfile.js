import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeSidebar from './EmployeeSidebar';
import './MyProfile.css'; 

const MyProfile = () => {
  const username = localStorage.getItem('username');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      setError('⚠️ Username not found in localStorage. Please log in again.');
      return;
    }

    axios.get(`http://localhost:8080/api/V1/employees/profile/${username}`)
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        setError('❌ Unable to fetch profile.');
      });
  }, [username]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/V1/employees/profile/${profile.id}`, profile)
      .then(() => alert('✅ Profile updated!'))
      .catch(() => alert('❌ Failed to update profile.'));
  };

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
   <div className="profile-container" style={{ display: 'flex' }}>
  <EmployeeSidebar />
  <div className="profile-content">
    <h2>My Profile</h2>
    <div className="profile-card">
      <div className="profile-columns">
        <div className="profile-column">
          <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" />
          <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" />
          <input type="email" name="emailId" value={profile.emailId} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="profile-column">
          <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
          <input type="text" name="gender" value={profile.gender} onChange={handleChange} placeholder="Gender" />
          <input type="text" name="status" value={profile.status} onChange={handleChange} placeholder="Status" />
        </div>
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  </div>
</div>
  );
};

export default MyProfile;

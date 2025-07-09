import React from "react";
import "../styles/UserProfile.css";
import { useNavigate } from "react-router-dom";


const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return <p className="not-found">User not found.</p>;
  }

  return (
    <div className="profile-page">
      <div className="back-header" onClick={() => navigate(-1)}>
        &larr; Welcome, <strong>{user.name}</strong>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-circle">{getInitials(user.name)}</div>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div>
            <label>User ID</label>
            <div>{user.id}</div>
          </div>
          <div>
            <label>Name</label>
            <div>{user.name}</div>
          </div>
          <div>
            <label>Email ID</label>
            <div>{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

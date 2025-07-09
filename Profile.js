
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matched, setMatched] = useState(null);

  useEffect(() => {
    const routeData = location.state || {};

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);

        
        if (routeData.email || routeData.name || routeData.postId) {
          const match = data.find(
            (c) =>
              c.email === routeData.email ||
              c.name === routeData.name ||
              c.postId === routeData.postId
          );
          setMatched(match || null);
        }
      });
  }, [location.state]); 

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    const match = comments.find(
      (c) =>
        c.email.toLowerCase() === term ||
        c.name.toLowerCase() === term ||
        String(c.postId) === term
    );
    setMatched(match || null);
  };

  return (
    <div className="profile-container">
      <h2>Welcome Page</h2>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Enter name, email or postId"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon" onClick={handleSearch}>🔍</span>
      </div>

      {matched ? (
        <div className="profile-details">
          <p><strong>Post ID:</strong> {matched.postId}</p>
          <p><strong>Name:</strong> {matched.name}</p>
          <p><strong>Email:</strong> {matched.email}</p>
        </div>
      ) : (
        <p className="not-found-msg">No profile found. Try a different input.</p>
      )}

      <Link to="/" className="back-link">← Back to Dashboard</Link>
    </div>
  );
};

export default Profile;

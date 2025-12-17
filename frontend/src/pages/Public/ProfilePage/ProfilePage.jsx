// src/pages/Public/ProfilePage/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserCircle,
  FaEnvelope,
  FaArrowLeft,
  FaCommentDots
} from 'react-icons/fa';
import API from '../../../services/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    API.get(`users/${storedUser.id}/comments/`)
      .then(res => setComments(res.data))
      .catch(err => console.error("Failed to load comments", err));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-root">

      {/* HERO HEADER */}
      <div className="profile-hero">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Home
        </button>

        <div className="hero-content">
          <FaUserCircle className="hero-avatar" />
          <div>
            <h1>{user.username}</h1>
            <p><FaEnvelope /> {user.email}</p>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-value">{comments.length}</span>
            <span className="stat-label">Total Comments</span>
          </div>
        </div>
      </div>

      {/* ACTIVITY */}
      <div className="activity-section">
        <h2><FaCommentDots /> Participation History</h2>

        {comments.length === 0 && (
          <p>No comments posted yet.</p>
        )}

        {comments.map(c => (
          <div key={c.id} className="activity-item">
            <div className="activity-content">
              <h4>{c.bill_title}</h4>
              <p>“{c.text}”</p>
              <span>
                {new Date(c.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProfilePage;

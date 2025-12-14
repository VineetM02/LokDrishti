import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserCircle,
  FaEnvelope,
  FaArrowLeft,
  FaCommentDots
} from 'react-icons/fa';
import './ProfilePage.css';

const mockUserData = {
  username: 'CitizenX_Lokdrishti',
  email: 'user.citizenx@example.com',
  memberSince: 'Jan 2024',
  totalComments: 15,
};

const mockCommentHistory = [
  {
    id: 1,
    bill: 'Digital Governance and Privacy Act, 2025',
    text: 'Needs clearer guidance on state access.',
    date: '20 Oct 2024'
  },
  {
    id: 2,
    bill: 'Urban Renewal and Infrastructure Funding Bill',
    text: 'Strong support for sustainable transport initiatives.',
    date: '15 Sep 2024'
  },
  {
    id: 3,
    bill: 'Digital Governance and Privacy Act, 2025',
    text: 'Needs clearer guidance on state access.',
    date: '20 Oct 2024'
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useState(mockUserData);
  const [comments] = useState(mockCommentHistory);

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
            <span className="stat-value">{user.totalComments}</span>
            <span className="stat-label">Total Comments</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{user.memberSince}</span>
            <span className="stat-label">Member Since</span>
          </div>
        </div>
      </div>

      {/* ACTIVITY */}
      <div className="activity-section">
        <h2><FaCommentDots /> Participation History</h2>

        {comments.map(c => (
          <div key={c.id} className="activity-item">
            <div className="activity-content">
              <h4>{c.bill}</h4>
              <p>“{c.text}”</p>
              <span>{c.date}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProfilePage;

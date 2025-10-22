import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaHistory, FaArrowLeft } from 'react-icons/fa';
import './ProfilePage.css';

// Mock data
const mockUserData = {
    username: 'CitizenX_Lokdrishti',
    email: 'user.citizenx@example.com',
    memberSince: 'January 2024',
    totalComments: 15,
};

const mockCommentHistory = [
    { id: 201, billTitle: 'Digital Governance and Privacy Act, 2025', text: 'Needs clearer guidance on state access.', date: '2024-10-20' },
    { id: 202, billTitle: 'Urban Renewal and Infrastructure Funding Bill', text: 'I fully support the sustainable urban transport projects.', date: '2024-09-15' },
];

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData] = useState(mockUserData);         
    const [commentHistory] = useState(mockCommentHistory); 

    useEffect(() => {
        // When you implement API fetching later, you will uncomment this:
        // setUserData(res.data);
        // setCommentHistory(res.data);
    }, []);

    return (
        <div className="profile-page">
            <header className="profile-page-header">
                <button onClick={() => navigate('/home')} className="back-button">
                    <FaArrowLeft /> Back to Home
                </button>
                <h2>User Profile</h2>
            </header>

            <div className="profile-grid">
                
                {/* Personal Information Card */}
                <div className="profile-card info-card">
                    <FaUserCircle size={60} color="#6a5acd" />
                    <h3 className="profile-name">{userData.username}</h3>
                    <p className="profile-detail"><FaEnvelope /> {userData.email}</p>
                    <p className="profile-detail">Member Since: {userData.memberSince}</p>
                    <p className="profile-detail">Total Contributions: {userData.totalComments}</p>
                </div>

                {/* Comment History Section */}
                <div className="profile-card history-card">
                    <h3 className="history-title"><FaHistory /> Comment History</h3>
                    <div className="history-list">
                        {commentHistory.map(comment => (
                            <div key={comment.id} className="history-item">
                                <p className="item-bill-title">{comment.billTitle}</p>
                                <p className="item-text">"{comment.text}"</p>
                                <span className="item-date">Commented on: {comment.date}</span>
                            </div>
                        ))}
                        {commentHistory.length === 0 && <p className="no-history">No comments posted yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
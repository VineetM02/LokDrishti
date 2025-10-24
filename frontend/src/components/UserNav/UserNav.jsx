// src/components/UserNav/UserNav.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Requires react-icons
import './UserNav.css';

const UserNav = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className="user-nav">
            <button onClick={handleProfileClick} className="profile-icon-button">
                {/* Use a high-quality icon */}
                <FaUserCircle size={32} color="#1A237E" />
                <span className="profile-text">Profile</span>
            </button>
        </div>
    );
};

export default UserNav;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './UserNav.css';

const UserNav = () => {
    const navigate = useNavigate();

    return (
        <nav className="user-nav">
            <button
                onClick={() => navigate('/profile')}
                className="profile-icon-button"
            >
                <FaUserCircle size={28} />
                <span className="profile-text">Profile</span>
            </button>
        </nav>
    );
};

export default UserNav;

// For Add/Update/Delete Bill

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminManagementButton.css';

const AdminManagementButton = ({ icon: Icon, title, path }) => {
    const navigate = useNavigate();

    return (
        <button className="admin-mgmt-button" onClick={() => navigate(path)}>
            {/* The icon is passed as a component (e.g., <FaPlus />) */}
            <Icon size={28} className="mgmt-icon" />
            <span className="mgmt-title">{title}</span>
        </button>
    );
};

export default AdminManagementButton;
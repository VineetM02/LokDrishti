// Reusable styling wrapper for CRUD forms
// src/components/AdminFormLayout/AdminFormLayout.jsx
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminFormLayout.css'; 

const AdminFormLayout = ({ title, children, action }) => {
    const navigate = useNavigate();
    
    return (
        <div className="admin-form-container">
            <button onClick={() => navigate('/admin/home')} className="back-to-home-button">
                <FaArrowLeft /> Back to Management
            </button>
            
            <div className={`admin-form-card ${action}-card`}>
                <h2 className="admin-form-title">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default AdminFormLayout;
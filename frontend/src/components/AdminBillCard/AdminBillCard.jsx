// For Bill List on Admin Page

import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton'; // Reusing your existing button
import './AdminBillCard.css';

const AdminBillCard = ({ bill }) => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        // Navigate to the analysis dashboard for this specific bill
        navigate(`/admin/dashboard/${bill.id}`);
    };
    
    // Mock details for the card
    const details = [
        `Status: ${bill.status}`,
        `Posted: ${bill.postedDate}`,
        `Comments: ${bill.commentCount}`,
    ];

    return (
        <div className="admin-bill-card">
            <h3 className="admin-bill-title">{bill.title}</h3>
            
            <div className="admin-bill-details">
                {details.map((detail, index) => (
                    <p key={index} className="admin-bill-detail">{detail}</p>
                ))}
            </div>

            <button onClick={handleDashboardClick} className="dashboard-button-overlay">
                Dashboard
            </button>
        </div>
    );
};

export default AdminBillCard;
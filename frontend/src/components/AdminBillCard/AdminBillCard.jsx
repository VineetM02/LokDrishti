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
    

    return (
        <div className="admin-bill-card">
            <div className="bill-header">
                <h3>{bill.title}</h3>
                <span className={`bill-status ${bill.status}`}>
                {bill.status}
                </span>
            </div>

            <div className="bill-metrics">
                <div>
                <small>Comments</small>
                <strong>{bill.commentCount}</strong>
                </div>
                <div>
                <small>Posted</small>
                <strong>{bill.postedDate}</strong>
                </div>
            </div>

            <button className="dashboard-cta" onClick={handleDashboardClick}>
                View Analysis →
            </button>

            
        </div>

    );
};

export default AdminBillCard;
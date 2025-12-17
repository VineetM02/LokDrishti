 import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PolicyCard.css';

const PolicyCard = ({ bill }) => {
    const navigate = useNavigate();

    const openBillDetails = () => {
        navigate(`/bill/${bill.slug}/comments`);
    };

    return (
        <div className="policy-card" onClick={openBillDetails}>
            <div className="policy-header">
                <h3 className="policy-title">{bill.title}</h3>

                <span className={`status-badge ${bill.status}`}>
                    {bill.status === "active" ? "Active" : bill.status}
                </span>

            </div>

            <p className="policy-description">
                {bill.short_description}
            </p>

            <div className="policy-footer">
                <span className="comment-count">
                    💬 View Public Opinions
                </span>

                <button
                    className="comment-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // prevent double navigation
                        openBillDetails();
                    }}
                >
                    View & Comment →
                </button>
            </div>
        </div>
    );
};

export default PolicyCard;

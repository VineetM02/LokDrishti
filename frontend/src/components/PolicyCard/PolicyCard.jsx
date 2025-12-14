import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PolicyCard.css';

const PolicyCard = ({ bill }) => {
    const navigate = useNavigate();

    return (
        <div className="policy-card">
            <div className="policy-header">
                <h3 className="policy-title">{bill.title}</h3>
                <span className="status-badge active">Active</span>
            </div>

            <p className="policy-description">
                {bill.description}
            </p>

            <div className="policy-footer">
                <span className="comment-count">
                    💬 {bill.commentCount} Comments
                </span>

                <button
                    className="comment-btn"
                    onClick={() => navigate(`/bill/${bill.id}/comments`)}
                >
                    Comment →
                </button>
            </div>
        </div>
    );
};

export default PolicyCard;

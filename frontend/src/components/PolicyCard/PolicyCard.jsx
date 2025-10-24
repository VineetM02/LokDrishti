// src/components/PolicyCard/PolicyCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';
import './PolicyCard.css';

const PolicyCard = ({ bill }) => {
    const navigate = useNavigate();

    const handleCommentClick = () => {
        // Navigate to the comments page, passing the bill ID
        navigate(`/bill/${bill.id}/comments`);
    };

    return (
        <div className="policy-card">
            <div className="policy-content">
                <h3 className="policy-title">{bill.title}</h3>
                <p className="policy-description">{bill.description}</p>
            </div>
            <div className="policy-actions">
                {/* Shows how many comments already exist */}
                <p className="comment-count">{bill.commentCount} comments</p>
                <CustomButton 
                    onClick={handleCommentClick}
                    style={{ width: '150px', padding: '10px 15px', margin: '0' }}
                >
                    Comment
                </CustomButton>
            </div>
        </div>
    );
};

export default PolicyCard;
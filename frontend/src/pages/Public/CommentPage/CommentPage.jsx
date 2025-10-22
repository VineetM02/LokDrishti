import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaCommentAlt, FaArrowLeft } from 'react-icons/fa';
import CustomButton from '../../../components/CustomButton/CustomButton';
import './CommentPage.css';

// Mock data structure
const mockComments = [
    { id: 101, user: 'CitizenX', text: "The data privacy framework is robust but needs clearer guidance on state access.", likes: 45, dislikes: 5 },
    { id: 102, user: 'PolicyFan', text: "I believe the implementation timeline is too short for a project of this scale.", likes: 12, dislikes: 1 },
];
const mockBill = { 
    id: 'b001', 
    title: 'Digital Governance and Privacy Act, 2025', 
    shortDescription: 'A bill concerning data protection, citizen privacy, and the framework for digital public infrastructure.',
};

const CommentsPage = () => {
    const { billId } = useParams();
    const navigate = useNavigate();
    const [bill, setBill] = useState(null);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');

    useEffect(() => {
        // 1. Fetch Bill details based on billId
        // In a real app: axios.get(`/api/bills/${billId}`).then(res => setBill(res.data));
        setBill(mockBill); 

        // 2. Fetch Comments for the Bill
        // In a real app: axios.get(`/api/bills/${billId}/comments`).then(res => setComments(res.data));
        setComments(mockComments);
    }, [billId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        const newComment = {
            id: Date.now(),
            user: 'CurrentUser', // Replace with logged-in user name
            text: newCommentText,
            likes: 0,
            dislikes: 0
        };
        // In a real app: axios.post(`/api/bills/${billId}/comments`, newComment).then(...);
        setComments([newComment, ...comments]); // Add new comment to the top
        setNewCommentText('');
    };

    if (!bill) {
        return <div className="loading-state">Loading Bill Details...</div>;
    }

    return (
        <div className="comments-page">
            <header className="comments-header">
                <button onClick={() => navigate('/home')} className="back-button">
                    <FaArrowLeft /> Back to Bills
                </button>
                <h1>{bill.title}</h1>
                <p className="bill-summary">{bill.shortDescription}</p>
            </header>

            <main className="comments-content">
                
                {/* 1. Comment Input Area */}
                <form onSubmit={handleCommentSubmit} className="new-comment-form">
                    <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Add your comment on this bill..."
                        rows="3"
                        required
                    ></textarea>
                    <CustomButton type="submit" style={{ width: '150px' }}>
                        Post Comment
                    </CustomButton>
                </form>

                {/* 2. List of Existing Comments */}
                <h3 className="comments-section-title"><FaCommentAlt /> All Citizen Comments ({comments.length})</h3>
                
                <div className="comments-list">
                    {comments.map(comment => (
                        <div key={comment.id} className="comment-card">
                            <div className="comment-text-area">
                                <p className="comment-user">**{comment.user}**</p>
                                <p className="comment-text">{comment.text}</p>
                            </div>
                            <div className="comment-actions">
                                <button className="vote-button like"><FaArrowUp /> {comment.likes}</button>
                                <button className="vote-button dislike"><FaArrowDown /> {comment.dislikes}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CommentsPage;
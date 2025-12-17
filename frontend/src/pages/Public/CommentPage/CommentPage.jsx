// src/pages/Public/CommentPage/CommentPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCommentAlt, FaUserCircle } from 'react-icons/fa';
import {
  getBillDetail,
  getBillComments,
  addComment
} from '../../../services/api';
import './CommentPage.css';

const CommentPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [bill, setBill] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getBillDetail(slug).then(res => setBill(res.data));
    getBillComments(slug).then(res => setComments(res.data));
  }, [slug]);

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    addComment(slug, newComment).then(() => {
      setNewComment('');
      getBillComments(slug).then(res => setComments(res.data));
    });
  };

  if (!bill) return <p>Loading...</p>;

  return (
    <div className="comment-page">

      {/* HEADER */}
      <div className="comment-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Back
        </button>

        <h1>{bill.title}</h1>
        <p className="bill-description">{bill.full_text}</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="comment-container">

        {/* ADD COMMENT */}
        <div className="add-comment-card">
          <h3><FaCommentAlt /> Share Your Opinion</h3>
          <textarea
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleSubmit}>Post Comment</button>
        </div>

        {/* COMMENTS LIST */}
        <div className="comments-section">
          <h3>Public Comments ({comments.length})</h3>

          {comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="comment-user">
                <FaUserCircle />
                <span>{comment.user || "Citizen"}</span>
              </div>
              <p className="comment-text">“{comment.text}”</p>
              <span className="comment-date">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CommentPage;

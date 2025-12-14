import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCommentAlt, FaUserCircle } from 'react-icons/fa';
import './CommentPage.css';

// Mock bill data
const mockBill = {
  title: 'Digital Governance and Privacy Act, 2025',
  description:
    'This bill aims to regulate digital governance frameworks, ensure data privacy, and define state access protocols.',
};

// Mock comments
const mockComments = [
  {
    id: 1,
    username: 'CitizenA',
    text: 'This bill is necessary but needs stronger safeguards.',
    date: '20 Oct 2024',
  },
  {
    id: 2,
    username: 'CitizenB',
    text: 'Concerned about misuse of data without consent.',
    date: '18 Oct 2024',
  },
  {
    id: 3,
    username: 'CitizenC',
    text: 'Concerned about misuse of data without consent.',
    date: '18 Oct 2024',
  },
  {
    id: 4,
    username: 'CitizenD',
    text: 'Concerned about misuse of data without consent.',
    date: '18 Oct 2024',
  },
];

const CommentPage = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      username: 'You',
      text: newComment,
      date: new Date().toLocaleDateString(),
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="comment-page">

      {/* HEADER */}
      <div className="comment-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Back
        </button>

        <h1>{mockBill.title}</h1>
        <p className="bill-description">{mockBill.description}</p>
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
                <span>{comment.username}</span>
              </div>
              <p className="comment-text">“{comment.text}”</p>
              <span className="comment-date">{comment.date}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CommentPage;

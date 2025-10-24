// src/components/AuthCard/AuthCard.jsx
import React from 'react';
import './AuthCard.css';

const AuthCard = ({ title, formContent, illustrationContent, isLoginForm = true }) => {
  return (
    <div className="auth-card-container">
      <div className="auth-card-wrapper">
        <div className="auth-form-side">
          <h1 className="auth-title">{title}</h1>
          {formContent}
        </div>
        <div className={`auth-illustration-side ${isLoginForm ? 'login-bg' : 'register-bg'}`}>
          {illustrationContent}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
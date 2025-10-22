import React, { useState } from 'react';
import './InputField.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Requires 'react-icons' package

const InputField = ({ label, type = 'text', value, onChange, placeholder, forgotPasswordLink, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      <div className="input-header">
        <label className="input-label">{label}</label>
        {forgotPasswordLink && <div className="forgot-link">{forgotPasswordLink}</div>}
      </div>
      <div className={`input-container ${isPassword ? 'password-container' : ''}`}>
        <input
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="custom-input"
          {...props}
        />
        {isPassword && (
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
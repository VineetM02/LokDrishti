import React from 'react';
import './CustomButton.css';

const CustomButton = ({ children, type = 'button', onClick, variant = 'primary', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button ${variant}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
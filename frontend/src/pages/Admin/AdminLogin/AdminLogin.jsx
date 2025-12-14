import React, { useState } from 'react';
// src/pages/Admin/AdminLogin/AdminLogin.jsx
import AuthCard from '../../../components/AuthCard/AuthCard';
import InputField from '../../../components/InputField/InputField';
import CustomButton from '../../../components/CustomButton/CustomButton';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Admin Login Attempt:', { username, password });
        // **IMPORTANT:** Add API call to the ADMIN endpoint here
    };

    const formContent = (
        
        <form onSubmit={handleSubmit}>
            <InputField 
                label="Admin Username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter admin username"
            />
            <InputField 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter admin password"
            />
            
            <CustomButton type="submit" variant="danger">Admin Login</CustomButton>
            {/* No register link for admin usually */}

            <p className="admin-security-note">
                All admin actions are logged.
            </p>

        </form>
    );

    const illustrationContent = (
        <div className="illustration-text-container">
            <div className="illustration-icon admin-icon">🔐</div>

            <h2 className="illustration-heading">LokDrishti Admin Panel</h2>

            <p className="admin-illustration-text">
                Manage government bills, monitor public sentiment, and analyze citizen feedback in real time.
            </p>
        </div>
    );

    return (
        <AuthCard
            title={
                <span className="admin-title">Administrative Access</span>   
            }
            formContent={formContent}
            illustrationContent={illustrationContent}
        />
    );
};

export default AdminLogin;
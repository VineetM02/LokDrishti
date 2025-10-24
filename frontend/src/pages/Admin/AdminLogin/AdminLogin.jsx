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
        </form>
    );

    const illustrationContent = (
        <>
            <img src="/images/admin-illustration.jpg" alt="Admin Illustration" /> 
            <p className="illustration-text">
                Lokdrishti Admin Panel: Manage Bills and Analyze Sentiment Data.
            </p>
        </>
    );

    return (
        <AuthCard 
            title="Admin Login" 
            formContent={formContent} 
            illustrationContent={illustrationContent} 
            isLoginForm={true} // Reusing the login styling but you can create a unique style
        />
    );
};

export default AdminLogin;
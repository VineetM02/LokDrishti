import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// src/pages/Public/UserLogin/UserLogin.jsx
import AuthCard from '../../../components/AuthCard/AuthCard';
import InputField from '../../../components/InputField/InputField';
import CustomButton from '../../../components/CustomButton/CustomButton';

const UserLogin = () => {
    const [identifier, setIdentifier] = useState(''); // username or email
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
                identifier,
                password,
            });

            console.log("Login response:", response.data);
            toast.success("Login successful! Redirecting...");

            // Redirect after 1.5s (for now redirect to home or dashboard)
            setTimeout(() => {
                navigate('/home'); // or '/dashboard' if you have an admin/user dashboard
            }, 1500);

        } catch (error) {
            console.error("Error during login:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Login failed. Check credentials.");
        }
    };


    const formContent = (
        <form onSubmit={handleSubmit}>
            <InputField 
                label="Username or Email" 
                type="text" 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)} 
                placeholder="Enter your username or email" 
                required 
            />
            <InputField 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                required 
            />
            
            <CustomButton type="submit">
                Login to LokDrishti
            </CustomButton>

            <div className="auth-divider" />

            <p className="auth-trust-text">
                🔒 LokDrishti ensures secure handling of citizen feedback for policy analysis only.
            </p>

            <div className="auth-divider" />

            <p className="auth-footer-text">
                New to LokDrishti? <Link to="/register">Create a citizen account</Link>
            </p>

        </form>
    );

    const illustrationContent = (
        <div className="illustration-text-container">
            <div className="illustration-icon">🏛️</div>

            <h2 className="illustration-heading">Your Voice Matters</h2>

            <p className="illustration-subheading">
                Log in to view government bills, share your opinion, and contribute to transparent governance.
            </p>
        </div>

    );

    return (
        <AuthCard 
            title="Citizen Login" 
            formContent={formContent} 
            illustrationContent={illustrationContent} 
            isLoginForm={true} 
        />
    );
};

export default UserLogin;
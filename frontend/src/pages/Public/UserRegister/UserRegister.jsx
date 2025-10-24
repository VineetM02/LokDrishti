import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// src/pages/Public/UserRegister/UserRegister.jsx
import AuthCard from '../../../components/AuthCard/AuthCard';
import InputField from '../../../components/InputField/InputField';
import CustomButton from '../../../components/CustomButton/CustomButton';

const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate(); // for navigating to login page after register

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
            username,
            email,
            password,
            confirm_password: confirmPassword,
            });

            console.log("Registration response:", response.data);
            toast.success("Registration successful! Redirecting to login...");

            // Redirect after 1.5s
            setTimeout(() => {
            navigate('/login');
            }, 2000);

        } catch (error) {
            console.error("Error during registration:", error);
        }
        };


    const formContent = (
        <form onSubmit={handleSubmit}>
            <InputField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required />
            <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
            <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
            
            <CustomButton type="submit">Register</CustomButton>

            <p className="auth-footer-text">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </form>
    );

    const illustrationContent = (
        <div className="illustration-text-container">
            <h2 className="illustration-heading">Your Voice. Our Future.</h2>
            <p className="illustration-subheading">
                Join Lokdrishti to share your valuable opinion on Bills and Policies.
            </p>
    </div>
    );

    return (
        <AuthCard 
            title="Register" 
            formContent={formContent} 
            illustrationContent={illustrationContent} 
            isLoginForm={false} // Use a different background/color if desired
        />
    );
};

export default UserRegister;
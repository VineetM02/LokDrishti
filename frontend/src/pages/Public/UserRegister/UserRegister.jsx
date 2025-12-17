import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { registerUser } from '../../../services/api';

import AuthCard from '../../../components/AuthCard/AuthCard';
import InputField from '../../../components/InputField/InputField';
import CustomButton from '../../../components/CustomButton/CustomButton';

// src/pages/Public/UserRegister/UserRegister.jsx
const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Frontend validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await registerUser({
                username,
                email,
                password,
            });

            toast.success("Registration successful 🎉");

            // ✅ Redirect to login
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error(error);

            // Better error message
            if (error.response?.data) {
                toast.error("Registration failed. Username or email may already exist.");
            } else {
                toast.error("Server error. Please try again.");
            }
        }
    };

    const formContent = (
        <form onSubmit={handleSubmit}>
            <InputField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
            />

            <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />

            <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
            />

            <InputField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
            />

            <CustomButton type="submit">
                Register
            </CustomButton>

            <p className="auth-footer-text">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </form>
    );

    const illustrationContent = (
        <div className="illustration-text-container">
            <h2 className="illustration-heading">Your Voice. Our Future.</h2>
            <p className="illustration-subheading">
                Join LokDrishti to share your valuable opinion on Bills and Policies.
            </p>
        </div>
    );

    return (
        <AuthCard
            title="Register"
            formContent={formContent}
            illustrationContent={illustrationContent}
            isLoginForm={false}
        />
    );
};

export default UserRegister;

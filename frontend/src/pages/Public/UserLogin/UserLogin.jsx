import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// src/pages/Public/UserLogin/UserLogin.jsx
import AuthCard from '../../../components/AuthCard/AuthCard';
import InputField from '../../../components/InputField/InputField';
import CustomButton from '../../../components/CustomButton/CustomButton';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Login Attempt:', { email, password });
        // Add API call logic here
    };

    const formContent = (
        <form onSubmit={handleSubmit}>
            <InputField 
                label="Username or email" 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email or username"
            />
            <InputField 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
                forgotPasswordLink={<Link to="/forgot">Forgot password?</Link>}
            />
            
            <div className="remember-me-section">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
            </div>
            
            <CustomButton type="submit">Login</CustomButton>

            <p className="auth-footer-text">
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </form>
    );

    const illustrationContent = (
    <div className="illustration-text-container">
        <h2 className="illustration-heading">Your Voice. Our Future.</h2>
        <p className="illustration-subheading">
            Lokdrishti empowers citizens to directly shape policies and bills through transparent e-consultation and impactful feedback analysis.
        </p>
    </div>
);

return (
    <AuthCard 
        title="Login" 
        formContent={formContent} 
        illustrationContent={illustrationContent} 
    />
);
};

export default UserLogin;
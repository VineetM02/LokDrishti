import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/api';
import toast from 'react-hot-toast';

import AuthCard from '../../../components/AuthCard/AuthCard';
import InputField from '../../../components/InputField/InputField';
import CustomButton from '../../../components/CustomButton/CustomButton';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({
                username,
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            toast.success("Login successful 🎉");

            // ✅ Citizen redirect
            navigate("/user/home");

        } catch (err) {
            toast.error("Invalid username or password");
        }
    };

    return (
        <AuthCard
            title="Citizen Login"
            formContent={
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
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

                    <p className="auth-footer-text">
                        New to LokDrishti? <Link to="/register">Create account</Link>
                    </p>
                </form>
            }
            illustrationContent={
                <div>
                    <h2>Your Voice Matters</h2>
                    <p>Participate in governance through LokDrishti</p>
                </div>
            }
            isLoginForm={true}
        />
    );
};

export default UserLogin;

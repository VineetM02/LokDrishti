// src/pages/User/UserHomePage/UserHomePage.jsx
import React, { useState, useEffect } from 'react';
import UserNav from '../../../components/UserNav/UserNav';
import PolicyCard from '../../../components/PolicyCard/PolicyCard';
import './UserHomePage.css';

// Mock Data (Replace with API call to backend)
const mockBills = [
    { id: 'b001', title: 'Digital Governance and Privacy Act, 2025', description: 'A bill concerning data protection, citizen privacy, and the framework for digital public infrastructure...', commentCount: 450 },
    { id: 'b002', title: 'Urban Renewal and Infrastructure Funding Bill', description: 'Proposed legislation to allocate federal funds for smart city development and sustainable urban transport projects...', commentCount: 120 },
    { id: 'b003', title: 'National Education Curriculum Reform Policy', description: 'Draft policy detailing changes to the national school curriculum, focusing on vocational training and digital literacy...', commentCount: 890 },
];

const UserHomePage = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        // In a real app, this would be an axios.get('/api/bills')
        setBills(mockBills); 
    }, []);

    return (
        <div className="user-home-page">
            <header className="home-header">
                <h1 className="welcome-title">Welcome to Lokdrishti, Citizen!</h1>
                <UserNav />
            </header>

            <main className="policy-list-container">
                <h2 className="section-title">Active Bills & Policies for Consultation</h2>
                {bills.map(bill => (
                    <PolicyCard key={bill.id} bill={bill} />
                ))}
            </main>
        </div>
    );
};

export default UserHomePage;
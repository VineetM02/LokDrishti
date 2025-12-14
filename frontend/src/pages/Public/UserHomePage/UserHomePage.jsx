// src/pages/User/UserHomePage/UserHomePage.jsx
import React, { useState, useEffect } from 'react';
import UserNav from '../../../components/UserNav/UserNav';
import PolicyCard from '../../../components/PolicyCard/PolicyCard';
import './UserHomePage.css';

const mockBills = [
    { id: 'b001', title: 'Digital Governance and Privacy Act, 2025', description: 'A bill concerning data protection, citizen privacy, and digital public infrastructure.', commentCount: 450 },
    { id: 'b002', title: 'Urban Renewal and Infrastructure Funding Bill', description: 'Legislation for smart cities and sustainable urban development.', commentCount: 120 },
    { id: 'b003', title: 'National Education Curriculum Reform Policy', description: 'Policy reform focused on vocational and digital education.', commentCount: 890 },
];

const UserHomePage = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        setBills(mockBills);
    }, []);

    return (
        <div className="user-home">
            {/* NAV */}
            <header className="user-header">
                <div className="user-header-inner container">
                    <div className="user-header-left">
                        <h1 className="platform-title">LokDrishti</h1>
                        <span className="platform-subtitle">Public Policy Consultation</span>
                    </div>
                    <UserNav />
                </div>
            </header>

            {/* HERO */}
            <section className="hero-section">
                <h1>Public Policy Consultation Portal</h1>
                <p>
                    Review active government bills and share your opinion to help shape national decisions.
                </p>

                <div className="search-box">
                    <input type="text" placeholder="Search bills, policies, acts..." />
                    <button>Search</button>
                </div>
            </section>

            {/* STATS */}
            <section className="stats-section">
                <div className="stat-card">
                    <h3>Active Bills</h3>
                    <span>12</span>
                </div>
                <div className="stat-card">
                    <h3>Total Comments</h3>
                    <span>4,320</span>
                </div>
                <div className="stat-card">
                    <h3>Citizen Participants</h3>
                    <span>1,180</span>
                </div>
            </section>

            {/* POLICIES */}
            <section className="policy-section">
                <h2>Open for Public Consultation</h2>

                <div className="policy-grid">
                    {bills.map(bill => (
                        <PolicyCard key={bill.id} bill={bill} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserHomePage;

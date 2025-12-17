// src/pages/User/UserHomePage/UserHomePage.jsx
import React, { useState, useEffect } from 'react';
import UserNav from '../../../components/UserNav/UserNav';
import PolicyCard from '../../../components/PolicyCard/PolicyCard';
import { getBills, getPublicStats} from '../../../services/api';
import './UserHomePage.css';

const UserHomePage = () => {
    const [bills, setBills] = useState([]);
    const [totalComments, setTotalComments] = useState(0);
    const [participants, setParticipants] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getBills()
            .then((res) => {
                setBills(res.data);
            })
            .catch((err) => {
                console.error("Error fetching bills:", err);
            });

        getPublicStats()
            .then((res) => {
                setTotalComments(res.data.total_comments);
                setParticipants(res.data.citizen_participants);
            })
            .catch((err) => {
                console.error("Error fetching stats:", err);
            });
    }, []);

    const filteredBills = bills.filter((bill) =>
        bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.description.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="user-home">
            {/* NAV */}
            <header className="user-header">
                <div className="user-header-inner container">
                    <div className="user-header-left">
                        <h1 className="platform-title">LokDrishti</h1>
                        <span className="platform-subtitle">
                            Public Policy Consultation
                        </span>
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
                    <input
                        type="text"
                        placeholder="Search bills, policies, acts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* <button>Search</button> */}
                </div>
            </section>

            {/* STATS */}
            <section className="stats-section">
                <div className="stat-card">
                    <h3>Active Bills</h3>
                    <span>{bills.length}</span>
                </div>

                <div className="stat-card">
                    <h3>Total Comments</h3>
                    <span>{totalComments}</span>
                </div>

                <div className="stat-card">
                    <h3>Citizen Participants</h3>
                    <span>{participants}</span>
                </div>
            </section>

            {/* POLICIES */}
            <section className="policy-section">
                <h2>Open for Public Consultation</h2>

                <div className="policy-grid">
                    {filteredBills.map((bill) => (
                        <PolicyCard key={bill.id} bill={bill} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserHomePage;

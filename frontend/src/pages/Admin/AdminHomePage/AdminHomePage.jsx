// src/pages/Admin/AdminHomePage/AdminHomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCheckCircle, FaGlobe, FaBolt } from 'react-icons/fa'; // Icons for the buttons
import AdminManagementButton from '../../../components/AdminManagementButton/AdminManagementButton';
import AdminBillCard from '../../../components/AdminBillCard/AdminBillCard';
import './AdminHomePage.css';

// Mock Data
const mockAdminBills = [
    { id: 'a001', title: 'Digital Governance and Privacy Act, 2025', status: 'Active', postedDate: '2025-10-01', commentCount: 1540 },
    { id: 'a002', title: 'National Education Curriculum Reform Policy', status: 'Draft', postedDate: '2025-09-15', commentCount: 890 },
    { id: 'a003', title: 'Urban Renewal and Infrastructure Funding Bill', status: 'Closed', postedDate: '2025-08-20', commentCount: 320 },
];

const AdminHomePage = () => {
    const [bills, setBills] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch ALL bills for the Admin Home Page (unlike User Home which only fetches 'active')
        // In a real app: axios.get('/api/admin/bills').then(res => setBills(res.data));
        setBills(mockAdminBills); 
    }, []);

    // Placeholder for profile/logout button
    const handleProfileClick = () => {
        // Navigate to Admin Profile/Logout handler (Placeholder)
        alert("Admin Profile/Logout clicked!");
    };

    return (
        <div className="admin-home-layout">
            
            {/* 1. Left Sidebar (Management Panel) */}
            <div className="admin-sidebar">
                <div className="logo-section">
                    <span className="logo-text">LokDrishti</span>
                    <button className="profile-button" onClick={handleProfileClick}>
                        Profile
                    </button>
                </div>

                <div className="welcome-text">
                    <h1>
                        Empowering Voices. Enhancing <span className="highlight-gov">Governance.</span>
                    </h1>
                    <p>Analyze public sentiment and shape better policies with LokDrishti.</p>
                </div>

                <h3 className="manage-title">Manage Bill</h3>
                <div className="management-actions">
                    <AdminManagementButton icon={FaCheckCircle} title="Add Bill" path="/admin/manage/add" />
                    <AdminManagementButton icon={FaGlobe} title="Update Bill" path="/admin/manage/update" />
                    <AdminManagementButton icon={FaBolt} title="Delete Bill" path="/admin/manage/delete" />
                </div>
            </div>

            {/* 2. Right Content Panel (Bill List) */}
            <div className="admin-content">
                <h2 className="content-header-title">Bills & Policies</h2>
                
                <div className="search-bar-wrapper">
                    <input type="text" placeholder="Search for a Bill" className="search-input" />
                </div>

                <div className="bill-list">
                    {bills.map(bill => (
                        <AdminBillCard key={bill.id} bill={bill} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
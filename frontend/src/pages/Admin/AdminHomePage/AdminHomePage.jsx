// src/pages/Admin/AdminHomePage/AdminHomePage.jsx
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCheckCircle, FaGlobe, FaBolt, FaSearch } from 'react-icons/fa';
import AdminManagementButton from '../../../components/AdminManagementButton/AdminManagementButton';
import AdminBillCard from '../../../components/AdminBillCard/AdminBillCard';
import { getAdminBills } from '../../../services/api';
import './AdminHomePage.css';

const AdminHomePage = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    getAdminBills()
      .then((res) => {
        setBills(res.data);
      })
      .catch((err) => {
        console.error("Error fetching admin bills:", err);
      });
  }, []);

  const totalComments = bills.reduce(
    (sum, bill) => sum + (bill.comment_count || 0),
    0
  );

  const activeBills = bills.filter(bill => bill.is_active).length;

  return (
    <div className="admin-home-layout">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="logo-section">
          <span className="logo-text">LokDrishti</span>
          <button className="profile-button">
            <FaUserCircle size={22} />
          </button>
        </div>

        <p className="sidebar-section-title">Bill Management</p>

        <div className="management-actions">
          <AdminManagementButton icon={FaCheckCircle} title="Add Bill" path="/admin/manage/add" />
          <AdminManagementButton icon={FaGlobe} title="Update Bill" path="/admin/manage/update" />
          <AdminManagementButton icon={FaBolt} title="Delete Bill" path="/admin/manage/delete" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-content">
        <div className="admin-header">
          <h2>Policy Monitoring</h2>
          <p>Overview of bills and public sentiment activity</p>
        </div>

        {/* METRICS */}
        <div className="admin-metrics">
          <div className="metric-card">
            <span>Total Bills</span>
            <strong>{bills.length}</strong>
          </div>
          <div className="metric-card">
            <span>Total Comments</span>
            <strong>{totalComments}</strong>
          </div>
          <div className="metric-card">
            <span>Active Bills</span>
            <strong>{activeBills}</strong>
          </div>
        </div>

        {/* SEARCH */}
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search by bill name"
            className="search-input"
          />
          <span className="search-icon"><FaSearch /></span>
        </div>

        {/* BILL LIST */}
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

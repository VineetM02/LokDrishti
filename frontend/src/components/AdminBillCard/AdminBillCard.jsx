// src/components/AdminBillCard/AdminBillCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBillCard.css";

const AdminBillCard = ({ bill }) => {
  const navigate = useNavigate();

  const getStatusLabel = () => {
    if (bill.status === "active") return "Active";
    if (bill.status === "draft") return "Draft";
    if (bill.status === "deleted") return "Deleted";
    return "Unknown";
  };

  return (
    <div className="admin-bill-card">
      <div className="bill-header">
        <h3>{bill.title}</h3>
        <span className={`bill-status ${bill.status}`}>
          {getStatusLabel()}
        </span>
      </div>
      
      <div className="bill-metrics">
        <div>
          <small>Comments</small>
          <strong>{bill.comment_count || 0}</strong>
        </div>
        <div>
          <small>Posted</small>
          <strong>{bill.created_at?.slice(0, 10)}</strong>
        </div>
      </div>

      <button
        className="dashboard-cta"
        onClick={() => navigate(`/admin/dashboard/${bill.slug}`)}
      >
        View Analysis →
      </button>
    </div>
  );
};

export default AdminBillCard;

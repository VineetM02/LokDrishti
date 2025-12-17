// src/pages/Admin/ManageBills/UpdateBillPage.jsx
import React, { useState, useEffect } from "react";
import AdminFormLayout from "../../../components/AdminFormLayout/AdminFormLayout";
import API from "../../../services/api";
import { toast } from "react-hot-toast";
import "./ManageBills.css";

const UpdateBillPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD ALL BILLS (DROPDOWN) ---------------- */
  useEffect(() => {
    API.get("admin/bills/")
      .then((res) => setBills(res.data))
      .catch(() => toast.error("Failed to load bills"));
  }, []);

  /* ---------------- LOAD SELECTED BILL ---------------- */
  useEffect(() => {
    if (!selectedSlug) return;

    setLoading(true);
    API.get(`bills/${selectedSlug}/`)
      .then((res) => {
        const bill = res.data;
        setFormData({
          title: bill.title,
          description: bill.description,
          status: bill.status,
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load bill details");
        setLoading(false);
      });
  }, [selectedSlug]);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.patch(`bills/${selectedSlug}/`, formData);
      toast.success("Bill updated successfully");
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Failed to update bill");
    }
  };

  return (
    <AdminFormLayout title="Update Existing Policy / Bill" action="update">

      {/* -------- SELECT BILL -------- */}
      <div className="bill-select-group form-group">
        <label>Select Bill to Update</label>
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
        >
          <option value="">-- Select Bill --</option>
          {bills.map((bill) => (
            <option key={bill.id} value={bill.slug}>
              {bill.title}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="loading-message">Loading bill details...</p>}

      {/* -------- UPDATE FORM -------- */}
      {formData && !loading && (
        <form onSubmit={handleSubmit} className="manage-bill-form">

          <div className="form-group">
            <label>Bill Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group status-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>

          <button type="submit" className="form-submit-button update-button">
            Apply Changes
          </button>

        </form>
      )}

    </AdminFormLayout>
  );
};

export default UpdateBillPage;

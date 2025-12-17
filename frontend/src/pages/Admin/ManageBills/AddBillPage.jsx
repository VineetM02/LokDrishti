// src/pages/Admin/ManageBills/AddBillPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminFormLayout from '../../../components/AdminFormLayout/AdminFormLayout';
import { toast } from 'react-hot-toast';
import API from '../../../services/api';
import './ManageBills.css';

const AddBillPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullText: '',
    status: 'draft',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    title: formData.title,
    description: formData.shortDescription, // matches model
    status: formData.status,               // REQUIRED FIELD
  };

  try {
    await API.post("bills/", payload);
    toast.success("Bill added successfully!");
    navigate("/admin/home");
  } catch (error) {
    console.error("Add bill error:", error.response?.data);
    toast.error("Failed to add bill");
  }
};

return (
    <AdminFormLayout title="Add New Policy or Bill" action="add">
      <form onSubmit={handleSubmit} className="manage-bill-form">

        <div className="form-group">
          <label>Bill Title (Must be Unique)</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Short Description / Explanation (For Users)</label>
          <textarea
            name="shortDescription"
            rows="3"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Full Policy Text (Detailed Content)</label>
          <textarea
            name="fullText"
            rows="6"
            value={formData.fullText}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group status-group">
          <label>Initial Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        <button
          type="submit"
          className="form-submit-button add-button"
        >
          Publish Bill
        </button>

      </form>
    </AdminFormLayout>
  );
};

export default AddBillPage;

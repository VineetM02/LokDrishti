// src/pages/Admin/ManageBills/AddBillPage.jsx
import React, { useState } from 'react';
import AdminFormLayout from '../../../components/AdminFormLayout/AdminFormLayout';
import './ManageBills.css'; // Shared CSS

const AddBillPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        fullText: '',
        status: 'draft',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API Call: POST to /api/admin/bills/
        console.log('Adding New Bill:', formData);
        alert('Bill added successfully!');
        // On success, navigate back to AdminHomePage: navigate('/admin/home');
    };

    return (
        <AdminFormLayout title="Add New Policy or Bill" action="add">
            <form onSubmit={handleSubmit} className="manage-bill-form">
                <div className="form-group">
                    <label>Bill Title (Must be Unique)</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Short Description/Explanation (For Users)</label>
                    <textarea name="shortDescription" rows="3" value={formData.shortDescription} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label>Full Policy Text (Detailed Content)</label>
                    <textarea name="fullText" rows="6" value={formData.fullText} onChange={handleChange} required />
                </div>
                
                <div className="form-group status-group">
                    <label>Initial Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="draft">Draft (Not visible to users)</option>
                        <option value="active">Active (Visible to users)</option>
                    </select>
                </div>
                
                <button type="submit" className="form-submit-button add-button">
                    Publish Bill
                </button>
            </form>
        </AdminFormLayout>
    );
};

export default AddBillPage;
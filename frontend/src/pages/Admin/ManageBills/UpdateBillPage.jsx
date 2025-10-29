// src/pages/Admin/ManageBills/UpdateBillPage.jsx
import React, { useState, useEffect } from 'react';
import AdminFormLayout from '../../../components/AdminFormLayout/AdminFormLayout';
import './ManageBills.css';

// Mock Data (In a real app, this would be fetched using billId from URL params)
const mockBillToUpdate = {
    id: 'a001',
    title: 'Digital Governance and Privacy Act, 2025',
    shortDescription: 'Current description text...',
    fullText: 'The full text content that needs editing...',
    status: 'active',
};

const UpdateBillPage = () => {
    const [billId, setBillId] = useState(''); // State for selecting the bill
    const [formData, setFormData] = useState({});
    const [billLoaded, setBillLoaded] = useState(false);

    // Mock Load Bill (Replace with API GET call)
    useEffect(() => {
        if (billId === 'a001') { // Mock loading logic
            setFormData(mockBillToUpdate);
            setBillLoaded(true);
        }
    }, [billId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API Call: PUT/PATCH to /api/admin/bills/a001
        console.log('Updating Bill:', formData);
        alert(`Bill ${formData.title} updated successfully!`);
    };

    return (
        <AdminFormLayout title="Update Existing Policy/Bill" action="update">
            <div className="bill-select-group form-group">
                <label>Select Bill to Update</label>
                {/* In production, this should be a searchable dropdown populated via API GET /api/admin/bills */}
                <select value={billId} onChange={(e) => setBillId(e.target.value)}>
                    <option value="">-- Select Bill --</option>
                    <option value="a001">Digital Governance Act</option>
                    <option value="a002">National Education Policy</option>
                </select>
            </div>

            {billLoaded && (
                <form onSubmit={handleSubmit} className="manage-bill-form">
                    <div className="form-group">
                        <label>Bill Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Short Description/Explanation</label>
                        <textarea name="shortDescription" rows="3" value={formData.shortDescription} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Full Policy Text</label>
                        <textarea name="fullText" rows="6" value={formData.fullText} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group status-group">
                        <label>Update Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="draft">Draft</option>
                            <option value="active">Active (Visible to users)</option>
                            <option value="closed">Closed (No new comments)</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="form-submit-button update-button">
                        Apply Changes
                    </button>
                </form>
            )}
            {!billLoaded && billId && <p className="loading-message">Loading bill details...</p>}
        </AdminFormLayout>
    );
};

export default UpdateBillPage;
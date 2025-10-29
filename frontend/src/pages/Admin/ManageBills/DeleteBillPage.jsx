// src/pages/Admin/ManageBills/DeleteBillPage.jsx
import React, { useState } from 'react';
import AdminFormLayout from '../../../components/AdminFormLayout/AdminFormLayout';
import './ManageBills.css';

const DeleteBillPage = () => {
    const [billId, setBillId] = useState('');
    const [billName, setBillName] = useState('');
    const [confirmText, setConfirmText] = useState('');

    // Mock Load Bill (In a real app, this would fetch the name to confirm deletion)
    const handleBillSelect = (e) => {
        const id = e.target.value;
        setBillId(id);
        if (id === 'a001') {
            setBillName('Digital Governance and Privacy Act, 2025');
        } else {
            setBillName('');
        }
        setConfirmText('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (confirmText.toLowerCase() !== 'delete') {
            alert("You must type 'DELETE' to confirm.");
            return;
        }
        // API Call: DELETE to /api/admin/bills/a001
        console.log(`Deleting Bill: ${billName} (${billId})`);
        alert(`Bill ${billName} has been permanently deleted.`);
        // On success, navigate back to AdminHomePage: navigate('/admin/home');
    };

    return (
        <AdminFormLayout title="Delete Policy or Bill" action="delete">
            <form onSubmit={handleSubmit} className="manage-bill-form">
                <p className="delete-warning">
                    ⚠️ **WARNING:** Deleting a bill is permanent and removes all associated citizen comments and analysis data. This action cannot be undone.
                </p>

                <div className="bill-select-group form-group">
                    <label>Select Bill to Permanently Delete</label>
                    <select value={billId} onChange={handleBillSelect} required>
                        <option value="">-- Select Bill --</option>
                        <option value="a001">Digital Governance Act (Active)</option>
                        <option value="a002">National Education Policy (Draft)</option>
                    </select>
                </div>

                {billName && (
                    <div className="form-group confirmation-group">
                        <label>Type the word "DELETE" below to confirm deletion of **{billName}**</label>
                        <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                    </div>
                )}

                <button type="submit" className="form-submit-button delete-button" disabled={!billName || confirmText.toLowerCase() !== 'delete'}>
                    Confirm Permanent Deletion
                </button>
            </form>
        </AdminFormLayout>
    );
};

export default DeleteBillPage;
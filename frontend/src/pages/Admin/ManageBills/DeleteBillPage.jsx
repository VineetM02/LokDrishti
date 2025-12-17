// src/pages/Admin/ManageBills/DeleteBillPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminFormLayout from "../../../components/AdminFormLayout/AdminFormLayout";
import API from "../../../services/api";
import { toast } from "react-hot-toast";
import "./ManageBills.css";

const DeleteBillPage = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [confirmText, setConfirmText] = useState("");

  /* -------- LOAD ALL BILLS -------- */
  useEffect(() => {
    API.get("admin/bills/")
      .then((res) => setBills(res.data))
      .catch(() => toast.error("Failed to load bills"));
  }, []);

  /* -------- HANDLE BILL SELECTION -------- */
  const handleBillSelect = (e) => {
    const slug = e.target.value;
    setSelectedSlug(slug);

    const bill = bills.find((b) => b.slug === slug);
    setSelectedTitle(bill ? bill.title : "");
    setConfirmText("");
  };

  /* -------- SOFT DELETE -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmText !== "DELETE") {
      toast.error('You must type "DELETE" to confirm.');
      return;
    }

    try {
      await API.patch(`bills/${selectedSlug}/`, {
        status: "deleted",
      });

      toast.success("Bill deleted successfully");
      navigate("/admin/home");
    } catch (error) {
      console.error(error.response?.data);
      toast.error("Failed to delete bill");
    }
  };

  return (
    <AdminFormLayout title="Delete Policy or Bill" action="delete">
      <form onSubmit={handleSubmit} className="manage-bill-form">

        <p className="delete-warning">
          ⚠️ <strong>WARNING:</strong> This will <strong>soft delete</strong> the bill.
          The bill will no longer be visible to users but can be restored later.
        </p>

        {/* -------- SELECT BILL -------- */}
        <div className="bill-select-group form-group">
          <label>Select Bill to Delete</label>
          <select
            value={selectedSlug}
            onChange={handleBillSelect}
            required
          >
            <option value="">-- Select Bill --</option>
            {bills
              .filter((b) => b.status !== "deleted")
              .map((bill) => (
                <option key={bill.id} value={bill.slug}>
                  {bill.title} ({bill.status})
                </option>
              ))}
          </select>
        </div>

        {/* -------- CONFIRMATION -------- */}
        {selectedTitle && (
          <div className="form-group confirmation-group">
            <label>
              Type <strong>DELETE</strong> to confirm deletion of{" "}
              <strong>{selectedTitle}</strong>
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          className="form-submit-button delete-button"
          disabled={!selectedTitle || confirmText !== "DELETE"}
        >
          Confirm Deletion
        </button>

      </form>
    </AdminFormLayout>
  );
};

export default DeleteBillPage;

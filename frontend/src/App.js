// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import UserLogin from './pages/Public/UserLogin/UserLogin';
import UserRegister from './pages/Public/UserRegister/UserRegister';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';

import UserHomePage from './pages/Public/UserHomePage/UserHomePage';
import ProfilePage from './pages/Public/ProfilePage/ProfilePage';
import CommentPage from './pages/Public/CommentPage/CommentPage';

import AdminHomePage from './pages/Admin/AdminHomePage/AdminHomePage';
import AddBillPage from './pages/Admin/ManageBills/AddBillPage';
import UpdateBillPage from './pages/Admin/ManageBills/UpdateBillPage';
import DeleteBillPage from './pages/Admin/ManageBills/DeleteBillPage';
// ... import other pages (UserHome, AdminHome) when ready

function App() {
  return (
    <Router>
      <Routes>
        {/* User Authentication Routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User Protected Routes */}
        <Route path="/home" element={<UserHomePage />} />
        {/* Route with dynamic parameter for bill ID */}
        <Route path="/bill/:billId/comments" element={<CommentPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin Protected Routes */}
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/manage/add" element={<AddBillPage />} />
        <Route path="/admin/manage/update" element={<UpdateBillPage />} />
        <Route path="/admin/manage/delete" element={<DeleteBillPage />} />

        {/* Home/Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch-all for 404 Not Found pages */}
        <Route path="*" element={<h1>404 Not Found pages</h1>} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;
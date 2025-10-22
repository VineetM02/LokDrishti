// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/Public/UserLogin/UserLogin';
import UserRegister from './pages/Public/UserRegister/UserRegister';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';

import UserHomePage from './pages/Public/UserHomePage/UserHomePage';
import ProfilePage from './pages/Public/ProfilePage/ProfilePage';
import CommentPage from './pages/Public/CommentPage/CommentPage';
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

        {/* Home/Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Future Protected Routes */}
        {/* <Route path="/home" element={<UserHomePage />} /> */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';
import './Sidebar.css'; // Same CSS as admin sidebar

const HRsidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-logo">
        <img src={logo} alt="App Logo" className="logo-img" />
      </div>
      
      <ul className="sidebar-menu">
        <li>
          <Link to="/employee/profile">👤 My Profile</Link>
        </li>
        <li>
          <Link to="/employee/leave">📋 View & Manage Employee Records</Link>
        </li>
        <li>
          <Link to="/employee/attendance">🗓️ Handle Leave Requests</Link>
        </li>
        <li>
          <Link to="/employee/payslips">💰 Manage Payroll Data</Link>
        </li>
        <li>
          <Link to="/employee/payslips">💰 ✏️ Edit Employee Details</Link>
        </li>
        <li><Link to="/login"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link></li>
      </ul>
    </div>
  );
};

export default HRsidebar;







import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCalendarPlus, FaClipboardList, FaCalendarCheck, FaMoneyBill, FaSignOutAlt } from 'react-icons/fa';
import logo from '../asset/logo.png';
import './EmployeeSidebar.css';

const EmployeeSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="App Logo" className="logo-img" />
      </div>
      <h3 className="sidebar-title">Employee Panel</h3>
      <ul className="sidebar-menu">
        <li>
          <Link to="/employee">
            <FaTachometerAlt className="sidebar-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/employee/myprofile">
            <FaUser className="sidebar-icon" /> My Profile
          </Link>
        </li>
        <li>
          <Link to="/employee/apply-leave">
            <FaCalendarPlus className="sidebar-icon" /> Apply for Leave
          </Link>
        </li>
        <li>
          <Link to="/employee/view-leave-status">
            <FaClipboardList className="sidebar-icon" /> View Leave Status
          </Link>
        </li>
        <li>
          <Link to="/employee/view-attendance">
            <FaCalendarCheck className="sidebar-icon" /> View Attendance
          </Link>
        </li>
    
        <li>
          <Link to="/login">
            <FaSignOutAlt className="sidebar-icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;

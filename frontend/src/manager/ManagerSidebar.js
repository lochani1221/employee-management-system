import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaCheckCircle, FaCalendarCheck, FaSignOutAlt } from 'react-icons/fa';
import logo from '../asset/logo.png';
import '../components/Sidebar.css';

const ManagerSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="App Logo" className="logo-img" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/manager">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/manager/department-employees">
            <FaUsers /> View Employees
          </Link>
        </li>
        <li>
          <Link to="/manager/approve-leaves">
            <FaCheckCircle /> Approve Leave Requests
          </Link>
        </li>
        <li>
          <Link to="/manager/manage-attendance">
            <FaCalendarCheck /> Manage Attendance
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ManagerSidebar;

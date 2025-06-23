import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../asset/logo.png';

const Sidebar = () => {
  const [showDepartments, setShowDepartments] = useState(false);

  const toggleDepartments = () => {
    setShowDepartments(!showDepartments);
  };

  return (
    <div className="sidebar">
          <h4 className="sidebar-title">Employee App</h4>
         <div className="sidebar-logo">
        <img src={logo} alt="App Logo" className="logo-img" />
      </div>
    
      <ul className="sidebar-nav">
        
        <li><Link to="/dashboard"><i className="bi bi-speedometer2 me-2"></i>Dashboard</Link></li>
        <li><Link to="/AddEmployee"><i className="bi bi-person-plus me-2"></i>Add Employee</Link></li>
        <li><Link to="/employees"><i className="bi bi-people-fill me-2"></i>View All Employees</Link></li>
        
        
        <li onClick={toggleDepartments} className="dropdown-toggle"> <i className="bi bi-building me-2"></i>
          Departments
        </li>

        {showDepartments && (
          <ul className="submenu">
             <li><Link to="/departments/id/1"><i className="bi bi-cpu me-2"></i>IT</Link></li>
            <li><Link to="/departments/id/2"><i className="bi bi-person-workspace me-2"></i>HRM</Link></li>
            <li><Link to="/departments/id/3"><i className="bi bi-cash-stack me-2"></i>Finance</Link></li>
            <li><Link to="/departments/id/4"><i className="bi bi-graph-up-arrow me-2"></i>Marketing</Link></li>
          </ul>
        )}
        <li><Link to="/login"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

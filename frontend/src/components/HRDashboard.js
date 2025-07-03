import React from 'react';
import HRsidebar from './HRsidebar';

const HRDashboard = () => {
  return (
    <div className="dashboard-container">
      <HRsidebar />
      <div className="dashboard-content">
        <h2>Welcome to Employee Dashboard</h2>
        <p>Select an option from the sidebar to proceed.</p>
      </div>
    </div>
  );
};

export default HRDashboard;

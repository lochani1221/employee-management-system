import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerSidebar from './ManagerSidebar';
import './ApproveLeaves.css';

const ApproveLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const departmentId = localStorage.getItem('departmentId');
  const managerUsername = localStorage.getItem('username'); 

  console.log("Loaded departmentId:", departmentId);

useEffect(() => {
  if (!managerUsername) {
    console.error("Manager username missing in localStorage");
    return;
  }
  axios.get(`http://localhost:8080/api/leaves/department/${managerUsername}`)
    .then(res => setLeaveRequests(res.data))
    .catch(err => console.error('Failed to fetch leave requests', err));
}, [managerUsername]);



  const handleUpdateStatus = (id, status) => {
    axios.put(`http://localhost:8080/api/leaves/${id}/status`, { status })
      .then(() => {
        setLeaveRequests(prev => prev.map(lr =>
          lr.id === id ? { ...lr, status } : lr
        ));
      })
      .catch(() => alert('Failed to update status.'));
  };

  return (
    <div className="approve-leaves">
      <ManagerSidebar />
      <div className="content">
        <h2>Approve Leave Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Reason</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(lr => (
              <tr key={lr.id}>
                <td>{lr.employee.firstName} {lr.employee.lastName}</td>
                <td>{lr.reason}</td>
                <td>{lr.startDate}</td>
                <td>{lr.endDate}</td>
                <td>{lr.status}</td>
                <td>
  <div className="action-buttons">
    <button
      className="approve-btn"
      onClick={() => handleUpdateStatus(lr.id, 'Approved')}
    >
      Approve
    </button>
    <button
      className="reject-btn"
      onClick={() => handleUpdateStatus(lr.id, 'Rejected')}
    >
      Reject
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveLeaves;

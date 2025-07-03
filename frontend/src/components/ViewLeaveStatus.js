import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeSidebar from './EmployeeSidebar';

const ViewLeaveStatus = () => {
  const employeeIdStr = localStorage.getItem('employeeId');
  const employeeId = employeeIdStr ? parseInt(employeeIdStr, 10) : null;

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (!employeeId) {
      console.error('Employee ID not found');
      return;
    }

    axios.get(`http://localhost:8080/api/leaves/${employeeId}`)
      .then((res) => setLeaves(res.data))
      .catch((err) => console.error('Failed to fetch leave requests:', err));
  }, [employeeId]);

  return (
    <div>
      <EmployeeSidebar />
      <h2>My Leave Status</h2>
      <table>
        <thead>
          <tr>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.reason}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLeaveStatus;

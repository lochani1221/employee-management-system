// src/components/employee/ApplyLeave.js
import React, { useState } from 'react';
import axios from 'axios';
import EmployeeSidebar from './EmployeeSidebar';
import './ApplyLeave.css';

const ApplyLeave = () => {
  const employeeIdStr = localStorage.getItem('employeeId');
  const employeeId = employeeIdStr ? parseInt(employeeIdStr, 10) : null;

  const [form, setForm] = useState({ reason: '', startDate: '', endDate: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.reason || !form.startDate || !form.endDate) {
      alert('Please fill all the fields');
      return;
    }

    if (!employeeId) {
      alert('Employee ID not found. Please login again.');
      return;
    }

    axios.post('http://localhost:8080/api/leaves', {
      ...form,
      employee: { id: employeeId }
    })
      .then(() => alert('Leave applied successfully!'))
      .catch(() => alert('Error applying for leave.'));
  };

  return (
    <div>
      <h2>Apply for Leave</h2>
      <EmployeeSidebar />
      <form onSubmit={handleSubmit}>
        <label>Start Date</label>
        <input type="date" name="startDate" onChange={handleChange} value={form.startDate} required />

        <label>End Date</label>
        <input type="date" name="endDate" onChange={handleChange} value={form.endDate} required />

        <label>Reason</label>
        <textarea name="reason" onChange={handleChange} value={form.reason} required />

        <button type="submit">Submit Leave</button>
      </form>
    </div>
  );
};

export default ApplyLeave;

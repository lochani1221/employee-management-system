import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const Dashboard = () => {
  const [departmentStats, setDepartmentStats] = useState([]);

  useEffect(() => {
    fetchDepartmentStats();
  }, []);

  const fetchDepartmentStats = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/V1/employees/department-counts');
      setDepartmentStats(res.data);
    } catch (error) {
      console.error("Failed to fetch department stats", error);
    }
  };

  const totalEmployees = departmentStats.reduce((sum, dept) => sum + dept.employeeCount, 0);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="text-center mb-5">
        <h4>Total Employees: <span className="text-primary">{totalEmployees}</span></h4>
      </div>

      <div className="row">
        {departmentStats.map((dept, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card text-center p-4 shadow-sm">
              <h5><i className="bi bi-building me-2"></i>{dept.departmentName}</h5>
              <p className="display-6 text-primary">{dept.employeeCount}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container mt-5">
        <h4 className="text-center mb-3">Employee Count by Department</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="departmentName" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="employeeCount" fill="#60a5fa" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

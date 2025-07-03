import React, { useEffect, useState } from "react";
import EmployeeSidebar from './EmployeeSidebar';
import './ViewLeaveStatus'; 

const ViewAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // month 1-12
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const id = localStorage.getItem("employeeId");
    fetch(`http://localhost:8080/api/attendance/employee/${id}`)
      .then(res => res.json())
      .then(data => setAttendances(data))
      .catch(err => console.error(err));
  }, []);

  const filtered = attendances.filter(a => {
    const date = new Date(a.timestamp);
    return date.getMonth() + 1 === Number(selectedMonth) && date.getFullYear() === Number(selectedYear);
  });

  return (
    <div className="view-attendance">
      <EmployeeSidebar />
      <h2>My Attendance</h2>
      <div style={{ marginBottom: "10px" }}>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
        </select>
        <input 
          type="number" 
          value={selectedYear} 
          onChange={e => setSelectedYear(e.target.value)} 
          style={{ marginLeft: "10px" }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a.id}>
              <td>{new Date(a.timestamp).toLocaleString()}</td>
              <td>{a.department ? a.department.name : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;

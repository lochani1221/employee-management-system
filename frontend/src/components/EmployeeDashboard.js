import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EmployeeSidebar from "./EmployeeSidebar";
import Calendar from "react-calendar";
import axios from "axios";
import "./EmployeeDashboard.css";
import "react-calendar/dist/Calendar.css";

const EmployeeDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [leaves, setLeaves] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(new Date().toISOString().substring(0,16));

  const employeeName = localStorage.getItem("username") || "Employee";
  const employeeId = localStorage.getItem("employeeId");
  const departmentId = localStorage.getItem("departmentId");

  useEffect(() => {
    if (employeeId) {
      axios.get(`http://localhost:8080/api/leaves/${employeeId}`)
        .then(response => {
          setLeaves(response.data);
          setApprovedCount(response.data.filter(l => l.status === "Approved").length);
          setPendingCount(response.data.filter(l => l.status === "Pending").length);
          setRejectedCount(response.data.filter(l => l.status === "Rejected").length);
        })
        .catch(err => console.error("Error fetching leaves:", err));
    }

    if (departmentId) {
      fetch(`http://localhost:8080/api/announcements/department/${departmentId}`)
        .then(res => res.json())
        .then(data => setAnnouncements(data))
        .catch(err => console.error("Error fetching announcements:", err));
    }
  }, [employeeId, departmentId]);

  const handleAttendance = () => {
    if (!employeeId) return alert("Employee ID not found");

    fetch(`http://localhost:8080/api/attendance/${employeeId}`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: selectedTime })
    })
    .then(res => res.json())
    .then(data => alert("Attendance marked at " + data.timestamp))
    .catch(err => {
      console.error(err);
      alert("Error marking attendance");
    });
  };

  return (
    <div className="employee-dashboard">
      <EmployeeSidebar />
      <main className="dashboard-content">
        <motion.h2 className="dashboard-title" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          👋 Welcome, {employeeName}!
        </motion.h2>

        <section className="grid-cards">
          <motion.div className="card" whileHover={{ scale: 1.02 }}>
            <h3>Leave Summary</h3>
            <div className="summary">
              <span className="approved">✅ Approved: {approvedCount}</span>
              <span className="pending">🕒 Pending: {pendingCount}</span>
              <span className="rejected">❌ Rejected: {rejectedCount}</span>
            </div>
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.02 }}>
            <h3>Upcoming Leaves</h3>
            <div className="scroll-table">
              <table>
                <thead>
                  <tr>
                    <th>Reason</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.filter(l => new Date(l.startDate) >= new Date())
                    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                    .slice(0, 5)
                    .map(leave => (
                    <tr key={leave.id}>
                      <td>{leave.reason}</td>
                      <td>{leave.startDate}</td>
                      <td>{leave.endDate}</td>
                      <td className={`status ${leave.status.toLowerCase()}`}>{leave.status}</td>
                    </tr>
                  ))}
                  {leaves.filter(l => new Date(l.startDate) >= new Date()).length === 0 && (
                    <tr><td colSpan="4">No upcoming leaves</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.02 }}>
            <h3>📢 Announcements</h3>
            <ul className="announcements">
              {announcements.length > 0 
                ? announcements.map(a => (
                  <li key={a.id}>
                    {a.message} <small>({new Date(a.createdAt).toLocaleDateString()})</small>
                  </li>
                )) 
                : <li>No recent announcements</li>}
            </ul>
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.02 }}>
            <h3>📅 Calendar</h3>
            <Calendar 
              onChange={setDate} 
              value={date} 
              tileClassName={({ date }) =>
                date.toDateString() === new Date().toDateString() ? "today-highlight" : null
              }
            />
          </motion.div>

          <motion.div className="card" whileHover={{ scale: 1.02 }}>
            <h3>📝 Mark Today's Attendance</h3>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <input 
              type="datetime-local" 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)} 
            />
            <button className="mark-btn" onClick={handleAttendance}>Mark Attendance</button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default EmployeeDashboard;

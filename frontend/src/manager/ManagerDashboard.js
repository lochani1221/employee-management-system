import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ManagerSidebar from './ManagerSidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ManagerDashboard.css';


const ManagerDashboard = () => {
  const managerName = localStorage.getItem('username') || 'Manager';
  const [pendingCount, setPendingCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [recentLeaves, setRecentLeaves] = useState([]);
  const [date, setDate] = useState(new Date());
  const [newAnnouncement, setNewAnnouncement] = useState("");


  useEffect(() => {
    // get pending leaves
    axios.get(`http://localhost:8080/api/leaves/department/${managerName}`)
      .then(res => {
        const pending = res.data.filter(leave => leave.status === 'Pending').length;
        setPendingCount(pending);
        // get latest 3 leave requests
        const sorted = res.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
        setRecentLeaves(sorted.slice(0, 3));
      })
      .catch(err => console.error('Error fetching leaves', err));

    // get employee count
    axios.get(`http://localhost:8080/api/employees/department/${managerName}`)
      .then(res => {
        setEmployeeCount(res.data.length);
      })
      .catch(err => console.error('Error fetching employees', err));
  }, [managerName]);

  return (
    <div className="manager-dashboard">
      <ManagerSidebar />

      <div className="dashboard-content">
        <h2 className="dashboard-title">Welcome, {managerName}!</h2>

        <div className="dashboard-cards">
          <Link to="/manager/department-employees" className="card">
            <div className="card-icon">👥</div>
            <div className="card-text">
              <h3>Department Employees</h3>
              <p>{employeeCount} employee(s) in your department</p>
            </div>
          </Link>

          <Link to="/manager/approve-leaves" className="card">
            <div className="card-icon">✅</div>
            <div className="card-text">
              <h3>Pending Leaves to Approve</h3>
              <p>{pendingCount} leave request(s) pending</p>
            </div>
          </Link>

          <Link to="/manager/performance-reviews" className="card">
            <div className="card-icon">📊</div>
            <div className="card-text">
              <h3>Performance Reviews</h3>
              <p>View recent performance evaluations</p>
            </div>
          </Link>
        </div>

        <div className="announcement-section">
  <h3>Post Announcement to Department</h3>
  <textarea
    value={newAnnouncement}
    onChange={e => setNewAnnouncement(e.target.value)}
    placeholder="Enter announcement..."
    rows="3"
  ></textarea>
  <button onClick={() => {
    const departmentId = localStorage.getItem("departmentId");
    if (!newAnnouncement.trim() || !departmentId) {
      alert("Message & departmentId required");
      return;
    }
    fetch(`http://localhost:8080/api/announcements?message=${encodeURIComponent(newAnnouncement)}&departmentId=${departmentId}`, {
      method: "POST"
    })
    .then(() => {
      alert("Announcement posted!");
      setNewAnnouncement("");
    })
    .catch(err => console.error(err));
  }}>
    Post Announcement
  </button>
</div>


      <div className="bottom-section">
  <div className="calendar-card">
    <h3>Calendar</h3>
    <Calendar
      onChange={setDate}
      value={date}
      tileClassName={({ date: d, view }) =>
        d.toDateString() === new Date().toDateString() ? 'today-highlight' : null
      }
    />
  </div>

  <div className="recent-leaves-card">
    <h3>Recent Leave Requests</h3>
    <ul>
      {recentLeaves.length > 0 ? recentLeaves.map((leave, index) => (
        <li key={index}>
          {leave.employeeName} - {leave.type} ({leave.status})
        </li>
      )) : <li>No recent leave requests</li>}
    </ul>
  </div>
</div>

      </div>
    </div>
  );
};

export default ManagerDashboard;

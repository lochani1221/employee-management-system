import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList'; // you'll create this next
import Layout from './components/Layout';
import DepartmentByIdPage from './components/DepartmentByIdPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import HRDashboard from './components/HRDashboard';

import EmployeeDashboard from './components/EmployeeDashboard';
import MyProfile from './components/MyProfile';
import ApplyLeave from './components/ApplyLeave';
import ManagerDashboard from './manager/ManagerDashboard';
import DepartmentEmployees from './manager/DepartmentEmployees';
import ApproveLeaves from './manager/ApproveLeaves';
import ManageAttendance from "./manager/ManageAttendance";


import ViewAttendance  from './components/ViewAttendance';



import ViewLeaveStatus from './components/ViewLeaveStatus';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/departments/id/:id" element={<DepartmentByIdPage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hr" element={<HRDashboard />} />

           
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/department-employees" element={<DepartmentEmployees />} />
            <Route path="/manager/approve-leaves" element={<ApproveLeaves />} />
            <Route path="/manager/manage-attendance" element={<ManageAttendance />} />

            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/employee/myprofile" element={<MyProfile />} />
            <Route path="/employee/apply-leave" element={<ApplyLeave />} />
            <Route path="/employee/view-attendance" element={<ViewAttendance />} />
            <Route path="/employee/view-leave-status" element={<ViewLeaveStatus />} />
            </Routes>
      </Layout>
    </Router>
  );
}

export default App;

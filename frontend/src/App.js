import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList'; // you'll create this next
import Layout from './components/Layout';
import DepartmentByIdPage from './components/DepartmentByIdPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

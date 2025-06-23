import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddEmployee.css'; // custom styles

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    departmentId: '',
    address: '',
    gender: '',
    appointed_date: '',
    status: ''
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error('Failed to fetch departments', err));
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const employeeData = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    emailId: employee.emailId,
    department: { id: parseInt(employee.departmentId) },
    address: employee.address,
    gender: employee.gender,
    appointed_date: employee.appointed_date,
    status: employee.status
  };

  axios.post(
    'http://localhost:8080/api/V1/employees',
    employeeData,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(() => {
      alert('Employee saved successfully!');
      setEmployee({
        firstName: '',
        lastName: '',
        emailId: '',
        departmentId: '',
        address: '',
        gender: '',
        appointed_date: '',
        status: ''
      });
    })
    .catch((error) => {
      console.error('Save error:', error);
      alert('Error saving employee.');
    });
};



  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-left">
          <label>First Name</label>
          <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="emailId" value={employee.emailId} onChange={handleChange} required />

          <label>Department</label>
          <select name="departmentId" value={employee.departmentId} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>

          <label>Gender</label>
          <select name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-right">
          <label>Last Name</label>
          <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} required />

          <label>Address</label>
          <input type="text" name="address" value={employee.address} onChange={handleChange} required />

          <label>Appointed Date</label>
          <input type="date" name="appointed_date" value={employee.appointed_date} onChange={handleChange} required />

          <label>Status</label>
          <input type="text" name="status" value={employee.status} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;

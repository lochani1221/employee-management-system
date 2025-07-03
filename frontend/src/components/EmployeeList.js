import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/EmployeeService';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = () => {
    EmployeeService.getEmployees().then((res) => setEmployees(res.data));
  };

  const fetchDepartments = () => {
    axios.get('http://localhost:8080/api/v1/departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error('Failed to fetch departments', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      EmployeeService.deleteEmployee(id).then(() => fetchEmployees());
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      const selectedDept = departments.find(d => d.id === parseInt(value));
      setSelectedEmployee({ ...selectedEmployee, department: selectedDept });
    } else {
      setSelectedEmployee({ ...selectedEmployee, [name]: value });
    }
  };

  const handleUpdate = () => {
    EmployeeService.updateEmployee(selectedEmployee.id, selectedEmployee)
      .then(() => {
        setShowEditModal(false);
        fetchEmployees();
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center mb-0">Employee Directory</h3>
        </div>
        <div className="card-body">
          {employees.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light text-center">
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email ID</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Date Appointed</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.firstName}</td>
                      <td>{emp.lastName}</td>
                      <td>{emp.emailId}</td>
                      <td>{emp.address}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.role}</td>
                      <td>{emp.department?.name || 'N/A'}</td>
                      <td>{emp.status}</td>
                      <td>{emp.appointed_date}</td>
                      <td className="text-center">
                        <i
                          className="bi bi-pencil-square text-primary me-3"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleEditClick(emp)}
                        ></i>
                        <i
                          className="bi bi-trash-fill text-danger"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleDelete(emp.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">No employees found.</p>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={selectedEmployee?.firstName || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={selectedEmployee?.lastName || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="emailId"
                value={selectedEmployee?.emailId || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={selectedEmployee?.address || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={selectedEmployee?.gender || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={selectedEmployee?.status || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Appointed date</Form.Label>
              <Form.Control
                type="date"
                name="appointed_date"
                value={selectedEmployee?.appointed_date || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={selectedEmployee?.department?.id || ''}
                onChange={handleEditChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </Form.Select>
                <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={selectedEmployee?.role || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList;

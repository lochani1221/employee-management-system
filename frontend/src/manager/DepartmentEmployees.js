import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ManagerSidebar from './ManagerSidebar';
import './DepartmentEmployees.css';

const DepartmentEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const departmentId = localStorage.getItem('departmentId');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/V1/employees/department/id/${departmentId}`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Failed to fetch employees', err));
  }, [departmentId]);

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    emp.emailId.toLowerCase().includes(search.toLowerCase()) ||
    emp.role?.toLowerCase().includes(search.toLowerCase()) ||
    emp.department?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const exportToExcel = () => {
    const data = filteredEmployees.map(emp => ({
      Name: `${emp.firstName} ${emp.lastName}`,
      Email: emp.emailId,
      Status: emp.status,
      Department: emp.department?.name || '-',
      Address: emp.address,
      Gender: emp.gender,
      AppointedDate: emp.appointed_date,
      Role: emp.role
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'Department_Employees.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Department Employees', 14, 15);
    const tableColumn = ["Name", "Email", "Status", "Department", "Address", "Gender", "Appointed Date", "Role"];
    const tableRows = [];

    filteredEmployees.forEach(emp => {
      const empData = [
        `${emp.firstName} ${emp.lastName}`,
        emp.emailId,
        emp.status,
        emp.department?.name || '-',
        emp.address,
        emp.gender,
        emp.appointed_date,
        emp.role
      ];
      tableRows.push(empData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 }
    });

    doc.save('Department_Employees.pdf');
  };

  return (
    <div className="department-employees">
      <ManagerSidebar />
      
      <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>
        Employees in {filteredEmployees[0]?.department?.name || 'Your Department'} Department
      </h2>

      <div className="search-export-bar">
        <input
          type="text"
          placeholder="Search by name, email, role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="excel-btn" onClick={exportToExcel}>Export to Excel</button>
        <button className="pdf-btn" onClick={exportToPDF}>Export to PDF</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Department</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Appointed Date</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.emailId}</td>
              <td>{emp.status}</td>
              <td>{emp.department?.name || '-'}</td>
              <td>{emp.address}</td>
              <td>{emp.gender}</td>
              <td>{emp.appointed_date}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentEmployees;

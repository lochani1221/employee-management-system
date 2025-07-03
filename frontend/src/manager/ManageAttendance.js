import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ManagerSidebar from './ManagerSidebar';
import './ManageAttendance.css';  // Import external CSS here

const ManageAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [editId, setEditId] = useState(null);
  const [editTimestamp, setEditTimestamp] = useState("");
  const [showModal, setShowModal] = useState(false);

  const departmentId = localStorage.getItem("departmentId");

  const loadData = () => {
    fetch(`http://localhost:8080/api/attendance/department/${departmentId}/search?name=${searchName}`)
      .then(res => res.json())
      .then(data => setAttendances(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, [searchName]);

  const filtered = attendances.filter(a => {
    const date = new Date(a.timestamp);
    return date.getMonth() + 1 === Number(selectedMonth) && date.getFullYear() === Number(selectedYear);
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      fetch(`http://localhost:8080/api/attendance/${id}`, { method: "DELETE" })
        .then(() => loadData());
    }
  };

  const handleEdit = (attendance) => {
    setEditId(attendance.id);
    setEditTimestamp(attendance.timestamp.substring(0,16)); // yyyy-MM-ddTHH:mm
    setShowModal(true);
  };

  // Export filtered attendance to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Attendance Sheet - ${searchName || 'All Employees'}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Month: ${selectedMonth}   Year: ${selectedYear}`, 14, 28);

    const tableColumn = ["Employee", "Date", "Time"];
    const tableRows = filtered.map(a => [
      `${a.employee.firstName} ${a.employee.lastName}`,
      new Date(a.timestamp).toLocaleDateString(),
      new Date(a.timestamp).toLocaleTimeString()
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    });

    doc.save(`attendance_${searchName || 'all'}_${selectedMonth}_${selectedYear}.pdf`);
  };

  // Export filtered attendance to Excel
  const exportToExcel = () => {
    const data = filtered.map(a => ({
      Employee: `${a.employee.firstName} ${a.employee.lastName}`,
      Date: new Date(a.timestamp).toLocaleDateString(),
      Time: new Date(a.timestamp).toLocaleTimeString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, `attendance_${searchName || 'all'}_${selectedMonth}_${selectedYear}.xlsx`);
  };

  return (
    <div className="manage-attendance">
      <ManagerSidebar />
      
      <div>
        <h2>Manage Attendance Records</h2>
        
        {/* Search inputs */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search employee name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button className="print-btn" onClick={() => window.print()}>
            Print Sheet
          </button>
          <button className="pdf-btn" onClick={exportToPDF}>
            Export PDF
          </button>
          <button className="excel-btn" onClick={exportToExcel}>
            Export Excel
          </button>
        </div>

        {/* Attendance Table */}
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date &amp; Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td>{a.employee.firstName} {a.employee.lastName}</td>
                <td>
                  {editId === a.id ? (
                    <input
                      type="datetime-local"
                      value={editTimestamp}
                      onChange={(e) => setEditTimestamp(e.target.value)}
                    />
                  ) : (
                    new Date(a.timestamp).toLocaleString()
                  )}
                </td>
                <td>
  <div className="action-buttons-wrapper">
    {editId === a.id ? (
      <>
        <button className="pdf-btn"
          onClick={() => {
            fetch(`http://localhost:8080/api/attendance/${a.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ timestamp: editTimestamp }),
            }).then(() => {
              setEditId(null);
              setShowModal(false);
              loadData();
            });
          }}
        >
          Save
        </button>
        <button className="excel-btn" onClick={() => { setEditId(null); setShowModal(false); }}>
          Cancel
        </button>
      </>
    ) : (
      <>
        <button className="pdf-btn" onClick={() => handleEdit(a)}>Edit</button>
        <button className="excel-btn" onClick={() => handleDelete(a.id)}>Delete</button>
      </>
    )}
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Edit Attendance</h3>
              <input
                type="datetime-local"
                value={editTimestamp}
                onChange={(e) => setEditTimestamp(e.target.value)}
              />
              <div className="modal-buttons">
                <button
                  onClick={() => {
                    fetch(`http://localhost:8080/api/attendance/${editId}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ timestamp: editTimestamp }),
                    })
                      .then(() => {
                        setShowModal(false);
                        setEditId(null);
                        loadData();
                      })
                      .catch((err) => console.error(err));
                  }}
                  className="pdf-btn"
                >
                  Save
                </button>
                <button onClick={() => setShowModal(false)} className="excel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAttendance;

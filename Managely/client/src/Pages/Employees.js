import React, { useState, useEffect  } from 'react'
import { useTable } from 'react-table'
import NavBar from '../Components/NavBar'
import '../Styles/EmployeesStyles.css'
import axios from "axios";
import jsPDF from '../../node_modules/jspdf/dist/jspdf.umd.min.js'
import { applyPlugin } from 'jspdf-autotable'
applyPlugin(jsPDF)

function Employees() {

  const [data, setData] = useState([]);
  const [newRow, setNewRow] = useState({
    ID: '',
    fName: '',
    lName: '',
    gender: '',
    dateOfBirth: '',
    termInfo: '',
    salary: '',
  });
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRow),
    })
      .then(response => response.json())
      .then(data => {
        setData([...data, data]);
        setNewRow({
          ID: '',
          fName: '',
          lName: '',
          gender: '',
          dateOfBirth: '',
          termInfo: '',
          salary: '',
        });
      })
      .catch(error => console.error(error));

      window.location.reload(false);
  };

  const handleEdit = row => {
    setEditingRow(row);
    setNewRow(row);

  };

  const handleUpdate = event => {
    event.preventDefault();
    fetch(`/api/data/${editingRow.ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRow),
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setEditingRow(null);
        setNewRow({
          ID: '',
          fName: '',
          lName: '',
          gender: '',
          dateOfBirth: '',
          termInfo: '',
          salary: '',
        });
      })
      .catch(error => console.error(error));

      window.location.reload(false);
  };

  const handleDelete = ID => {
    fetch(`/api/data/${ID}`, { method: 'DELETE' })
      .then(() => setData(data.filter(row => row.ID !== ID)))
      .catch(error => console.error(error));

      window.location.reload(false);
  };

  function downloadPDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add report header
    doc.setFontSize(18);
    doc.text('Employee Data Report', 14, 22);
  
    // Add table data
    const tableRows = [];
    const tableColumns = ['ID', 'First Name', 'Last Name', 'Gender', 'Date of Birth', 'Term Info', 'Salary'];
  
    data.forEach(row => {
      const tableRow = [
        row.ID.toString(),
        row.fName,
        row.lName,
        row.gender,
        row.dateOfBirth,
        row.termInfo,
        row.salary.toString(),
      ];
      tableRows.push(tableRow);
    });
  
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 30,
    });
  
    // Download the PDF file
    doc.save('employee-data-report.pdf');
  }

  function handleDownloadPDF() {
    downloadPDF();
  }

  function convertDate(date) {
    if (date == undefined) {
      return date;
    }
    let dateArray = date.split(" ")
    let newDate = dateArray[2] + " " + dateArray[1] + ", " + dateArray[3];
    return (newDate);
  }
  
  return (
    <div>
      <NavBar/>
      <div className='employeesContainer'>
        <div className='employeesTitle'>
          Employees
        </div>
        <div className='employees'>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>fName</th>
          <th>lName</th>
          <th>gender</th>
          <th>dateOfBirth*</th>
          <th>termInfo</th>
          <th>salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
            {data.map(row => (
              <tr key={row.ID}>
                <td style={{ border: '1px solid black' }}>{row.ID}</td>
                <td style={{ border: '1px solid black' }}>{row.fName}</td>
                <td style={{ border: '1px solid black' }}>{row.lName}</td>
                <td style={{ border: '1px solid black' }}>{row.gender}</td>
                <td style={{ border: '1px solid black' }}>{convertDate(row.dateOfBirth)}</td>
                <td style={{ border: '1px solid black' }}>{row.termInfo}</td>
                <td style={{ border: '1px solid black' }}>{row.salary}</td>
                <td>
                  <button onClick={() => handleEdit(row)}>Edit</button>
                  <button onClick={() => handleDelete(row.ID)}>Delete</button>
                </td>
              </tr>
            ))}
            <tr>
          <td>
            <input
              type="text"
              name="ID"
              value={newRow.ID}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="fName"
              value={newRow.fName}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="lName"
              value={newRow.lName}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="gender"
              value={newRow.gender}
              onChange={handleInputChange}/>
              </td>
              <td>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={newRow.dateOfBirth}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="termInfo"
                  value={newRow.termInfo}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="salary"
                  value={newRow.salary}
                  onChange={handleInputChange}
                />
              </td>
              <td>
              {!editingRow ? (
                  <button onClick={handleSubmit}>Add</button>
                ) : null}
                {editingRow ? (
                  <button onClick={handleUpdate}>Update</button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
        
        </div>
        <p className='note'>* Date input format: yyyy-mm-dd</p>
      </div>
      <div className='EButtoncontainer'>
        <button className='EButtonitem' onClick={handleDownloadPDF}>Download PDF Report</button>
      </div>
    </div>
  )
}

export default Employees
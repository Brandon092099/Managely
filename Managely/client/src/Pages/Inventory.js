import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar'
import '../Styles/InventoryStyles.css'
import axios from "axios";
import jsPDF from '../../node_modules/jspdf/dist/jspdf.umd.min.js'
import { applyPlugin } from 'jspdf-autotable'
applyPlugin(jsPDF)


function Inventory() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ typeID: '', invenID: '', name: '', brand: '', price: '', amount: '' });
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/inventory');
      setData(result.data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  }

  const handleAdd = async () => {
    await axios.post('/api/inventory', newData);
    const result = await axios('/api/inventory');
    setData(result.data);
    setNewData({ typeID: '', invenID: '', name: '', brand: '', price: '', amount: '' });
  }

  const handleEdit = async (id, type, n, b, p, a) => {
    setNewData({ typeID: type, invenID: id, name: n, brand: b, price: p, amount: a });
    setEditing(true);
    setEditID(id);
  }

  const handleSave = async (id) => {
    newData.invenID = id;
    await axios.put(`/api/inventory/${id}`, newData);
    const result = await axios('/api/inventory');
    setData(result.data);
    setEditing(false);
    setEditID(null);
    setNewData({ typeID: '', invenID: '', name: '', brand: '', price: '', amount: '' });
  }

  const handleDelete = async (id) => {
    await axios.delete(`/api/inventory/${id}`);
    const result = await axios('/api/inventory');
    setData(result.data);
  }

  function downloadPDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add report header
    doc.setFontSize(18);
    doc.text('Inventory Data Report', 14, 22);
  
    // Add table data
    const tableRows = [];
    const tableColumns = ['typeID', 'invenID', 'name', 'brand', 'price', 'amount'];
  
    data.forEach(row => {
      const tableRow = [
        row.typeID.toString(),
        row.invenID.toString(),
        row.name,
        row.brand,
        row.price.toString(),
        row.amount.toString(),
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

  function handleCancel(){
    setEditing(false);
    setNewData({ typeID: '', invenID: '', name: '', brand: '', price: '', amount: '' });
  }
  
  return (
    <div>
      <NavBar/>
      <div className='inventoryContainer'>
        <div className='inventoryTitle'>
          Inventory
        </div>
        <div className='inventory'>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Type ID</th>
          <th>Inventory ID*</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.invenID}>
            <td>{editing && editID === row.invenID ? <input type="text" name="typeID" value={newData.typeID} onChange={handleChange} /> : row.typeID}</td>
            <td>{editing && editID === row.invenID ? <input type="text" name="invenID" value={newData.invenID} onChange={handleChange} /> : row.invenID}</td>
            <td>{editing && editID === row.invenID ? <input type="text" name="name"  value={newData.name} onChange={handleChange} /> : row.name}</td>
            <td>{editing && editID === row.invenID ? <input type="text" name="brand"  value={newData.brand} onChange={handleChange} /> : row.brand}</td>
            <td>{editing && editID === row.invenID ? <input type="text" name="price"  value={newData.price} onChange={handleChange} /> : row.price}</td>
            <td>{editing && editID === row.invenID ? <input type="text" name="amount"  value={newData.amount} onChange={handleChange} /> : row.amount}</td>
            <td>
              {editing && editID === row.invenID ? (
                <>
                  <button onClick={() => handleSave(row.invenID)}>Save</button>
                  <button onClick={() => {handleCancel()}}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(row.invenID, row.typeID, row.name, row.brand,row.price,row.amount)}>Edit</button>
                  <button onClick={() => handleDelete(row.invenID)}>Delete</button>
                </>
              )}
            </td></tr>
    ))}
  </tbody>
  {editing ?
  null :
  <tfoot>
  <tr>
    <td><input type="text" name="typeID" value={newData.typeID} onChange={handleChange} /></td>
    <td><input type="text" name="invenID" value={newData.invenID} onChange={handleChange} /></td>
    <td><input type="text" name="name" value={newData.name} onChange={handleChange} /></td>
    <td><input type="text" name="brand" value={newData.brand} onChange={handleChange} /></td>
    <td><input type="text" name="price" value={newData.price} onChange={handleChange} /></td>
    <td><input type="text" name="amount" value={newData.amount} onChange={handleChange} /></td>
    <td><button onClick={handleAdd}>Add</button></td>
  </tr>
</tfoot>
}
</table>

        </div>
        <p className='note'>* Inventory ID must remain the same when editing</p>
      </div>
      <div className='IButtoncontainer'>
        <button className='IButtonitem' onClick={handleDownloadPDF}>Download PDF Report</button>
      </div>
    </div>
  )
}

export default Inventory
import React, { useState, useEffect } from 'react'
import EmployeeNavBar from '../Components/EmployeeNavBar'
import '../Styles/HomeStyles.css'
import axios from "axios";
import { Link } from 'react-router-dom'

function EmployeeHome() {

  const [data, setData] = useState([{}])
  const [invData, setInvData] = useState([{}])




  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/inventory');
      setInvData(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <EmployeeNavBar/>
      <div className='HannouncementsContainer'>
        <div className='HannouncementsTitle'>
          Announcements
        </div>
        <div className='Hannouncements'>
        Product Presentation: 04/17/23
        </div>
      </div>
      <div className='HpagesContainer'>
        <Link className='Navitem' to='/EmployeeInventory'>
        <div className='HpageBox'>
          <div className='HpagesTitle'>
            Inventory
          </div>
          <div className='Hpages'>
            <table>
      <thead>
        <tr>
          <th>Type ID</th>
          <th>Inventory ID</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {invData.map((row) => (
          <tr key={row.invenID}>
                <td style={{ border: '1px solid black' }}>{row.typeID}</td>
                <td style={{ border: '1px solid black' }}>{row.invenID}</td>
                <td style={{ border: '1px solid black' }}>{row.name}</td>
                <td style={{ border: '1px solid black' }}>{row.brand}</td>
                <td style={{ border: '1px solid black' }}>{row.price}</td>
                <td style={{ border: '1px solid black' }}>{row.amount}</td></tr>
    ))}
  </tbody>
</table>
          </div>
        </div>
        </Link>

      </div>
    </div>
  )
}

export default EmployeeHome
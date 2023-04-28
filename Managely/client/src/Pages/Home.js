import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar'
import '../Styles/HomeStyles.css'
import axios from "axios";
import { Link } from 'react-router-dom'

function Home() {

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

  function convertDate(date) {
    if (date == undefined) {
      return date;
    }
    console.log(date)
    let dateArray = date.split(" ")
    let newDate = dateArray[2] + " " + dateArray[1] + ", " + dateArray[3];
    return (newDate);
  }

  return (
    <div>
      <NavBar/>
      <div className='HannouncementsContainer'>
        <div className='HannouncementsTitle'>
          Announcements
        </div>
        <div className='Hannouncements'>
          Product Presentation: 04/17/23
        </div>
      </div>
      <div className='HpagesContainer'>
      <Link className='Navitem' to='/Employees'>
        <div className='HpageBox'>
          <div className='HpagesTitle'>
            Employees
          </div>
          <div className='Hpages'>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>fName</th>
          <th>lName</th>
          <th>gender</th>
          <th>dateOfBirth</th>
          <th>termInfo</th>
          <th>salary</th>
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
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
        </Link>
        <Link className='Navitem' to='/Inventory'>
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

export default Home
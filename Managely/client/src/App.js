import { BrowserRouter as Router, Routes, 
  Route, Navigate,} from "react-router-dom";

import React, { useState, useEffect } from 'react'

import Home from './Pages/Home';
import Employees from './Pages/Employees';
import Inventory from './Pages/Inventory';
import Login from './Pages/Login';
import EmployeeHome from './Pages/EmployeeHome';
import EmployeeInventory from './Pages/EmployeeInventory';

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>

        <Route exact path="/" element={<Login/>} />

          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/Home" element={<Home/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/Employees" element={<Employees/>} />
            
          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path="/Inventory" element={<Inventory/>} />

          <Route path="/EmployeeInventory" element={<EmployeeInventory/>} />

          <Route path="/EmployeeHome" element={<EmployeeHome/>} />
        </Routes>
      </Router>
    </>
  );

  //EXAMPLE CODE FOR BACKEND
  // const [data, setData] = useState([{}])

  // useEffect(() => {
  //   fetch("/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])
  // return (
  //   <div>
  //     {(typeof data.members === 'undefined') ? (
  //       <p>Loading...</p>
  //     ) : (
  //       data.members.map((member, i) => (
  //         <p key={i}>{member}</p>
  //       )) 
  //     )}

  //   </div>
  // )
}

export default App
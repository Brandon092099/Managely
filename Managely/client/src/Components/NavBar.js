import React, { useState, useEffect } from 'react'
import '../Styles/NavBarStyles.css'
import { Link } from 'react-router-dom'

function NavBar() {

  
  return (
    <div>
      <img className='logo' title="Managely Logo" src='/images/managely_logo.png' alt="managely logo" />
      <div className='Navcontainer'>
        <Link className='Navitem' to='/Home'>
          Home
        </Link>
        <Link className='Navitem' to='/Employees'>
          Employees
        </Link>
        <Link className='Navitem' to='/Inventory'>
          Inventory
        </Link>
        <Link className='Navitem' to='/'>
          Logout
        </Link>
      
      </div>
    </div>
  )
}

export default NavBar
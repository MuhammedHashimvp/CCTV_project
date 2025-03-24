import React from 'react'
import './Navbar.css'
import Button from 'react-bootstrap/Button';
import {  useNavigate } from 'react-router-dom';



function Navbar() {

  const navv =useNavigate()
  const logout=()=>{
    sessionStorage.clear('token')
    navv('/')
  }


  return (
    <div>
        <header className='header'>
          <div className='d-flex align-items-center '>
          <img  className='rounded-circle pe-2' height={'80 px'} src="./background.jpg" alt="" />
          
            <h1 className='logo'>EyeQ</h1>
          </div>

            <div className='search'>
            <input type="text" placeholder='Search here...' />

            </div>

            <nav className='navbar text-white'>
                <a onClick={()=>navv('/home')}>Home</a>
                <a >About</a>
                <a>Service</a>
                <a>Contact</a>

            </nav>
              
              
            <Button variant="success" onClick={()=>navv("/admin")}>Admin</Button>
            <Button variant="danger" onClick={()=>logout()}>Logout</Button>

        </header>
    </div>
  )
}

export default Navbar
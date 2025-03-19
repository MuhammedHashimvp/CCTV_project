import React from 'react'
import './Navbar.css'
import Button from 'react-bootstrap/Button';
import { href, useNavigate } from 'react-router-dom';



function Navbar() {

  const navv =useNavigate()
  const logout=()=>{
    sessionStorage.clear('token')
    navv('/')
  }


  return (
    <div>
        <header className='header'>
            <a href="" className='logo'>Logo</a>
            <div className='search'>
            <input type="text" placeholder='Search here...' />

            </div>

            <nav className='navbar text-white'>
                <a onClick={()=>navv('/home')}>Home</a>
                <a >About</a>
                <a>Service</a>
                <a>Contact</a>

            </nav>
              
              
            <Button variant="danger" onClick={()=>logout()}>Logout</Button>

        </header>
    </div>
  )
}

export default Navbar
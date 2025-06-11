import React, { useState } from 'react'
import './Navbar.css'
import {  useNavigate } from 'react-router-dom';
import { Navbar as Navi, Container, Nav, NavDropdown } from 'react-bootstrap';




function Navbar() {
  const [clr,setclr]=useState(0)
  const navv =useNavigate()
  const logout=()=>{
    sessionStorage.clear('token')
    navv('/')
  }
  const colorlist =["#444","#432","#003","#245","#4f2","#ff2","#ee0","#f0f"]
  const themeset=()=>{
    document.documentElement.style.setProperty('--mainclr',colorlist[clr])
    setclr(clr+1)
  }


  return (
    <div>
        {/* <header className='header'>
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

        </header> */}
        <Navi collapseOnSelect expand="lg" className="header" variant='dark'>
      <Container>
      <img  className='rounded-circle m-1' height={'70 px'} src="./background.jpg" alt="" />

        <Navi.Brand ><h3>EYEQ</h3></Navi.Brand>
        <Navi.Toggle aria-controls="responsive-navbar-nav" />
        <Navi.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navv('/home')} >Home</Nav.Link>
            <Nav.Link onClick={()=>(navv('/analyzer'))}  >Analyze Video</Nav.Link>
            <Nav.Link >About</Nav.Link>
            
          </Nav>
          <Nav>
            <Nav.Link className='text-light nv-light' onClick={()=>themeset()}>theme</Nav.Link>
            <Nav.Link className='text-success nv-success' onClick={()=>navv("/admin")}>Admin</Nav.Link>
            <Nav.Link className='text-danger nv-danger' onClick={()=>logout()} >
              Logout
            </Nav.Link>
          </Nav>
        </Navi.Collapse>
      </Container>
    </Navi>
    </div>
  )
}

export default Navbar
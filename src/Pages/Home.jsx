import React from 'react'
import Navbar from '../Componenet/Navbar'
import Card from '../Componenet/Card'
import { Route, useNavigate } from 'react-router-dom'
function Home() {
  const navv =useNavigate()
    const live=()=>{
      navv('/video')
    }
  
  return (
    <>
    
    
        <Navbar/>
         <Card/> 
        
        <div className='container'>
    <button onClick={()=>live()} type="button" class="btn btn-success">Live Camera</button>

    </div>

    </>
  )
}

export default Home
import React from 'react'
import './Dash.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Hom from './Hom'

function Dashboard() {
  return (
    <div className='grid-container d-flex justify-content-between w-50'>
        <Header/>
        <Sidebar/>
        <Hom/>

    </div>
  )
}

export default Dashboard
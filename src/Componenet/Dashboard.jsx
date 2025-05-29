import React from 'react'
import Navbar from './Navbar'

function Dashboard() {
  return (
    <>
    <Navbar/>

    <div className='container pt-3'>
      <h2 className='text-center'>EyeQ survaillance Dashboard</h2>
      <div className='w-100 p-3 border border-1 border-secondary rounded-3'>
        <h4>⚠️ Motion Alerts</h4>
        <div className=' bg-dark rounded-3 text-white p-2 '>
          <p>Motion detected at [ ]</p>
          <p>Motion detected at [ ]</p>
          <p>Motion detected at [ ]</p>
        </div>
        <div className='d-flex gap-4 pt-3'>
          <div className='w-50  border border-1 border-secondary rounded-3 p-2'>
            <p>Camera 1</p>
            <div className='bg-dark rounded-3'>f<br /></div>
          </div>
          <div className='w-50  border border-1 border-secondary rounded-3 p-2'>
            <p>Camera 1</p>
            <div className='bg-dark rounded-3'>f<br /></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
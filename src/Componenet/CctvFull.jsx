import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CctvFull() {
    const navv =useNavigate()
  return (
    <>
<div className='min-vh-100 bg-dark w-100 d-flex flex-column justify-content-center'>
    <div className='ps-5 ms-3 pb-3' >
        <button className='btn text-light' onClick={()=>navv('/home')}>&lt;Back</button>
    </div>
  <div className='d-flex flex-wrap w-100 gap-1 justify-content-center'>
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i, j) => (
      <div
        key={j}
        className='bg-light position-relative'
        style={{ width: '23%', aspectRatio: '4 / 3' }}
      >
        <div className='position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center border border-secondary '>
          <video src="" className='w-100 h-100' controls></video>
        </div>
      </div>
    ))}
  </div>
</div>


    </>
  )
}

export default CctvFull
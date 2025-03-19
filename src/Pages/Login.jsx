import React, { useState } from 'react'
import './Login.css'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { TokenGenerate } from '../Api/Allapi';



function Login() {
    const [logData,setlogData]=useState({username:"",password:""})
    const navv=useNavigate()
    const Loginbutton=()=>{
        navv('/home')
    }
    const login = (e) => {
        e.preventDefault(); // Prevent page refresh
        TokenGenerate(logData)
          .then(res => {
            sessionStorage.setItem('token', res.data.token);
            navv('/home');
          })
          .catch(err => console.error("Login failed", err)); // Handle API errors
    }





  return (
    <div className='logindiv'>
    <div className='wrapper'>
        <form action="">
            <h1>Login</h1>
            <div className='input-box'>
                <input onChange={(e)=>(setlogData({...logData,username:e.target.value}))}
                   type="text" placeholder='username' required /><FaUser className='icon' />

            </div>
            <div className='input-box'>
                <input type="password" placeholder='password' required onChange={(e)=>(setlogData({...logData,password:e.target.value}))}/>
                <RiLockPasswordFill  className='icon'/>

            </div>
            <div className='forgot'> 
                <a href="#">Forgot Password</a>
            </div>
            <button onClick={login} type='submit'>Login</button>
        </form>
    </div>
    </div>

  )
}

export default Login
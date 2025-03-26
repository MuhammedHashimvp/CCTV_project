import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Video from '../src/Componenet/Video'
import {Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Componenet/Admin'
import Dashboard from './Componenet/Dashboard'



function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/> 
        <Route path='/home/:seldate' element={<Home/>}/> 
        <Route path='/video' element={<Video/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
       </Routes>
       
    </>
  )
}

export default App

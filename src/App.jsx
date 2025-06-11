import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Video from '../src/Componenet/Video'
import {Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Componenet/Admin'
import Dashboard from './Componenet/Dashboard'
import Behaviour from './Componenet/Behaviour'
import Testcomponent from './Componenet/Testcomponent'
import Students from './Componenet/Students'
import Videotrim from './Componenet/Videotrim'
import Testt from './Componenet/Testt'
import Hogdetected from './Componenet/Hogdetected'
import { ToastContainer, toast } from 'react-toastify';
import VideoAnalyze from './Componenet/VideoAnalyze'
import Foot from './Componenet/Foot'
import CctvFull from './Componenet/CctvFull'


function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/> 
        <Route path='/home/:seldate' element={<Home/>}/> 
        {/* <Route path='/video' element={<Video/>}/> */}
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
        <Route path='/beh' element={<Behaviour/>}/>
        <Route path='/stdlist' element={<Students/>}/>
        <Route path='/vid' element={<Videotrim/>}/>
        <Route path='/analyzer' element={<VideoAnalyze/>}/>
        <Route path='/vidtrim' element={<Hogdetected/>}/>
        <Route path='/video' element={<CctvFull/>}/>

       </Routes>
               <ToastContainer />

               <Foot/>

       
    </>
  )
}

export default App

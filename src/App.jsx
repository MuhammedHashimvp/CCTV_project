import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Video from '../src/Componenet/Video'
import {Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/> 
        <Route path='/home/:seldate' element={<Home/>}/> 
        <Route path='/video' element={<Video/>}/>

       </Routes>
       
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Auth from './pages/Auth'
import PageNotFound from './pages/PageNotFound'
import { useContext } from 'react'
import { loginContext } from './context/Contextshare'

function App() {
  const {loginStatus} = useContext(loginContext)
  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/dashboard' element={loginStatus?<Dashboard/>:<PageNotFound/> }/> 
        <Route path='/project' element={<Project/>}/>  
        <Route path='/register' element={<Auth register/> }/> 
        <Route path='/login' element={<Auth/>}/> 
        <Route path='*' element={<PageNotFound/>}/>  
      </Routes>
      <Footer/>
    </>
  )
}

export default App

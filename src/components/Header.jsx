import React, { useContext, useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faStackOverflow} from '@fortawesome/free-brands-svg-icons'
import{faPowerOff} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { loginContext } from '../context/Contextshare';

function Header() {
  const navigate = useNavigate()
  const [ token, setToken] = useState("")
  const {loginStatus, setLoginStatus} = useContext(loginContext)

  const logout = () =>{
    
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setLoginStatus(false)
    navigate('/')
  }
  console.log(loginStatus);
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken((sessionStorage.getItem("token")))
    }
  },[])

  return (
    <>
    
    <Navbar className='bg-success p-4'>
      <Container>
        <Nav.Item className='text-light'>
          <Link to={'/'} className='text-decoration-none'><h3 className='text-dark'><FontAwesomeIcon icon={faStackOverflow} className='me-2 '/>Project Fair</h3></Link>
        </Nav.Item>
        {token &&
        <button className='btn btn-warning rounded-0' onClick={logout}> <FontAwesomeIcon icon={faPowerOff} /> Logout</button>
        }
      </Container>
    </Navbar>
    </>
  )
}

export default Header

import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import projectimage from '../assets/projectimage.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faCircleRight} from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectApi } from '../services/allApi'

function Home() {
  const [token,setToken]=useState('')
  const [homeProject, setHomeProject] = useState([])
  const getHomeProject = async()=>{
    const result = await homeProjectApi()
    setHomeProject(result.data)
  }
  console.log(homeProject);
  


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    getHomeProject()
  },[])
  return (
    <>
      <div className="container-fluid w-100 bg-success" style={{height:"100vh"}}>
        <Row className='pt-5'>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
            <div className='ps-md-0 ps-4'>
              <h1 style={{fontSize:"70px"}}>Project Fair</h1>
              <h6 className='text-dark'>One stop destination for all software development Projects</h6>
              {!token?
              <Link to={'/login'}><button className='btn btn-outline-light mt-4 me-2 px-4'>Get Started <FontAwesomeIcon icon={faCircleRight} className='ms-2' /></button></Link>
              :
              <Link to={'/dashboard'}><button className='btn btn-outline-light mt-4'>Manage Project <FontAwesomeIcon icon={faCircleRight} className='ms-2' /></button></Link>
              }
            </div>
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center p-5'>
            <img src={projectimage} alt="no image"  width={'80%'} height={'80%'} />
          </Col>
        </Row> 
      </div>

      <div className='container-fluid'>
        <h1 className='text-center my-5'>Explore Our Project</h1>
        <div className="row mb-5">
          {homeProject?.length>0 ?
          homeProject?.map((item)=>
          (<div className="col-md-4 d-flex justify-content-center p-4">
            <ProjectCard project={item}/>
          </div>))
          :
          null
          }
        </div>
        <Link to={'/project'} className='text-danger'><h5 className='text-center my-5'>See More Projects</h5></Link>
      </div>
    </>
  )
}

export default Home
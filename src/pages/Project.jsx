import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import lock from '../assets/lock1.gif'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../services/allApi'
import { all } from 'axios'

function Project() {
  const [token, setToken] = useState("")
  const [allProject, setAllProject] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const getAllProject = async(searchKey)=>{
    const result = await allProjectApi(searchKey)
    setAllProject(result.data)
  }

  console.log(allProject);
  useEffect(()=>{
    getAllProject(searchKey)
  },[searchKey])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    
  },[])
  return (
    <>
    <Header/>
    <div className="container-fluid">
      <h1 className='text-center mt-5'>All Projects</h1>

      {token?
      <div>
          <div className="row my-4">
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex">
              <input type="text" className='form-control' placeholder='Technologies' onChange={(e)=>setSearchKey(e.target.value)}/>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginLeft:"-30px",color:"lightgrey",marginTop:"12px"}} />
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row mb-5">
              {allProject?.length>0 ?
              allProject?.map((item)=>(
              <div className="col-md-4 d-flex justify-content-center p-4">
                <ProjectCard project={item}/>
              </div>))
              :
              <p className='text-danger'>no project to show</p>
              }
              
          </div>
      </div>
      :
      <div className='mt-5 w-100 row' >
        {/* not login */}
        <div className="col-md-2"></div>
        <div className="col-md-8 d-flex justify-content-center flex-column p-4">
          <img src={lock} alt="no image" width={'100%'} height={'50%'} className='px-5'/>
          <h5 className='mt-5 text-center'>Please <Link to={'/login'} className='text-danger'>Login</Link> to Explore More..</h5>
        </div>
        <div className="col-md-2"></div>
      </div>
}
    </div>
    </>
  )
}

export default Project
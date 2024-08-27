import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from '../components/EditProject'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faGithub} from '@fortawesome/free-brands-svg-icons'
import{faGlobe, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'

function MyProject() {
    const [userProject, setUserProject] = useState([])
    const [deleteStatus, setDeleteStatus] = useState(false)
    const {addResponse} = useContext(addResponseContext)
    const {editResponse} = useContext(editResponseContext)

    const getUserProject = async() =>{
        const token = sessionStorage.getItem("token")
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await userProjectApi(reqHeader)
        setUserProject(result.data);
        
    }
    console.log(editResponse);
    
    const handleDelete = async(id) =>{
        const result = await removeUserProjectApi(id)
        if(result.status==200){
            toast.success("deleted successfully")
            setDeleteStatus(true)
          }      
    }

    useEffect(()=>{
      getUserProject() 
      setDeleteStatus(false) 
    },[addResponse,deleteStatus,editResponse])
  return (
    <>
        <div className="shadow p-md-3 my-5 p-3 bg-light">
            <div className="d-flex mt-4 p-4">
                <h3 className='me-auto text-dark'>My Project</h3>
                <AddProject/>
            </div>
            {userProject?.length>0 ?
            userProject?.map((item)=>(
            <div className='p-3 mt-4 rounded-2 d-flex text-dark' style={{backgroundColor:"white"}} >
                <h5>{item.title}</h5>
                <div className='d-flex ms-auto align-items-center  '>
                    <EditProject project={item}/>
                    <Link to={item.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='me-3 ms-3' /></Link>
                    <Link to={item.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='me-3'/></Link>
                    <FontAwesomeIcon icon={faCircleXmark} className='me-3 text-danger' onClick={()=>handleDelete(item._id)}/>
                </div>
            </div>))
            :
            <p className='text-center'>no projects</p>
            }
        </div>

        <ToastContainer autoClose={2000} theme="coloured" position='top-center' />  
    </>
  )
}

export default MyProject
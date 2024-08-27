import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import project from '../assets/project.webp'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { serverurl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';

function EditProject({project}) {
  const [show, setShow] = useState(false);
  const {setEditResponse} = useContext(editResponseContext)
  const [projectDetails, setProjectDetails] = useState({
    title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projectImg:""
  })
  const [preview, setPreview] = useState('')

  console.log(project);
  

  const handlefile=(e)=>{
    setProjectDetails({...projectDetails,projectImg:e.target.files[0]})
  }
  
  const handleClose = () => {
    setShow(false)
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const handleCancel = () =>{
    setProjectDetails({
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      overview:project.overview,
      projectImg:""
      })
      setPreview("")
    }

  const handleUpdate = async()=>{
    const{title,language,github,website,overview, projectImg}=projectDetails
    if(!title || !language || !github || !website || !overview){
      toast.warning('please fill the form completely')
    }
    else{
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project.projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        if(preview){
         const reqHeader = {
         "Content-Type":"multipart/form-data",
         "Authorization": `Bearer ${token}`
         }
         const result = await updateUserProjectApi( project._id,reqBody,reqHeader)
         console.log(result);
         if(result.status==200){
          setEditResponse(result.data)
           toast.success("updated successfully")
           handleClose()
           
         }
         else{
           toast.error("something went wrong")
         }
        }
        else{
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
           }
           const result = await updateUserProjectApi(project._id,reqBody,reqHeader)
           console.log(result);
           if(result.status==200){
            setEditResponse(result.data)
             toast.success("updated successfully")
             handleClose()
           }
           else{
             toast.error("something went wrong")
           }
        }
      }
      
       
        
      // }
    }
  } 
  useEffect(()=>{
    if(projectDetails.projectImg){
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
  },[projectDetails.projectImg])

  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} className="text-info text-dark" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor='prjImg'>
                <input type="file" id='prjImg' style={{display:"none"}} key={preview}  onChange={(e)=>{handlefile(e)}}/> 
                <img src={preview?preview:`${serverurl}/uploads/${project?.projectImg}`} alt="no image" className='w-100'/>
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Language' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Github' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Website' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
              </div>
              <div className="mb-3">
                <textarea className='form-control' rows={4} placeholder='Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" className='px-4' onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="coloured" position='top-center' />
    </>
  )
}

export default EditProject
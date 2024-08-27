import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import project from '../assets/project.webp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function AddProject() {
  const [show, setShow] = useState(false);
  const [projectDetails,setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImg:""
  })
  const [preview, setPreview] = useState('')
  const {setAddResponse} = useContext(addResponseContext)

  const handleClose = () => {
    setShow(false)
    handleCancel()
  }
  const handleShow = () => setShow(true);

  console.log(projectDetails);

  const handlefile=(e)=>{
    console.log(e.target.files[0]);
    
    setProjectDetails({...projectDetails,projectImg:e.target.files[0]})
  }

  const handleCancel = () =>{
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImg:""
    })
    setPreview("")
  }

  const handleAdd=async()=>{
    const{title,language,github,website,overview, projectImg}=projectDetails
    if(!title || !language || !github || !website || !overview || !projectImg){
      toast.warning('please fill the form completely')
    }
    else{
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImg",projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
         "Content-Type":"multipart/form-data",
         "Authorization": `Bearer ${token}`
        }
        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          setAddResponse(result.data)
          toast.success("project added successfully")
          handleClose()
        }
        else{
          toast.error("something went wrong")
        }
        
      }
    }
  }

  useEffect(()=>{
    if(projectDetails.projectImg){
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
  },[projectDetails.projectImg])
  return (
    <>
      <button className='btn btn-success' onClick={handleShow}>Add Project</button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor='prjImg'>
                <input type="file" id='prjImg' style={{display:"none"}} key={preview}  onChange={(e)=>{handlefile(e)}}/> 
                <img src={preview? preview:project} alt="no image" className='w-100'/>
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Title' value={projectDetails.title} onChange={(e)=>{setProjectDetails({...projectDetails,title:e.target.value})}} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Language' value={projectDetails.language} onChange={(e)=>{setProjectDetails({...projectDetails,language:e.target.value})}}/>
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Github' value={projectDetails.github} onChange={(e)=>{setProjectDetails({...projectDetails,github:e.target.value})}} />
              </div>
              <div className="mb-3">
                <input type="text" className='form-control' placeholder='Website' value={projectDetails.website} onChange={(e)=>{setProjectDetails({...projectDetails,website:e.target.value})}}/>
              </div>
              <div className="mb-3">
                <textarea className='form-control' rows={4} placeholder='Overview' value={projectDetails.overview} onChange={(e)=>{setProjectDetails({...projectDetails,overview:e.target.value})}}></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" className='px-4' onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="coloured" position='top-center' />
    </>
  )
}

export default AddProject
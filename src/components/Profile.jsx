import React, { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faCircleChevronUp,faCircleChevronDown} from '@fortawesome/free-solid-svg-icons'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';
import {serverurl} from "../services/serverUrl"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileApi } from '../services/allApi';

function Profile() {
  const [open, setOpen] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username:"",
    email:"",
    password:"",
    github:"",
    linkdin:"",
    profile:""
  })
  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")
  const [updateStatus, setUpdateStatus] = useState({})

  const handleFile = (e)=>{
    setUserDetails({...userDetails,profile:e.target.files[0]})
  }

  const handleUpdate = async() =>{
    const {username,email,password,github,linkdin,profile} = userDetails
    if(!github || !linkdin){
      toast.info("please fill the form completely")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkdin",linkdin)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        if(preview){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
          const result = await updateProfileApi(reqBody,reqHeader)
          console.log(result)
          if(result.status==200){
            toast.success("profile updated successfully")
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
          }
          else{
            toast.error("something went wrong")
            setUpdateStatus(result.data)
          }
          
        }
        else{
          const reqHeader = {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
          }
          const result = await updateProfileApi(reqBody,reqHeader)
          console.log(result)
          if(result.status==200){
            toast.success("profile updated successfully")
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          }
          else{
            toast.error("something went wrong")
          }
        }
      }
    }
  }

  useEffect(()=>{
    if(userDetails.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  },[userDetails.profile])

  console.log(preview);
  

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkdin:user.linkdin})
      setExistingImage(user.profile)
    }
  },[updateStatus])

  console.log(userDetails);
  

  return (
    <>
      <div className="shadow p-4 my-5 bg-light rounded" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}> 
        <div className='d-flex mt-3'>
          <h3 className='text-dark'>Profile</h3>
          <div className='ms-auto'>
            <button className='btn btn-outline-primary me-1' onClick={() => setOpen(!open)}>{open?<FontAwesomeIcon icon={faCircleChevronUp} />:<FontAwesomeIcon icon={faCircleChevronDown} />}</button>
          </div>
        </div>

        <Collapse in={open} >
          <div>
            <div className='d-flex justify-content-center align-items-center my-2' >
              <label htmlFor='profileimg'>
                <input type="file" style={{display:"none"}} id='profileimg' onChange={(e)=>handleFile(e)}/>
                {existingImage?
                <img src={preview?preview:`${serverurl}/uploads/${existingImage}`} alt="no image" width={'180px'} height={'180px'} style={{borderRadius:"50%"}}/>:
                <img src={preview?preview:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"} alt="no image" width={'180px'} height={'180px'} style={{borderRadius:"50%"}}/>
                }
              </label>
            </div>
            <div className="mb-3 px-4">
              <input type="text" placeholder='Github' value={userDetails.github} className='form-control bg-dark text-light' onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})}/>
            </div>
            <div className="mb-3 px-4">
              <input type="text" placeholder='LinkedIn' value={userDetails.linkdin} className='form-control bg-dark text-light' onChange={(e)=>setUserDetails({...userDetails,linkdin:e.target.value})}/>
            </div>
            <div className="mb-3 px-4">
              <button className='btn btn-success w-100' onClick={handleUpdate}>Updates</button>
            </div>
          </div>
        </Collapse>
      </div>
      <ToastContainer autoClose={2000} theme="coloured" position='top-center' />

    </>
  )
}

export default Profile
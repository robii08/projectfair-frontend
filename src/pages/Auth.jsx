import React, { useContext, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faStackOverflow, } from '@fortawesome/free-brands-svg-icons'
import{faCircleArrowLeft} from '@fortawesome/free-solid-svg-icons'
import lock from '../assets/lock1.gif'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginContext } from '../context/Contextshare'

function Auth({register}) {
  const navigate = useNavigate()
  const {setLoginStatus} = useContext(loginContext)
  const [registerUser, setRegisterUser] = useState({
    username:"",
    email:"",
    password:""
  })
  const handleRegister=async(e)=>{
    e.preventDefault()
    const {username,email,password}=registerUser
    if(!username || !email || !password){
      toast.warning('please fill the form completely')
    }
    else{
    const result = await registerApi(registerUser)
    console.log(result);
    if(result.status==200){
      toast.success('Registered Successfully')
      setRegisterUser({
        username:"",
        email:"",
        password:""
      })
      navigate('/login')
    }
    else{
      toast.error(result.response.data)
      setRegisterUser({
        username:"",
        email:"",
        password:""
      })
    }
  }
    
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    const {email,password}=registerUser

    if(!email || !password){
      toast.info('Please fill the form completely')
    }
    else{
      const result = await loginApi({email,password})
      console.log(result);
      if(result.status==200){
        toast.success('Login Successful')
        setRegisterUser({
          username:"",
          email:"",
          password:""
        })
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token )
        setLoginStatus(true)
        navigate('/')
      }
      else{
        toast.error('Something went wrong')
        setRegisterUser({
          username:"",
          email:"",
          password:""
        })
      }
    }
  }
  
  
  return (
    <>
      
      <div className='container-fluid'>
        <div className="row p-4 my-4" style={{marginTop:'100px'}}>
          <div className="col-md-1"></div>
          <div className="col-md-10 ">
          <Link to={'/'} className='text-decoration-none text-warning'><h5><FontAwesomeIcon icon={faCircleArrowLeft} className='me-2'/>Back to Home</h5></Link>
            <div className="row bg-success p-4">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img src={lock} alt="no image" width={'100%'} height={'50%'} className='px-5'/>
              </div>
              <div className="col-md-6 p-md-5 p-0">
                <form className='w-100 d-flex justify-content-center align-items-center flex-column'>
                  <h3 className=''> <FontAwesomeIcon icon={faStackOverflow} className='me-2 '/>Project Fair</h3>
                  {register?
                  <h5 className='mb-4'>sign up to your account</h5>:
                  <h5 className='mb-4'>sign in to your account</h5>
                  }
                  
                  {register&&
                  <div className='mb-3 mt-3 w-75'>
                    <input type="text" className='form-control w-100' placeholder=' Username' value={registerUser.username} onChange={(e)=>{setRegisterUser({...registerUser,username:e.target.value})}}/>
                  </div>
                  }

                  <div className='mb-3 w-75'>
                    <input type="email" className='form-control bg-outline-light' placeholder='  Email' value={registerUser.email} onChange={(e)=>{setRegisterUser({...registerUser,email:e.target.value})}}/>
                  </div>

                  <div className='mb-3 w-75'>
                    <input type="password" className='form-control' placeholder=' Password' value={registerUser.password} onChange={(e)=>{setRegisterUser({...registerUser,password:e.target.value})}}/>
                  </div>
                 
                  
                  <div className='mb-3 w-75'>
                    {register?
                    <div>
                      <button className='btn btn-primary w-100' type='button' onClick={handleRegister}>Register</button>
                      <p className='mt-2'>Already a User? Click here to<Link to={'/login'} className='text-danger text-decoration-none'> Login</Link></p>
                    </div>
                   :
                    <div>
                      <button className='btn btn-primary w-100' type='button' onClick={handleLogin}>Login</button>
                      <p className='mt-2'>New User? Click here to <Link to={'/register'} className='text-danger text-decoration-none'>Register</Link></p>
                    </div>
                    }
                   
                  </div>
                </form>
                
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="coloured" position='top-center' />
    </>
  )
}

export default Auth
import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div style={{width:'100%',height:'100vh',backgroundColor:'white'}} className='d-flex justify-content-center align-items-center '>
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 d-flex justify-content-center align-items-center flex-column text-dark">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/concept-of-error-404-and-robot-not-working-2112236-1779236.png" alt="" />
                <h1 className='mt-3'>Look like you're lost !!</h1>
                <h5 className='mt-2'>The page you are looking is unavailable</h5>
                <Link to={'/'}><button className='btn btn-success px-5 mt-4'>Home</button></Link>
            </div>
            <div className="col-md-1"></div>
        </div>
    </div>
  )
}

export default PageNotFound
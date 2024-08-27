import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faStackOverflow,  faInstagram,faTwitter,faFacebook,faLinkedin,faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
    <div className='container-fluid bg-success p-5'>
        <div className="row">
            <div className="col-md-4 px-md-5">
                <h4 className='text-dark'><FontAwesomeIcon icon={faStackOverflow} className='me-2'/>Project Fair</h4>
                <p className='text-light mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore dignissimos illo id unde, aliquam velit quod consectetur minima fugit fuga, nobis, ipsam quibusdam! Illo fugit ipsa deleniti provident, vero totam?</p>
            </div>
            <div className="col-md-2 px-md-5">
            <h4 className='text-dark fw-medium'>Link</h4>
            <div className='text-light mt-3 '>
              <Link to={'/'} className='text-light text-decoration-none'><p>Home</p></Link>
              <Link to={'/home'} className='text-light text-decoration-none '><p>Project</p></Link>
              <Link to={'/history'} className='text-light text-decoration-none'><p>Dashboard</p></Link>
            </div>
            </div>
            <div className="col-md-2 px-md-5">
            <h4 className='text-dark fw-medium'>Guides</h4>
            <div className='text-light mt-3 '>
              <p>React</p>
              <p>React Bootstrap</p>
              <p>Bootswatch</p>
              <p></p>
            </div>
            </div>
            <div className="col-md-4 px-md-5">
              <h4 className='text-dark fw-medium'>Contact Us</h4>
              <div className='d-flex mt-4'>
                <input type="text" placeholder='email id' className='form-control bg-light me-3'/>
                <button className='btn btn-dark '>Subscribe</button>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <FontAwesomeIcon icon={faInstagram} className='fa-2x text-dark' />
                <FontAwesomeIcon icon={faTwitter} className='fa-2x text-dark' />
                <FontAwesomeIcon icon={faFacebook} className='fa-2x text-dark' />
                <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-dark' />
                <FontAwesomeIcon icon={faWhatsapp} className='fa-2x text-dark' />
              </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default Footer
import React from 'react'
import Card from 'react-bootstrap/Card';
import projectimg from '../assets/p1.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faGithub} from '@fortawesome/free-brands-svg-icons'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { serverurl } from '../services/serverUrl';

function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(project);
  console.log(`${serverurl}/uploads/${project?.projectImg}`);
  
  return (
    <>
    <Card style={{ width: '100%' }} className='shadow rounded-0 border-0 bg-light' onClick={handleShow}>
      <Card.Img variant="top" src={`${serverurl}/uploads/${project?.projectImg}`} height={'80%'}/>
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={`${serverurl}/uploads/${project?.projectImg}`} alt="" width={'100%'} />
            </Col>
            <Col md={6}>
              <h4>Description</h4>
              <p>{project?.overview}</p>
              <h4 className='mt-3'>Technologies</h4>
              <p>React</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className='me-2'>
            <Link to={project?.github}><FontAwesomeIcon icon={faGithub} className='fa-xl text-info me-3'/></Link>
            <Link to={project?.website}><FontAwesomeIcon icon={faLink} className='fa-xl text-info'/></Link>
          </div>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default ProjectCard
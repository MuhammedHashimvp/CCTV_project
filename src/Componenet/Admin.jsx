import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import { cameras, camerasadd, camerasdel } from "../Api/Allapi";
import Modal from 'react-bootstrap/Modal';

function Admin() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cameradet,setcameradet]=useState([{id: 0,camera_id: "",location: "",rtsp_url:"",is_active: false}])
  const [newcameradet,setnewcameradet]=useState({camera_id: "",location: "",rtsp_url:"",is_active: false})
  const [refreshKey, setRefreshKey] = useState(false);


  const header = {
    "content-type": "application/json",
    authorization: `token ${sessionStorage.getItem("token")}`,
  };
    useEffect(() => {
      cameras(header)
        .then((res) => {
          if (res.data) {
            setcameradet(res.data);
          }
        })
    }, [refreshKey]);
    const addcam=()=>{
      camerasadd(header,newcameradet)
        .then((res) => {
        setRefreshKey((prev) => !prev);
        })
    }
    const delcam=(id)=>{
      camerasdel(header,id)
      .then((res) => {
      setRefreshKey((prev) => !prev);
      })
    }

  const onformchange = (e) => {
    setnewcameradet({ ...newcameradet, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <div className=" container">
        <div className="add-camera d-flex justify-content-end m-4">
            <Button variant="warning" id="button-addon2" onClick={handleShow}>Add New Camera</Button>

        </div>


        <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Add new camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="" className="gap-1">
              <label htmlFor="">Camera ID:</label>
                <Form.Control type="text" onChange={onformchange} name="camera_id" placeholder="Camera 1" />
              <label htmlFor="">Location:</label>
                <Form.Control type="text" onChange={onformchange} name="location" placeholder="Example" />
              <label htmlFor="">rstp_url:</label>
                <Form.Control type="text" onChange={onformchange} name="rtsp_url" placeholder="rtsp://192.168.1.101:554/live" />
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"type="reset" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={()=>addcam()}>
            Add camera
          </Button>
        </Modal.Footer>
      </Modal>


        <div className=" d-flex justify-content-center list-items">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>camera ID</th>
                <th>location</th>
                <th>rtsp_url</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cameradet.map((i, j) => (
                <tr key={j}>
                  <td>{j+1}</td>
                  <td>{i.camera_id}</td>
                  <td>{i.location}</td>
                  <td>{i.rtsp_url}</td>
                  <td>{i.is_active ? "active":"Inactive"}</td>
                  <td>
                    <div>
                      <Button variant="danger" onClick={()=>delcam(i.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Admin;

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { cameras, camerasadd, camerasdel } from "../Api/Allapi";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Admin() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const handleShow2 = () => setShow2(true);
  const [cameradet, setcameradet] = useState([
    { id: 0, camera_id: "", location: "", rtsp_url: "", is_active: false },
  ]);
  const [newcameradet, setnewcameradet] = useState({
    camera_id: "",
    location: "",
    rtsp_url: "",
    is_active: false,
  });
  const [refreshKey, setRefreshKey] = useState(false);
  const [targets, settargets] = useState(["sleeping", "walking"]);

  const header = {
    "content-type": "application/json",
    authorization: `token ${sessionStorage.getItem("token")}`,
  };
  useEffect(() => {
    cameras(header).then((res) => {
      if (res.data) {
        setcameradet(res.data);
      }
    });
  }, [refreshKey]);
  const addcam = () => {
    camerasadd(header, newcameradet).then((res) => {
      setRefreshKey((prev) => !prev);
    });
  };
  const handleTargetChange = (action, item) => {
    settargets((prev) =>
      action === "add"
        ? [...prev, item]
        : prev.filter((target) => target !== item)
    );
  };

  const delcam = (id) => {
    camerasdel(header, id).then((res) => {
      setRefreshKey((prev) => !prev);
    });
  };

  const onformchange = (e) => {
    setnewcameradet({ ...newcameradet, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <div className=" container">
        <div className="w-100 mt-4 border-primary border text-center">
          Behaviours to detect : [{targets.map((i, j) => `${i}, `)}]
          <button className="btn btn-primary" onClick={handleShow2}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div className="add-camera d-flex justify-content-end m-4">
          <Button variant="warning" id="button-addon2" onClick={handleShow}>
            Add New Camera
          </Button>
        </div>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Targets</Modal.Title>
          </Modal.Header>
          <Modal.Body className="align-items-center justify-content-center flex-column d-flex w-100">
          {targets.map((i, j) => (
  <div
    className="d-flex justify-content-between w-100 btn btn-primary mt-1 align-items-center"
    key={j}
  >
    <p className="m-0">{i}</p>
    <i 
      className="fa-solid fa-trash" 
      onClick={() => handleTargetChange("remove", i)}
      style={{ cursor: "pointer" }} 
    ></i>
  </div>
))}


            <DropdownButton
              className=" mt-1"
              title="Add new Behaviour"
            >
              <Dropdown.Item onClick={() => handleTargetChange("add", "Sleeping")}>Sleeping</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Walking")}>Walking</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Sitting")}>Sitting</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Running")}>Running</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Jumping")}>Jumping</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Eating")}>Eating</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Drinking")}>Drinking</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Talking")}>Talking</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Climbing")}>Climbing</Dropdown.Item>  
<Dropdown.Item onClick={() => handleTargetChange("add", "Swimming")}>Swimming</Dropdown.Item>  
 
            </DropdownButton>
          </Modal.Body>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new camera</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" className="gap-1">
              <label htmlFor="">Camera ID:</label>
              <Form.Control
                type="text"
                onChange={onformchange}
                name="camera_id"
                placeholder="Camera 1"
              />
              <label htmlFor="">Location:</label>
              <Form.Control
                type="text"
                onChange={onformchange}
                name="location"
                placeholder="Example"
              />
              <label htmlFor="">rstp_url:</label>
              <Form.Control
                type="text"
                onChange={onformchange}
                name="rtsp_url"
                placeholder="rtsp://192.168.1.101:554/live"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="reset" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="warning" onClick={() => addcam()}>
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
                  <td>{j + 1}</td>
                  <td>{i.camera_id}</td>
                  <td>{i.location}</td>
                  <td>{i.rtsp_url}</td>
                  <td>{i.is_active ? "active" : "Inactive"}</td>
                  <td>
                    <div>
                      <Button variant="danger" onClick={() => delcam(i.id)}>
                        Delete
                      </Button>
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

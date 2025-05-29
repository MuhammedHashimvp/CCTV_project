import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import { stdsdel, stdsget, stdspost, stdsput } from '../Api/Allapi';
import Button from "react-bootstrap/Button";
import Navbar from './Navbar';
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";


function Students() {
    const [std,setstd]=useState([])
    const [newstd,setnewstd]=useState({Name:"",Course:"",Photo:"",Date_joined:""})
    const [updatestd,setupdatestd]=useState({id:"",Name:"",Course:"",Date_joined:""})
    const [refresh,setrefresh]=useState(true);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const navv = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = (i) => {
      setShow2(true);
      setupdatestd(i);
      console.log(i);
      
    }

    const onformchange = (e) => {
      if (e.target.type === "file") {
        setnewstd({ ...newstd, [e.target.name]: e.target.files[0] });
      } else {
        setnewstd({ ...newstd, [e.target.name]: e.target.value });
      }
    };
    const onformchange2 = (e) => {
      if (e.target.type === "file") {
        setupdatestd({ ...updatestd, [e.target.name]: e.target.files[0] });
      } else {
        setupdatestd({ ...updatestd, [e.target.name]: e.target.value });
      }
    };
    const stdputsubmit =()=>{
      const formData = new FormData();
        formData.append("Name", updatestd.Name);
        formData.append("Course", updatestd.Course);
        formData.append("Date_joined", updatestd.Date_joined);

      if (updatestd.Photo instanceof File) {
        formData.append("Photo", updatestd.Photo);
      }
      stdsput(header,updatestd.id,formData).then((res)=>{
          setrefresh(!refresh);
          handleClose2()
    })
    }
    
    const header = {
      "content-type": "multipart/form-data",
      authorization: `token ${sessionStorage.getItem("token")}`,
    };
    useEffect(()=>{
        stdsget(header).then((res)=>(
            setstd(res.data)            
        ))
    },[refresh])
  return (
    <>
        <Navbar/>

        <div className="container mt-5">
            <h3>Students List</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Course</th>
                <th>Date joined</th>
                <th>Photo</th>
                <th>Ai DP</th>
              </tr>
            </thead>
            <tbody>
              {std.map((i, j) => (
                <tr key={j} onClick={()=>handleShow2(i)}>
                  <td>{j + 1}</td>
                  <td>{i.Name}</td>
                  <td>{i.Course}</td>
                  <td>{i.Date_joined}</td>
                  <td><img src={i.Photo} alt=""  height={"100px"}/></td>
                  <td><img src={i.Photobyai} alt=""  height={"100px"}/></td>
                </tr>
              ))}
              <tr>
                <td><button className='btn btn-success' onClick={()=>handleShow()}>Add New Student</button></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Student settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" className="gap-1">
              <label htmlFor="">Student name :</label>
              <Form.Control
                type="text"
                onChange={onformchange}
                name="Name"
                placeholder="Name"
              />
              <label htmlFor="">Course:</label>
              <Form.Control
                type="text"
                onChange={onformchange}
                name="Course"
                placeholder="Course"
              />
              <label htmlFor="">Date joined:</label>
              <Form.Control
                type="date"
                onChange={onformchange}
                name="Date_joined"
                placeholder="Date joined"
              />
              <label htmlFor="">Photo:</label>
              <input type="file" name='Photo' className='form-control' onChange={onformchange}/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="reset" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="warning" onClick={() => stdspost(header,newstd).then((res)=>(handleClose))}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Student settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" className="gap-1">
              <label htmlFor="">Student name :</label>
              <Form.Control
                type="text"
                onChange={onformchange2}
                name="Name"
                defaultValue={updatestd.Name}
                placeholder="Name"
              />
              <label htmlFor="">Course:</label>
              <Form.Control
                type="text"
                onChange={onformchange2}
                name="Course"
                defaultValue={updatestd.Course}
                placeholder="Course"
              />
              <label htmlFor="">Date joined:</label>
              <Form.Control
                type="date"
                defaultValue={updatestd.Date_joined}
                onChange={onformchange2}
                name="Date_joined"
                placeholder="Date joined"
              />
              <label htmlFor="">Photo:</label>
              <input type="file" name='Photo' className='form-control' onChange={onformchange2}/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="reset" onClick={handleClose2}>
              Cancel
            </Button>
            <Button variant="warning" onClick={() => stdputsubmit()}>
              Update
            </Button>
            <Button variant="danger" onClick={() => stdsdel(header,updatestd.id).then((res)=>{handleClose2();setrefresh(!refresh)})}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default Students
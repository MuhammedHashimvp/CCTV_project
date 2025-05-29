import React, { useEffect, useState } from 'react'
import { behavioursdel, behavioursget, behaviourspost } from '../Api/Allapi';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
function Behtodetect() {
  const [behs,setbehs]=useState([]);
  const [newbeh,setnewbeh]=useState("");
  const [refresh,setrefresh]=useState(true);  
  const header = {
    "content-type": "application/json",
    authorization: `token ${sessionStorage.getItem("token")}`,
  }
  useEffect(()=>{
    behavioursget(header).then((res)=>{      
      setbehs(res.data)
    })
  },[refresh])
  return (
    <>

      <div className="align-items-center justify-content-center flex-column d-flex w-100">
        {behs.map((i, j) => (
          <div
            className="d-flex justify-content-between w-100 btn btn-primary mt-1 align-items-center"
            key={j}
          >
            <p className="m-0">{i.behaviourlist}</p>
            <i
              className="fa-solid fa-trash"
              style={{ cursor: "pointer" }}
              onClick={()=>(behavioursdel(header,i.id).then(()=>setrefresh(!refresh)))}
            ></i>
          </div>
        ))}

      <InputGroup className="mt-1">
        <Form.Control
        className=' '
          placeholder="Input new behaviour"
          onChange={(e)=>{setnewbeh(e.target.value)}}
        />
        <Button variant="primary" id="button-addon2"
        onClick={()=>behaviourspost(header,{"behaviourlist":newbeh}).then(()=>setrefresh(!refresh))}
        >
          Add
        </Button>
      </InputGroup>

      </div>
    </>
  )
}

export default Behtodetect
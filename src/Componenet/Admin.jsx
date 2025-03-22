import React from "react";
import Navbar from "./Navbar";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

function Admin() {
  const camera_ip = [
    { name: "cmaeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaara1", ip: "123" },
    { name: "cmaera1", ip: "123" },
    { name: "cmaera1", ip: "123" },
    { name: "cmaera1", ip: "123" },
    { name: "cmaera1", ip: "123" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-5 mt-5 container">
        <div className="add-camera">
          <InputGroup className="mb-3">
            <Form.Control placeholder="https://example:199:168" />
            <Button variant="warning" id="button-addon2">Add</Button>
          </InputGroup>
        </div>

        <div className=" d-flex justify-content-center list-items">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>ip</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {camera_ip.map((i, j) => (
                <tr>
                  <td>{j + 1}</td>
                  <td>{i.name}</td>
                  <td>{i.ip}</td>
                  <td>
                    <div>
                      <Button variant="danger">Delete</Button>
                      &nbsp;
                      <Button variant="primary">Update</Button>
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

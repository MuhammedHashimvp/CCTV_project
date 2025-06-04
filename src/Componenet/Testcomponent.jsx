import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { hostip } from "../Api/Commonapi";

import Modal from 'react-bootstrap/Modal';
function Testcomponent() {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoplay, setVideoplay] = useState("");
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (vidname) => {
    setShow(true);
    setVideoplay(vidname)
   }

  useEffect(() => {
    axios.get(hostip + "hogupload/").then((res) => {
      setVideos(res.data);
    });
  }, []);

  const upload = async () => {
    const form = new FormData();
    form.append("video", video);
    await axios.post(hostip + "hogupload/", form);
    // Refresh list after upload
    const updated = await axios.get(hostip + "hogupload/");
    setVideos(updated.data);
  };

  const analyze = async (id) => {
    try {
      const res = await axios.post(hostip + "/hoganalyze/", { video_id: id });
      alert("Analysis complete! Output URL: " + res.data.output_url);
      const updated = await axios.get(hostip + "/hogupload/");
      setVideos(updated.data);
    } catch (error) {
      alert("Analysis failed");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Upload a Video</h2>
        <div className="d-flex justify-content-center">
          <form className="d-flex w-50 gap-2">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <button className="btn btn-success" type="button" onClick={upload}>
              Upload
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Uploaded Videos</th>
              <th>Trimmed Videos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v,j)=>(
              <tr key={j} >
                <td onClick={()=>(handleShow(v.video))}>{v.video.replace("/media/Hoguploads/", "")}</td>

                {v.trimmed ? <td onClick={()=>(handleShow(v.trimmed ))}>{v.trimmed.replace("/media/hogdet/", "")}</td> : <td>Not analysed</td>}

                <td><button className=" btn btn-sm btn-primary" onClick={()=>analyze(v.id)}>Analyse</button></td>
              </tr>
            ))
              
            }
          </tbody>
        </table>

      </div>


 

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
<Modal.Title>{videoplay ? videoplay.split("/").pop() : "No video selected"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <video src={hostip + videoplay} controls width="100%" />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Testcomponent;

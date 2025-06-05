import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { hostip } from "../Api/Commonapi";
import Modal from 'react-bootstrap/Modal';


function Hogdetected() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [detections, setDetections] = useState([]);
		const [show, setShow] = useState(false);
		const [videoplay, setVideoplay] = useState("");

		const handleClose = () => setShow(false);
		const handleShow = (vidname) => {
				setShow(true);
				setVideoplay(vidname)
			}
  // Fetch all videos once, extract unique dates
  useEffect(() => {
    axios.get(hostip + "hogupload/").then((res) => {
      const videos = res.data;
      const uniqueDates = [...new Set(videos.map((video) => video.date))];
      setDates(uniqueDates);
    });
  }, []);

  // Fetch videos for selected date
  useEffect(() => {
    if (!selectedDate) {
      setDetections([]);
      return;
    }

    axios
      .get(hostip + "hogupload/", { params: { date: selectedDate } })
      .then((res) => {
        setDetections(res.data);
      })
      .catch(() => {
        setDetections([]);
      });
  }, [selectedDate]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="d-flex gap-2 p-3" >
          {dates.length === 0 && <p>No folders found.</p>}
          {dates.map((date,j) => (
            <div className="text-center"  key={j}>
            	<div
	              className="p-4"
	              onClick={() => setSelectedDate(date)}
	              style={{  cursor: "pointer", border: selectedDate === date ? "2px solid blue" : "1px solid gray" }}
	            >
	              <i className={`fa-solid  fa-3x ${selectedDate===date ? "fa-folder-open" : "fa-folder" }`}></i>
	            </div>
															<p>{date}</p>

            </div>
												
          ))}
        </div>
								<hr />

        {selectedDate && (
          <div style={{ marginTop: "20px" }}>
            <h6>📁 {selectedDate}</h6>
            {detections &&
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Uploaded Videos</th>
              <th>Trimmed Videos</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((v,j)=>(
              <tr key={j} className="align-middle ztd-hover" >
                <td>
                  <div style={{height:"100px",width:"200px",overflow:"hidden"}}><img src={v.thumb} className="overflow-hidden object-fit-cover img-fluid" alt="" /></div>
                </td>
                <td  onClick={()=>handleShow(v.video)}>{v.video.split('/').pop()}</td>

                {v.trimmed ? <td onClick={()=>(handleShow(v.trimmed ))}>{v.trimmed.split('/').pop()}</td> : <td>Not analysed</td>}
																<td><a href="">Download</a></td>
              </tr>
            ))
              
            }
          </tbody>
        </table>
            }
          </div>
        )}
      </div>

						      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
<Modal.Title>{videoplay ? videoplay.split("/").pop() : "No video selected"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <video src={videoplay} controls width="100%" />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Hogdetected;

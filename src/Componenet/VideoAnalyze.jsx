import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { hostip } from "../Api/Commonapi";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function VideoAnalyze() {
  const logRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoplay, setVideoplay] = useState("");
  const [loadingIds, setLoadingIds] = useState([]);

  const [logs, setLogs] = useState([]);

  const [show, setShow] = useState(false);
  const navv=useNavigate()

  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [logs]);

  const handleClose = () => setShow(false);
  const handleShow = (vidname) => {
    setShow(true);
    setVideoplay(vidname);
  };
// Filter function
const filterTodaysVideos = (videos) => {
  const today = new Date().toISOString().slice(0, 10);
  return videos.filter((video) => video.date === today);
};

// Initial load
useEffect(() => {
  axios.get(hostip + "hogupload/").then((res) => {
    setVideos(filterTodaysVideos(res.data));
  });
}, []);

// Upload function
const upload = async () => {
  const form = new FormData();
  form.append("video", video);
  await axios.post(hostip + "hogupload/", form);
  const updated = await axios.get(hostip + "hogupload/");
  setVideos(filterTodaysVideos(updated.data));
};

// Analyze function
const analyze = async (id) => {
  setLoadingIds((prev) => [...prev, id]);
  try {
    const res = await axios.post(hostip + "/hoganalyze/", { video_id: id });
    toast.success("Analysis complete!");
    const updated = await axios.get(hostip + "/hogupload/");
    setVideos(filterTodaysVideos(updated.data));
  } catch (error) {
    toast.error("Analysis failed!");
    console.error(error);
  } finally {
    setLoadingIds((prev) => prev.filter((i) => i !== id));
  }
};

  const fetchLogs = () => {
    if (loadingIds.length === 0) return;
    axios
      .get(hostip + "/trackprogress/")
      .then((res) => setLogs(res.data.progress))
      .catch(() => {});
  };

  useEffect(() => {
    if (loadingIds.length === 0) return;
    const interval = setInterval(fetchLogs, 1000);
    return () => clearInterval(interval);
  }, [loadingIds]);

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
        <div className="d-flex justify-content-center mt-2">
          <button className="btn btn-primary" onClick={()=>navv('/vidtrim')}>View all Uploads</button>
        </div>
      </div>

      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Uploaded Videos</th>
              <th>Trimmed Videos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v, j) => (
              <tr key={j} className="ztd-hover">
                <td onClick={() => handleShow(v.video)}>
                  {v.video.split("/").pop()}
                </td>

                {v.trimmed ? (
                  <td onClick={() => handleShow(v.trimmed)}>
                    {v.trimmed.split("/").pop()}
                  </td>
                ) : (
                  <td>Not analysed</td>
                )}

                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => analyze(v.id)}
                    disabled={loadingIds.includes(v.id)}
                  >
                    {loadingIds.includes(v.id) ? "Analyzing..." : "Analyze"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          ref={logRef}
          className="p-3 bg-dark w-100 text-white overflow-y-scroll overflow-x-hidden mb-5"
          style={{ height: "300px" }}
        >
          <pre>{logs}</pre>
        </div>
      </div>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {videoplay ? videoplay.split("/").pop() : "No video selected"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video src={videoplay} controls width="100%" />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default VideoAnalyze;

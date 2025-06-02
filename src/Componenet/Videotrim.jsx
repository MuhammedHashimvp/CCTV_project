import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { hostip } from "../Api/Commonapi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Videotrim() {
  const [videoFile, setVideoFile] = useState(null);
  const [outputUrl, setOutputUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [Trtdata, setTrtdata] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setOutputUrl("");
    setErrorMsg("");
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video first.");
      return;
    }

    setLoading(true);
    setOutputUrl("");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post(hostip + "/Humantrack/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.output_url) {
        setOutputUrl(response.data.output_url);
        const transformedData = response.data.log_data.map(([x, y]) => ({ x, y }));
        setTrtdata(transformedData);
        setZoomLevel(Math.min(10, transformedData.length)); // reset zoom level
      } else {
        setErrorMsg("No output URL returned.");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("Upload failed due to an unknown error.");
      }
    }

    setLoading(false);
  };

  const zoomedData = Trtdata.slice(-zoomLevel);
  const maxY = Math.max(...zoomedData.map((d) => d.y), 0);

  return (
    <>
      <Navbar />
      <div className="container d-flex W-100 justify-content-center align-items-center gap-5">
        <div className="w-50">
          <form className="rounded">
            <h2>Upload File</h2>
            <input
              type="file"
              className="form-control"
              name="file"
              autoComplete="off"
              accept="video/*"
              onChange={handleFileChange}
            />
            <button
              className="btn btn-success m-3"
              type="button"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Processing..." : "Upload & Process"}
            </button>
            {outputUrl && (
              <a
                className="btn btn-primary ms-3"
                href={outputUrl}
                onClick={(e) => {
                  e.preventDefault();
                  fetch(outputUrl)
                    .then((res) => res.blob())
                    .then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.style.display = "none";
                      a.href = url;
                      a.download = "video.mp4";
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                      a.remove();
                    })
                    .catch(() => alert("Download failed"));
                }}
              >
                Download video
              </a>
            )}
          </form>

          {/* Zoom slider */}
          {Trtdata.length > 0 && (
            <>
          
              <input
                type="range"
                className="form-range"
                min="2"
                max={Trtdata.length}
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
              />
              <div style={{ width: "100%", height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={zoomedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis domain={[0, maxY + 1]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* Video Preview */}
        <div className="w-50">
          <div
            style={{ height: "500px" }}
            className="align-items-center d-flex"
          >
            {outputUrl && (
              <video width={"100%"} controls>
                <source src={outputUrl} type="video/mp4" />
                loading
              </video>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Videotrim;

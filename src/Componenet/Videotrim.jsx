import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { hostip } from "../Api/Commonapi";

function Videotrim() {
  const [videoFile, setVideoFile] = useState(null);
  const [outputUrl, setOutputUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
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

      // If backend sends the output URL on success
      if (response.data.output_url) {
        setOutputUrl(response.data.output_url);
      } else {
        setErrorMsg("No output URL returned.");
      }
    } catch (error) {
      // Show backend error message if available
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("Upload failed due to an unknown error.");
      }
    }

    setLoading(false);
  };
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
            {
  outputUrl &&
<a className="btn btn-primary ms-3"
  href={outputUrl}
  onClick={(e) => {
    e.preventDefault();
    fetch(outputUrl)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'video.mp4'; // set desired filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch(() => alert('Download failed'));
  }}
>
  Download video
</a>
}
          </form>


        </div>
        <div className="w-50 ">
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

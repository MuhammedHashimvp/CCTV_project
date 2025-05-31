import React, { useState } from "react";
import axios from "axios";
import { hostip } from "../Api/Commonapi";

export default function Testcomponent() {
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
        const response = await axios.post(hostip+"/Humantrack/", formData, {
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
      <div>
        <h2>Upload Video for Human Tracking</h2>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Processing..." : "Upload & Process"}
        </button>
  
        {outputUrl && (
          <div style={{ marginTop: "20px" }}>
            <h3>Output Video:</h3>
            <video width="400" controls>
              <source src={outputUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>
              <a href={outputUrl} target="_blank" rel="noopener noreferrer">
                Download Output Video
              </a>
            </p>
          </div>
        )}
  
        {errorMsg && (
          <div style={{ color: "red", marginTop: "20px" }}>
            <strong>Error:</strong> {errorMsg}
          </div>
        )}
      </div>
</>
  );
}

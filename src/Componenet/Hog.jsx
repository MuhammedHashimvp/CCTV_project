import React, { useState } from "react";
import axios from "axios";

export default function UploadVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [resultUrl, setResultUrl] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video file");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post("http://localhost:8000/humantrack/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming response contains output file URL or path
      setResultUrl(response.data.output_file_url || "No URL returned");
    } catch (error) {
      console.error("Upload error", error);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Video for Human Tracking</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {resultUrl && (
        <div>
          <h3>Processed Video URL:</h3>
          <a href={resultUrl} target="_blank" rel="noopener noreferrer">{resultUrl}</a>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Testcomponent() {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/hogupload/").then((res) => {
      setVideos(res.data);
    });
  }, []);

  const upload = async () => {
    const form = new FormData();
    form.append("video", video);
    await axios.post("http://localhost:8000/hogupload/", form);
  };

  const analyze = async (id) => {
    try {
      const res = await axios.post("http://localhost:8000/hoganalyze/", { video_id: id });
      alert("Analysis complete! Output URL: " + res.data.output_url);
      // Optionally refresh the videos list to get updated trimmed URLs:
      const updated = await axios.get("http://localhost:8000/hogupload/");
      setVideos(updated.data);
    } catch (error) {
      alert("Analysis failed");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <form>
        <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        <button type="button" onClick={upload}>
          Upload
        </button>
      </form>

      <div>
        {videos.map((v) => (
          <div
            key={v.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {/* Original video */}
            <video src={`http://localhost:8000${v.video}`} controls width="400" />

            {/* Trimmed video, if exists */}
            {v.trimmed ? (
              <video src={`http://localhost:8000${v.trimmed}`} controls width="400" />
            ) : (
              <div style={{ width: 400, height: 225, lineHeight: "225px", textAlign: "center", border: "1px solid #ccc", color: "#777" }}>
                No trimmed video
              </div>
            )}

            {/* Analyze button */}
            <button onClick={() => analyze(v.id)}>Analyze</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Testcomponent;

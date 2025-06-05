import { useEffect, useState } from "react";
import axios from "axios";
import { hostip } from "../Api/Commonapi";

const TrackingProgress = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = () => {
    axios.get(hostip+"/trackprogress/")
      .then(res => setLogs(res.data.progress))
      .catch(() => {});
  };

  useEffect(() => {
    const interval = setInterval(fetchLogs, 1000);
    return () => clearInterval(interval);
  }, []);

return (
  <div>
    <pre>{logs && logs.join("")}</pre>
  </div>
);

};

export default TrackingProgress;

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { graphget } from '../Api/Allapi';  // Ensure this path is correct

function TestComponent() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const header = {
      "content-type": "application/json",
      authorization: `token ${sessionStorage.getItem("token")}`,
    };

    graphget(header).then((res) => {
      const data = res.data
        .filter((entry) => entry.Action === 'Attendance')
        .map((entry) => ({
          date: entry.Date,
          attendance: entry.Data,
        }));
        console.log(data);
        
      
      setAttendanceData(data);
    })
  }, []);

  return (
    <div className="p-4 container bg-light">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TestComponent;

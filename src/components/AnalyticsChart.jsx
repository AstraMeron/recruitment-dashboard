import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

function AnalyticsChart() {
  const [pipelineData, setPipelineData] = useState([]);
  const [timeToHireData, setTimeToHireData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/pipelineData")
      .then(res => res.json())
      .then(setPipelineData);
    fetch("http://localhost:3001/timeToHireData")
      .then(res => res.json())
      .then(setTimeToHireData);
  }, []);

  return (
    <div>
      <h3>Recruitment Pipeline</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={pipelineData}>
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <h3>Time to Hire Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={timeToHireData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="days" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;
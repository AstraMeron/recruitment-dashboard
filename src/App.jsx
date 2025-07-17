import React from "react";
import InterviewCalendar from "./components/InterviewCalendar";
import AnalyticsChart from "./components/AnalyticsChart";
import AuditLogTable from "./components/AuditLogTable";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Recruitment Dashboard</h1>
      <InterviewCalendar />
      <AnalyticsChart />
      <AuditLogTable />
    </div>
  );
}

export default App;
import React, { useState } from "react";
import InterviewCalendar from "./components/InterviewCalendar";
import AnalyticsChart from "./components/AnalyticsChart";
import AuditLogTable from "./components/AuditLogTable";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "App dark-mode" : "App"}>
      <header className="app-header">
        <h1>Recruitment Dashboard</h1>
        <button
          className="dark-toggle"
          onClick={() => setDarkMode((dm) => !dm)}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>
      <main>
        <InterviewCalendar />
        <AnalyticsChart />
        <AuditLogTable />
      </main>
    </div>
  );
}

export default App;
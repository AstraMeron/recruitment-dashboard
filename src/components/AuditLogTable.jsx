import React, { useState, useEffect } from "react";

function AuditLogTable() {
  const [logs, setLogs] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/logs")
      .then(res => res.json())
      .then(setLogs);
  }, []);

  // Filtering logic
  const filteredLogs = logs.filter(log => {
    const userMatch = userFilter ? log.user.toLowerCase().includes(userFilter.toLowerCase()) : true;
    const dateMatch = dateFilter ? log.timestamp.startsWith(dateFilter) : true;
    return userMatch && dateMatch;
  });

  return (
    <div>
      <h3>Audit Log</h3>
      <div>
        <input
          type="text"
          placeholder="Filter by user"
          value={userFilter}
          onChange={e => setUserFilter(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filter by date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        />
      </div>
      <table className="audit-log-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map(log => (
            <tr key={log.id}>
              <td>{log.timestamp}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditLogTable;
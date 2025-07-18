# Recruitment Dashboard

A modern recruitment dashboard built with React, visualizing interview schedules, recruitment analytics, and audit logs.  
Mock data is served via [json-server](https://github.com/typicode/json-server).

---

## 🚀 Live Demo

[View the dashboard on Vercel](https://recruitment-dashboard-omega.vercel.app/)

---

## 🛠️ How to Run the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/AstraMeron/recruitment-dashboard.git
   cd recruitment-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the mock API server**

   ```bash
   npm run server
   ```
   The API will run at [http://localhost:3001](http://localhost:3001).

4. **Start the React app**

   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

> **Note:**  
> The deployed demo uses the frontend only. For full data functionality, run the mock API locally as above.

---

## ✨ Key Features

- **Interview Calendar**: Visualizes upcoming interviews.
- **Analytics Charts**: Shows recruitment pipeline and time-to-hire trends.
- **Audit Log Table**: Displays system/user events, with search and filter.
- **Mock API**: Uses `json-server` with editable `db.json` file for instant backend.


---

## 📁 Project Structure

```
/db.json
/src
  /components
    InterviewCalendar.jsx
    AnalyticsChart.jsx
    AuditLogTable.jsx
  App.js
  ...
```

---

## 📝 Mock Data

All mock data is in `db.json` at the project root.  
You can edit this file to add, remove, or modify interviews, analytics, or logs.

---

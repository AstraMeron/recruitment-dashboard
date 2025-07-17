import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function InterviewCalendar() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ candidate: "", role: "", interviewer: "", date: "", time: "" }); // Initial form state

  // Fetch interviews from json-server
  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = () => {
    fetch("http://localhost:3001/interviews")
      .then(res => res.json())
      .then(data => {
        // react-big-calendar expects start and end to be Date objects
        const eventsWithDates = data.map(ev => ({
          ...ev,
          start: new Date(ev.start),
          end: new Date(ev.end),
        }));
        setEvents(eventsWithDates);
      })
      .catch(err => console.error("Error fetching interviews:", err));
  };


  const handleSelectSlot = ({ start }) => {
    setForm({ ...form, date: moment(start).format("MM-DD-YYYY"), time: moment(start).format("HH:00") });
  };

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddEvent = (e) => {
    e.preventDefault();
    const start = moment(`${form.date} ${form.time}`).toDate();
    const end = moment(start).add(1, "hour").toDate();
  
    const newEvent = {
      candidate: form.candidate,
      role: form.role,
      interviewer: form.interviewer,
      start: start.toISOString(), // Store dates as ISO strings in the DB
      end: end.toISOString(),
    };
  
    fetch("http://localhost:3001/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then(res => res.json())
      .then(newEventFromServer => {
        // Ensure start and end are Date objects before adding to state
        setEvents([
          ...events,
          {
            ...newEventFromServer,
            start: new Date(newEventFromServer.start),
            end: new Date(newEventFromServer.end),
          },
        ]);
        setForm({ candidate: "", role: "", interviewer: "", date: "", time: "" });
      })
      .catch(err => console.error("Error adding interview:", err));
  };


  const handleSelectEvent = (event) => {
    if (window.confirm(`Delete interview "${event.candidate} - ${event.role}"?`)) {
      fetch(`http://localhost:3001/interviews/${event.id}`, { method: "DELETE" })
        .then(() => {
          setEvents(events.filter((ev) => ev.id !== event.id));
        })
        .catch(err => console.error("Error deleting interview:", err));
    }
  };


  return (
    <div>
      <h2>Interview Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor={event => `${event.candidate} - ${event.role} (${event.interviewer})`}
        selectable
        style={{ height: 400 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
     <form onSubmit={handleAddEvent} style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
        <input name="candidate" value={form.candidate} onChange={handleInput} placeholder="Candidate Name" required />
        <input name="role" value={form.role} onChange={handleInput} placeholder="Job Role" required />
        <input name="interviewer" value={form.interviewer} onChange={handleInput} placeholder="Interviewer" required />
        <input name="date" value={form.date} onChange={handleInput} type="date" required />
        <input name="time" value={form.time} onChange={handleInput} type="time" required />
        <button type="submit">Add Interview</button>
      </form>
      <div style={{ fontSize: 12, marginTop: 8 }}>
        <b>Tip:</b> Click an event to delete it.
      </div>
    </div>
  );
}

export default InterviewCalendar;

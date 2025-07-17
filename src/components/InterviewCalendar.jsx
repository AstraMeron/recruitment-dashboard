import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function InterviewCalendar() {
  const [events, setEvents] = useState([]);

  // Fetch interviews from json-server
  useEffect(() => {
    fetch("http://localhost:3001/interviews")
      .then(res => res.json())
      .then(data => {
        // react-big-calendar expects start and end to be Date objects
        const eventsWithDates = data.map(ev => ({
          ...ev,
          start: new Date(ev.start),
          end: new Date(ev.end)
        }));
        setEvents(eventsWithDates);
      });
  }, []);

  // ...rest of your add/remove event logic (update state & POST/DELETE to API as needed)

  return (
    <div style={{ height: 500, margin: "1em 0" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor={event => `${event.candidate} - ${event.jobRole}`}
        style={{ height: 500 }}
      />
    </div>
  );
}

export default InterviewCalendar;
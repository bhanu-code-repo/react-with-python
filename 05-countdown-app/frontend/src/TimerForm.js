import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TimerForm.css"; // Custom styling for TimerForm

function TimerForm({ addTimer }) {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showInputs, setShowInputs] = useState(false);

  const isDateAndTimeValid = () => {
    // Combine the selected date and time into a single date object
    const selectedDateTime = new Date(`${date}T${time}`);

    // Get the current date and time
    const currentDateTime = new Date();

    // Check if the selected date and time are in the future or current time
    return selectedDateTime > currentDateTime;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDateAndTimeValid()) {
      addTimer({ id: uuidv4(), eventName, date, time });
      setEventName("");
      setDate("");
      setTime("");
      setShowInputs(false);
    } else {
      alert("Please select a future or current date and time.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowInputs(!showInputs)}
      >
        {showInputs ? "Hide Inputs" : "Show Inputs"}
      </button>
      {showInputs && (
        <div>
          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              className="form-control"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Timer
          </button>
        </div>
      )}
    </form>
  );
}

export default TimerForm;

import React, { useState, useEffect } from "react";
import "./Timer.css"; // Custom styling for Timer

function Timer({ timer, deleteTimer }) {
  const { id, eventName, date, time } = timer;
  const targetDate = new Date(`${date}T${time}`);
  const [timeRemaining, setTimeRemaining] = useState(targetDate - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(targetDate - new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <div className="timer-box">
      <h2 className="timer-title">{eventName}</h2>
      <div className="rolling-clock">
        <div className="rolling-clock-segment">
          <span>{days}</span>Days
        </div>
        <div className="rolling-clock-segment">
          <span>{hours}</span>Hours
        </div>
        <div className="rolling-clock-segment">
          <span>{minutes}</span>Minutes
        </div>
        <div className="rolling-clock-segment">
          <span>{seconds}</span>Seconds
        </div>
      </div>
      <button className="btn btn-danger" onClick={() => deleteTimer(id)}>
        Delete
      </button>
    </div>
  );
}

export default Timer;

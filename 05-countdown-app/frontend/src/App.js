import React, { useState, useEffect } from "react";
import TimerForm from "./TimerForm";
import TimerList from "./TimerList";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [timers, setTimers] = useState([]);

  // Load timers from local storage on initial load
  useEffect(() => {
    const storedTimers = JSON.parse(localStorage.getItem("timers")) || [];
    setTimers(storedTimers);
  }, []);

  // Update local storage when timers change
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  // Function to add a new timer
  const addTimer = (newTimer) => {
    setTimers([...timers, newTimer]);
  };

  // Function to delete a timer
  const deleteTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  return (
    <div className="App">
      <h1 className="text-center mb-4">Countdown Timer App</h1>
      <TimerForm addTimer={addTimer} />
      <TimerList timers={timers} deleteTimer={deleteTimer} />
    </div>
  );
}

export default App;

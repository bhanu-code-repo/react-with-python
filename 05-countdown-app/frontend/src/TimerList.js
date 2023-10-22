import React from "react";
import Timer from "./Timer";
import "./TimerList.css";

function TimerList({ timers, deleteTimer }) {
  return (
    <div>
      {timers.map((timer) => (
        <Timer key={timer.id} timer={timer} deleteTimer={deleteTimer} />
      ))}
    </div>
  );
}

export default TimerList;

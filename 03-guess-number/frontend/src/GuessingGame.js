import React, { useState } from "react";
import "./GuessingGame.css";

function GuessingGame() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const resetGame = async () => {
    setGuess("");
    setMessage("");
    setAttempts(0);

    // Call the API to generate a new number
    try {
      await fetch("http://127.0.0.1:5000/generate-new-number", {
        method: "GET",
      });
    } catch (error) {
      console.error("Failed to generate a new number:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!guess || isNaN(guess) || guess < 1 || guess > 100) {
      setMessage("Please enter a valid number between 1 and 100.");
      return;
    }

    const response = await fetch("http://127.0.0.1:5000/check-guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess: guess }),
    });

    const data = await response.json();
    setAttempts(attempts + 1);

    if (data.result === "correct") {
      setMessage(
        `Congratulations! You guessed the number in ${attempts + 1} attempts.`
      );
    } else {
      setMessage(data.message);
    }
  };

  return (
    // <div className="container mt-5">
    //   <h1 className="mb-4">Number Guessing Game</h1>
    //   <p>Try to guess the number between 1 and 100.</p>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="number"
    //       value={guess}
    //       onChange={(e) => setGuess(e.target.value)}
    //       className="form-control"
    //       min="1"
    //       max="100"
    //     />
    //     <button type="submit" className="btn btn-primary mt-2">
    //       Submit
    //     </button>
    //     <button
    //       type="button"
    //       className="btn btn-secondary mt-2 ml-2"
    //       onClick={resetGame}
    //     >
    //       Reset
    //     </button>
    //   </form>
    //   {message && (
    //     <p
    //       className={message.includes("Congratulations") ? "success" : "error"}
    //     >
    //       {message}
    //     </p>
    //   )}
    // </div>
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="mb-4 engraved">Number Guessing Game</h1>
          <p>Try to guess the number between 1 and 100.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="form-control"
              min="1"
              max="100"
            />
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={resetGame}
            >
              Reset
            </button>
          </form>
          {message && (
            <p
              className={
                message.includes("Congratulations") ? "success" : "error"
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuessingGame;

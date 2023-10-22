import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchRandomQuote = () => {
    fetch("http://127.0.0.1:5000/random-quote") // Replace with your Flask API endpoint
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="App">
      <div className="quote-container">
        <h1>Inspirational Quote</h1>
        <div className="quote">
          <p>{quote}</p>
          <p className="author">- {author}</p>
        </div>
        <button className="btn" onClick={fetchRandomQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;

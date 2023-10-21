import React, { useState } from "react";
import axios from "axios";
import "./Calculator.css";

/**
 * Creates a Calculator component that allows users to perform calculations.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      axios
        .post("http://127.0.0.1:5000/calculate", { expression: input })
        .then((response) => {
          setResult(response.data.result);
        })
        .catch((error) => {
          setResult("Error", error.response.data.error);
        });
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator">
      <input className="input-field" type="text" value={input} readOnly />
      <div className="buttons">
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("*")}>*</button>
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button onClick={() => handleButtonClick("=")}>=</button>
        <button onClick={() => handleButtonClick("C")}>C</button>
        <button onClick={() => handleButtonClick("/")}>/</button>
      </div>
      <div className="result">{result}</div>
    </div>
  );
}

export default Calculator;

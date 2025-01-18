import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse("");
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/request`,
        { request: message || inputValue}
      );
      setResponse(result.data.content);
    } catch (error) {
      console.error("Error interacting with Gemini AI:", error);
      setResponse("Sorry, there was an error processing your request.");
    }
  };

  const handleRefresh = () => {
    setMessage("");
    setResponse("");
    setInputValue("");
  };
  const speechRecognizer = () => {
    if ("webkitSpeechRecognition" in window) {
      var recogntion = new window.webkitSpeechRecognition();
      recogntion.lang = "en-IN";
      recogntion.interimResults = false;
      recogntion.maxAlternatives = 1;
    } else {
      alert("can't listen..");
    }
    recogntion.start();
    recogntion.onresult = (event) => {
      console.log(event);
      var transcript = event.results[0][0].transcript;
      console.log(transcript);
      setInputValue(transcript);
    };
    recogntion.onerror = (error) => {
      console.log(error);
    };
    recogntion.onend = () => {
      recogntion.stop();
    };
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini AI Interaction</h1>
        <form onSubmit={handleSubmit}>
          <i
            onClick={speechRecognizer}
            className="fa-solid fa-microphone microphone"
            style={{ fontSize: "24px", color: "blue" }}
          ></i>
          <input
            className="input-field"
            type="text"
            value={message || inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
          <button type="button" onClick={handleRefresh}>
            Refresh
          </button>
        </form>
        <div className="response">{response && <p>{response}</p>}</div>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("request", message || inputValue);
    if (file) {
      formData.append("file", file);
    }
    setResponse("");
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/request`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(result.data.content);
      setMessage("");
    } catch (error) {
      console.error("Error interacting with Gemini AI:", error);
      if (error.response) {
        setResponse(error.response.data.error || "Error processing your request.");
      } else {
        setResponse("Network error. Please check your connection and try again.");
      }
    }
  };

  const handleRefresh = () => {
    setMessage("");
    setResponse("");
    setInputValue("");
    setFile(null);
  };

  const speechRecognizer = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      recognition.onerror = (error) => {
        console.error("Speech recognition error:", error);
      };

      recognition.onend = () => {
        recognition.stop();
      };
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
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
            className="file"
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
            <i className="fa-solid fa-cloud-arrow-up file-icon"></i>
          </label>
          <input
            className="input-field"
            type="text"
            value={message || inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
          <button type="button" onClick={handleRefresh}>Refresh</button>
        </form>
        <div className="response">{response && <p>{response}</p>}</div>
      </header>
    </div>
  );
}

export default App;

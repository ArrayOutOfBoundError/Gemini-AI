import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse('');
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/request`, { request: message });
      setResponse(result.data.content);
    } catch (error) {
      console.error('Error interacting with Gemini AI:', error);
      setResponse('Sorry, there was an error processing your request.');
    }
  };

  const handleRefresh = () => {
    setMessage('');
    setResponse('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini AI Interaction</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
          <button type="button" onClick={handleRefresh}>Refresh</button>
        </form>
        <div className="response">
          {response && <p>{response}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
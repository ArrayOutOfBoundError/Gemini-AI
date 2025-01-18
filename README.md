
# Gemini Clone Project

This project is a simple clone of Gemini, built using the following technologies:

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Frontend**: React.js with Vite as the build tool

## Features

- Endpoint `/request` to handle user prompts.
- Backend server to process requests and interact with the database.
- Frontend interface to interact with the application.
- MongoDB as the database to store user data and responses.
- **Speech Recognition**: Integrated speech recognition functionality to capture user prompts through voice.

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- MongoDB (v5.0 or later)
- npm or yarn

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RohitBCA456/Gemini-AI
   cd Gemini-AI
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../Frontend/vite-project
   npm install
   ```

4. **Setup Environment Variables**:
   Create a `.env` file in the `Backend` directory and add the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   ```

   Also, create a `.env` file in the `Frontend/vite-project` directory if needed for any frontend environment variables.

5. **Start MongoDB**:
   Ensure MongoDB is running on your machine or through a cloud provider.

## Running the Application

1. **Start the Backend Server**:
   ```bash
   cd Backend
   npm run start
   ```

2. **Start the Frontend**:
   ```bash
   cd ../Frontend/vite-project
   npm run dev
   ```

3. Open the application in your browser at `http://localhost:5173`.

## API Endpoints

### `/request`

- **Method**: POST
- **Description**: Endpoint to process and store user prompts.
- **Request Body**:
  ```json
  {
    "request": "<user-prompt-text>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Request received successfully.",
    "data": <processed-response>
  }
  ```

## Speech Recognition

The frontend includes speech recognition functionality to capture user input via voice.

### How it works:

1. A user can click the **microphone icon** to activate speech recognition.
2. The system listens for the user's speech and converts it into text.
3. The converted text is then used as a user prompt to interact with the backend.

This functionality is integrated using the `webkitSpeechRecognition` API in the frontend, enabling voice input for user requests.

## Project Structure

```
Gemini-AI
├── Backend
│   ├── node_modules        # Node.js modules for the backend
│   ├── app.js              # Main backend app configuration
│   ├── controller.js       # Controllers for handling request logic
│   ├── db.js               # Database connection setup (likely MongoDB)
│   ├── index.js            # Backend entry point
│   ├── model.js            # Mongoose models or backend data models
│   ├── package-lock.json   # Lock file for backend dependencies
│   ├── package.json        # Backend dependencies
│   └── requestRouter.js    # Routes for managing requests
├── Frontend
│   └── vite-project        # Frontend directory using Vite
│       ├── node_modules    # Node.js modules for the frontend
│       ├── public          # Static assets for the frontend
│       ├── src             # Source files (React components, logic)
│       ├── .gitignore      # Git ignored files for the frontend
│       ├── eslint.config.js# ESLint configuration for linting
│       ├── index.html      # HTML template
│       ├── vite.config.js  # Vite configuration
│       ├── package-lock.json # Lock file for frontend dependencies
│       └── package.json    # Frontend dependencies
├── .gitignore              # Global Git ignored files
└── README.md               # Project documentation

```

## Contribution

Feel free to fork this repository and submit pull requests to contribute to the project.

## Acknowledgments

- Thanks to the creators of Node.js, Express, MongoDB, React, and Vite for their amazing tools and libraries.

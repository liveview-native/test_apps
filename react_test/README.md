# React Counter App with Server Push

A real-time counter application where the counter value is pushed from the server to the React client using WebSockets. Everything runs from a single Node.js server.

## Setup

Install dependencies:
```bash
cd react_test
npm install
```

## Run the application

### Development mode (no build required):
```bash
npm run dev
```

### Production mode (builds React app first):
```bash
npm start
```

Open http://localhost:3000 in your browser.

## How it works

- The Node.js server serves the React app and handles WebSocket connections
- The server maintains a counter that increments every second
- The server pushes the updated counter value to all connected clients via WebSocket
- The React client displays the counter value in real-time
- The counter starts when the first client connects and stops when all clients disconnect
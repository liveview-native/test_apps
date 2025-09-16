# Svelte Real-time Counter App

A Svelte application with a server-pushed counter that increments every second, unique per session.

## Features

- Real-time counter updates via WebSocket
- Session-based counters (each browser session gets its own counter)
- Automatic reconnection handling
- Visual connection status indicator
- Persisted sessions via cookies

## Architecture

- **Client**: Svelte app with WebSocket connection
- **Server**: Node.js/Express server with WebSocket support
- **Session Management**: UUID-based sessions stored in memory with cookie persistence

## Running the Application

### Development Mode

Run both the Svelte dev server and the WebSocket server:

```bash
# Terminal 1 - Start the WebSocket server
npm run server

# Terminal 2 - Start the Svelte dev server  
npm run dev
```

Then open http://localhost:5173 in your browser.

### Production Mode

Build and serve the application:

```bash
npm run start
```

This will build the Svelte app and start the server. Open http://localhost:3000 in your browser.

## How It Works

1. When a client connects, the server checks for an existing session cookie
2. If no session exists, a new one is created with a unique ID
3. Each session maintains its own counter that increments every second
4. Counter updates are pushed to the client via WebSocket
5. Sessions persist for 30 seconds after the last client disconnects

## Testing Multiple Sessions

Open the app in multiple browser windows or incognito/private windows to see different counters for each session.
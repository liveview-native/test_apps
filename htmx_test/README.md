# HTMX Counter App

A simple web application demonstrating HTMX's auto-polling capability with a counter that increments every second.

## How to Run

1. Navigate to the directory:
   ```bash
   cd htmx_test
   ```

2. Start the Python server:
   ```bash
   python3 server.py
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

## How It Works

- The HTML page uses HTMX to poll the `/counter` endpoint every second
- The server tracks elapsed time since startup and returns it as the counter value
- HTMX automatically updates the counter div with the new value
- No JavaScript code needed - all handled by HTMX attributes

## Features

- Auto-incrementing counter
- Clean, responsive design
- Minimal dependencies (just Python standard library and HTMX via CDN)
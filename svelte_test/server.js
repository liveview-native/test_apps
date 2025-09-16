import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

app.use(cookieParser());

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}

const sessions = new Map();

wss.on('connection', (ws, req) => {
  const cookies = parseCookies(req.headers.cookie || '');
  let sessionId = cookies.sessionId;
  
  if (!sessionId || !sessions.has(sessionId)) {
    sessionId = uuidv4();
  }
  
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      counter: 0,
      clients: new Set()
    });
  }
  
  const session = sessions.get(sessionId);
  session.clients.add(ws);
  
  ws.send(JSON.stringify({
    type: 'init',
    sessionId,
    counter: session.counter
  }));
  
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      session.counter++;
      ws.send(JSON.stringify({
        type: 'update',
        counter: session.counter
      }));
    }
  }, 1000);
  
  ws.on('close', () => {
    clearInterval(interval);
    session.clients.delete(ws);
    
    if (session.clients.size === 0) {
      setTimeout(() => {
        if (session.clients.size === 0) {
          sessions.delete(sessionId);
        }
      }, 30000);
    }
  });
  
  ws.on('error', console.error);
});

function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = value;
    }
  });
  return cookies;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('WebSocket server is ready for connections');
  if (isDev) {
    console.log('Development mode - Vite serving the frontend');
  } else {
    console.log('Production mode - Serving static files from dist/');
  }
});
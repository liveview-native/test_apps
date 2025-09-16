import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const isDev = process.env.NODE_ENV !== 'production';

async function startServer() {
  if (isDev) {
    // Create Vite server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = join(__dirname, 'dist');
    if (!fs.existsSync(distPath)) {
      console.error('Error: dist folder not found. Please run "npm run build" first.');
      process.exit(1);
    }
    
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(join(distPath, 'index.html'));
    });
  }

  let counter = 0;
  let intervalId = null;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.emit('counter', counter);
    
    if (!intervalId) {
      intervalId = setInterval(() => {
        counter++;
        io.emit('counter', counter);
      }, 1000);
    }
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      if (io.engine.clientsCount === 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log('No clients connected, stopping counter');
      }
    });
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} (${isDev ? 'development' : 'production'} mode)`);
  });
}

startServer().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
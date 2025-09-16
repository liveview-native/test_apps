import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const [counter, setCounter] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(window.location.origin, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socket.on('counter', (value) => {
      setCounter(value);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <text className="container">
      <h1 className="title">Server-Pushed Counter</h1>
      <div className="counter-display">{counter}</div>
      <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? '✓ Connected to server' : '✗ Disconnected from server'}
      </div>
    </text>
  );
}

export default App;

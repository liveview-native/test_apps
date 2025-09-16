<script>
  import { onMount, onDestroy } from 'svelte';
  
  let counter = 0;
  let connected = false;
  let sessionId = '';
  let ws = null;
  
  function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  onMount(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    
    ws = new WebSocket(`${protocol}//${host}/ws`);
    
    ws.onopen = () => {
      connected = true;
      console.log('Connected to server');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'init') {
        sessionId = data.sessionId;
        counter = data.counter;
        setCookie('sessionId', sessionId);
        console.log('Session initialized:', sessionId);
      } else if (data.type === 'update') {
        counter = data.counter;
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      connected = false;
    };
    
    ws.onclose = () => {
      connected = false;
      console.log('Disconnected from server');
    };
  });
  
  onDestroy(() => {
    if (ws) {
      ws.close();
    }
  });
</script>

<main>
  <div class="container">
    <h1>Real-time Counter</h1>
    
    <div class="counter-display">
      <div class="counter-value">{counter}</div>
      <div class="counter-label">seconds</div>
    </div>
    
    <div class="status">
      <span class="status-indicator" class:connected={connected}></span>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
    
    {#if sessionId}
      <div class="session-info">
        Session ID: <code>{sessionId.slice(0, 8)}...</code>
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .container {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    min-width: 300px;
  }
  
  h1 {
    color: #333;
    margin: 0 0 2rem 0;
    font-size: 2rem;
  }
  
  .counter-display {
    margin: 2rem 0;
  }
  
  .counter-value {
    font-size: 4rem;
    font-weight: bold;
    color: #667eea;
    font-variant-numeric: tabular-nums;
  }
  
  .counter-label {
    font-size: 1.2rem;
    color: #666;
    margin-top: 0.5rem;
  }
  
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 2rem 0 1rem 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #dc3545;
    transition: background 0.3s;
  }
  
  .status-indicator.connected {
    background: #28a745;
    animation: pulse 2s infinite;
  }
  
  .session-info {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #999;
  }
  
  code {
    background: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
    }
  }
</style>
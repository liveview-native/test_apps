<div wire:poll.1000ms="increment" class="counter-container">
    <style>
    .counter-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    }
    
    .counter-display {
        background: white;
        border-radius: 20px;
        padding: 40px 60px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        text-align: center;
        min-width: 400px;
    }
    
    .counter-display h1 {
        color: #333;
        margin-bottom: 10px;
        font-size: 2rem;
    }
    
    .count-value {
        font-size: 6rem;
        font-weight: bold;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 20px 0;
        line-height: 1;
    }
    
    .session-info {
        color: #666;
        font-size: 0.9rem;
        margin-top: 20px;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 8px;
        word-break: break-all;
    }
    
    .controls {
        margin-top: 30px;
        display: flex;
        gap: 10px;
        justify-content: center;
    }
    
    .btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
    }
    
    .btn:hover {
        background: #5a67d8;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
    }
    
    .btn.reset {
        background: #e53e3e;
        box-shadow: 0 4px 6px rgba(229, 62, 62, 0.2);
    }
    
    .btn.reset:hover {
        background: #c53030;
        box-shadow: 0 6px 12px rgba(229, 62, 62, 0.3);
    }
    
    .status-indicator {
        margin-top: 20px;
    }
    
    .status {
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .status.active {
        color: #48bb78;
    }
    
    .status.paused {
        color: #ed8936;
    }
    </style>
    
    <div class="counter-display">
        <h1>Session Counter (Server-Side)</h1>
        <div class="count-value">{{ $count }}</div>
        <p class="session-info">
            Session ID: <span>{{ $sessionId }}</span>
            <br>
            <small>Counter updates are pushed from the server every second</small>
        </p>
        <div class="controls">
            @if($isRunning)
                <button wire:click="pause" class="btn">Pause</button>
            @else
                <button wire:click="resume" class="btn">Resume</button>
            @endif
            <button wire:click="resetCounter" class="btn reset">Reset</button>
        </div>
        <div class="status-indicator">
            @if($isRunning)
                <span class="status active">● Running</span>
            @else
                <span class="status paused">● Paused</span>
            @endif
        </div>
    </div>
</div>

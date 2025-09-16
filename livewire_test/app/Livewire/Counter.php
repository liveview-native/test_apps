<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\Attributes\On;

class Counter extends Component
{
    public $count = 0;
    public $sessionId;
    public $isRunning = true;
    
    public function mount()
    {
        $this->sessionId = session()->getId();
        
        if (!session()->has('counter_' . $this->sessionId)) {
            session(['counter_' . $this->sessionId => 0]);
        }
        
        $this->count = session('counter_' . $this->sessionId, 0);
    }
    
    public function increment()
    {
        if ($this->isRunning) {
            $this->count++;
            session(['counter_' . $this->sessionId => $this->count]);
        }
    }
    
    public function pause()
    {
        $this->isRunning = false;
    }
    
    public function resume()
    {
        $this->isRunning = true;
    }
    
    public function resetCounter()
    {
        $this->count = 0;
        session(['counter_' . $this->sessionId => 0]);
    }
    
    public function render()
    {
        $acceptHeader = request()->header('Accept');
        
        if ($acceptHeader === 'application/swiftui+vml') {
            return view('livewire.counter-vml');
        }
        
        return view('livewire.counter');
    }
}

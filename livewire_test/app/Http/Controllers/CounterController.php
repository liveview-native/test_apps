<?php

namespace App\Http\Controllers;

use App\Livewire\Counter;
use Illuminate\Http\Request;

class CounterController extends Controller
{
    public function __invoke(Request $request)
    {
        $acceptHeader = $request->header('Accept');
        
        if ($acceptHeader === 'application/swiftui+vml') {
            $component = app()->make(Counter::class);
            $component->mount();
            
            $content = view('livewire.counter-vml', [
                'count' => $component->count,
                'sessionId' => $component->sessionId,
                'isRunning' => $component->isRunning
            ])->render();
            
            return response($content)
                ->header('Content-Type', 'application/swiftui+vml');
        }
        
        return app()->call(Counter::class);
    }
}
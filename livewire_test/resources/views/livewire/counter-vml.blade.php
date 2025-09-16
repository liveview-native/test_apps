@extends('layouts.vml')

@section('content')
<VStack>
    <Text>Session Counter (Server-Side)</Text>
    <Text font="largeTitle">{{ $count }}</Text>
    <Text>Session ID: {{ $sessionId }}</Text>
    <Text>Counter updates are pushed from the server every second</Text>
    
    @if($isRunning)
        <Button wire:click="pause">Pause</Button>
    @else
        <Button wire:click="resume">Resume</Button>
    @endif
    
    <Button wire:click="resetCounter">Reset</Button>
    
    @if($isRunning)
        <Text>Running</Text>
    @else
        <Text>Paused</Text>
    @endif
</VStack>
@endsection
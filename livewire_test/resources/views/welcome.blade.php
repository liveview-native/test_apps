<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel Livewire Counter</title>
        @livewireStyles
    </head>
    <body style="margin: 0; padding: 0;">
        <livewire:counter />
        
        @livewireScripts
    </body>
</html>
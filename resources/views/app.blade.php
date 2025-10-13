<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="light">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Force light mode - override any system theme detection --}}
        <script>
            (function() {
                // Force light mode regardless of system preference
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                document.documentElement.style.colorScheme = 'light';
                document.documentElement.style.backgroundColor = 'oklch(1 0 0)';
                
                // Prevent any dark mode detection
                if (window.matchMedia) {
                    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', function() {});
                }
            })();
        </script>

        {{-- Force light mode styles - disable dark mode completely --}}
        <style>
            html {
                background-color: oklch(1 0 0) !important;
                color-scheme: light !important;
            }

            /* Disable dark mode completely */
            html.dark {
                background-color: oklch(1 0 0) !important;
            }
            
            /* Force light theme variables */
            :root {
                --background: oklch(1 0 0) !important;
                --foreground: oklch(0.205 0 0) !important;
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @viteReactRefresh
        @vite([
            'resources/js/app.tsx',
            file_exists(resource_path("js/pages/{$page['component']}.jsx"))
                ? "resources/js/pages/{$page['component']}.tsx"
                : "resources/js/pages/{$page['component']}.jsx"
        ])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

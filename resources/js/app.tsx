import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const jsxPages = import.meta.glob('./pages/**/*.jsx');
        const tsxPages = import.meta.glob('./pages/**/*.tsx');
        const pages = { ...jsxPages, ...tsxPages };

        if (pages[`./pages/${name}.jsx`]) {
            return resolvePageComponent(`./pages/${name}.jsx`, pages);
        }
        return resolvePageComponent(`./pages/${name}.tsx`, pages);
    },

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});

// Force light mode - override system theme detection
const forceLightMode = () => {
    // Remove any existing dark class
    document.documentElement.classList.remove('dark');
    
    // Set color scheme to light
    document.documentElement.style.colorScheme = 'light';
    
    // Override any system theme detection
    document.documentElement.style.setProperty('--background', 'oklch(1 0 0)');
    document.documentElement.style.setProperty('--foreground', 'oklch(0.205 0 0)');
    
    // Set the HTML background to light
    document.documentElement.style.backgroundColor = 'oklch(1 0 0)';
};

// Initialize with forced light mode
forceLightMode();

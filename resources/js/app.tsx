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

// Initialize light/dark mode on page load
initializeTheme();

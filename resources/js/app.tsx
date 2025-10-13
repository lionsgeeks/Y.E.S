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
    } else if (pages[`./pages/${name}.tsx`]) {
      return resolvePageComponent(`./pages/${name}.tsx`, pages);
    } else {
      throw new Error(`Page not found: ${name}`);
    }
  },

  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },

  progress: {
    color: '#4B5563',
  },
});

const forceLightMode = () => {
  document.documentElement.classList.remove('dark');
  document.documentElement.style.colorScheme = 'light';
  document.documentElement.style.setProperty('--background', 'oklch(1 0 0)');
  document.documentElement.style.setProperty('--foreground', 'oklch(0.205 0 0)');
  document.documentElement.style.backgroundColor = 'oklch(1 0 0)';
};

forceLightMode();

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

import { wTrans } from './Core/i18n';
import { setAdminPath, patchAdminRoutes } from './wayfinder/index';
import adminRoutes from './routes/admin';

// Patch admin route URLs with the configured admin path
const adminPathMeta = document.querySelector('meta[name="admin-path"]');
const adminPath = adminPathMeta ? adminPathMeta.getAttribute('content') : 'admin';
if (adminPath && adminPath !== 'admin') {
    setAdminPath(adminPath);
    patchAdminRoutes(adminRoutes);
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        app.config.globalProperties.__ = wTrans;
        app.config.globalProperties.trans = wTrans;
        app.config.globalProperties.$adminPath = adminPath;

        // Register service worker for PWA
        if ('serviceWorker' in navigator && import.meta.env.PROD) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js').catch(() => {});
            });
        }

        app.use(plugin).mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

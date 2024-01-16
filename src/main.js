import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router';

// Fontawesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registrato con successo:', registration);
        })
        .catch((error) => {
            console.error('Errore durante la registrazione del Service Worker:', error);
        });
}



createApp(App).use(router).mount('#app')
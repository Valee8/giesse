import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router';

// Fontawesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//             console.log('Service Worker registered with scope:', registration.scope);
//         })
//         .catch(error => {
//             console.error('Service Worker registration failed:', error);
//         });
// }

createApp(App).use(router).mount('#app')
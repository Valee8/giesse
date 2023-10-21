import { createRouter, createWebHashHistory } from 'vue-router';

// Importo componenti
import App from './App.vue';
import Verticali from './components/Verticali.vue';
import Orizzontali from './components/Orizzontali.vue';
import PortaABattente from './components/PortaABattente.vue';
import Scorri from './components/Scorri.vue';
import Fissa from './components/Fissa.vue';
import Casper from './components/Casper.vue';
import Preventivo from './components/Preventivo.vue';
import Sede from './components/Sede.vue';
import Contatti from './components/Contatti.vue';

const router = createRouter({
    history: createWebHashHistory(),
    //mode: "hash",
    routes: [
        // Rotta Home
        {
            path: '/',
            alias: '/giesse/',
            name: 'home',
            component: App
        },
        // Rotta Verticali
        {
            path: '/verticali/:id',
            name: 'verticali',
            component: Verticali
        },
        // Rotta Orizzontali
        {
            path: '/orizzontali/:id',
            name: 'orizzontali',
            component: Orizzontali
        },
        // Rotta Porta a Battente
        {
            path: '/porta-a-battente/:id',
            name: 'porta-a-battente',
            component: PortaABattente
        },
        // Rotta Scorri
        {
            path: '/scorri/:id',
            name: 'scorri',
            component: Scorri
        },
        // Rotta Fissa
        {
            path: '/fissa/:id',
            name: 'fissa',
            component: Fissa
        },
        // Rotta Casper
        {
            path: '/casper/:id',
            name: 'casper',
            component: Casper
        },
        // Rotta preventivo
        {
            path: '/preventivo',
            name: 'preventivo',
            component: Preventivo
        },
        // Rotta Sede
        {
            path: '/sede',
            name: 'sede',
            component: Sede
        },
        // Rotta Contatti
        {
            path: '/contatti',
            name: 'contatti',
            component: Contatti
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // Per scrollare in alto
        return { top: 0 }
    },
});

export { router };
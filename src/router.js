import { createRouter, createWebHistory } from 'vue-router';

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
    history: createWebHistory(),
    routes: [
        // Rotta Home
        {
            path: '/giesse/',
            alias: '/',
            name: 'home',
            component: App
        },
        // Rotta Verticali
        {
            path: '/giesse/verticali/:id',
            alias: '/verticali/:id',
            name: 'verticali',
            component: Verticali
        },
        // Rotta Orizzontali
        {
            path: '/giesse/orizzontali/:id',
            alias: '/orizzontali/:id',
            name: 'orizzontali',
            component: Orizzontali
        },
        // Rotta Porta a Battente
        {
            path: '/giesse/porta-a-battente/:id',
            alias: '/porta-a-battente/:id',
            name: 'porta-a-battente',
            component: PortaABattente
        },
        // Rotta Scorri
        {
            path: '/giesse/scorri/:id',
            alias: '/scorri/:id',
            name: 'scorri',
            component: Scorri
        },
        // Rotta Fissa
        {
            path: '/giesse/fissa/:id',
            alias: '/fissa/:id',
            name: 'fissa',
            component: Fissa
        },
        // Rotta Casper
        {
            path: '/giesse/casper/:id',
            alias: '/casper/:id',
            name: 'casper',
            component: Casper
        },
        // Rotta preventivo
        {
            path: '/giesse/preventivo',
            alias: '/preventivo',
            name: 'preventivo',
            component: Preventivo
        },
        // Rotta Sede
        {
            path: '/giesse/sede',
            alias: '/sede',
            name: 'sede',
            component: Sede
        },
        // Rotta Contatti
        {
            path: '/giesse/contatti',
            alias: '/contatti',
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
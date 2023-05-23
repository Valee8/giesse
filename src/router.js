import { createRouter, createWebHistory } from 'vue-router';

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
        {
            path: '/',
            name: 'home',
            component: App
        },
        {
            path: '/verticali/:id',
            name: 'verticali',
            component: Verticali
        },
        {
            path: '/orizzontali/:id',
            name: 'orizzontali',
            component: Orizzontali
        },
        {
            path: '/porta-a-battente/:id',
            name: 'porta-a-battente',
            component: PortaABattente
        },
        {
            path: '/scorri/:id',
            name: 'scorri',
            component: Scorri
        },
        {
            path: '/fissa/:id',
            name: 'fissa',
            component: Fissa
        },
        {
            path: '/casper/:id',
            name: 'casper',
            component: Casper
        },
        {
            path: '/preventivo',
            name: 'preventivo',
            component: Preventivo
        },
        {
            path: '/sede',
            name: 'sede',
            component: Sede
        },
        {
            path: '/contatti',
            name: 'contatti',
            component: Contatti
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
});

export { router };
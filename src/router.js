import { createRouter, createWebHistory } from 'vue-router';

// Importo componenti
import App from './App.vue';
import Verticali from './components/Verticali.vue';
import Laterali from './components/Laterali.vue';
import PortaABattente from './components/PortaABattente.vue';
import Scorri from './components/Scorri.vue';
import Fissa from './components/Fissa.vue';
import Casper from './components/Casper.vue';
import Preventivo from './components/Preventivo.vue';
import Sede from './components/Sede.vue';
import Contatti from './components/Contatti.vue';
import NotFoundPage from './components/NotFoundPage.vue';


import { store } from './store';

const router = createRouter({
    history: createWebHistory(),
    //mode: "hash",
    routes: [
        // Rotta Home
        {
            path: '/',
            //alias: '/giesse/',
            name: 'home',
            component: App
        },
        // Rotta Verticali
        {
            path: '/verticali',
            name: 'verticali',
            component: Verticali
        },
        // Rotta Orizzontali
        {
            path: '/laterali',
            name: 'laterali',
            component: Laterali
        },
        // Rotta Porta a Battente
        {
            path: '/porta-a-battente',
            name: 'porta-a-battente',
            component: PortaABattente
        },
        // Rotta Scorri
        {
            path: '/scorri',
            name: 'scorri',
            component: Scorri
        },
        // Rotta Fissa
        {
            path: '/fissa',
            name: 'fissa',
            component: Fissa
        },
        // Rotta Casper
        {
            path: '/casper',
            name: 'casper',
            component: Casper
        },
        // Rotta preventivo
        {
            path: '/richiedi-preventivo',
            name: 'preventivo',
            component: Preventivo
        },
        // Rotta Sede
        {
            path: '/posizione-sede',
            name: 'sede',
            component: Sede
        },
        // Rotta Contatti
        {
            path: '/contatti',
            name: 'contatti',
            component: Contatti
        },
        /* {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFoundPage
        }, */
    ],
    scrollBehavior(to, from, savedPosition) {
        // Per scrollare in alto
        return { top: 0 }
    },
});

router.beforeEach((to, from, next) => {

    if (from.path === '/preventivo') {

       if (store.currentStep === 2 || store.currentStep === 3) {
            store.activePopup = true;
            store.showPopupExitRoutePreventivo = true;
            store.linkRoute = to.path;

            if (store.changeRoute) {
                next();
                store.changeRoute = false;
                store.activePopup = false;
                store.showPopupExitRoutePreventivo = false;
            }
            else {
                next(false);
            }
       }
       else {
            next();
       }

    } 

    else {
        next();
    }

});

export { router };
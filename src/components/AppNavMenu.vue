<script>
import { store } from '../store.js';

export default {
    name: 'AppNavMenu',
    data() {
        return {
            store,
            // Nome classe css che assegno all'elemento corrente del menu'
            activeSection: "",
        }
    },
    methods: {
        prova() {
            // Se l'url include "preventivo"
            if (window.location.href.includes("preventivo")) {
                // Assegno true all'active del primo elemento dell'array linksNav presente nel file store.js
                this.store.linksNav[0].active = true;
                // Assegno "active top" come classe css del primo elemento
                this.activeSection = "active top";

                // Scorro l'array linksNav e assegno false all'active di tutti gli altri elementi 
                for (let i = 0; i < this.store.linksNav.length; i++) {
                    if (i !== 0) {
                        this.store.linksNav[i].active = false;
                    }
                }
            }
            // Se l'url include "sede"
            else if (window.location.href.includes("sede")) {
                // Assegno true all'active del secondo elemento dell'array linksNav presente nel file store.js
                this.store.linksNav[1].active = true;
                // Assegno "active center" come classe css del secondo elemento
                this.activeSection = "active center";

                // Scorro l'array linksNav e assegno false all'active di tutti gli altri elementi 
                for (let i = 0; i < this.store.linksNav.length; i++) {
                    if (i !== 1) {
                        this.store.linksNav[i].active = false;
                    }
                }
            }
            // Se l'url include "contatti"
            else if (window.location.href.includes("contatti")) {
                // Assegno true all'active del terzo elemento dell'array linksNav presente nel file store.js
                this.store.linksNav[2].active = true;
                // Assegno "active bottom" come classe css del secondo elemento
                this.activeSection = "active bottom";

                // Scorro l'array linksNav e assegno false all'active di tutti gli altri elementi 
                for (let i = 0; i < this.store.linksNav.length; i++) {
                    if (i !== 2) {
                        this.store.linksNav[i].active = false;
                    }
                }
            }
            // Se l'url non contiene preventivo, sede o contatti
            else {
                // Non assegno nessuna classe css e activeSection e' azzerato
                this.activeSection = "";

                // Scorro l'array linksNav e assegno false a tutti gli active
                for (let i = 0; i < this.store.linksNav.length; i++) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
    },
    // updated: viene chiamato dopo che la componente viene aggiornata
    updated() {
        // Se l'url include "preventivo"
        if (window.location.href.includes("preventivo")) {
            // Assegno true all'active del primo elemento dell'array linksNav presente nel file store.js
            this.store.linksNav[0].active = true;
            // Assegno "active top" come classe css del primo elemento
            this.activeSection = "active top";

            // Scorro l'array linksNav e assegno false all'active di tutti gli altri elementi 
            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 0) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        // Se l'url include "sede"
        else if (window.location.href.includes("sede")) {
            // Assegno true all'active del secondo elemento dell'array linksNav presente nel file store.js
            this.store.linksNav[1].active = true;
            // Assegno "active center" come classe css del secondo elemento
            this.activeSection = "active center";

            // Scorro l'array linksNav e assegno false all'active di tutti gli altri elementi 
            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 1) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        // Se l'url include "contatti"
        else if (window.location.href.includes("contatti")) {
            // Assegno true all'active del terzo elemento dell'array linksNav presente nel file store.js
            this.store.linksNav[2].active = true;
            // Assegno "active bottom" come classe css del secondo elemento
            this.activeSection = "active bottom";

            // Scorro l'array linksNav e assegno false all'active di tutti gli altri elementi 
            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 2) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        // Se l'url non contiene preventivo, sede o contatti
        else {
            // Non assegno nessuna classe css e activeSection e' azzerato
            this.activeSection = "";

            // Scorro l'array linksNav e assegno false a tutti gli active
            for (let i = 0; i < this.store.linksNav.length; i++) {
                this.store.linksNav[i].active = false;
            }
        }
    },
}
</script>

<template>
    <!-- MENU ATTUALE, MENU BELLO, MENU FIGO -->
    <nav id="newMenu">
        <div class="menu-container">
            <!-- Parte sinistra contenente il cerchio che si sposta verticalmente -->
            <div id="circle-menu" :class="activeSection">
                <div class="circle-menu-div">
                    <div class="circle"></div>
                </div>
            </div>

            <!-- Parte destra con scritte e icone -->
            <div class="icons-menu">
                <ul>
                    <li v-for="(link, index) in store.linksNav" :key="index" :class="link.active ? 'active' : ''">
                        <div class="icons">
                            <router-link :to="{ name: link.href }">
                                <!-- Scritta -->
                                <span class="text">
                                    {{ link.text }}
                                </span>

                                <!-- Icona -->
                                <span class="icon">
                                    <i :class="link.icon"></i>
                                </span>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- MENU ATTUALE, MENU BELLO, MENU FIGO -->
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

/////// Menu bello, menu figo
#newMenu {
    position: fixed;
    right: 30px;
    top: 167px;
    z-index: 70;

    .menu-container {
        display: flex;
        justify-content: center;

        #circle-menu {
            position: relative;
            left: 31px;
            display: none;

            &.active {
                display: block;
            }

            &.top,
            &.center,
            &.bottom {
                transition: all 500ms ease-in-out;
            }

            &.top {
                transform: translateY(14px);
            }

            &.center {
                transform: translateY(116px);
            }

            &.bottom {
                transform: translateY(219px);
            }
        }

        .circle-menu-div {
            height: 102px;
            display: flex;
            align-items: center;

            .circle {
                height: 38px;
                width: 38px;
                border-radius: 40px;
                background-color: #000;

            }
        }

        .icons-menu {
            background-image: url('/img/sfondi-e-logo/bg-nav-top.webp'), url('/img/sfondi-e-logo/bg-nav-bottom.webp');
            background-position: top center, bottom center;
            background-size: 100%;
            background-repeat: no-repeat, no-repeat;
            width: 42px;
            height: 342px;
            position: relative;

            li {
                display: flex;
                align-items: center;
                height: 102px;
                background-image: url('/img/sfondi-e-logo/bg-nav-center.webp');
                background-position: -100px 0;

                &.active {

                    .text {
                        display: none;
                    }
                }

                &:not(.active) {
                    justify-content: center;

                    .text {
                        display: none;
                    }

                    &:hover {

                        .icons {
                            position: relative;
                            margin-left: -188px;
                            width: 230px;
                            top: -20px;

                            a {
                                display: flex;
                                justify-content: flex-end;
                                align-items: center;
                                gap: 5px;
                                position: absolute;
                                right: 0;

                            }
                        }

                        .text {
                            display: flex;
                            align-items: center;
                            background-color: #000;
                            height: 16px;
                            padding: 20px;
                            font-size: 0.9rem;
                            border-radius: 50px;
                        }

                        .icon {
                            width: 42px;
                            text-align: center;
                        }

                    }

                }

                a {
                    color: #fff;
                }

                &:first-child {
                    margin-top: 19px;
                }

                &:not(.active) {
                    background-color: #000;
                }

                &.active {
                    background-size: 100%;
                    background-position: 0 0;

                    &:first-child {
                        svg {
                            position: relative;
                            left: 6px;
                            top: -5px;
                        }
                    }

                    &:last-child {
                        svg {
                            position: relative;
                            left: 4px;
                            top: -4px;
                        }
                    }

                    a {
                        color: $yellow-color;
                    }

                    svg {
                        position: relative;
                        left: 6px;
                        top: -4px;
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 990px) {
    #newMenu {
        display: none;
    }
}
</style>
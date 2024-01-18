<script>

// Importo store
import { store } from '../store.js';

export default {
    name: 'AppNavbar',
    data() {
        return {
            store,
            // Nome classe css che assegno all'elemento corrente del menu'
            activeSection: "",
        }
    },
    methods: {
        // Metodo showSubmenu per mostrare il sottomenu quando viene cliccata la scritta "Zanzariere" nel nav
        showSubmenu() {
            // Se submenu (presente nel file store.js) e' false
            if (!this.store.submenu) {
                // Assegno true a submenu
                this.store.submenu = true;

                // Assegno la classe css "expand" a classSubmenu (presente nel file store.js)
                this.store.classSubmenu = "expand";
            }
            // Se submenu (presente nel file store.js) e' true
            else {
                // Assegno false a submenu
                this.store.submenu = false;

                // Assegno la classe css "reduce" a classSubmenu 
                this.store.classSubmenu = "reduce";
            }
        },
        // Metodo showHamburger per mostrare il sottomenu delle versioni mobile/tablet che sostituisce il menu' figo, menu' bello della versione desktop
        showHamburger() {
            // Se menuHamburger (presente nel file store.js) e' false
            if (!this.store.menuHamburger) {
                // Assegno true a menuHamburger
                this.store.menuHamburger = true;

                // Assegno la classe css "visible" a classHamburger (presente nel file store.js)
                this.store.classHamburger = "visible";
            }
            // Se menuHamburger e' true
            else {
                // Assegno false a menuHamburger
                this.store.menuHamburger = false;

                // Assegno la classe css "hidden" a classHamburger
                this.store.classHamburger = "hidden";
            }
        }
    },
    computed: {
        // Estraggo le Verticali dalla posizione 0 (incluso) alla posizione 4 (escluso) dell'array listModels presente nel file store.js
        filteredVertical() {
            return this.store.listModels.slice(0, 4);
        },
        // Estraggo le Orizzontali dalla posizione 4 (incluso) alla posizione 10 (escluso) dell'array listModels presente nel file store.js
        filteredHorizontal() {
            return this.store.listModels.slice(4, 10);
        }
    },
    mounted() {
        const blurredImageDiv = document.querySelector(".logo-container");

        const img = blurredImageDiv.querySelector(".logo-image");

        // Funzione loaded per aggiungere la classe loaded a .header-container 
        function loaded() {
            blurredImageDiv.classList.add("loaded");
        }

        // Se l'immagine ha caricato completamente allora richiamo la funzione loaded() (complete e' una proprieta' di js)
        if (img.complete) {
            loaded();
        }
        // Altrimenti aggiungo un listener dell'evento "load" all'elemento immagine
        else {
            img.addEventListener("load", loaded);
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
    <!-- Menu nero in alto -->
    <nav id="blackMenu">
        <div class="bg">
            <div class="container">
                <ul class="ul-container">
                    <!-- Logo sulla sinistra -->
                    <li>
                        <div class="logo-container">
                            <router-link :to="{ name: 'home' }" class="logo">
                                <img src="/img/logo-giesse.webp" alt="Logo Giesse" class="logo-image">
                            </router-link>
                        </div>
                    </li>

                    <!-- Scritta Zanzariere -->
                    <li>
                        <span @click.stop="showSubmenu">
                            Zanzariere
                            <!-- Icone frecce -->
                            <span v-if="!store.submenu">
                                <i class="fa-solid fa-chevron-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa-solid fa-chevron-up"></i>
                            </span>
                        </span>
                    </li>

                    <!-- Scritta "richiede preventivo" sulla destra -->
                    <li class="preventivo">
                        <router-link :to="{ name: 'preventivo' }">
                            Richiedi Preventivo
                        </router-link>
                    </li>

                    <!-- Icona hamburger per le versioni mobile/tablet -->
                    <li class="icon-hamburger" @click.stop="showHamburger">
                        <i class="fa-solid fa-bars"></i>
                    </li>
                </ul>
            </div>

            <!-- Sottomenu che appare se cliccata la scritta "Zanzariere" -->
            <div class="submenu" :class="store.classSubmenu">
                <div class="container" :class="{ 'pl-not-home': $route.name !== 'home' }">
                    <!-- Prima lista -->
                    <ul>
                        <li>
                            <!-- Titolo -->
                            <h5>
                                Verticali
                            </h5>
                        </li>

                        <!-- Elenco zanzariere verticali -->
                        <li v-for="(model, index) in filteredVertical" :key="index">
                            <router-link :to="{ name: 'verticali', params: { id: 0 }, hash: model.hash + '-' + index }">
                                {{ model.name }}
                            </router-link>
                        </li>
                    </ul>

                    <!-- Seconda lista -->
                    <ul>
                        <li>
                            <!-- Titolo -->
                            <h5>
                                Orizzontali
                            </h5>
                        </li>

                        <!-- Elenco zanzariere Orizzontali -->
                        <li v-for="(model, index) in filteredHorizontal" :key="index">
                            <router-link :to="{ name: 'orizzontali', params: { id: 1 }, hash: model.hash + '-' + index }">
                                {{ model.name }}
                            </router-link>
                        </li>
                    </ul>

                    <!-- Terza lista -->
                    <ul>
                        <li>
                            <!-- Titolo -->
                            <h5>
                                Altre
                            </h5>
                        </li>

                        <!-- Elenco Altre zanzariere -->
                        <li>
                            <router-link :to="{ name: 'porta-a-battente', params: { id: 2 } }">
                                Porta a battente
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'scorri', params: { id: 3 } }">
                                Scorri
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'fissa', params: { id: 4 } }">
                                Fissa
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'casper', params: { id: 5 } }">
                                Casper
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Sottomenu hamburger che appare dopo aver cliccato l'icona hamburger nelle versioni mobile/tablet -->
        <ul class="hamburger" :class="store.classHamburger">
            <li v-for="(link, index) in store.linksNav" :key="index">
                <div class="icons">
                    <router-link :to="{ name: link.href }">
                        <!-- Icona -->
                        <span class="icon">
                            <i :class="link.icon"></i>
                        </span>

                        <!-- Scritta -->
                        <span class="text">
                            {{ link.text }}
                        </span>
                    </router-link>
                </div>
            </li>
        </ul>
    </nav>
    <!-- Menu nero in alto -->

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

// Contiene l'immagine del logo come sfondo ad una bassa risoluzione, che apparira' temporaneamente fino a quando non verra' caricata la vera immagine
.logo-container {
    background-image: url('/img/logo-bad.jpeg');
    background-size: cover;
    height: 32px;
    width: 155px;
    position: relative;
    margin-right: 40px;
    border-radius: 5px;
    border: 1px solid #000;

    .logo-image {
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 250ms ease-in-out;
        border: 1px solid transparent;
    }

    &.loaded {
        .logo-image {
            opacity: 1;
        }
    }
}

// Menu in alto nero
#blackMenu {
    color: #fff;
    width: 100%;
    height: 66px;
    position: relative;
    z-index: 2;

    a {
        color: #fff;
    }

    .ul-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        width: 155px;
        height: 32px;
        display: block;
    }

    .bg {
        background-color: #1c1c1c;
        height: 66px;
        user-select: none;

        .ul-container {

            li:nth-child(2) {
                line-height: 66px;
                flex-grow: 1;

                span {
                    cursor: pointer;
                }

            }

            .mobile-links {
                margin: 0 13px;
                display: none;

                &:last-child {
                    margin-right: 0;
                }
            }

            .preventivo {

                a {
                    color: #000;
                    background-color: $yellow-color;
                    font-size: 0.8rem;
                    padding: 5px;
                    font-weight: bold;
                    border-radius: 5px;
                }
            }

            .icon-hamburger {
                display: none;
            }
        }

        // Submenu
        .submenu {
            background-color: #1c1c1c;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;
            height: 0;
            position: relative;

            a {
                display: none;
            }

            ul {
                height: 0;

                li {
                    padding: 1px 0;
                }
            }

            h4 {
                font-size: 1.1rem;
            }

            h5 {
                font-size: 0.9rem;
            }

            a {
                color: #fff;
                font-size: 0.8rem;

                &:hover {
                    text-decoration: underline;
                }
            }

            .container {
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                gap: 10px 60px;
                height: 0;
                padding-left: 199px;
            }

            li,
            h4 {
                opacity: 0;
            }

            &.expand {
                animation-name: expand;
                z-index: 300;

                a {
                    display: inline-block;
                }

                ul {
                    height: auto;
                }

                li,
                h4 {
                    opacity: 1;
                    height: auto;
                    transition-duration: 2s;
                }
            }

            &.reduce {
                height: 0;
                animation-name: reduce;
                z-index: 40;

                a {
                    display: none;
                }

                ul {
                    height: 0;
                }

                li,
                h4 {
                    opacity: 0;
                    height: 0;
                }
            }

            hr {
                width: 300px;
            }

            @keyframes expand {
                from {
                    height: 0;
                }

                to {
                    height: 180px;
                }
            }

            @keyframes reduce {
                from {
                    height: 180px;
                }

                to {
                    height: 0;
                }
            }
        }
    }

    .hamburger {
        display: none;
    }
}

// Header scompare nelle altre sezioni, appare solo in homepage
.not-home {
    display: none;
}

// Logo in homepage nell'header
.a-logo {
    margin-top: 50px;
    width: 250px;
}


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
            background-image: url('/img/bg-nav-top.webp'), url('/img/bg-nav-bottom.webp');
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
                background-image: url('/img/bg-nav-center.webp');
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

                    &:last-child {
                        svg {
                            position: relative;
                            left: 4px;
                            top: -3px;
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

// Navbar della home - sfondo nero - vecchio menu
.nav-home {
    padding-top: 45px;

    .links-nav {

        // Scritte
        a {
            background-color: #000;
            color: #fff;
            padding: 10px 20px;
            border-radius: 100px;
            color: #fff;
        }
    }
}

// Navbar bianca sezioni - vecchio menu
.nav-section {
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, .4);
    padding: 20px 0;

    .links-nav {

        // Scritte
        a {
            color: #000;
        }
    }

    // Logo
    .logo {
        width: 155px;
        height: 32px;
    }
}

// VECCHIO MENU


// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 870px) and (max-width: 985px) {
    .nav-home {
        padding-top: 15px;

        .container {

            .links-nav {
                gap: 15px;

                a {
                    padding: 10px;
                }
            }
        }
    }


}

@media only screen and (min-width: 760px) and (max-width: 1094px) {
    #blackMenu {
        .bg {
            @keyframes expand {
                from {
                    height: 0;
                }

                to {
                    height: 280px;
                }
            }

            @keyframes reduce {
                from {
                    height: 280px;
                }

                to {
                    height: 0;
                }
            }
        }
    }
}


@media only screen and (min-width: 760px) and (max-width: 870px) {

    .nav-home {
        padding-top: 15px;

        .container {

            .links-nav {
                gap: 12px;

                a {
                    padding: 8px 10px;
                }
            }
        }

        .logo {
            width: 160px;
            height: 45px;
        }
    }

}

@media only screen and (min-width: 300px) and (max-width: 970px) {

    #blackMenu {
        .icon-hamburger {
            font-size: 1.2rem;
        }

        .hamburger {
            display: block;
            background-color: #1c1c1c;
            width: 240px;
            position: absolute;
            right: 0;
            z-index: 30;
            animation-duration: 0.4s;
            animation-fill-mode: forwards;
            top: 66px;
            height: 0;

            li {
                padding: 15px 25px;
                opacity: 0;
                height: 0;

                a {
                    color: #fff;
                    display: none;
                }

                .icon {
                    padding-right: 10px;
                }
            }

            &.hidden {
                animation-name: hidden;
                z-index: 40;

                li {
                    opacity: 0;
                    height: 0;

                    a {
                        display: none;
                    }
                }
            }

            &.visible {
                animation-name: visible;
                height: auto;
                z-index: 60;

                li {
                    transition-duration: 2s;
                    opacity: 1;
                    height: auto;

                    a {
                        display: inline-block;
                    }
                }
            }

            @keyframes visible {
                from {
                    height: 0;
                }

                to {
                    height: 160px;
                }
            }

            @keyframes hidden {
                from {
                    height: 160px;
                }

                to {
                    height: 0;
                }
            }
        }
    }

    nav {

        .container {
            .links-nav {
                svg {
                    padding-right: 0;
                }
            }
        }

        .logo {
            width: 160px;
            height: 45px;
        }
    }

    .nav-home {
        padding-top: 15px;

        .container {

            .links-nav {
                gap: 10px;

                a {
                    padding: 8px 10px;
                }

                .nav-text {
                    display: none;
                }
            }
        }
    }

    #blackMenu {

        .bg {

            .submenu {
                display: none;
            }

            .ul-container {

                li:nth-child(2) {
                    visibility: hidden;
                }

                .preventivo {
                    display: none;
                }

                .icon-hamburger {
                    display: block;
                }
            }
        }
    }

    #newMenu {
        display: none;
    }
}

@media only screen and (min-width: 300px) and (max-width: 479px) {
    #blackMenu {

        .bg {
            height: 100%;

            .ul-container {
                height: 67px;

                li:nth-child(2) {
                    display: none;
                }
            }
        }
    }

}

// Fine versioni mobile, tablet e intermedie


// Schermo gigante
@media only screen and (min-width: 1800px) and (max-width: 2000px) {
    nav {
        .container {

            .links-nav {
                a {
                    font-size: 0.95rem;
                }
            }
        }
    }
}
</style>
<script>

import { store } from '../store.js';

export default {
    name: 'AppNavbar',
    data() {
        return {
            store,
            activeSection: "",
        }
    },
    updated() {

        if (window.location.href.includes('preventivo')) {
            this.store.linksNav[0].active = true;
            this.activeSection = "active top";

            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 0) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        else if (window.location.href.includes('sede')) {
            this.store.linksNav[1].active = true;
            this.activeSection = "active center";

            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 1) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        else if (window.location.href.includes('contatti')) {
            this.store.linksNav[2].active = true;
            this.activeSection = "active bottom";
            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 2) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        else {
            this.activeSection = "";
            for (let i = 0; i < this.store.linksNav.length; i++) {
                this.store.linksNav[i].active = false;
            }
        }
    },
    methods: {
        showSubmenu() {
            if (!this.store.submenu) {
                this.store.submenu = true;
                this.store.classSubmenu = "expand";
            }
            else {
                this.store.submenu = false;
                this.store.classSubmenu = "reduce";
            }
        }
    },
    computed: {
        filteredVertical() {
            return this.store.listModels.slice(0, 4);
        },
        filteredHorizontal() {
            return this.store.listModels.slice(4, 10);
        }
    },

}
</script>

<template>
    <!-- Menu nero in alto -->
    <nav id="blackMenu">
        <div class="bg">
            <div class="container">
                <router-link to="/" v-if="$route.name !== 'home'">
                    <img src="/img/logo-giesse.png" alt="Logo Giesse" class="logo">
                </router-link>

                <span @click.stop="showSubmenu">
                    Zanzariere
                    <span v-if="!store.submenu">
                        <i class="fa-solid fa-chevron-down"></i>
                    </span>
                    <span v-else>
                        <i class="fa-solid fa-chevron-up"></i>
                    </span>
                </span>
            </div>

            <div class="submenu" :class="store.classSubmenu">
                <div class="container" :class="{ 'pl-not-home': $route.name !== 'home' }">
                    <ul>
                        <li>
                            <h5>
                                Verticali
                            </h5>
                        </li>
                        <li v-for="(model, index) in filteredVertical" :key="index">
                            <router-link :to="{ name: 'verticali', params: { id: 0 }, hash: model.hash + '-' + index }">
                                {{ model.name }}
                            </router-link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h5>
                                Laterali
                            </h5>
                        </li>
                        <li v-for="(model, index) in filteredHorizontal" :key="index">
                            <router-link :to="{ name: 'orizzontali', params: { id: 1 }, hash: model.hash + '-' + index }">
                                {{ model.name }}
                            </router-link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h5>
                                Altre
                            </h5>
                        </li>
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
    </nav>
    <!-- Menu nero in alto -->

    <div class="container" :class="{ 'not-home': $route.name !== 'home' }">
        <div class="a-logo">
            <img src="/img/logo-giesse.png" alt="Logo Giesse" class="logo">
        </div>
    </div>

    <!-- Vecchio menu -->
    <nav :class="{ 'nav-home': $route.name === 'home', 'nav-section': $route.name !== 'home' }" id="oldMenu">
        <div class="container">
            <!-- Logo -->
            <router-link to="/">
                <img src="/img/logo-giesse.png" alt="Logo Giesse" class="logo">
            </router-link>

            <!-- Links utili navbar -->
            <ul class="links-nav">
                <li v-for="(link, index) in store.linksNav" :key="index">
                    <router-link :to="{ name: link.href }">
                        <i :class="link.icon"></i> <span class="nav-text">{{ link.text }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
    <!-- Vecchio menu -->


    <!-- Menu attuale -->
    <nav id="newMenu">
        <div class="menu-container">
            <div id="circle-menu" :class="activeSection">
                <div class="circle-menu-div">
                    <div class="circle"></div>
                </div>
            </div>
            <div class="icons-menu">
                <ul>
                    <li v-for="(link, index) in store.linksNav" :key="index" :class="link.active ? 'active' : ''">
                        <div class="icons">
                            <router-link :to="{ name: link.href }">
                                <span class="text">{{ link.text }}</span>
                                <span class="icon"><i :class="link.icon"></i>
                                </span>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Menu attuale -->
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Menu in alto nero
#blackMenu {
    color: #fff;
    width: 100%;

    .logo {
        width: 155px;
        height: 32px;
        margin-right: 40px;
    }

    .bg {
        background-color: #000;
        height: 60px;
        user-select: none;

        span {
            line-height: 60px;
            cursor: pointer;
        }

        // Submenu
        .submenu {
            background-color: #000;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;
            height: 0;
            position: relative;

            a {
                display: none;
            }

            ul {
                height: 0;
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

                &.pl-not-home {
                    padding-left: 199px;
                }
            }

            // h4 {
            //     width: 100%;
            // }

            li,
            h4 {
                opacity: 0;
                //height: 0;
            }

            &.expand {
                animation-name: expand;
                z-index: 60;

                a {
                    display: block;
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
    right: 50px;
    top: 100px;
    z-index: 50;

    .menu-container {
        display: flex;
        justify-content: center;

        #circle-menu {
            //height: 244px;
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

            &:first-child {
                //margin-top: 15px;
                transform: translateY(15px);
            }

            // &.top {
            //     margin-top: 15px;
            // }

            &.center {
                //margin-top: 87px;
                transform: translateY(104px);
            }

            &.bottom {
                //margin-top: 159px;
                transform: translateY(193px);
            }
        }

        .circle-menu-div {
            height: 89px;
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
            background-image: url('/img/bg-nav-top.png'), url('/img/bg-nav-bottom.png');
            background-position: top center, bottom center;
            background-size: 100%;
            background-repeat: no-repeat, no-repeat;
            width: 42px;
            height: 303px;
            position: relative;
            //z-index: 80;

            li {
                display: flex;
                align-items: center;
                height: 89px;
                //text-align: center;
                background-image: url('/img/bg-nav-center.png');
                background-position: -100px 0;
                cursor: pointer;

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
                            width: 200px;
                            margin-left: -150px;

                            a {
                                display: flex;
                                justify-content: flex-end;
                                align-items: center;
                            }
                        }

                        .text {
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                            background-color: #000;
                            height: 12px;
                            position: relative;
                            left: -6px;
                            padding: 10px 5px;
                            font-size: 0.9rem;

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
                    margin-top: 14px;
                }

                &:not(.active) {
                    background-color: #000;
                }

                &.active {
                    //background-image: url('/img/bg-nav-center.png');
                    background-size: 100%;
                    background-position: 0 0;

                    a {
                        color: $yellow-color;
                    }

                    svg {
                        position: relative;
                        left: 6px;
                        top: 2px;
                    }
                }
            }
        }
    }
}

// VECCHIO MENU
nav {

    &#oldMenu {
        display: none;

        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;

            // Links sulla destra - Contatti, Sede, Preventivo
            .links-nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 50px;

                // Scritte
                a {
                    font-size: 0.7rem;
                    font-weight: 500;
                }

                // Icone
                svg {
                    font-size: 0.8rem;
                    padding-right: 10px;
                    vertical-align: middle;
                }
            }
        }
    }
}

// VECCHIO MENU
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

// VECCHIO MENU
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

@media only screen and (min-width: 480px) and (max-width: 760px) {

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
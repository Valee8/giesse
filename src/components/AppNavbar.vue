<script>

import { store } from '../store.js';

export default {
    name: 'AppNavbar',
    data() {
        return {
            store,
        }
    },
    updated() {
        const circle_menu = document.getElementById("circle-menu");

        if (window.location.href.includes('preventivo')) {
            this.store.linksNav[0].active = true;
            circle_menu.className = "top active";
            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 0) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        else if (window.location.href.includes('sede')) {
            this.store.linksNav[1].active = true;
            circle_menu.className = "center active";
            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 1) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        else if (window.location.href.includes('contatti')) {
            this.store.linksNav[2].active = true;
            circle_menu.className = "bottom active";
            for (let i = 0; i < this.store.linksNav.length; i++) {
                if (i !== 2) {
                    this.store.linksNav[i].active = false;
                }
            }
        }
        else {
            circle_menu.className = "";
            for (let i = 0; i < this.store.linksNav.length; i++) {
                this.store.linksNav[i].active = false;
            }
        }
    }
}
</script>

<template>
    <!-- Menu nero in alto -->
    <nav id="blackMenu">
        <ul>
            <div class="container">
                <li>
                    Zanzariere
                </li>
            </div>
        </ul>

        <div class="container">
            <router-link to="/">
                <img src="/img/logo-giesse.png" alt="Logo Giesse" class="logo"
                    :class="{ 'logo-not-home': $route.name !== 'home' }">
            </router-link>
        </div>
    </nav>
    <!-- Menu nero in alto -->

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
            <div id="circle-menu">
                <div class="circle-menu-div">
                    <div class="circle"></div>
                </div>
            </div>
            <div class="icons-menu">
                <ul>
                    <li v-for="(link, index) in store.linksNav" :key="index" :class="link.active ? 'active' : ''">
                        <div class="icons">
                            <router-link :to="{ name: link.href }">
                                <i :class="link.icon"></i>
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


#blackMenu {
    color: #fff;
    width: 100%;

    ul {
        background-color: #000;
        height: 60px;
        line-height: 60px;
    }


    .logo-not-home {
        display: none;
    }

    .logo {
        margin-top: 50px;
    }
}



///////
#newMenu {
    position: fixed;
    right: 70px;
    top: 100px;

    .menu-container {
        display: flex;
        justify-content: center;

        #circle-menu {
            //height: 244px;
            position: relative;
            left: 25px;

            &.active {
                visibility: visible;
            }

            &:not(.active) {
                visibility: hidden;

            }

            &.top,
            &.center,
            &.bottom {
                transition: all 500ms ease-in-out;
            }

            &:first-child {
                margin-top: 15px;
            }

            // &.top {
            //     margin-top: 15px;
            // }

            &.center {
                margin-top: 87px;
            }

            &.bottom {
                margin-top: 159px;
            }
        }

        .circle-menu-div {
            height: 72px;
            display: flex;
            align-items: center;

            .circle {
                height: 34px;
                width: 34px;
                border-radius: 40px;
                background-color: #000;

            }
        }

        .icons-menu {
            background-image: url('/img/bg-nav-top.png'), url('/img/bg-nav-bottom.png');
            background-position: top center, bottom center;
            background-size: 100%;
            background-repeat: no-repeat, no-repeat;
            width: 34px;
            height: 244px;
            position: relative;
            z-index: 80;

            li {
                height: 72px;
                text-align: center;
                line-height: 72px;

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
                    background-image: url('/img/bg-nav-center.png');
                    background-size: 100%;

                    a {
                        color: #fcf674;
                    }

                    svg {
                        position: relative;
                        left: -9px;
                        top: 2px;
                    }
                }
            }
        }


    }
}

// Navbar
nav {
    &#oldMenu {
        display: none;
    }

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

// Navbar della home - sfondo nero
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

// Navbar bianca sezioni
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
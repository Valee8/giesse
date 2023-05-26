<script>

import { store } from '../store.js';

const menu = document.getElementsByClassName("menu-vale");

export default {
    name: 'AppNavbar',
    data() {
        return {
            store,
        }
    },
    methods: {
        changePage(index) {

            //li[index].classList.add("active");

            //menu[index].classList.add("active");

            if (index === 0) {
                document.getElementById("circle-menu").className = "top active";
            }
            else if (index === 1) {
                document.getElementById("circle-menu").className = "center active";
            }

            else if (index === 2) {
                document.getElementById("circle-menu").className = "bottom active";
            }

            this.links[index].active = true;

            localStorage.setItem('index', JSON.stringify(index));

            //localStorage.setItem('active', JSON.stringify(this.links[index].active));

            for (let i = 0; i < this.links.length; i++) {
                if (index !== i) {
                    this.links[i].active = false;
                    //li[i].classList.remove("active");
                }
            }
        }
    },
    mounted() {

        const index = localStorage.getItem('index');
        //const active = localStorage.getItem('active');

        if (index) {
            this.links[index].active = true;
        }

        //menu[index].classList.add("active");
    },
    // update() {
    //     const valore = localStorage.getItem('nomeValore');

    //     this.links[valore].active = true;

    //     menu[valore].classList.add("active");
    // }
}
</script>

<template>
    <!-- Inizio navbar -->
    <nav :class="{ 'nav-home': $route.name === 'home', 'nav-section': $route.name !== 'home' }" id="menuDesktop">
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

    <nav id="menuMobile" style="display: none">
        <ul>
            <div id="circle-menu">
                <div class="circle-menu-div">
                    <div class="circle"></div>
                </div>
            </div>
            <div class="icons-menu">
                <li v-for="(link, index) in store.linksNav" :key="index" :class="link.active ? 'active' : ''">
                    <div class="icons" @click="changePage(index)">
                        <router-link :to="{ name: link.href }">
                            <i :class="link.icon"></i>
                        </router-link>
                    </div>
                </li>
            </div>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

#circle-menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    left: 17px;

    &.active {
        visibility: visible;
    }

    &:not(.active) {
        visibility: hidden;

    }

    &.top,
    &.center,
    &.bottom {
        transition-property: all;
        transition-duration: 500ms;
        transition-timing-function: ease-in-out;
    }

    &.top {
        margin-top: 0;
    }

    &.center {
        margin-top: 53px;
    }

    &.bottom {
        margin-top: 107px;
    }
}

.circle-menu-div {
    height: calc(100% / 3);
    display: flex;
    align-items: center;
}

.circle {
    height: 25px;
    width: 23px;
    border-radius: 40px;
    background-color: #000;

}

// Navbar
nav {
    // &#menuDesktop {
    //     display: none;
    // }

    &#menuMobile {
        position: absolute;
        right: 60px;
        top: 100px;
        height: 160px;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        border-radius: 50px;

        ul {
            height: 100%;
            display: flex;

            // &::before {
            //     content: "";
            //     background-image: url('/img/top-bg-nav.svg');
            //     background-size: cover;
            //     background-repeat: no-repeat;
            //     width: 47px;
            //     height: 16px;
            //     position: absolute;
            //     top: -11px;
            //     left: 11px;
            //     transform: scale(52%);
            // }

            // &::after {
            //     content: "";
            //     background-image: url('/img/top-bg-nav.svg');
            //     background-size: cover;
            //     background-repeat: no-repeat;
            //     width: 47px;
            //     height: 16px;
            //     position: absolute;
            //     bottom: -12px;
            //     left: 11px;
            //     transform: scale(52%) rotate(180deg);
            // }


            li {
                display: flex;
                align-items: center;
                height: calc(100% / 3);
                width: 24px;
                position: relative;

                &.active {
                    background-image: url('/img/bg-nav2.svg');
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;

                    &:last-child {
                        border-top: 1px solid #000;
                    }

                    .icons-menu {
                        display: flex;
                        flex-direction: column;
                    }

                    .icons {
                        //background-color: #000;
                        //line-height: 25px;
                        //height: 25px;
                        //width: 23px;
                        //border-radius: 40px;
                        //position: relative;
                        //right: 5px;
                        //top: 0.03rem;
                        // position: relative;
                        // z-index: 20;
                        // left: -11px;
                        position: relative;
                        left: 1px;

                        svg {
                            color: #fcf674;
                        }
                    }
                }

                &:not(.active) {
                    background-color: #000;
                    justify-content: center;

                    .icons {

                        svg {
                            color: #fff;
                        }
                    }
                }

                .icons {
                    svg {
                        font-size: 0.8rem;
                    }
                }
            }
        }
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
<script>
import { store } from './store.js';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';

import { useHead } from "@vueuse/head";


export default {
    components: {
        AppHeader,
        AppMain,
        AppFooter,
    },
    setup() {
        useHead({
            title: "Giesse Zanzariere - zanzariere in Sardegna, qualità e innovazione",
            meta: [
                {
                    name: "description",
                    content: "Scopri le migliori zanzariere in Sardegna, qualità e soluzioni su misura da più di 30 anni."
                },
                {
                    property: "og:title",
                    content: "Giesse Zanzariere - zanzariere in Sardegna, qualità e innovazione"
                },
                {
                    property: "og:description",
                    content: "Scopri le migliori zanzariere in Sardegna, qualità e soluzioni su misura da più di 30 anni. Vendite, installazioni e riparazioni professionali."
                },
                /* {
                    name: "robots",
                    content: "index, follow"
                }, 
                {
                    property: "og:site_name",
                    content: "Giesse Zanzariere"
                },
                {
                    property: "og:image",
                    content: "https://silly-salmiakki-065fbc.netlify.app/img/sfondi-e-logo/logo-giesse.webp"
                },
                {
                    property: "og:image:width",
                    content: "1200"
                },
                {
                    property: "og:image:height",
                    content: "630"
                } */
            ]
        })
    },
    data() {
        return {
            store,
            showArrowUp: false
        }
    },
    methods: {
        // Mostro la freccia o la nascondo a seconda dell'altezza raggiunta della pagina
        handleScroll() {
            if (window.scrollY > 1000) {
                this.showArrowUp = true;
            }
            else {
                this.showArrowUp = false;
            }
        },
        // Metodo per
        closeMenu() {

            // chiudere il sottomenu di "Zanzariere" quando si clicca in un qualsiasi punto della pagina
            if (this.store.classSubmenu === "expand") {
                this.store.submenu = false;
                this.store.classSubmenu = "reduce";
            }

            // chiudere il sottomenu del menu hamburger quando si clicca in un qualsiasi punto della pagina
            if (this.store.classHamburger === "visible") {
                this.store.menuHamburger = false;
                this.store.classHamburger = "hidden";
            }

        },
        // Scrollo in alto quando clicco la freccia
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    },
    watch: {
        $route(to, from) {

            // Se la rotta cambia e nell'url non e' presente "preventivo" (quindi quando cambio pagina)
            if (!window.location.href.includes("preventivo") && sessionStorage.length > 0) {
                // Svuoto il contenuto di localStorage
                sessionStorage.clear();
            }

            // Se l'url include "verticali" slider conterra' l'array vertical (presente nel file store.js)
            if (window.location.href.includes("verticali")) {
                this.store.slider = this.store.vertical;
            }
            // Altrimenti se l'url contiene "orizzontali" slider conterra' l'array horizontal 
            else if (window.location.href.includes("laterali")) {
                this.store.slider = this.store.horizontal;
            }

            // Se hash e' presente (hash = #verticale-a-molla ecc)
            if (to.hash && window.location.hash) {
                // parseInt(to.hash.replace(/[^0-9]+/g, ''), 10) ===> Conversione ad intero del contenuto di hash eliminando ogni simbolo in modo che rimanga solo il numero
                let hashNumber = parseInt(to.hash.replace(/[^0-9]+/g, ''), 10);

                // Assegno true all'active di hashNumber 
                this.store.slider[hashNumber].active = true;

                // Scorro lo slider con ciclo for
                for (let i = 0; i < this.store.slider.length; i++) {
                    // Se l'i-esimo elemento e' diverso da hashNumber
                    if (i !== hashNumber) {
                        // Assegno a tutti gli active il valore false
                        this.store.slider[i].active = false;
                    }
                }
            }

            // Se classSubmenu (presente nel file store.js) e' uguale a "expand"
            if (this.store.classSubmenu === "expand") {
                // Assegno false a submenu (presente nel file store.js) 
                this.store.submenu = false;
                // Assegno a classSubmenu "reduce"
                this.store.classSubmenu = "reduce";
            }
        }
    },
    updated() {
        // Aggiungo evento per lo scroll 
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        // Rimuovo evento per lo scroll
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<template>
    <!-- Freccia per scrollare in alto con la pagina -->
    <div :class="{ 'show': showArrowUp }" @click="scrollToTop" class="arrow-up" v-if="$route.name !== 'preventivo'">
        <i class="fa-solid fa-chevron-up"></i>
    </div>

    <div @click="closeMenu">
        <AppHeader />

        <main>
            <AppMain />
        </main>

        <AppFooter />
    </div>
</template>

<style lang="scss">
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.swiper-pagination-bullet {
    background-color: #999999;
    width: 45px;
    height: 8px;
    border-radius: 0;
    opacity: 1;
}

.swiper-pagination-bullet-active {
    background-color: #000;
}

.error-axios {
    color: red;
    text-align: center;
    width: 100%;
    font-size: 0.8rem;
    padding-top: 10px;
}


.first-step,
.second-step,
.third-step,
.fourth-step {

    input,
    label,
    textarea,
    button,
    select {
        font-family: 'Montserrat', sans-serif;
        letter-spacing: 1px;
    }

    .form-button {

        button,
        input {
            background-color: $yellow-color;
            padding: 10px 50px;
            border: 0;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
        }
    }
}

// Freccia per scrollare in alto
.arrow-up {
    position: fixed;
    bottom: 80px;
    right: 80px;
    z-index: 100;
    font-size: 2.5rem;
    cursor: pointer;
    background-color: #878787;
    border-radius: 50%;
    padding: 3px 8px;
    color: #fff;
    transition: all 1s ease;

    &:not(.show) {
        visibility: hidden;
        opacity: 0;
    }

    &.show {
        opacity: 1;
        visibility: visible;
    }
}

// Padding sezioni
// Sezioni che hanno id: Home
// Sezioni senza id: tutte le altre
// Sezione con class: Contatti
section {

    &[id] {
        padding-top: 120px;
    }

    &[class] {
        padding-top: 0;
    }
}

// Logo nav e footer
.logo {
    vertical-align: middle;
}

.section-title {
    font-size: 0.9rem;
    padding-top: 30px;

    a {
        color: #000;
        margin-right: 4px;


        &:hover {
            text-decoration: underline;
        }
    }

    svg {
        font-size: 0.8rem;
    }

    span {
        padding-left: 5px;
    }
}

// Bottone
.button {
    background-color: $yellow-color;
    font-weight: bold;
    padding: 8px 20px;
    color: #000;
    font-size: 0.9rem;
}

// Sezioni Verticali/Orizzontali/Battente/Scorri/Fissa/Casper
section {

    // Inizio contenuto slider presente in Verticali e Orizzontali
    .slider-container {
        text-align: center;
        max-width: 900px;
        margin: 0 auto;

        &.not-slider {
            padding-top: 80px;
        }

        // Rettangolini in alto
        .list-rectangles {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 20px;
            padding: 46px 0 50px 0;
            height: 72px;

            .rectangles {
                background-color: rgba(0, 0, 0, .4);
                width: 35px;
                height: 8px;

                &.active {
                    background-color: #000;

                }

                &:not(.active) {
                    cursor: pointer;
                }
            }
        }

        // Contenuto slider
        .slider {
            font-weight: bold;
            user-select: none;
            padding-bottom: 160px;

            &.casper {
                padding-bottom: 100px;
            }

            &:not(.active) {
                display: none;
            }

            .div-image {
                position: relative;
            }

            h2 {
                padding: 50px 0;
                font-size: 2rem;

                // &.fissa {
                //   padding: 75px 0 40px 0;
                // }

                &.giada,
                &.luna {
                    font-size: 1.8rem;
                }

                // &.giada {
                //   padding: 74px 0 40px 0;
                // }

                // &.luna {
                //   padding: 44px 0 40px 0;
                // }
            }

            .models-description {
                position: relative;
            }

            .names {
                display: flex;
                justify-content: center;
                gap: 0 24px;
                position: absolute;
                bottom: 12px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 2;
                height: 110px;

                &.casper {
                    position: relative;
                    bottom: 0;
                    height: 50px;
                }

                .name {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    font-size: 1.1rem;
                    width: 130px;
                    text-align: center;
                    padding: 0 8px;
                    height: 30px;
                    line-height: 31px;
                    background-color: #cccbcb;
                    border-radius: 30px;
                    color: #4e4e4e;
                    transition: height 0.6s;
                    overflow: hidden;

                    &.reduce {
                        border-radius: 15px;
                    }


                    &.one-model {
                        justify-content: center;

                        &.expand {
                            height: 30px;
                        }

                        .infos,
                        svg {
                            display: none;
                        }
                    }

                    svg {
                        transition: transform 0.5s;
                        font-size: 0.8rem;
                        padding-bottom: 2px;
                    }

                    .infos {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.8rem;
                        text-align: left;
                        line-height: normal;
                        padding: 5px 2px;
                        transition: opacity 1.5s;
                        opacity: 0;
                        visibility: hidden;

                        &:not(.laterale-frizionata) {
                            height: 110px;
                        }
                    }

                    &.laterale-frizionata {
                        width: 150px;

                        &.expand {
                            height: 70px;
                        }
                    }


                    &.expand {
                        height: 140px;
                        border-radius: 15px;

                        svg {
                            transform: rotate(180deg);
                        }

                        .infos {
                            opacity: 1;
                            visibility: visible;
                        }
                    }

                    &.laterale-classica {
                        font-size: 0.9rem;
                    }
                }
            }

            .casper-list {
                text-align: left;
                //padding-bottom: 84px;
            }

            .description {
                text-align: justify;
                font-size: 1.05rem;
                position: relative;
                z-index: 1;

                // &:not(.casper) {
                //   //padding: 80px 0 90px 0;
                // }

                &.casper {
                    padding-bottom: 20px;
                }
            }

            .arrow {
                cursor: pointer;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 2.5rem;

                &.left {
                    left: 0;
                }

                &.right {
                    right: 0;
                }
            }
        }
    }
}


@media only screen and (min-width: 450px) and (max-width: 980px) {

    section {
        .slider-container {

            &.not-slider,
            &.fissa {
                padding-top: 80px;
            }

            .slider {
                padding-bottom: 100px;

                .names {
                    flex-wrap: wrap;
                    gap: 15px 30px;
                    position: relative;
                    height: auto;
                    left: 0;
                    transform: none;
                }

                .description {
                    &:not(.casper) {
                        padding-bottom: 40px;
                    }
                }
            }
        }
    }

}

@media only screen and (min-width: 300px) and (max-width: 1000px) {
    .arrow-up {
        display: none;
    }
}

@media only screen and (min-width: 300px) and (max-width: 600px) {

    section {

        &[id] {
            padding-top: 20px;
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 450px) {


    section {

        // Inizio contenuto slider presente in Verticali e Orizzontali
        .slider-container {

            .list-rectangles {
                gap: 10px;

                .rectangles {
                    width: 25px;
                }
            }

            // Contenuto slider
            .slider {
                padding-bottom: 80px;

                .names {
                    flex-wrap: wrap;
                    gap: 15px 4px;
                    position: relative;
                    height: auto;
                    left: 0;
                    transform: none;
                }

                .description {

                    &:not(.casper) {
                        padding-bottom: 40px;
                    }
                }

                h2 {
                    font-size: 1.3rem;

                    &.fissa {
                        padding-top: 40px;
                    }

                    &.luna,
                    &.giada {
                        font-size: 1.3rem;
                    }
                }

                .name {
                    font-size: 1rem;
                }

                .div-image {

                    .slide-image {
                        width: 180px;
                        height: 220px;

                        &.fissa {
                            width: 180px;
                            height: 180px;
                        }
                    }
                }

                .arrow {
                    font-size: 1.5rem;
                }

                //.casper-list {
                //font-size: 1rem;
                //}
            }
        }
    }
}

// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 1800px) and (max-width: 2000px) {

    section {

        .slider-container {
            padding-bottom: 40px;
            padding-top: 50px;
        }

        .info-colors {

            .container {
                height: 370px;

                .list-colors {

                    .colors {
                        font-size: 0.92rem;

                        .color {
                            width: 165px;

                            .color-image {
                                height: 98px;
                            }
                        }
                    }

                }
            }
        }
    }
}

// Fine versioni mobile, tablet e intermedie</style>
<script>
import { store } from '../store';

const items = document.getElementsByClassName("slider");
const thumbs = document.getElementsByClassName("rectangles");

let activeItem = 0;

export default {
    name: 'Verticali',
    data() {
        return {
            store,
            // Array di oggetti 'vertical' - contiene informazioni zanzariere
            vertical: [
                {
                    model: "VERTICALE A MOLLA CLASSICA",
                    name: "ALBA (con cuffie) - SONIA (senza cuffie) - GENNY (con cassonetto da 40mm)",
                    image: "/img/alba.png",
                    description: "Il modello VERTICALE A MOLLA CLASSICA prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
                },
                {
                    model: "VERTICALE A MOLLA (con sistema a cricchetto)",
                    name: "LAURA (con cuffie) - EVA (senza cuffie) - ASIA (con cassonetto da 40mm)",
                    image: "/img/laura.png",
                    description: "Il modello a CRICCHETTO, prodotto di serie con il cassonetto da 50mm, viene realizzato con un sistema a pulsante molto semplice da manovrare che permette l'apertura della zanzariera in modo semplice e veloce. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 55mm), cassonetto da 40 (ingombro testate 40mm).",
                },
                {
                    model: "VERTICALE A CATENA CLASSICA",
                    name: "KATIA (con cuffie) - VERA (senza cuffie)",
                    image: "/img/katia.png",
                    description: "Il modello VERTICALE A CATENA CLASSICA, prodotto esclusivamente con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
                },
                {
                    model: "VERTICALE A CATENA + MOLLA (con aggancio magnetico)",
                    name: "GIADA (con cuffie) - MERI (senza cuffie)",
                    image: "/img/katia.png",
                    description: "Il modello VERTICALE A CATENA + MOLLA, prodotto esclusivamente con il cassonetto da 50mm, viene realizzato con una molla di richiamo che permette di tenere la rete ben tesa. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
                }
            ],
        }
    },
    mounted() {

        items[activeItem].classList.add("active");
        thumbs[activeItem].classList.add("active");

        //const description = document.querySelector(".description");

        //description.innerHTML = "Il modello <span>VERTICALE A MOLLA CLASSICA</span> " + this.vertical[0].description;

    },
    methods: {
        // Freccia avanti
        next(index) {
            activeItem = index;

            if (activeItem < this.vertical.length - 1) {

                items[activeItem].classList.remove("active");
                thumbs[activeItem].classList.remove("active");

                activeItem++;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

            }

            else {

                activeItem = 0;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

                items[this.vertical.length - 1].classList.remove("active");
                thumbs[this.vertical.length - 1].classList.remove("active");

            }
        },
        // Freccia indietro
        prev(index) {
            activeItem = index;

            if (activeItem <= this.vertical.length - 1 && activeItem > 0) {

                items[activeItem].classList.remove("active");
                thumbs[activeItem].classList.remove("active");

                activeItem--;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

            }

            else {

                activeItem = this.vertical.length - 1;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

                items[0].classList.remove("active");
                thumbs[0].classList.remove("active");

            }
        },
        // Cambio slide premendo i rettangoli in alto
        changeSlide(index) {
            for (let i = 0; i < this.vertical.length; i++) {
                if (i !== index) {
                    items[i].classList.remove("active");
                    thumbs[i].classList.remove("active");
                }
            }

            items[index].classList.add("active");
            thumbs[index].classList.add("active");
        },
        // Cambio colore cliccando il nome della tipologia
        changeColorTypology(index) {

            this.store.colors[index].active = true;

            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== index) {
                    this.store.colors[i].active = false;
                }
            }
        },
    },
    computed: {
        // Stampa nome sezione nel titolo
        printNameSection() {
            for (let i = 0; i < store.typologies.length; i++) {
                if (i === 0)
                    return store.typologies[i].name;
            }
        }
    }
}
</script>

<template>
    <!-- Inizio sezione Verticali -->
    <section>
        <div class="container">
            <!-- Titolo in alto a sinistra -->
            <div class="section-title">
                <!-- Scritta Home -->
                <router-link to="/">Home</router-link>
                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                {{ printNameSection }}
            </div>


            <!-- Inizio parte slider zanzariere -->
            <div class="slider-container">
                <!-- Rettangolini in alto -->
                <div class="list-rectangles">
                    <div class="rectangles" v-for="(rectangles, index) in vertical" :key="index"
                        @click="changeSlide(index)"></div>
                </div>

                <!-- Parte contenuto slider -->
                <div class="slider" v-for="(slide, index) in vertical" :key="index">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img :src="slide.image" :alt="slide.model" class="slide-image">

                        <!-- Icona freccia indietro -->
                        <a class="arrow left" @click="prev(index)">
                            <i class="fa-solid fa-chevron-left"></i>
                        </a>

                        <!-- Icona freccia avanti -->
                        <a class="arrow right" @click="next(index)">
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2 :class="index === 3 ? 'giada' : ''">
                        {{ slide.model }}
                    </h2>

                    <!-- Nome zanzariera  -->
                    <div class="name">
                        {{ slide.name }}
                    </div>

                    <!-- Descrizione zanzariera -->
                    <p class="description" :class="index === 3 ? 'giada' : ''">
                        {{ slide.description }}
                    </p>
                </div>

            </div>
        </div>


        <!-- Inizio parte colori -->
        <div class="info-colors">

            <!-- Testo in alto -->
            <div class="title-info-colors">
                <!-- Titolo -->
                <h2>
                    Esplora tutti i colori
                </h2>

                <!-- Paragrafo -->
                <p>
                    Le zanzariere sono parte dell'arredo, per questo per noi &egrave; prezioso che si adattino all'atmosfera
                    della tua stanza
                </p>
            </div>

            <!-- Parte lista tipologie colori e nomi colori -->
            <div class="container">

                <!-- Nomi tipologie colori - parte sinistra -->
                <div class="list-typologies">
                    <div v-for="(typo, index) in store.colors" :key="index" class="typologies">
                        <div @click="changeColorTypology(index)" class="typology-name"
                            :class="typo.active ? 'selected' : ''">
                            {{ typo.typology }}
                        </div>
                    </div>
                </div>

                <!-- Nomi e immagini colori - parte destra -->
                <div class="list-colors" v-for="(typo, index) in store.colors" :key="index"
                    :class="typo.active ? 'selected' : ''">
                    <div class="colors" :class="typo.typology.toLowerCase()" v-if="typo.active">
                        <div v-for="(color, index) in typo.colorInfo" :key="index" class="color">
                            <!-- Immagine colore -->
                            <img :src="color.image" :alt="color.name" class="color-image">

                            <!-- Nome colore -->
                            <div class="color-name">
                                {{ color.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Gli Stili css slider si trovano in "App"

// Sezione Verticali
section {

    // Inizio contenuto slider
    .slider-container {

        // Rettangolini in alto
        .list-rectangles {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 20px;
            padding: 50px 0 20px 0;

            .rectangles {
                width: 30px;
                height: 6px;

                &:not(.active) {
                    cursor: pointer;
                }
            }
        }
    }


    // Parte tipologie colori e nomi colori
    .info-colors {
        color: #fff;
        background-color: #686868;
        padding: 20px 0 0 0;
        //min-height: 300px;


        // Titolo - testo in alto
        .title-info-colors {
            text-align: center;
            margin: 0 auto;
            max-width: 600px;

            p {
                padding: 10px 0;
            }
        }

        .container {
            display: flex;
            align-items: center;
            gap: 0 60px;
            height: 320px;

            // Elenco tipologie colori - parte sinistra
            .list-typologies {
                text-align: center;
                width: 8%;

                .typologies {
                    padding: 0.1rem 0;
                    border-bottom: 1px solid #fff;

                    &:first-child {
                        border-top: 1px solid #fff;
                    }
                }

                // Nome tipologia
                .typology-name {
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 0.9rem;
                    padding: 5px 0 5px 4px;

                    &.selected {
                        color: #fcf674;
                        border-left: 4px solid #fcf674;
                        padding-left: 0;
                    }
                }
            }

            // Nomi e immagini colori - parte destra
            .list-colors {
                width: 90%;

                &:not(.selected) {
                    display: none;
                }

                // Blocco intero colori
                .colors {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    color: #fff;
                    font-size: 0.8rem;
                    font-weight: 500;

                    // Colore singolo
                    .color {
                        width: 140px;

                        // Nome colore
                        .color-name {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: rgba(0, 0, 0, .15);
                            box-shadow: 0 2px 0 rgba(0, 0, 0, .2);
                            border-radius: 0 0 10px 10px;
                            color: #fff;
                            text-align: center;
                            height: 37px;
                            padding: 0 5px;
                        }

                        // Immagine colore
                        .color-image {
                            display: block;
                            width: 100%;
                            height: 75px;
                            object-fit: cover;
                            border-radius: 10px 10px 0 0;
                        }
                    }

                }

            }
        }
    }
}

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
</style>
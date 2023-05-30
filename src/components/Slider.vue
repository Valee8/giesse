<script>
import { store } from '../store';

let slider;

const items = document.getElementsByClassName("slider");
const thumbs = document.getElementsByClassName("rectangles");

let activeItem = 0;

export default {
    name: 'Slider',
    data() {
        return {
            store,
        }
    },
    mounted() {

        if (this.store.colors[0].active) {
            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== 0)
                    this.store.colors[i].active = false;
            }
        }
        else {
            this.store.colors[0].active = true;

            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== 0)
                    this.store.colors[i].active = false;
            }
        }

        if (window.location.hash === '#jolly') {
            activeItem = 4;
        }
        else {
            activeItem = 0;
        }

        items[activeItem].classList.add("active");
        thumbs[activeItem].classList.add("active");

        // if (window.location.href.includes("verticali")) {
        //     slider = this.store.vertical;
        // }
        // else {
        //     slider = this.store.horizontal;
        // }

        //const description = document.querySelector(".description");

        //description.innerHTML = "Il modello <span>VERTICALE A MOLLA CLASSICA</span> " + this.vertical[0].description;

    },
    // updated() {
    //     this.store.colors[0].active = true;

    //     for (let i = 0; i < this.store.colors.length; i++) {
    //         this.store.colors[i].active = false;
    //     }

    // },
    methods: {
        // Freccia avanti
        next(index) {
            activeItem = index;

            if (activeItem < slider.length - 1) {

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

                items[slider.length - 1].classList.remove("active");
                thumbs[slider.length - 1].classList.remove("active");

            }

            if (window.location.hash === '#jolly') {
                window.location.hash = "";
            }
        },
        // Freccia indietro
        prev(index) {
            activeItem = index;

            if (activeItem <= slider.length - 1 && activeItem > 0) {

                items[activeItem].classList.remove("active");
                thumbs[activeItem].classList.remove("active");

                activeItem--;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

            }

            else {

                activeItem = slider.length - 1;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

                items[0].classList.remove("active");
                thumbs[0].classList.remove("active");

            }

            if (window.location.hash === '#jolly') {
                window.location.hash = "";
            }
        },
        // Cambio slide premendo i rettangoli in alto
        changeSlide(index) {
            for (let i = 0; i < slider.length; i++) {
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

            // if (this.store.colors[0].active) {
            //     this.store.colors[0].active = false;
            // }
        },
    },
    computed: {
        // Stampa nome sezione nel titolo
        printNameSection() {
            let nameSection;
            if (window.location.href.includes(0)) {
                nameSection = this.store.typologies[0].name;
            }
            else {
                nameSection = this.store.typologies[1].name;
            }

            return nameSection;
        },
        getSlider() {
            if (window.location.href.includes("verticali")) {
                slider = this.store.vertical;
            }
            else {
                slider = this.store.horizontal;
            }

            return slider;
        }
    },
}
</script>

<template>
    <!-- Inizio sezioni Verticali/Orizzontali -->
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
                    <div class="rectangles" v-for="(rectangles, index) in getSlider" :key="index"
                        @click="changeSlide(index)">
                    </div>
                </div>

                <!-- Parte contenuto slider -->
                <div class="slider" v-for="(slide, index) in getSlider" :key="index">
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
                    <div class="name" v-if="slide.name">
                        {{ slide.name }}
                    </div>
                    <div class="name" v-else>
                        <div>Con guida telescopica:</div> {{ slide.firstName }}
                        <div> <br>
                            Con guida singola:</div> {{ slide.secondName }}
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
                        <div v-for="(color, colorIndex) in typo.colorInfo" :key="colorIndex" class="color">
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

// Sezioni Verticali/Orizzontali
section {

    // Inizio contenuto slider
    .slider-container {
        text-align: center;
        max-width: 900px;
        margin: 0 auto;

        // Rettangolini in alto
        .list-rectangles {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 20px;
            padding: 50px 0 20px 0;

            .rectangles {
                background-color: rgba(0, 0, 0, .4);
                width: 30px;
                height: 6px;

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
            display: none;
            font-weight: bold;
            user-select: none;

            &.active {
                display: block;
            }

            .div-image {
                position: relative;
                //margin: 0 auto;
                //max-width: 900px;

                .slide-image {
                    height: 320px;
                }
            }

            h2 {
                padding: 25px 0;
                font-size: 2rem;

                &.giada {
                    font-size: 1.8rem;
                }
            }

            .name {
                font-size: 1.3rem;
            }

            .description {
                text-align: justify;
                padding: 84px 0;
                //margin: 0 auto;
                //max-width: 900px;
                font-size: 1.05rem;

                &.giada {
                    padding: 87px 0;
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
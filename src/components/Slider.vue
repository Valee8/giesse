<script>

// Importo store
import { store } from '../store';

// Importo Colori
import Colori from './Colori.vue';

export default {
    name: 'Slider',
    components: {
        Colori
    },
    data() {
        return {
            store,
            // Elemento attivo
            activeItem: "",
        }
    },
    mounted() {

        for (let i = 0; i < this.store.slider.length; i++) {
            if (window.location.href.endsWith("orizzontali/1") || window.location.href.endsWith("verticali/0")) {
                this.store.slider[0].active = true;

                for (let i = 0; i < this.store.slider.length; i++) {
                    if (i !== 0) {
                        this.store.slider[i].active = false;
                    }
                }
            }

        }
    },
    methods: {
        hoverSlider(slideIndex, modelIndex) {

            this.store.slider[slideIndex].models[modelIndex].hover = true;
        },
        notHoverSlider(slideIndex, modelIndex) {

            this.store.slider[slideIndex].models[modelIndex].hover = false;
        },
        // Freccia avanti
        next(index) {

            if (index < this.store.slider.length - 1) {
                index++;
            }

            else {
                index = 0;
            }

            this.store.slider[index].active = true;

            for (let i = 0; i < this.store.slider.length; i++) {
                if (i !== index) {
                    this.store.slider[i].active = false;
                }
            }

            // Azzero valore hash che appare quando clicco il bottone "Scopri di piu'" presente nella home
            if (window.location.hash && window.location.href.includes("verticali")) {
                window.location.hash = "/verticali/" + 0;
            }

            if (window.location.hash && window.location.href.includes("orizzontali")) {
                window.location.hash = "/orizzontali/" + 1;
            }

        },
        // Freccia indietro
        prev(index) {

            if (index <= this.store.slider.length - 1 && index > 0) {
                index--;
            }

            else {
                index = this.store.slider.length - 1;
            }

            this.store.slider[index].active = true;

            for (let i = 0; i < this.store.slider.length; i++) {
                if (i !== index) {
                    this.store.slider[i].active = false;
                }
            }

            // Azzero valore hash che appare quando clicco il bottone "Scopri di piu'" presente nella home
            if (window.location.hash && window.location.href.includes("verticali")) {
                window.location.hash = "/verticali/" + 0;
            }

            if (window.location.hash && window.location.href.includes("orizzontali")) {
                window.location.hash = "/orizzontali/" + 1;
            }
        },
        //Cambio slide premendo i rettangoli in alto
        changeSlide(index) {
            for (let i = 0; i < this.store.slider.length; i++) {
                if (i !== index) {
                    this.store.slider[i].active = false;
                }
            }

            this.store.slider[index].active = true;
        },
    },
    computed: {
        // Stampa nome sezione nel titolo
        printNameSection() {
            let nameSection;
            // Stampo Verticali o Orizzontali a seconda che ci sia 0 o 1 nell'url ("verticali/0" e "orizzontali/1")
            if (window.location.href.includes(0)) {
                nameSection = this.store.typologies[0].name;
            }
            else {
                nameSection = this.store.typologies[1].name;
            }

            return nameSection;
        },
        // Metodo per ottenere contenuto slider
        getSlider() {
            // Se l'url include "verticali" slider conterra' l'array vertical (presente nel file store.js)
            if (window.location.href.includes("verticali")) {
                this.store.slider = this.store.vertical;
            }
            // Altrimenti se l'url contiene "orizzontali" slider conterra' l'array horizontal
            else {
                this.store.slider = this.store.horizontal;
            }

            // Ritorno slider
            return this.store.slider;
        }
    }
}
</script>

<template>
    <!-- Inizio sezioni Verticali/Orizzontali -->
    <section>
        <div class="container">
            <!-- Titolo in alto a sinistra -->
            <div class="section-title">
                <!-- Scritta Home -->
                <router-link :to="{ name: store.textHome.toLowerCase() }">
                    {{ store.textHome }}
                </router-link>

                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                <span>{{ printNameSection }}</span>
            </div>


            <!-- Inizio parte slider zanzariere -->
            <div class="slider-container">
                <!-- Rettangolini in alto -->
                <div class="list-rectangles">
                    <div class="rectangles" v-for="(rectangles, index) in getSlider" :key="index"
                        @click="changeSlide(index)" :class="{ 'active': rectangles.active }">
                    </div>
                </div>

                <!-- Parte contenuto slider -->
                <div class="slider" v-for="(slide, slideIndex) in getSlider" :key="slideIndex"
                    :class="{ 'active': slide.active }">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img :src="slide.image" :alt="'Immagine zanzariera ' + slide.typology" class="slide-image"
                            :width="slide.width" :height="slide.height">

                        <!-- Icona freccia indietro -->
                        <a class="arrow left" @click="prev(slideIndex)">
                            <i class="fa-solid fa-chevron-left"></i>
                        </a>

                        <!-- Icona freccia avanti -->
                        <a class="arrow right" @click="next(slideIndex)">
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2
                        :class="{ 'giada': slideIndex === 3 && store.slider === store.vertical, 'luna': slideIndex === 2 && store.slider === store.horizontal }">
                        {{ slide.typology }}
                    </h2>

                    <div class="models-description">
                        <div class="names">
                            <div v-for="(model, modelIndex) in slide.models" :key="modelIndex" class="name"
                                :class="slide.nameClass, { 'expand': model.hover, 'reduce': !model.hover }"
                                @mouseover="hoverSlider(slideIndex, modelIndex)"
                                @mouseout="notHoverSlider(slideIndex, modelIndex)">
                                <span>
                                    {{ model.name }}
                                </span>
                                <i class="fa-solid fa-caret-down"></i>
                                <ul class="infos" :class="slide.nameClass">
                                    <li v-for="(info, index) in model.info" :key="index" class="info">
                                        - {{ info }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Descrizione zanzariera -->
                        <p class="description">
                            {{ slide.description }}
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <!-- Colori -->
        <Colori />
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;
</style>
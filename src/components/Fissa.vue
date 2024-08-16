<script>

// Importo store
import { store } from '../store';

// Importo Colori
import Colori from './Colori.vue';

import { useHead } from "@vueuse/head";

export default {
    name: 'Fissa',
    components: {
        Colori
    },
    data() {
        return {
            store,
            imageClass: ""
        }
    },
    setup() {
        useHead({
            title: "Zanzariera fissa",
            meta: [
                {
                    name: "description",
                    content: "Zanzariera fissa per una protezione permanente in Sardegna.",
                },
                {
                    property: "og:title",
                    content: "Zanzariera fissa"
                },
                {
                    property: "og:description",
                    content: "Zanzariera fissa per una protezione permanente in Sardegna."
                }
            ]
        })
    },
    computed: {
        // Metodo per stampare il nome della sezione (elemento 4 dell'array typologies presente nel file store.js)
        printNameSection() {
            return this.store.typologies[4].name;
        },
        printImagePath() {
            return this.store.typologies[4].image;
        }
    },
    methods: {
        imageLoading() {
            this.imageClass = "visible";
        },
    }
}
</script>

<template>
    <!-- Inizio sezione Fissa -->
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
            <div class="slider-container not-slider fissa">

                <!-- Parte contenuto slider -->
                <div class="slider active">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img :src="printImagePath" alt="Immagine zanzariera Fissa" class="slide-image fissa" width="210"
                            height="210" loading="lazy" @load="imageLoading" :class="imageClass">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2 class="fissa">
                        TELAIO FISSO
                    </h2>

                    <!-- Descrizione zanzariera -->
                    <p class="description">
                        Il modello FISSA viene fornito di serie con rete in fibra di vetro, su richiesta può
                        essere realizzato anche con rete in alluminio, acciaio, petscreen.
                    </p>

                    <!-- Nome zanzariera  -->
                    <div class="names">
                        <div class="name one-model">
                            FISSA
                        </div>
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
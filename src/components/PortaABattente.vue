<script>

// Importo store
import { store } from '../store';

// Importo Colori
import Colori from './Colori.vue';

import { useHead } from "@vueuse/head";

export default {
    name: 'PortaABattente',
    components: {
        Colori
    },
    data() {
        return {
            store,
            imageClass: "",
        }
    },
    setup() {
        useHead({
            title: "Zanzariera porta a battente",
            meta: [
                {
                    name: "description",
                    content: "Zanzariera porta a battente in Sardegna - eleganza e funzionalità.",
                },
                {
                    property: "og:title",
                    content: "Zanzariera porta a battente"
                },
                {
                    property: "og:description",
                    content: "Zanzariera porta a battente in Sardegna - eleganza e funzionalità su misura da oltre 30 anni."
                }
            ]
        })
    },
    computed: {
        // Metodo per stampare il nome della sezione (elemento 2 dell'array typologies presente nel file store.js)
        printNameSection() {
            return this.store.typologies[2].name;
        },
        printImagePath() {
            return this.store.typologies[2].image;
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
    <!-- Inizio sezione porta a battente -->
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
            <div class="slider-container not-slider">

                <!-- Parte contenuto slider -->
                <div class="slider active">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img :src="printImagePath" alt="Immagine zanzariera Porta a battente" class="slide-image"
                            width="210" height="280" loading="lazy" @load="imageLoading" :class="imageClass">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2>
                        PORTA A BATTENTE
                    </h2>


                    <!-- Descrizione zanzariera -->
                    <p class="description">
                        Il modello ANTAREX è una zanzariera a battente per portafinestra. Caratterizzata
                        dall'assenza
                        di
                        profili a pavimento, può; essere realizzata ad una o più ante. Fornita di serie con
                        la
                        rete
                        in fibra di vetro, su richiesta può essere fornita anche con rete in alluminio, acciaio,
                        petscreen.
                    </p>

                    <!-- Nome zanzariera  -->
                    <div class="names">
                        <div class="name one-model">
                            ANTAREX
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
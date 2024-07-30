<script>

//Importo store
import { store } from '../store';

// Importo Colori
import Colori from './Colori.vue';

import { useHead } from "@vueuse/head";

export default {
    name: 'Scorri',
    components: {
        Colori
    },
    data() {
        return {
            store
        }
    },
    setup() {
        useHead({
            title: "Zanzariera ad ante scorrevoli",
            meta: [
                {
                    name: "description",
                    content: "Zanzariera ad ante scorrevoli - soluzioni pratiche in Sardegna.",
                },
                {
                    name: "robots",
                    content: "index, follow"
                }
            ]
        })
    },
    computed: {
        // Metodo per stampare il nome della sezione (elemento 3 dell'array typologies presente nel file store.js)
        printNameSection() {
            return this.store.typologies[3].name;
        },
        printImagePath() {
            return this.store.typologies[3].image;
        }
    }
}
</script>

<template>
    <!-- Inizio sezione scorri -->
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
                        <img :src="printImagePath" alt="Immagine zanzariera a Pannelli Scorrevoli" class="slide-image"
                            width="210" height="280">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2>
                        MODELLO A PANNELLI SCORREVOLI
                    </h2>

                    <!-- Descrizione zanzariera -->
                    <p class="description">
                        Il modello SCORRI &egrave; una zanzariera ad ante scorrevoli o saliscendi (a due o pi&ugrave;
                        ante).
                        Fornito di serie con la rete in fibra di vetro, su richiesta pu&ograve; essere realizzato anche
                        con
                        rete
                        in alluminio, acciaio, petscreen.
                    </p>

                    <!-- Nome zanzariera  -->
                    <div class="names">
                        <div class="name one-model">
                            SCORRI
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
<script>

// Importo store
import { store } from '../store';

// Importo Colori
import Colori from './Colori.vue';

export default {
    name: 'PortaABattente',
    components: {
        Colori
    },
    data() {
        return {
            store
        }
    },
    computed: {
        // Metodo per stampare il nome della sezione (elemento 2 dell'array typologies presente nel file store.js)
        printNameSection() {
            return this.store.typologies[2].name;
        },
        printImagePath() {
            return this.store.typologies[2].image;
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
            <div class="slider-container not-slider">

                <!-- Parte contenuto slider -->
                <div class="slider active">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img :src="printImagePath" alt="Immagine zanzariera Antarex" class="slide-image" width="210"
                            height="280">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2>
                        PORTA A BATTENTE
                    </h2>


                    <!-- Descrizione zanzariera -->
                    <p class="description">
                        Il modello ANTAREX &egrave; una zanzariera a battente per portafinestra. Caratterizzata
                        dall'assenza
                        di
                        profili a pavimento, pu&ograve; essere realizzata ad una o pi&ugrave; ante. Fornita di serie con
                        la
                        rete
                        in fibra di vetro, su richiesta pu&ograve; essere fornita anche con rete in alluminio, acciaio,
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
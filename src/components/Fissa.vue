<script>

// Importo store
import { store } from '../store';

// Importo Colori
import Colori from './Colori.vue';

export default {
    name: 'Fissa',
    components: {
        Colori
    },
    data() {
        return {
            store
        }
    },
    computed: {
        // Metodo per stampare il nome della sezione (elemento 4 dell'array typologies presente nel file store.js)
        printNameSection() {
            return this.store.typologies[4].name;
        },
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
            <div class="slider-container" id="not-slider">

                <!-- Parte contenuto slider -->
                <div class="slider active">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img src="/img/zanzariere/fissa.webp" alt="Immagine zanzariera Fissa" class="slide-image"
                            width="210" height="210">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2>
                        TELAIO FISSO
                    </h2>

                    <!-- Nome zanzariera  -->
                    <div class="name">
                        FISSA
                    </div>

                    <!-- Descrizione zanzariera -->
                    <p class="description">
                        Il modello FISSA viene fornito di serie con rete in fibra di vetro, su richiesta pu&ograve;
                        essere realizzato anche con rete in alluminio, acciaio, petscreen.
                    </p>
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
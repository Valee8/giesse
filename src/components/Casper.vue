<script>

// Importo store
import { store } from '../store';

// Importo Colori
import Colori from './Colori.vue';

export default {
    name: 'Casper',
    components: {
        Colori
    },
    data() {
        return {
            store
        }
    },
    computed: {
        // Metodo per stampare il nome della sezione (elemento 5 dell'array typologies presente nel file store.js)
        printNameSection() {
            return this.store.typologies[5].name;
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
                <router-link :to="{ name: 'home' }">Home</router-link>
                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                {{ printNameSection }}
            </div>


            <!-- Inizio parte slider zanzariere -->
            <div class="slider-container casper" id="not-slider">

                <!-- Parte contenuto slider -->
                <div class="slider active">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img src="/img/casper.jpg" alt="CASPER" class="slide-image">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2>
                        INCASSO CON GUIDA DA 50X35
                    </h2>

                    <!-- Nome zanzariera  -->
                    <div class="name">
                        CASPER
                    </div>

                    <!-- Descrizione zanzariera -->
                    <p class="description casper">
                        Il modello CASPER &egrave; una zanzariera da incasso per falegnami. Viene prodotto con il cassonetto
                        da
                        45 o 55mm e con una guida da 50x35. Questo modello pu&ograve; essere realizzato in tutte le
                        versioni:
                    </p>

                    <!-- Lista vari tipi di casper -->
                    <ul class="casper-list">
                        <li>VERTICALE A MOLLA CLASSICA (CASPER A MOLLA)</li>
                        <li>VERTICALE A MOLLA CON SISTEMA A CRICCHETTO (CASPER A CRICCHETTO)</li>
                        <li>VERTICALE A CATENA CLASSICA (CASPER A CATENA)</li>
                        <li>VERTICALE A CATENA + MOLLA (CASPER TIPO MERI)</li>
                        <li>LATERALE A MOLLA CLASSICA (CASPER LATERALE)</li>
                        <li>LATERALE CON GUIDA BASSA DA 2cm (CASPER TIPO VALERIA)</li>
                        <li>LATERALE CON GUIDA ARROTONDATA DA 14mm (CASPER TIPO LUNA)</li>
                        <li>LATERALE CON GUIDA BASSA DA 3mm (CASPER TIPO ZELIG)</li>
                        <li>LATERALE A MOLLA FRIZIONATA (CASPER TIPO JOLLY)</li>
                    </ul>
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
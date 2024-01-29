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
            store,
            casperList: [
                "VERTICALE A MOLLA CLASSICA (CASPER A MOLLA)",
                "VERTICALE A MOLLA CON SISTEMA A CRICCHETTO (CASPER A CRICCHETTO)",
                "VERTICALE A CATENA CLASSICA (CASPER A CATENA)",
                "VERTICALE A CATENA + MOLLA (CASPER TIPO MERI)",
                "LATERALE A MOLLA CLASSICA (CASPER LATERALE)",
                "LATERALE CON GUIDA INFERIORE DA 2cm (CASPER TIPO VALERIA)",
                "LATERALE CON GUIDA ARROTONDATA DA 14mm (CASPER TIPO LUNA)",
                "LATERALE CON GUIDA INFERIORE DA 3mm (CASPER TIPO ZELIG)",
                "LATERALE A MOLLA FRIZIONATA (CASPER TIPO JOLLY)",
            ]
        }
    },
    computed: {
        // Metodo per stampare il nome della sezione (elemento 5 dell'array typologies presente nel file store.js)
        printNameSection() {
            return this.store.typologies[5].name;
        },
        printImagePath() {
            return this.store.typologies[5].image;
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
            <div class="slider-container casper not-slider">

                <!-- Parte contenuto slider -->
                <div class="slider active casper">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img :src="printImagePath" alt="Immagine zanzariera Casper" class="slide-image casper" width="210"
                            height="280">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2>
                        MODELLO CON GUIDA DA INCASSO PER FALEGNAMI
                    </h2>

                    <div class="models-description">

                        <!-- Nome zanzariera  -->
                        <div class="names casper">
                            <div class="name one-model">
                                CASPER
                            </div>
                        </div>

                        <!-- Descrizione zanzariera -->
                        <p class="description casper">
                            Il modello CASPER &egrave; una zanzariera da incasso per falegnami. Viene prodotto con il
                            cassonetto
                            da 45 o 55mm e con una guida da 50x35. Questo modello pu&ograve; essere realizzato in tutte le
                            versioni:
                        </p>

                        <!-- Lista vari tipi di casper -->
                        <ul class="casper-list">
                            <li v-for="(casper, index) in casperList" :key="index">
                                - {{ casper }}
                            </li>
                        </ul>

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
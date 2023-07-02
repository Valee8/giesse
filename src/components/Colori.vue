<script>

import { store } from '../store';

export default {
    name: 'Colori',
    data() {
        return {
            store,
        }
    },
    methods: {
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
    mounted() {
        for (let i = 0; i < this.store.colors.length; i++) {
            if (!this.store.colors[i].active)
                this.store.colors[0].active = true;
        }

        if (this.store.colors[0].active) {
            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== 0) {
                    this.store.colors[i].active = false;
                }
            }
        }
        else {
            this.store.colors[0].active = true;

            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== 0) {
                    this.store.colors[i].active = false;
                }
            }
        }
    }
}
</script>

<template>
    <!-- Inizio parte colori -->
    <div class="info-colors">

        <!-- Testo in alto -->
        <div class="title-info-colors">
            <!-- Titolo -->
            <h2>
                I nostri colori
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
                    <div @click="changeColorTypology(index)" class="typology-name" :class="{ 'selected': typo.active }">
                        {{ typo.typology }}
                    </div>
                </div>
            </div>

            <!-- Nomi e immagini colori - parte destra -->
            <div class="list-colors" v-for="(typo, index) in store.colors" :key="index"
                :class="{ 'selected': typo.active }">
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
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

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
        align-items: flex-start;
        gap: 0 80px;
        padding: 100px 0;
        //height: 660px;

        // Elenco tipologie colori - parte sinistra
        .list-typologies {
            text-align: center;
            width: 10%;

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
                font-size: 1.3rem;
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
                //justify-content: center;
                flex-wrap: wrap;
                gap: 150px 30px;
                color: #fff;
                font-size: 1rem;
                font-weight: 500;

                // Colore singolo
                .color {
                    width: 180px;
                    height: 180px;

                    // Nome colore
                    .color-name {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #ccc;
                        border-radius: 50px;
                        color: #000;
                        margin-top: 10px;
                        text-align: center;
                        height: 50px;
                        width: 180px;
                        padding: 5px 6px;
                        font-weight: 600;
                    }

                    // Immagine colore
                    .color-image {
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        border: 3px solid transparent;
                        margin-top: -15px;
                        position: relative;
                        z-index: 20;
                        object-fit: cover;
                        //border-bottom: 0;
                    }
                }

            }

        }
    }
}
</style>
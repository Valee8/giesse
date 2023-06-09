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
        align-items: center;
        gap: 0 60px;
        height: 402px;

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
</style>
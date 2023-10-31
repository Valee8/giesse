<script>

// Importo store
import { store } from '../store';

export default {
    name: 'Colori',
    data() {
        return {
            store,
            colorClass: "",
        }
    },
    methods: {
        // Metodo per cambiare colore cliccando il nome della tipologia
        changeColorTypology(index) {

            this.colorClass = "";

            setTimeout(() => {
                this.colorClass = "visible";
            }, 200);

            // Assegno true all'active dell'elemento corrente dell'array colors (presente nel file store.js)
            this.store.colors[index].active = true;

            // Assegno false agli active di tutti gli altri elementi
            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== index) {
                    this.store.colors[i].active = false;
                }
            }
        },
    },
    created() {

        setTimeout(() => {
            this.colorClass = "visible";
        }, 200);

        // All'avvio della pagina dovra' essere sempre il primo elemento quello corrente, lo faccio tramite questi codici
        for (let i = 0; i < this.store.colors.length; i++) {
            // Se tutti gli elementi active sono false assegno true al primo elemento
            if (!this.store.colors[i].active)
                this.store.colors[0].active = true;
        }

        // Se l'elemento attivo e' il primo, assegno false a tutti gli altri
        if (this.store.colors[0].active) {
            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== 0) {
                    this.store.colors[i].active = false;
                }
            }
        }
        // Altrimenti se non lo e' 
        else {
            // Assegno true al primo elemento
            this.store.colors[0].active = true;

            // E assegno false a tutti gli altri
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
                        <img :src="color.image" :alt="color.name" class="color-image" :class="colorClass">

                        <!-- <div class="loading" :class="loadingClass">
                            <div class="spinner">
                                <i class="fa-solid fa-spinner"></i>
                            </div>
                        </div> -->

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

// .loading {
//     width: 160px;
//     height: 160px;
//     color: #fff;
//     opacity: 1;
//     position: absolute;
//     top: -15px;
//     left: 0;

//     &.hidden {
//         opacity: 0;
//     }

//     .spinner {
//         animation: spin 1s linear infinite;
//     }

//     @keyframes spin {
//         0% {
//             transform: rotate(360deg);
//         }
//     }
// }

// Parte tipologie colori e nomi colori
.info-colors {
    color: #fff;
    background-color: #686868;
    padding: 20px 0 0 0;

    // Titolo - testo in alto
    .title-info-colors {
        text-align: center;
        margin: 0 auto;
        max-width: 600px;
        font-size: 1.1rem;

        p {
            padding: 10px 0;
            font-size: 1.1rem;
        }
    }

    .container {
        display: flex;
        align-items: flex-start;
        gap: 0 80px;
        height: 100%;
        padding: 100px 0;

        // Elenco tipologie colori - parte sinistra
        .list-typologies {
            text-align: center;
            width: 13%;

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
                font-size: 1.2rem;
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
                font-size: 0.9rem;
                font-weight: 500;

                // Colore singolo
                .color {
                    width: 160px;
                    height: 160px;
                    position: relative;

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
                        width: 160px;
                        padding: 5px 6px;
                        font-weight: 600;
                    }

                    .black {
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        margin-top: -15px;
                        background-color: #0F0D0E;
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
                        opacity: 0;
                        transition: all 1s ease-in-out;

                        &.visible {
                            opacity: 1;
                        }
                    }
                }

            }

        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 479px) {
    .info-colors {
        padding-left: 30px;
        padding-right: 30px;

        .container {
            flex-wrap: wrap;
            gap: 80px;
            padding: 50px 0 100px 0;

            .list-typologies {
                display: block;
                width: 180px;
                margin: 0 auto;
            }

            .list-colors {
                width: 100%;

                .colors {
                    justify-content: center;

                    .color {
                        width: 150px;
                        height: 150px;

                        .color-name {
                            width: 150px;
                            font-size: 0.8rem;
                        }
                    }
                }
            }
        }
    }
}


// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 480px) and (max-width: 700px) {
    .info-colors {
        padding-left: 30px;
        padding-right: 30px;

        .container {
            flex-wrap: wrap;
            gap: 50px;

            .list-typologies {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                width: 100%;
                gap: 20px;

                .typologies {
                    &:first-child {
                        border-top: 0;
                    }
                }

                .typology-name {
                    padding-left: 8px;
                    padding-right: 8px;
                    border-left: 4px solid transparent;
                    border-top: 1px solid #fff;

                    &.selected {
                        padding-left: 8px;
                    }
                }
            }

            .list-colors {
                width: 100%;

                .colors {
                    justify-content: center;

                    .color {
                        width: 150px;
                        height: 150px;

                        .color-name {
                            width: 150px;
                            font-size: 0.8rem;
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 701px) and (max-width: 1028px) {
    .info-colors {
        .container {

            .list-typologies {
                width: 22%;
            }
        }
    }
}

// Fine versioni mobile, tablet e intermedie
</style>
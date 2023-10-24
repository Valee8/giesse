<script>

// Importo store
import { store } from '../store.js';

export default {
    name: 'Tipologie',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <!-- Inizio sezione Tipologie -->
    <section id="typologies">
        <div class="container">
            <!-- Titolo -->
            <h2>
                Tipologia Zanzariere
            </h2>

            <!-- Elenco tipologie zanzariere -->
            <div class="list-typologies">
                <div class="typologies" v-for="(typology, index) in store.typologies" :key="index">
                    <router-link :to="{ name: typology.name.toLowerCase().replace(/\s/g, '-'), params: { id: index } }"
                        class="link">

                        <!-- Immagine zanzariera -->
                        <img :src="typology.image" :alt="typology.name" v-if="typology.image"
                            :class="'typology-image ' + typology.name.toLowerCase()">

                        <!-- Nome tipologia -->
                        <h3 :class="typology.name.toLowerCase()">
                            {{ typology.name }}
                        </h3>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Sezione Tipologie
section {
    padding-bottom: 60px;

    // Titolo
    h2 {
        text-align: center;
        font-size: 1.9rem;
    }

    // Inizio lista tipologie
    .list-typologies {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        // Blocco singolo
        .typologies {
            width: calc(100% / 3);
            padding: 50px 0;

            .link {
                width: 210px;
                display: block;
                color: #000;
                transition: all 0.5s ease-in-out;

                &:hover {
                    transform: scale(0.8);
                }
            }

            // Immagine
            .typology-image {
                width: 210px;
                display: block;

                &.fissa {
                    padding-top: 30px;
                    transform: scale(1.4);
                }

                &.casper {
                    transform: scaleY(0.9);
                }
            }

            &:nth-child(1),
            &:nth-child(4) {

                .link {
                    margin-right: auto;
                }
            }

            &:nth-child(3),
            &:nth-child(6) {

                .link {
                    margin-left: auto;
                }

            }

            &:nth-child(2),
            &:nth-child(5) {

                .link {
                    margin: 0 auto;
                }

            }

            // Titolo
            h3 {
                width: 210px;
                text-align: center;
                padding-top: 30px;
                font-size: 1.3rem;

                &.fissa {
                    padding-top: 80px;
                }
            }

        }
    }
}

// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 300px) and (max-width: 610px) {
    section {

        .list-typologies {
            .typologies {
                width: 100%;

                .link {
                    width: 100%;

                    .typology-image,
                    h3 {
                        margin: 0 auto;
                    }
                }

            }
        }
    }
}

@media only screen and (min-width: 610px) and (max-width: 990px) {
    section {
        .list-typologies {
            .typologies {
                width: 35%;

                .link {
                    width: 100%;

                    .typology-image,
                    h3 {
                        width: 100%;
                    }

                }
            }
        }
    }
}

// Fine versioni mobile, tablet e intermedie
</style>
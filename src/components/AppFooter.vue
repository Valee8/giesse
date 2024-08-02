<script>

// Importo store.js
import { store } from '../store.js';

export default {
    name: 'AppFooter',
    data() {
        return {
            store,
        }
    },
    computed: {
        // Estraggo le Verticali dalla posizione 0 (incluso) alla posizione 4 (escluso) dell'array listModels presente nel file store.js
        filteredVertical() {
            return this.store.listModels.slice(0, 4);
        },
        // Estraggo le Orizzontali dalla posizione 4 (incluso) alla posizione 10 (escluso) dell'array listModels presente nel file store.js
        filteredHorizontal() {
            return this.store.listModels.slice(4, 11);
        },
        // Estraggo le Altre
        filteredOthers() {
            return this.store.listModels.slice(11, 15);
        }
    },
}
</script>

<template>
    <!-- Inizio footer -->
    <footer>
        <div class="container">
            <!-- Parte sinistra footer -->
            <div class="left-footer">
                <!-- Logo Giesse -->
                <img :src="store.logo.image" :alt="store.logo.alt" class="logo" width="250" height="55">

                <!-- Paragrafo -->
                <p>
                    <span>Giesse Zanzariere</span>: zanzariere su misura e servizi di riparazione da oltre 30 anni.
                    Qualità e
                    assistenza per ogni esigenza.
                </p>
                <p>
                    Contattaci per preventivi personalizzati.
                </p>
                <p>
                    © Giesse. Tutti i diritti riservati.
                </p>
            </div>

            <!-- Parte centrale footer -->
            <div class="center-footer">
                <!-- Titolo -->
                <h3>
                    Giesse Zanzariere di Sandro Locci
                </h3>
                <!-- Bordo sotto il titolo -->
                <div class="border"></div>

                <!-- Elenco informazioni -->
                <ul>
                    <li>
                        P. IVA: <span>{{ store.infoDitta.vatNumber }}</span>
                    </li>
                    <li class="pt">
                        <div>{{ store.infoDitta.address }}</div>
                        {{ store.infoDitta.postalCode }} (Sud Sardegna)
                    </li>
                    <li class="pt">
                        Telefono: <span>{{ store.infoDitta.telephone }}</span>
                    </li>
                    <li>
                        Cellulare: <span>{{ store.infoDitta.cell }}</span>
                    </li>
                    <li>
                        E-mail: <span>{{ store.infoDitta.email }}</span>
                    </li>
                </ul>
            </div>

            <!-- Parte destra footer -->
            <div class="right-footer">
                <div class="left">
                    <!-- Titolo -->
                    <h3>
                        Verticali e Laterali
                    </h3>
                    <!-- Bordo sotto il titolo -->
                    <div class="border"></div>

                    <ul>
                        <!-- Stampo zanzariere verticali -->
                        <li v-for="(model, index) in filteredVertical" :key="index">
                            {{ model.name }}
                        </li>

                        <!-- Stampo zanzariere orizzontali -->
                        <li v-for="(model, index) in filteredHorizontal" :key="index">
                            {{ model.name }}
                        </li>
                    </ul>
                </div>

                <div class="right">
                    <h3>
                        Altre
                    </h3>
                    <!-- Bordo sotto il titolo -->
                    <div class="border"></div>

                    <!-- Elenco altre zanzariere -->
                    <ul>
                        <li v-for="(model, index) in filteredOthers" :key="index">
                            {{ model.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Footer
footer {
    background-color: #424242;
    color: #fff;
    padding: 30px 0;
    font-size: 0.75rem;
    line-height: 15px;

    // Container piccolo
    .container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .left-footer {
            width: 26%;
        }

        // Parte centrale footer
        .center-footer {
            width: 18%;

            ul {
                font-size: 0.75rem;

                // Spazio tra partita iva e indirizzo e numero di telefono
                .pt {
                    padding-top: 10px;
                }

                span {
                    font-weight: bold;
                }
            }
        }

        .right-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 35%;

            .list {

                .pt {
                    padding-top: 10px;
                }

                h5 {
                    font-size: 0.8rem;
                }
            }
        }

        // Bordo sotto il titolo
        .border {
            background-color: $yellow-color;
            width: 40px;
            height: 4px;
        }

        // Titolo
        h3 {
            color: $yellow-color;
            font-size: 1.1rem;
            padding-bottom: 5px;
            line-height: 20px;
        }

        p {
            &:first-of-type {
                padding-top: 20px;
            }

            &:last-of-type {
                padding-top: 10px;
            }


            span {
                font-weight: bold;
            }
        }

        ul {
            padding-top: 20px;
        }

    }
}


// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 300px) and (max-width: 610px) {
    footer {
        .container {
            flex-wrap: wrap;

            div {
                &[class*="footer"] {
                    width: 100%;
                    padding: 20px 0;
                }
            }

            h3 {
                div {
                    display: inline-block;
                }
            }

            .border {
                width: 80px;
            }
        }
    }
}

@media only screen and (min-width: 850px) and (max-width: 1170px) {

    footer {
        .container {

            .right-footer {
                width: 30%;
                flex-wrap: wrap;

                .right {
                    padding-top: 50px;
                }
            }
        }
    }
}


@media only screen and (min-width: 610px) and (max-width: 850px) {
    footer {
        .container {
            justify-content: center;
            flex-wrap: wrap;

            .left-footer {
                width: 50%;

                p {
                    width: 240px;
                }
            }

            .center-footer {
                width: 50%;
            }

            .right-footer {
                width: 100%;
            }

            div {
                &[class*="footer"] {
                    padding: 20px 0;
                }

            }

            .center-footer {
                text-align: right;

                .border {
                    margin-left: auto;
                }
            }
        }
    }
}
</style>
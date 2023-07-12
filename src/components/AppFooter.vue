<script>

import { store } from '../store.js';

export default {
    name: 'AppFooter',
    data() {
        return {
            store,
        }
    },
    computed: {
        filteredVertical() {
            return this.store.listModels.slice(0, 4);
        },
        filteredHorizontal() {
            return this.store.listModels.slice(4, 10);
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
                <img src="/img/logo-giesse.png" alt="Logo Giesse" class="logo">

                <!-- Paragrafo -->
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut quos illo at est eum? Dolorem quas nihil
                    amet,
                    harum possimus atque dolore debitis omnis, enim qui vel nesciunt aliquam recusandae.
                </p>
            </div>

            <!-- Parte centrale footer -->
            <div class="center-footer">
                <!-- Titolo -->
                <h3>
                    Giesse Zanzariere di <div>Sandro Locci</div>
                </h3>
                <!-- Bordo sotto il titolo -->
                <div class="border"></div>

                <!-- Elenco informazioni -->
                <ul>
                    <li>
                        P. IVA: <span>01376020929</span>
                    </li>
                    <li class="pt">
                        <div>Via Damiano Chiesa 69</div>
                        09016 Iglesias (Sud Sardegna)
                    </li>
                    <li class="pt">
                        Telefono: <span>0781 33387</span>
                    </li>
                    <li>
                        Cellulare: <span>&plus;39 3939139300</span>
                    </li>
                    <li>
                        E-mail: <span>giessezanzariere&commat;tiscali.it</span>
                    </li>
                </ul>
            </div>

            <!-- Parte destra footer -->
            <div class="right-footer">
                <div class="left">
                    <!-- Titolo -->
                    <h3>
                        Verticali e Orizzontali
                    </h3>
                    <!-- Bordo sotto il titolo -->
                    <div class="border"></div>

                    <ul>
                        <li v-for="(model, index) in filteredVertical" :key="index">
                            {{ model.name }}
                        </li>

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

                    <ul>
                        <li>
                            Porta a battente
                        </li>
                        <li>
                            Scorri
                        </li>
                        <li>
                            Fissa
                        </li>
                        <li>
                            Casper
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
        //max-width: 1000px;

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

        // Larghezza div (blocchi footer) che contengono la parola 'footer' come classe
        // div {
        //     &[class*="footer"] {
        //         width: 25%;
        //     }
        // }

        .right-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 35%;

            .list {
                //display: flex;
                //justify-content: space-between;
                //align-items: flex-start;
                //flex-wrap: wrap;
                //gap: 30px;

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

        p,
        ul {
            padding-top: 20px;
        }
    }
}


// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 480px) and (max-width: 610px) {
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



@media only screen and (min-width: 590px) and (max-width: 770px) {
    footer {
        .container {
            justify-content: center;
            flex-wrap: wrap;
            //gap: 30px;

            .left-footer {
                p {
                    width: 240px;
                }
            }

            div {
                &[class*="footer"] {
                    width: 50%;
                    padding: 20px 0;
                    //width: calc(50% - 15px);
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

// Fine versioni mobile, tablet e intermedie
</style>
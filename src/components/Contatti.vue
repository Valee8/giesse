<script>

import { store } from '../store.js';

export default {
    name: 'Contatti',
    data() {
        return {
            store,
            faqs: [
                {
                    question: "Dove ci troviamo?",
                    answer: "Risposta 1",
                    show: false
                },
                {
                    question: "Come si richiede un preventivo?",
                    answer: "Risposta 2",
                    show: false
                },
                {
                    question: "Come trovo la zanzariera adatta alla mia finestra?",
                    answer: "Risposta 3",
                    show: false
                },
                {
                    question: "Quali sono i tempi di consegna?",
                    answer: "Risposta 4",
                    show: false
                }
            ]
        }
    },
    computed: {
        // Stampa nome sezione nel titolo
        printNameSection() {
            for (let i = 0; i < store.linksNav.length; i++) {
                if (i === 2)
                    return store.linksNav[i].text;
            }
        }
    }
}
</script>

<template>
    <section class>
        <!-- Parte in alto con immagine come sfondo -->
        <div class="bg-section">

            <div class="container">
                <div class="section-title" :class="{ 'menu-expand': this.store.classSubmenu === 'expand' }">
                    <!-- Scritta Home -->
                    <router-link to="/">Home</router-link>
                    <!-- Icone freccia -->
                    <i class="fa-solid fa-chevron-right"></i>
                    <!-- Nome sezione -->
                    {{ printNameSection }}
                </div>

                <!-- Contenuto parte in alto sezione -->
                <div class="content">
                    <!-- Titolo -->
                    <h1>
                        Come possiamo <div>aiutarti&quest;</div>
                    </h1>

                    <!-- Paragrafo -->
                    <p>
                        Leggi le domande frequenti, se non trovi quello che
                    <div>cerchi contattaci&excl;</div>
                    </p>
                </div>
            </div>

        </div>

        <!-- Parte sotto - faq -->
        <div class="faq-section">
            <div class="container">
                <!-- Parte sinistra faq -->
                <div class="faq-left">
                    <!-- Titolo -->
                    <h2>
                        Domande frequenti
                    </h2>

                    <!-- Paragrafo -->
                    <p>
                        In questo spazio abbiamo raccolto le domande pi&ugrave; frequenti che ci fate, se non trovi quello
                        che
                        cerchi contattaci telefonicamente o compila il form in basso, saremo felici di aiutarti
                    </p>
                </div>

                <!-- Parte destra con elenco domande -->
                <div class="faq-right">
                    <ul>
                        <!-- Elenco domande -->
                        <li class="faq" v-for="(faq, index) in faqs" :key="index"
                            @click="faqs[index].show = !faqs[index].show" :class="{ 'pb': faqs[index].show }">

                            <!-- Icona punto -->
                            <div class="dot">
                                <i class="fa-solid fa-circle"></i>
                            </div>

                            <!-- Testo domanda -->
                            <div class="question">{{ faq.question }}</div>

                            <!-- Icona freccia -->
                            <div class="arrow">
                                <span v-if="!faqs[index].show">
                                    <i class="fa-solid fa-chevron-down"></i>
                                </span>
                                <span v-else>
                                    <i class="fa-solid fa-chevron-up"></i>
                                </span>
                            </div>

                            <!-- Testo Risposta -->
                            <div class="answer" v-if="faqs[index].show">
                                <span class="dot">
                                    <i class="fa-solid fa-circle"></i>
                                </span>
                                {{ faq.answer }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Sezione Contatti
section {
    color: #fff;

    .bg-section {
        background-image: url('/img/sfondo-faq.png');
        background-size: cover;
        background-position: center;
        height: 410px;

        .section-title {

            a {
                color: #fff;
            }
        }

        .content {
            padding-top: 30px;
            color: #fff;
            text-align: center;

            h1 {
                font-size: 2.7rem;
            }

            p {
                padding-top: 15px;
                font-size: 0.9rem;
            }
        }
    }

    .faq-section {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #686868;
        padding: 40px 0;

        .container {
            display: flex;
            justify-content: center;

            .faq-left {
                width: 40%;

                p {
                    padding-top: 30px;
                    width: 70%;
                    font-size: 0.9rem;
                }
            }

            .faq-right {
                width: 40%;

                ul {
                    user-select: none;

                    li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-wrap: wrap;
                        padding: 5px 0 10px 0;
                        cursor: pointer;

                        &.faq {
                            border-top: 2px solid #fff;

                            &:last-child {
                                border-bottom: 2px solid #fff;
                            }

                            .question {
                                flex-grow: 1;
                            }

                            .dot {
                                font-size: 0.3rem;
                                vertical-align: middle;
                                padding-right: 7px;
                            }
                        }

                        .answer {
                            padding-top: 5px;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>
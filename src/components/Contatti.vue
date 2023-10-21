<script>

// Importo store
import { store } from '../store.js';

// Importo Informazioni
import Informazioni from './Informazioni.vue';

export default {
    name: 'Contatti',
    components: {
        Informazioni
    },
    data() {
        return {
            // headerStyle: {
            //     backgroundImage: "url('/img/sfond-faq-min.png')"
            // },
            store,
            // Array contenente le faq
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
        <div class="bg-section" v-if="!store.isLoading">

            <div class="container">
                <div class="section-title">
                    <!-- Scritta Home -->
                    <router-link :to="{ name: 'home' }">Home</router-link>
                    <!-- Icone freccia -->
                    <i class="fa-solid fa-chevron-right"></i>
                    <!-- Nome sezione -->
                    <span>{{ printNameSection }}</span>
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

        <div class="loading" v-else>
            <div class="spinner">
                <i class="fa-solid fa-spinner"></i>
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

        <!-- Blocco Informazioni con messaggio da inviare -->
        <Informazioni />
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.loading {
    height: 410px;
}

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
                font-size: 3.2rem;
            }

            p {
                padding-top: 15px;
                font-size: 1.3rem;
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
            //align-items: center;

            .faq-left {
                width: 45%;

                h2 {
                    font-size: 2rem;
                }

                p {
                    padding-top: 30px;
                    width: 70%;
                    font-size: 1.2rem;
                }
            }

            .faq-right {
                width: 55%;

                ul {
                    user-select: none;

                    li {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-wrap: wrap;
                        padding: 5px 0 10px 0;
                        cursor: pointer;
                        font-size: 1.2rem;

                        &.faq {
                            border-top: 2px solid #fff;

                            &:last-child {
                                border-bottom: 2px solid #fff;
                            }

                            .question {
                                flex-grow: 1;
                            }

                            .dot {
                                font-size: 0.5rem;
                                vertical-align: middle;
                                padding-right: 7px;
                            }
                        }

                        .answer {
                            padding-top: 5px;
                            width: 100%;
                            font-size: 1.2rem;
                        }
                    }
                }
            }
        }
    }
}

// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 955px) and (max-width: 1000px) {

    section {
        .faq-section {

            .container {
                gap: 30px;

                .faq-left {
                    p {
                        width: 100%;
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 1000px) and (max-width: 1050px) {
    section {
        .faq-section {

            .container {
                gap: 30px;

                .faq-left {

                    h2 {
                        font-size: 1.8rem;
                    }

                    p {
                        width: 100%;
                    }
                }

                .faq-right {
                    width: 59%;

                    ul {
                        li {
                            font-size: 1.2rem;
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 1001px) and (max-width: 1044px) {
    section {
        .faq-section {

            .container {

                .faq-left {
                    width: 35%;
                }

                .faq-right {
                    width: 65%;
                }
            }
        }
    }
}


@media only screen and (min-width: 480px) and (max-width: 920px) {

    section {
        .faq-section {

            .container {
                flex-wrap: wrap;
                gap: 40px;

                .faq-left {
                    text-align: center;

                    p {
                        width: 100%;
                    }
                }

                .faq-right {
                    ul {

                        li {
                            font-size: 1rem;

                            .answer {
                                font-size: 1rem;
                            }
                        }

                        .arrow {
                            font-size: 0.9rem;
                        }
                    }
                }


                .faq-left,
                .faq-right {
                    width: 100%;
                }
            }
        }
    }
}

@media only screen and (min-width: 650px) and (max-width: 900px) {

    section {
        .faq-section {

            .container {

                .faq-right {
                    width: 75%;
                }
            }
        }
    }

}

@media only screen and (min-width: 900px) and (max-width: 1000px) {

    section {
        .faq-section {

            .container {
                align-items: center;

                .faq-left {
                    p {
                        font-size: 1rem;
                    }
                }

                .faq-right {
                    width: 60%;

                    ul {
                        li {
                            font-size: 1.1rem;
                        }
                    }
                }
            }
        }
    }
}

// Fine versioni mobile, tablet e intermedie
</style>
<script>

// Importo store
import { store } from '../store.js';

// Importo Informazioni
import Informazioni from './Informazioni.vue';

import { useHead } from "@vueuse/head";

export default {
    name: 'Contatti',
    components: {
        Informazioni
    },
    setup() {
        useHead({
            title: "Contatti della Giesse Zanzariere",
            meta: [
                {
                    name: "description",
                    content: "Contattaci per informazioni su zanzariere - telefono, email, indirizzo."
                },
                {
                    property: "og:title",
                    content: "Contatti della Giesse Zanzariere"
                },
                {
                    property: "og:description",
                    content: "Contattaci per informazioni su zanzariere - telefono, email, indirizzo."
                }
            ]
        })
    },
    data() {
        return {
            bgClass: "",
            store,
            // Array contenente le faq
            faqs: [
                {
                    question: "Dove ci troviamo?",
                    answer: "Ci troviamo ad Iglesias in Via Damiano Chiesa 69, maggiori informazioni puoi trovarle ",
                    show: false
                },
                {
                    question: "Come si richiede un preventivo?",
                    answer: 'Per richiedere un preventivo è sufficiente andare nella sezione "Richiedi Preventivo" e completare le informazioni richieste in ogni step.',
                    show: false
                },
                {
                    question: "Cosa sono cuffie, guide telescopiche e guide singole?",
                    answer: "Le cuffie e le guide telescopiche, diversamente dalle guide singole, sono un valido sistema, in fase di montaggio, che risolve i problemi di fuorisquadra senza dover spessorare o siliconare.",
                    show: false
                },
                {
                    question: "Quali sono i tempi di consegna?",
                    answer: "I tempi di consegna sono di 5/6 giorni lavorativi.",
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
    },
    methods: {
        onImageLoad() {
            this.bgClass = "loaded";
        }
    }
}
</script>

<template>
    <section class>
        <!-- Parte in alto con immagine come sfondo -->
        <div class="bg-section" :class="bgClass">

            <img src="/img/sfondi-e-logo/sfondo-faq.jpg" alt="Immagine Contatti" class="image" loading="lazy"
                @load="onImageLoad">

            <div class="container">
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

                <!-- Contenuto parte in alto sezione -->
                <div class="content">
                    <!-- Titolo -->
                    <h1>
                        Come possiamo aiutarti?
                    </h1>

                    <!-- Paragrafo -->
                    <p>
                        Leggi le domande frequenti, se non trovi quello che cerchi contattaci!
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
                        In questo spazio abbiamo raccolto le domande più frequenti che ci fate, se non trovi
                        quello
                        che
                        cerchi contattaci telefonicamente o compila il form in basso, saremo felici di aiutarti!
                    </p>
                </div>

                <!-- Parte destra con elenco domande -->
                <div class="faq-right">
                    <ul>
                        <!-- Elenco domande -->
                        <li class="faq" v-for="(faq, index) in faqs" :key="index" :class="{ 'pb': faqs[index].show }">

                            <div @click="faqs[index].show = !faqs[index].show" class="dot-question-arrow">
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
                            </div>

                            <!-- Testo Risposta -->
                            <!--  :class="{ 'show': faqs[index].show }" -->
                            <div class="answer" v-if="faqs[index].show">

                                {{ faq.answer }}
                                <span v-if="index === 0">
                                    <router-link :to="{ name: 'sede' }">qui</router-link>.
                                </span>

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

// Contiene l'immagine sfocata e a bassa risoluzione delle faq come sfondo, che apparira' temporaneamente fino a quando non verra' caricata la vera immagine
.bg-section {
    background-image: url('/img/sfondi-e-logo/faq-sfoc.jpg');
    background-size: cover;
    background-position: center;
    height: 414px;
    width: 100%;
    position: relative;

    &.loaded {
        .image {
            opacity: 1;
        }
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

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
            max-width: 430px;
            margin: 0 auto;
        }

        p {
            padding-top: 15px;
            font-size: 1.3rem;
            max-width: 540px;
            margin: 0 auto;
        }
    }
}

// Sezione Contatti
section {
    color: #fff;

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
                width: 39%;

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
                width: 61%;

                ul {
                    user-select: none;

                    li {
                        font-size: 1.4rem;

                        a {
                            color: $yellow-color;

                            &:hover {
                                text-decoration: underline;
                            }
                        }

                        &.faq {
                            border-top: 2px solid #fff;

                            &:last-child {
                                border-bottom: 2px solid #fff;
                            }

                            &.pb {
                                padding-bottom: 10px;
                            }

                            .dot-question-arrow {
                                display: flex;
                                width: 100%;
                                padding: 5px 0 10px 0;
                                cursor: pointer;
                            }

                            .question {
                                flex-grow: 1;
                                font-weight: 600;
                            }

                            .dot {
                                align-self: center;
                                font-size: 0.5rem;
                                vertical-align: middle;
                                padding-right: 7px;
                            }
                        }

                        .answer {
                            padding-left: 15px;
                            //padding-top: 10px;
                            padding-right: 30px;
                            width: 100%;
                            font-size: 1.1rem;
                            cursor: text;
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

@media only screen and (min-width: 1016px) and (max-width: 1050px) {
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

@media only screen and (min-width: 300px) and (max-width: 610px) {

    .bg-section {
        height: 350px;

        .content {

            h1 {
                font-size: 2.3rem;
            }

            p {
                font-size: 1.1rem;
            }

        }
    }

    section {
        .faq-section {
            .container {
                .faq-left {
                    h2 {
                        font-size: 1.6rem;
                    }

                    p {
                        font-size: 1.1rem;
                    }
                }
            }
        }
    }

    .info {
        h2 {
            color: red;
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 533px) {

    section {
        .faq-section {

            .container {

                .faq-right {
                    ul {

                        li {

                            &.faq {

                                .question {
                                    padding-right: 30px;
                                    width: 210px;
                                }
                            }


                        }
                    }
                }
            }
        }
    }
}


@media only screen and (min-width: 300px) and (max-width: 920px) {

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
                    width: 600px;
                }
            }
        }
    }
}

@media only screen and (min-width: 921px) and (max-width: 1015px) {

    section {
        .faq-section {

            .container {
                align-items: center;

                .faq-left {
                    width: 30%;

                    p {
                        font-size: 1rem;
                    }
                }

                .faq-right {
                    width: 70%;

                    ul {
                        li {
                            font-size: 1.2rem;

                            .answer {
                                font-size: 1.1rem;
                            }
                        }


                    }
                }
            }
        }
    }
}



@media only screen and (min-width: 1016px) and (max-width: 1216px) {
    section {
        .faq-section {

            .container {
                align-items: center;

                .faq-left {
                    width: 30%;
                }

                .faq-right {
                    width: 68%;

                    ul {
                        li {
                            font-size: 1.2rem;

                            .answer {
                                font-size: 1.1rem;
                            }


                        }
                    }
                }
            }
        }
    }
}
</style>
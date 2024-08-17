<script>

// Imposto store
import { store } from '../store.js';

import PrimoStepPreventivo from './PrimoStepPreventivo.vue';

import SecondoStepPreventivo from './SecondoStepPreventivo.vue';

import TerzoStepPreventivo from './TerzoStepPreventivo.vue';

import QuartoStepPreventivo from './QuartoStepPreventivo.vue';

import { useHead } from "@vueuse/head";

export default {
    name: 'Preventivo',
    components: {
        PrimoStepPreventivo,
        SecondoStepPreventivo,
        TerzoStepPreventivo,
        QuartoStepPreventivo
    },
    setup() {
        useHead({
            title: "Richiedi un preventivo per le tue zanzariere",
            meta: [
                {
                    name: "description",
                    content: "Preventivo gratuito per zanzariere - servizio rapido e professionale."
                },
                {
                    property: "og:title",
                    content: "Richiedi un preventivo per le tue zanzariere"
                },
                {
                    property: "og:description",
                    content: "Preventivo gratuito per zanzariere - servizio rapido e professionale."
                }
            ]
        })
    },
    data() {
        return {
            bgClass: "",
            // store (dall'import di store.js)
            store,
        }
    },
    computed: {
        // Stampo nome sezione
        printNameSection() {
            for (let i = 0; i < store.linksNav.length; i++) {
                if (i === 0)
                    return store.linksNav[i].text;
            }
        }
    },
    methods: {
        onImageLoad() {
            this.bgClass = "loaded";
        },
        changeRoute() {
            this.store.showPopupExitRoutePreventivo = false;
            this.store.activePopup = false;
            this.store.changeRoute = true;

            this.$router.push(this.store.linkRoute);
        },
        // getClient per ottenere i dati dei clienti
        async getClient() {
            // Se clientId è presente eseguo la chiamata API
            if (this.store.clientId) {
                try {
                    // Eseguo la chiamata API
                    const response = await fetch(`${this.store.apiUrl}clients/${this.store.clientId}`);

                    // Converte la risposta in JSON
                    const data = await response.json();
                    const success = data.success;
                    const responseData = data.response; // Cambiato da "response" a "responseData" per evitare conflitti

                    if (success) {
                        this.store.clients = responseData.clients;
                    }
                } catch (error) {
                    // Gestisce gli errori
                    console.error('Errore durante la chiamata API:', error);
                }
            }
        },
        async getOrder() {
            // Se clientId è presente eseguo la chiamata API
            if (this.store.clientId) {
                try {
                    // Eseguo la chiamata API
                    const response = await fetch(`${this.store.apiUrl}orders/${this.store.clientId}`);

                    // Converte la risposta in JSON
                    const data = await response.json();
                    const success = data.success;
                    const responseData = data.response; // Cambiato da "response" a "responseData" per evitare conflitti

                    if (success) {
                        this.store.orders = responseData.orders;
                    }
                } catch (error) {
                    // Gestisce gli errori
                    console.error('Errore durante la chiamata API:', error);
                }
            }
        },
        // PreventDefault per evitare che la pagina ricarichi con l'invio del form
        handleSubmit(event) {
            event.preventDefault();
        },
    },
    created() {
        this.store.clientId = sessionStorage.getItem("ClientId");
    },
    mounted() {
        if (sessionStorage.length === 0) {
            this.store.currentStep = 1;
        }
    },
    updated() {
        // Se c'e' un popup attivo e quindi activePopup e' true allora aggiungo al body la classe active-popup che mi permette di bloccare all'utente ogni interazione con il body se non con il popup
        if (this.store.activePopup) {
            document.body.classList.add('active-popup');
            //document.body.classList.remove("active-edit");
        }
        // Altrimenti rimuovo la classe
        else {
            document.body.classList.remove('active-popup');
        }

        // Se il messaggio d'errore e' presente rimuovo la classe dal body
        if (this.store.showError) {
            document.body.classList.remove('active-popup');

            // Non c'e' un popup attivo quindi metto activePopup a false
            this.store.activePopup = false;
        }
    }
}
</script>

<template>
    <div class="popup" v-if="store.showPopupExitRoutePreventivo">
        <p>
            Sei sicuro di voler abbandonare la pagina?
        </p>

        <p>
            Tutti i dati inseriti verranno eliminati.
        </p>

        <button @click="store.showPopupExitRoutePreventivo = false, store.activePopup = false">
            Annulla
        </button>

        <button @click="changeRoute">
            Conferma
        </button>
    </div>

    <section class="thank-you"
        :class="{ 'not-step': store.currentStep !== 4, 'error-step-bottom': store.currentStep === 1 || !store.clientId }, bgClass">

        <img src="/img/sfondi-e-logo/sfondo-ringraziamento.jpg" alt="Immagine Ringraziamento" class="image"
            loading="lazy" @load="onImageLoad" v-if="store.currentStep == 4">

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

            <!-- 
                v-if="store.currentStep === 1 || store.currentStep > 1 && store.clientId" -->

            <div v-if="store.currentStep === 1 || store.currentStep > 1 && store.clientId">
                <div class="top" :class="{ 'none': store.currentStep > 3 }">
                    <h1>
                        Fai il Preventivo
                    </h1>

                    <!-- Cerchi degli step -->
                    <div class="top-right">
                        <div class="steps-circles">
                            <div class="circle" :class="{ 'current': store.currentStep === 1 }">1</div>
                            <hr>
                            <div class="circle" :class="{ 'current': store.currentStep === 2 }">2</div>
                            <hr>
                            <div class="circle" :class="{ 'current': store.currentStep === 3 }">3</div>
                        </div>

                        <!-- Scritte sotto ai cerchi -->
                        <div class="steps-text" :class="{ 'none': store.currentStep > 3 }">
                            <div class="step">
                                <div class="step-one">
                                    Compila i dati <span>personali</span>
                                </div>
                                <div class="step-two">
                                    Compila il form per inviare il preventivo
                                </div>
                                <div class="step-three">
                                    Clicca <span>conferma</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div v-else class="error-step">
                Si è verificato un errore.
            </div>

            <!-- Inizio form -->
            <div class="bottom">

                <form @submit="handleSubmit">
                    <!-- Inizio step 1 -->
                    <PrimoStepPreventivo :getClient="getClient" v-if="store.currentStep === 1" />

                    <SecondoStepPreventivo :getClient="getClient" :getOrder="getOrder"
                        v-else-if="store.currentStep === 2 && store.clientId" />

                    <TerzoStepPreventivo :getClient="getClient" :getOrder="getOrder"
                        v-else-if="store.currentStep === 3 && store.clientId" />

                    <QuartoStepPreventivo v-if="store.currentStep === 4 && store.clientId" />

                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.error-step {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: red;
    min-height: 147px;
    margin-top: 60px;
}

// Inizio sezione
section {
    background-color: #686868;
    min-height: calc(100vh - 312px);

    &.error-step-bottom {
        min-height: auto;
    }

    // Immagine di sfondo temporanea e sfocata che appare fino a quando l'immagine vera non ha caricato completamente
    &.thank-you {
        background-image: url('/img/sfondi-e-logo/ringraziamento-sfoc.jpg');
        background-size: cover;
        position: relative;

        .image {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        &.loaded {
            .image {
                opacity: 1;
            }
        }

        &.not-step {
            background-image: none;
        }
    }
}

.section-title {
    a {
        color: #fff;
    }
}


// CSS FORM, INPUT, TEXTAREA ECC.
.bottom {
    color: #000;
    letter-spacing: 1px;
    padding: 40px 0;

    input,
    label,
    textarea,
    button,
    select {
        font-family: 'Montserrat', sans-serif;
        letter-spacing: 1px;
    }

    .form-button {

        button,
        input {
            background-color: $yellow-color;
            padding: 10px 50px;
            border: 0;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
        }
    }
}

.container {
    color: #fff;
    padding-bottom: 20px;

    .top {
        display: flex;
        text-align: center;
        justify-content: space-between;
        align-items: flex-start;
        max-width: 700px;
        margin: 0 auto;
        padding-top: 40px;
        flex-wrap: wrap;

        .top-right {
            width: 50%;
        }

        &.none {
            display: none;
        }

        h1 {
            font-size: 2rem;
            text-align: left;
            padding-top: 15px;
        }

        .steps-circles {
            display: flex;
            //justify-content: space-between;
            align-items: center;
            font-size: 1.8rem;

            hr {
                width: 70px;
                border: 2px solid #fff;
            }

            .circle {
                border: 3px solid #fff;
                border-radius: 50%;
                min-width: 70px;
                height: 70px;
                line-height: 70px;
                font-weight: 500;

                &.current {
                    background-color: $yellow-color;
                    color: #000;
                }
            }
        }
    }

    .steps-text {
        /* max-width: 700px;
        margin: 0 auto;
        text-align: center; */
        padding-top: 15px;

        &.none {
            display: none;
        }

        .step {
            display: flex;
            justify-content: space-between;
            //gap: 56px;
            //margin-left: auto;
            //width: 350px;

            .step-one {
                position: relative;
                left: -10px;
            }

            /*.step-three {
                left: 25px;
            } */

            /* .step-three {
                span {
                    display: block;
                }
            } */

            .step-two {
                margin-left: 15px;
                margin-right: 30px;
            }

            .step-one,
            .step-two,
            .step-three {
                //min-width: 70px;
                //position: relative;
                font-weight: 500;
                font-size: 0.8rem;
                //min-width: calc(100% / 3 - 20px);
            }
        }
    }
}


@media only screen and (min-width: 600px) and (max-width: 700px) {
    .container {
        .steps-text {

            .step {
                gap: 170px;
                //margin-left: 0;
                width: 100%;
            }
        }
    }
}





@media only screen and (min-width: 520px) and (max-width: 600px) {

    .container {
        .steps-text {

            .step {
                gap: 140px;
                //margin-left: 0;
                width: 100%;

                .step-one,
                .step-two,
                .step-three {
                    width: calc(100% / 3);
                }

                .step-one {
                    /* left: -10%; */

                    span {
                        display: block;
                    }

                }

                .step-three {
                    /*  left: 10%; */

                    span {
                        display: block;
                    }

                }

            }
        }
    }
}

// DEVO MODIFICARE QUI

@media only screen and (min-width: 400px) and (max-width: 520px) {

    .container {
        .steps-text {

            .step {
                //margin-left: 0;
                gap: 80px;
                width: 100%;

                .step-one,
                .step-two,
                .step-three {
                    width: calc(100% / 3);
                }

                .step-one {
                    /* left: -8%; */

                    span {
                        display: block;
                    }

                }

                .step-three {
                    /* left: 8%; */

                    span {
                        display: block;
                    }

                }

            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 580px) {
    .popup {
        width: 90%;
        height: 250px;

        h6 {
            font-size: 1rem;
            padding: 10px 0;
            width: 100%;
        }

        span {
            font-size: 0.9rem;
        }

        a {
            margin-top: 10px;
        }
    }
}


@media only screen and (min-width: 300px) and (max-width: 400px) {
    .container {
        .steps-text {

            .step {
                gap: 20px;
            }
        }
    }

}


@media only screen and (min-width: 300px) and (max-width: 700px) {
    .container {
        .top {
            flex-wrap: wrap;
            gap: 50px 0;

            .top-right {
                width: 100%;
            }

            h1 {
                text-align: left;

            }

            .steps-circles {
                width: 100%;

                hr {
                    width: calc(100% / 3);
                }

            }
        }

        .steps-text {

            .step {
                .step-two {
                    margin-left: 0;
                    margin-right: 0;
                }

                .step-one {
                    left: 0;
                }
            }
        }
    }
}


@media only screen and (min-width: 700px) and (max-width: 840px) {
    .first-step-right {

        input[type="submit"] {
            width: 100%;
            padding: 10px 0;
        }
    }
}
</style>
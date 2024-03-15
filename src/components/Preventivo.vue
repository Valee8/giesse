<script>

// Imposto store
import { store } from '../store.js';

import PrimoStepPreventivo from './PrimoStepPreventivo.vue';

import SecondoStepPreventivo from './SecondoStepPreventivo.vue';

import TerzoStepPreventivo from './TerzoStepPreventivo.vue';

import QuartoStepPreventivo from './QuartoStepPreventivo.vue';

// Importo axios
import axios from 'axios';

export default {
    name: 'Preventivo',
    components: {
        PrimoStepPreventivo,
        SecondoStepPreventivo,
        TerzoStepPreventivo,
        QuartoStepPreventivo
    },
    data() {
        return {
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
        changeRoute() {
            this.store.showPopupExitRoutePreventivo = false;
            this.store.activePopup = false;
            this.store.changeRoute = true;

            this.$router.push(this.store.linkRoute);
        },
        // getClient per ottenere i dati dei clienti
        getClient() {
            // Se clientId e' presente eseguo la chiama API
            if (this.store.clientId) {
                axios.get(this.store.apiUrl + 'clients/' + this.store.clientId, {
                    headers: {
                        'ngrok-skip-browser-warning': 'skip-browser-warning'
                    }
                })
                    .then(res => {
                        const data = res.data;
                        const success = data.success;
                        const response = data.response;

                        if (success) {
                            this.store.clients = response.clients;
                        }

                    })
                    .catch(error => console.error(error));
            }
        },
        getOrder() {
            // Se clientId e' presente eseguo la chiama API
            if (this.store.clientId) {
                axios.get(this.store.apiUrl + 'orders/' + this.store.clientId, {
                    headers: {
                        'ngrok-skip-browser-warning': 'skip-browser-warning'
                    }
                })
                    .then(res => {
                        const data = res.data;
                        const success = data.success;
                        const response = data.response;

                        if (success) {
                            this.store.orders = response.orders;
                        }

                    })
                    .catch(error => console.error(error));
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
        <span>
            Sei sicuro di voler abbandonare la pagina&quest;
            <br> <br>
            Tutti i dati inseriti verranno eliminati.
        </span>

        <button @click="store.showPopupExitRoutePreventivo = false, store.activePopup = false">
            Annulla
        </button>

        <button @click="changeRoute">
            Conferma
        </button>


    </div>

    <section class="thank-you" :class="{ 'not-step': store.currentStep !== 4 }">

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

            <div class="top" :class="{ 'none': store.currentStep > 3 }">
                <h1>
                    Fai il <div>Preventivo</div>
                </h1>

                <!-- Cerchi degli step -->
                <div class="steps-circles">
                    <div class="circle" :class="{ 'current': store.currentStep === 1 }">1</div>
                    <hr>
                    <div class="circle" :class="{ 'current': store.currentStep === 2 }">2</div>
                    <hr>
                    <div class="circle" :class="{ 'current': store.currentStep === 3 }">3</div>
                </div>
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

            <!-- Inizio form -->
            <div class="bottom">

                <form @submit="handleSubmit">
                    <!-- Inizio step 1 -->
                    <PrimoStepPreventivo :getClient="getClient" v-if="store.currentStep === 1" />

                    <SecondoStepPreventivo :getClient="getClient" :getOrder="getOrder"
                        v-else-if="store.currentStep === 2" />

                    <TerzoStepPreventivo :getClient="getClient" :getOrder="getOrder"
                        v-else-if="store.currentStep === 3" />

                    <QuartoStepPreventivo v-else />

                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.popup {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    width: 400px;
    padding: 20px 40px;
    height: 250px;
    position: fixed;
    left: 50%;
    z-index: 200;
    color: #000;
    border-radius: 5px;
    box-shadow: 0 3px 2px rgba(0, 0, 0, .1);
    animation: opacity 1s ease;
    transform: translate(-50%, -50%);
    top: 50%;

    span {
        text-align: center;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        height: 100%;

        &:last-child {
            font-weight: bold;
        }
    }

    &.id {
        z-index: 300;
    }

    h6 {
        font-size: 1.1rem;
    }

    a,
    button {
        background-color: #686868;
        color: #fff;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        margin: 0 3px;
        font-size: 1rem;
        border: 0;
        font-weight: 600;
    }

    a {
        font-weight: normal;
    }

}


// Inizio sezione
section {
    background-color: #686868;
    min-height: calc(100vh - 312px);

    // Immagine di sfondo temporanea e sfocata che appare fino a quando l'immagine vera non ha caricato completamente
    &.thank-you {
        background-image: url('/img/sfondi-e-logo/sfondo-ringraziamento.webp');
        background-size: cover;
        position: relative;

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
        align-items: center;
        gap: 50px;
        max-width: 700px;
        margin: 0 auto;
        padding-top: 40px;

        &.none {
            display: none;
        }

        h1 {
            font-size: 2rem;
            text-align: left;
        }

        .steps-circles {
            display: flex;
            justify-content: space-between;
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
        max-width: 700px;
        margin: 0 auto;
        text-align: center;
        padding-top: 15px;

        &.none {
            display: none;
        }

        .step {
            display: flex;
            margin-left: auto;
            width: 350px;

            .step-one {
                left: -25px;
            }

            .step-three {
                left: 25px;
            }


            .step-one,
            .step-two,
            .step-three {
                min-width: calc(100% / 3);
                position: relative;
                font-weight: 500;
                font-size: 0.8rem;
            }
        }
    }
}




@media only screen and (min-width: 520px) and (max-width: 700px) {

    .container {
        .steps-text {

            .step {
                margin-left: 0;
                width: 100%;

                .step-one,
                .step-two,
                .step-three {
                    width: calc(100% / 3);
                }

                .step-one {
                    left: -10%;

                    span {
                        display: block;
                    }

                }

                .step-three {
                    left: 10%;

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
                margin-left: 0;
                width: 100%;

                .step-one,
                .step-two,
                .step-three {
                    width: calc(100% / 3);
                }

                .step-one {
                    left: -8%;

                    span {
                        display: block;
                    }

                }

                .step-three {
                    left: 8%;

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
                .step-one {
                    left: -10px;

                }

                .step-three {
                    left: 10px;

                }
            }
        }
    }

}


@media only screen and (min-width: 300px) and (max-width: 700px) {
    .container {
        .top {
            flex-wrap: wrap;

            h1 {
                text-align: center;

                div {
                    display: inline-block;
                }

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
                width: 100%;
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
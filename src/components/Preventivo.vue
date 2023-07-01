<script>

import { store } from '../store.js';

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/';

export default {
    name: 'Preventivo',
    data() {
        return {
            fixRequiredProblem: false,
            secondStepValid: false,
            store,
            currentStep: 1,
            enableButton: false,
            newClient: {
                typology: "",
                name: "",
                surname: "",
                agency_name: "",
                email: "",
                telephone_number: "",
                city_of_residence: ""
            },
            newOrder: {
                id: "",
                model_name: "",
                width: "",
                height: "",
                quantity: "",
                net: "",
                color_name: "",
                color_image: "",
                message: ""
            },
            clients: [],
            orders: [],
            ids: [],
            zanzs: [
                {
                    name: "Verticali a molla classica",
                    image: "/img/alba.png",
                    active: true,
                    models: [
                        "ALBA (guida telescopica, con cuffie)",
                        "SONIA (guida telescopica, senza cuffie)",
                        "GENNY (guida telescopica, cassonetto da 40mm)",
                        "GIUSY (guida singola, con cuffie)",
                        "ELENA (guida singola, senza cuffie)",
                        "EDDI (guida singola, cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Verticali a molla (cricchetto)",
                    image: "/img/laura.png",
                    active: false,
                    models: [
                        "LAURA (con cuffie)",
                        "EVA (senza cuffie)",
                        "ASIA (cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Verticali a catena classica",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "KATIA (guida telesopica, con cuffie)",
                        "VERA (guida telescopica, senza cuffie)",
                        "SARA (guida singola, senza cuffie)"
                    ]
                },
                {
                    name: "Verticali a catena + molla",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "GIADA (con cuffie)",
                        "MERI (senza cuffie)"
                    ]
                },
                {
                    name: "Laterali a molla classica",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "TIPO ALBA (con cuffie)",
                        "TIPO SONIA (senza cuffie)",
                        "TIPO GENNY (cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Laterali a molla (guida bassa da 2cm)",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "LARA (con cuffie)",
                        "VALERIA (senza cuffie)",
                        "DESI (cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Laterale a molla (guida bassa da 14mm)",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "LUNA",
                    ]
                },
                {
                    name: "Laterale a molla (guida bassa da 3mm)",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "ZELIG",
                    ]
                },
                {
                    name: "Laterale Frizionata",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "JOLLY",
                    ]
                },
                {
                    name: "Laterale Antivento",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "BORA",
                    ]
                },
                {
                    name: "Laterale Plissettata",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "PLISSE' 22",
                    ]
                },
                {
                    name: "Porta a battente",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "ANTAREX",
                    ]
                },
                {
                    name: "A pannelli scorrevoli",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "SCORRI",
                    ]
                },
                {
                    name: "Telaio fisso",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "FISSA",
                    ]
                },
                {
                    name: "Incasso con guida da 50x35",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "CASPER",
                    ]
                }
            ],
            nets: [
                "Rete normale",
                "Rete rigata",
                "Oscurante bianco",
                "Oscurante nero",
            ]
        }
    },
    computed: {
        firstStepValid() {
            if (this.newClient.email.trim() !== "" && this.newClient.email.includes("@") && this.newClient.telephone_number.trim() !== "" && this.newClient.city_of_residence.trim() !== "") {
                this.enableButton = true;
            }

            if (this.newClient.typology === "Privato") {
                if (this.newClient.name.trim() !== "" && this.newClient.surname.trim() !== "" && this.enableButton) {
                    return true;
                }
            }
            else if (this.newClient.typology === "Azienda" && this.enableButton) {
                return this.newClient.agency_name.trim() !== "";
            }
            // else {
            //     return false;
            // }
        },
        printNameSection() {
            for (let i = 0; i < store.linksNav.length; i++) {
                if (i === 0)
                    return store.linksNav[i].text;
            }

            // if (this.currentStep === 4) {
            //     return "Grazie per il preventivo"
            // }
        }
    },
    methods: {
        sliderNext(index) {

            this.selectedModel = "";

            if (index < this.zanzs.length - 1) {
                index++;
            }
            else {
                index = 0;
            }

            this.typology = this.zanzs[index].name;

            this.zanzs[index].active = true;

            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

        },
        sliderPrev(index) {

            this.selectedModel = "";

            if (index <= this.zanzs.length - 1 && index > 0) {
                index--;
            }
            else {
                index = this.zanzs.length - 1;
            }

            this.typology = this.zanzs[index].name;

            this.zanzs[index].active = true;

            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

        },
        getClient() {
            axios.get(API_URL + 'clients')
                .then(res => {
                    const data = res.data;
                    const success = data.success;
                    const response = data.response;

                    if (success) {
                        this.clients = response.clients;
                    }

                })
                .catch(error => {
                    console.error(error);
                });
        },
        getOrder() {
            axios.get(API_URL + 'orders')
                .then(res => {
                    const data = res.data;
                    const success = data.success;
                    const response = data.response;

                    if (success) {
                        this.orders = response.orders;
                        this.ids = response.ids;
                    }

                })
                .catch(error => {
                    console.error(error);
                });
        },
        addZanz() {

            if (this.newOrder.model_name !== "" && this.newOrder.width !== "" && this.newOrder.height !== "" && this.newOrder.quantity !== 0 && this.newOrder.net !== "" && this.newOrder.color_name !== "") {

                this.fixRequiredProblem = false;

                this.secondStepValid = true;

                axios.post(API_URL + 'order/store', this.newOrder)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        if (success) {
                            this.getOrder();
                        }

                    })
                    .catch(error => console.log(error));

                this.newOrder.quantity = "";
                this.newOrder.width = "";
                this.newOrder.height = "";
                this.newOrder.color_name = "";
                this.newOrder.model_name = "";
                this.newOrder.net = "";
                //this.message = "";

                this.store.colors[0].active = true;

                for (let i = 0; i < this.store.colors.length; i++) {
                    if (i !== 0)
                        this.store.colors[i].active = false;
                }

                this.zanzs[0].active = true;

                for (let i = 0; i < this.zanzs.length; i++) {
                    if (i !== 0) {
                        this.zanzs[i].active = false;
                    }
                }
            }
            else {
                this.fixRequiredProblem = true;

            }
        },
        clientSubmit(event) {

            if (this.firstStepValid) {

                axios.post(API_URL + 'client/store', this.newClient)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        if (success) {
                            this.getClient();
                        }

                    })
                    .catch(error => console.log(error));

                event.preventDefault();

                this.currentStep++;

                localStorage.setItem("CurrentStep", this.currentStep.toString());

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                this.newClient.typology = "";
            }
        },
        resetCommonInputs() {
            if (this.newClient.typology) {
                this.newClient.name = "";
                this.newClient.surname = "";
                this.newClient.agency_name = "";
                this.newClient.email = "";
                this.newClient.telephone_number = "";
                this.newClient.city_of_residence = "";
            }
        },
        getColor(index, colorIndex) {
            for (let i = 0; i < store.colors.length; i++) {
                this.newOrder.color_image = store.colors[index].colorInfo[colorIndex].image;
                this.newOrder.color_name = store.colors[index].colorInfo[colorIndex].name;
            }
        },
        // Cambio colore cliccando il nome della tipologia
        changeColorTypology(index) {

            this.store.colors[index].active = true;

            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== index) {
                    this.store.colors[i].active = false;
                }
            }
        },
        deleteModel() {

            axios.get(API_URL + 'delete/' + this.ids)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    if (success) {
                        this.getOrder();
                    }
                })
                .catch(error => console.log(error));

        },
        filterCharacters() {
            this.newClient.telephone_number = this.newClient.telephone_number.replace(/\D/g, '');
        },
        filterNumbers() {
            this.newClient.name = this.newClient.name.replace(/[0-9]/g, '');
            this.newClient.surname = this.newClient.surname.replace(/[0-9]/g, '');
            this.newClient.city_of_residence = this.newClient.city_of_residence.replace(/[0-9]/g, '');
        },
        filterSizes() {
            this.newOrder.width = this.newOrder.width.replace(/^[a-zA-Z]*$/g, '');
            this.newOrder.height = this.newOrder.height.replace(/^[a-zA-Z]*$/g, '');
        },
        handleSubmit(event) {
            event.preventDefault();
        },
        complete(event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            this.currentStep++;

            localStorage.setItem("CurrentStep", this.currentStep.toString());

            axios.post(API_URL + 'truncate/client')
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                })
                .catch(error => console.log(error));

            axios.post(API_URL + 'truncate/order')
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                })
                .catch(error => console.log(error));

            // this.name = "";
            // this.surname = "";
            // this.agency_name = "";
            // this.email = "";
            // this.telephone = "";
            // this.city_of_residence = "";
        },
        nextStep(event) {

            if (this.currentStep === 2 && this.orders.length !== 0) {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                axios.post(API_URL + 'order/store', this.newOrder)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        data.response.orders[0].message = this.newOrder.message;

                        console.log(data.response.orders[0].message);

                        if (success) {
                            this.getOrder();
                        }

                    })
                    .catch(error => console.log(error));

                this.currentStep++;

                localStorage.setItem("CurrentStep", this.currentStep.toString());
            }
        },
        prevStep(event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            axios.post(API_URL + 'truncate/client')
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                })
                .catch(error => console.log(error));

            this.currentStep--;

            localStorage.setItem("CurrentStep", this.currentStep.toString());

        },
        plus() {

            axios.post(API_URL + 'increment/' + this.ids)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    if (success) {
                        this.getOrder();
                    }

                })
                .catch(error => console.log(error));
        },
        minus() {

            axios.post(API_URL + 'decrement/' + this.ids)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    if (success) {
                        this.getOrder();
                    }

                })
                .catch(error => console.log(error));
        }
    },
    mounted() {

        this.getClient();
        this.getOrder();

        if (this.newClient.typology === "") {
            this.newClient.typology = "Privato";
        }

        if (localStorage.getItem("CurrentStep") !== null) {
            this.currentStep = parseInt(localStorage.getItem("CurrentStep"), 10);
        }

        localStorage.setItem("CurrentStep", this.currentStep.toString());

        this.typology = this.zanzs[0].name;
    }
}
</script>

<template>
    <section :class="{ 'thank-you': currentStep === 4 }">
        <div class="container">

            <div class="section-title">
                <!-- Scritta Home -->
                <router-link to="/">Home</router-link>
                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                {{ printNameSection }}
            </div>

            <div class="top" :class="{ 'none': currentStep > 3 }">
                <h1>
                    Fai il <div>Preventivo</div>
                </h1>


                <!-- Cerchi degli step -->
                <div class="steps-circles">
                    <div class="circle" :class="{ 'current': currentStep === 1 }">1</div>
                    <hr>
                    <div class="circle" :class="{ 'current': currentStep === 2 }">2</div>
                    <hr>
                    <div class="circle" :class="{ 'current': currentStep === 3 }">3</div>
                </div>
            </div>

            <!-- Scritte sotto ai cerchi -->
            <div class="steps-text" :class="{ 'none': currentStep > 3 }">
                <div class="step">
                    <div>
                        Compila i dati personali
                    </div>
                    <div>
                        Compila il form per inviare il preventivo
                    </div>
                    <div>
                        Clicca conferma
                    </div>
                </div>
            </div>


            <!-- Inizio form -->
            <div class="bottom">

                <!-- Inizio step 1 -->
                <form @submit="handleSubmit" v-if="currentStep === 1" class="first-step">

                    <!-- Parte sinistra step 1 con gl input -->
                    <div class="first-step-left">
                        <div v-if="newClient.typology === 'Privato' || newClient.typology === ''">
                            <input type="text" v-model="newClient.name" placeholder="Nome *" @input="filterNumbers"
                                required>
                            <br>
                            <input type="text" v-model="newClient.surname" placeholder="Cognome *" @input="filterNumbers"
                                required>
                        </div>
                        <div v-else-if="newClient.typology === 'Azienda'">
                            <input type="text" v-model="newClient.agency_name" placeholder="Nome Azienda *" required>
                        </div>
                        <div>
                            <input type="email" v-model="newClient.email" placeholder="E-mail *" required>
                            <br>
                            <input type="text" v-model="newClient.telephone_number" placeholder="Telefono *" maxlength="10"
                                @input="filterCharacters" required>
                            <br>
                            <input type="text" v-model="newClient.city_of_residence" placeholder="Comune *"
                                @input="filterNumbers" required>

                            <div class="obligatory">
                                i cambi contrassegnati con &ast; sono obbligatori
                            </div>
                        </div>
                    </div>

                    <!-- Parte destra step 1 con gli input radio e il bottone completa i dati -->
                    <div class="first-step-right">
                        <div class="radios">
                            <label for="privato">
                                <input type="radio" id="privato" value="Privato" v-model="newClient.typology"
                                    @change="resetCommonInputs"
                                    :checked="newClient.typology === '' || newClient.typology === 'Privato'">
                                Privato
                            </label>

                            <label for="azienda">
                                <input type="radio" id="azienda" value="Azienda" v-model="newClient.typology"
                                    @change="resetCommonInputs">
                                Azienda
                            </label>
                        </div>

                        <div class="form-button">
                            <input type="submit" @click="clientSubmit" class="button" value="Completa i dati">
                            <!-- <button v-if="infoList.length === 1" @click="nextStep">Completa i dati</button> -->
                        </div>

                    </div>
                </form>


                <!-- @submit="handleSubmit" -->
                <!-- Inizio step 2 -->
                <form @submit="handleSubmit" v-else-if="currentStep === 2" class="second-step">

                    <h2>
                        Seleziona il Modello
                    </h2>

                    <!-- Parte sopra - slider -->
                    <div class="inputs-top">
                        <div class="slider-preventivo" v-for="(zanz, index) in zanzs" :key="index"
                            :class="{ 'active': zanz.active }">

                            <div class="arrows-image">
                                <div class="zanz-image">
                                    <img :src="zanz.image" :alt="zanz.name">
                                </div>

                                <!-- Icona freccia indietro -->
                                <a class="arrow left" @click="sliderPrev(index)">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </a>

                                <!-- Icona freccia avanti -->
                                <a class="arrow right" @click="sliderNext(index)">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>

                            <h3>
                                {{ zanz.name }}
                            </h3>
                        </div>

                        <!-- Seleziona modello -->
                        <span v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex">
                            <select v-if="zanz.active" :required="fixRequiredProblem" v-model="newOrder.model_name">
                                <option value="" disabled selected hidden>
                                    Seleziona il modello *
                                </option>
                                <option v-for="(nameModel, index) in zanz.models" :value="nameModel" :key="index">
                                    {{ nameModel }}</option>
                            </select>
                        </span>
                    </div>


                    <!-- Input centrale - Larghezza, altezza e quantita -->
                    <div class="inputs-center">
                        <label for="inputs">Inserisci: </label>
                        <span id="inputs">
                            <input type="text" name="width" placeholder="Larghezza (in cm) *" v-model="newOrder.width"
                                @input="filterSizes" :required="fixRequiredProblem">

                            <input type="text" name="height" placeholder="Altezza (in cm) *" v-model="newOrder.height"
                                @input="filterSizes" :required="fixRequiredProblem">

                            <input type="number" name="quantity" placeholder="Quantità *" min="1"
                                v-model="newOrder.quantity" :required="fixRequiredProblem">
                        </span>
                    </div>

                    <!-- Input sotto - input radio scelta rete -->
                    <div class="inputs-bottom">
                        <label v-for="(net, index) in nets" :key="index">
                            {{ net }}
                            <input type="radio" name="net" :value="net" v-model="newOrder.net"
                                :required="fixRequiredProblem">
                        </label>
                    </div>

                    <!-- Bordo separazione -->
                    <hr>

                    <!-- Parte scelta colori -->
                    <h2>
                        Seleziona il Colore
                    </h2>

                    <!-- Tipologia colori -->
                    <div class="color-choice">
                        <div class="list-typologies">
                            <div v-for="(typo, index) in store.colors" :key="index" class="typologies">
                                <div @click="changeColorTypology(index)" class="typology-name"
                                    :class="{ 'selected': typo.active }">
                                    {{ typo.typology }}
                                </div>
                            </div>
                        </div>

                        <!-- Nomi e immagini colori - parte sotto -->
                        <div class="list-colors" v-for="(typo, index) in store.colors" :key="index"
                            :class="{ 'selected': typo.active }">
                            <div class="colors" :class="typo.typology.toLowerCase()" v-if="typo.active">
                                <label v-for="(color, colorIndex) in typo.colorInfo" :key="colorIndex" class="color">
                                    <input type="radio" name="color" @click="getColor(index, colorIndex)"
                                        :required="fixRequiredProblem">
                                    <!-- Immagine colore -->
                                    <img :src="color.image" :alt="color.name" class="color-image">

                                    <!-- Nome colore -->
                                    <div class="color-name">
                                        {{ color.name }}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Bottone aggiungi zanzariera -->
                    <div class="form-button">

                        <button @click="addZanz()" class="button">
                            Aggiungi Zanzariera
                        </button>
                    </div>

                    <!-- Elenco zanzariere preventivo -->
                    <ul v-if="orders.length !== 0" class="list-ul">
                        <li v-for="(order, index) in orders" :key="index" class="list-order">
                            <span>
                                {{ typology.replace(/\([^)]*\)/g, "") }} | {{ order.model_name.charAt(0).toUpperCase() +
                                    order.model_name.slice(1).toLowerCase().replace(/\([^)]*\)/g, "") }} | {{ order.net }} |
                                <img :src="order.color_image" :alt="order.color_name" class="order-image">
                            </span>
                            <span class="quantity">
                                <div class="text">
                                    Quantit&agrave;:
                                    <span class="number">
                                        {{ order.quantity }}
                                    </span>
                                </div>
                                <div class="minus-plus">
                                    <button @click="plus">
                                        <i class="fa-solid fa-angle-up"></i>
                                    </button>
                                    <button @click="minus">
                                        <i class="fa-solid fa-angle-down"></i>
                                    </button>
                                </div>
                            </span>

                            <span>
                                {{ order.width }} cm x {{ order.height }} cm
                            </span>

                            <button @click="deleteModel" class="delete">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </li>
                    </ul>

                    <!-- Textarea -->
                    <div class="textarea">
                        <textarea v-model="newOrder.message" rows="8" placeholder="Messaggio"></textarea>
                    </div>

                    <!-- Bottone per passare allo step successivo -->
                    <div class="form-button confirm">
                        <button @click="prevStep" class="button" id="buttons">Torna indietro</button>
                        <input type="submit" @click="nextStep" class="button" id="buttons" v-if="orders.length !== 0"
                            value="Conferma le zanzariere">
                    </div>

                </form>

                <!-- Inizio terzo step -->
                <form action="" v-else-if="currentStep === 3" class="third-step">
                    <h2>
                        Ecco a te il riepilogo
                    </h2>

                    <ul v-for="(list, index) in clients" :key="index" class="summary info">
                        <li>
                            {{ list.typology }}
                            <hr>
                        </li>
                        <div v-if="list.typology === 'Privato'">
                            <li>
                                Nome: {{ list.name }}
                            </li>
                            <li>
                                Cognome: {{ list.surname }}
                            </li>
                        </div>
                        <li v-else>
                            Nome Azienda: {{ list.agency_name }}
                        </li>
                        <li>
                            Email: {{ list.email }}
                        </li>
                        <li>
                            Telefono: {{ list.telephone_number }}
                        </li>
                        <li>
                            Comune: {{ list.city_of_residence }}
                        </li>
                    </ul>

                    <ul v-for="(order, index) in orders" :key="index" class="summary">
                        <li>
                            Modello zanzariera: {{ order.model_name.charAt(0).toUpperCase() +
                                order.model_name.slice(1).toLowerCase().replace(/\([^)]*\)/g, "") }} - {{ order.net }}
                        </li>
                        <li>
                            Colore: {{ order.color_name }}
                        </li>
                        <li>
                            Quantit&agrave;: {{ order.quantity }}
                        </li>

                        <li>
                            Misure: {{ order.width }}cm x {{ order.height }}cm
                        </li>
                    </ul>

                    <div>
                        Messaggio:
                        <span v-if="newOrder.message">{{ newOrder.message }}</span>
                        <span v-else>Non hai scritto nessun messaggio</span>
                    </div>


                    <div class="form-button">
                        <button @click="complete" class="button" id="buttons">Completa</button>
                    </div>
                </form>

                <div v-else class="fourth-step">
                    <h1>
                        <div class="first">
                            <div>Grazie</div> per aver scelto la qualit&agrave; <div>con un preventivo</div>
                        </div>
                        <div class="second">
                            <div>La <span>Giesse Zanzariere</span> ti contatter&agrave;</div>
                            <div>il prima possibile</div>
                        </div>
                        <div class="third">Tutte le informazioni sono state inviate per email</div>
                        <router-link to="/" class="button">Torna alla Homepage</router-link>
                    </h1>
                </div>
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;


section {
    background-color: #686868;
    min-height: calc(100vh - 312px);

    &.thank-you {
        background-image: url('/img/sfondo-ringraziamento.png');
        background-size: cover;
    }
}

.section-title {
    a {
        color: #fff;
    }
}

// QUARTO STEP, parte ringraziamenti
.thank-you {
    //background-image: url('/img/sfondo-ringraziamento.png');

    //min-height: 1000px;

    .bottom {
        //padding-top: 50px;
        color: #fff;
        font-size: 2rem;
        padding: 80px 0;

        h1 {
            font-weight: 500;

            .first {
                font-size: 1.3em;
                padding: 5px 0;
                font-weight: 600;
            }

            .second {
                font-size: 0.7em;
                padding: 10px 0 25px 0;
            }

            .third {
                font-size: 0.4em;
            }
        }

        span {
            color: $yellow-color;
        }
    }

    .fourth-step {
        text-align: center;
    }

}


// TERZO STEP
.third-step {
    background-color: #ADADAD;
    padding-top: 20px;
    margin: 50px 0;

    h2 {
        padding-bottom: 30px;
        text-align: center;
    }

    .summary {
        background-color: #d9d9d9;
        padding: 20px;
        max-width: 700px;
        margin: 0 auto 30px auto;

        &:not(.info) {
            div {
                padding: 5px 0;
            }
        }

        li {
            padding: 5px 0;

            hr {
                margin-top: 10px;
                width: 250px;
                border-top: 1px solid #000;
            }
        }
    }

    .form-button {
        text-align: center;
        position: relative;
        bottom: -22px;
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
    input,
    button {
        letter-spacing: 1px;
    }

    .form-button {
        //padding-top: 50px;

        button,
        input {
            //background-color: $yellow-color;
            padding: 10px 50px;
            border: 0;
            //color: #000;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
        }
    }
}

// SECONDO STEP
.second-step {
    background-color: #adadad;
    max-width: 1070px;
    margin: 0 auto;
    text-align: center;
    padding: 80px 40px 40px 40px;

    hr {
        margin: 60px auto;
        border-bottom: 1px solid #000;
        width: 850px;
    }

    .slider-preventivo {
        max-width: 600px;
        height: 314px;
        margin: 0 auto;
        user-select: none;
        transition: all 500ms ease;

        .arrows-image {
            position: relative;
            max-width: 500px;
            margin: 0 auto;

            .zanz-image {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 4px solid $yellow-color;
                //box-shadow: inset 0 8px 0 rgba(0, 0, 0, .05);
                border-radius: 50%;
                margin: 0 auto;
                width: 200px;
                height: 200px;
                background-color: #eaeaea;

                img {
                    width: 90px;
                    height: 110px;
                }
            }
        }

        h2 {
            padding: 20px 0 60px 0;
        }

        h3 {
            padding: 40px 0;
        }

        &:not(.active) {
            display: none;
        }

        .arrow {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            background-color: #e9e9e9;
            padding: 2px 8px;
            border-radius: 50px;

            &.left {
                left: 0;
            }

            &.right {
                right: 0;
            }
        }
    }

    .list-ul {
        border: 1px solid #000;
        margin: 40px 0;

        .list-order {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .quantity {
                padding: 0 10px;
                display: flex;
                align-items: center;
                gap: 10px;

                .text {
                    padding: 10px 0;
                }

                .number {
                    display: inline-block;
                    padding: 0;
                    margin: 0;
                    width: 20px;
                }

                .minus-plus {

                    button {
                        display: block;
                        background-color: #d6d6d6;
                        padding: 1px 2px;
                        border-radius: 50px;
                        border: 0;
                        font-size: 0.6rem;
                        margin: 6px 0;
                        cursor: pointer;
                    }
                }

            }

            span,
            .delete {
                background-color: #fff;
                padding: 10px;
                border-radius: 15px;
                font-size: 1rem;
                font-weight: 500;
                margin: 0 8px;
            }

            .delete {
                cursor: pointer;
                border-radius: 50px;
                padding: 8px 10px;
                border: 0;
                color: #912020;
            }

            .order-image {
                width: 30px;
                height: 30px;
                border-radius: 50px;
                vertical-align: middle;
                border: 2px solid #000;
            }
        }
    }

    .form-button {
        padding-top: 10px;

        &.confirm {
            position: relative;
            bottom: -62px;

            button {
                border-radius: 0;
            }
        }

        button {
            padding: 10px 15px;
        }
    }

    .textarea {
        padding-top: 60px;

        textarea {
            font-family: 'Montserrat', sans-serif;
            width: 100%;
            padding: 15px;
            font-size: 0.9rem;
            border: 0;
            color: #b9b9b9;
            font-weight: 500;
            outline: none;
        }

        ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #b9b9b9;
            opacity: 1;
            /* Firefox */
        }

        :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #b9b9b9;
        }

        ::-ms-input-placeholder {
            /* Microsoft Edge */
            color: #b9b9b9;
        }
    }


    select {
        font-family: 'Montserrat', sans-serif;
        border-radius: 50px;
        border: 2px solid $yellow-color;
        box-shadow: inset 0 3px 0 rgba(0, 0, 0, .1);
        background-color: #cccccc;
        outline: none;
        padding: 7px 10px;
        font-size: 0.9rem;
        margin: 0 10px;
        width: 430px;
    }

    .inputs-bottom {
        label {
            background-color: #cccccc;
            padding: 8px 10px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 500;

            input {
                margin-left: 10px;
            }
        }
    }

    .inputs-center,
    .inputs-bottom {
        padding-top: 60px;
    }

    .inputs-center {
        input {
            width: 190px;
        }

        input:nth-child(3) {
            width: 130px;
        }
    }

    .inputs-top {
        padding-top: 30px;
    }

    .inputs-top,
    .inputs-center {
        input {
            margin: 0 20px;
        }

        label {
            font-weight: 500;
        }
    }

    .inputs-bottom {
        label {
            margin: 0 20px;
        }

        input {
            vertical-align: middle;
            accent-color: #000;
        }
    }

    input {
        font-family: 'Montserrat', sans-serif;
        background-color: #cccccc;
        border: 0;
        border-radius: 50px;
        padding: 8px 10px;
        font-size: 0.9rem;
        color: #000;
        outline: none;
    }

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #000;
        opacity: 1;
        /* Firefox */
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #000;
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #000;
    }

    .form-button {
        button {
            border-radius: 10px;
            margin: 0 10px;
        }
    }
}


// PRIMO STEP
.first-step {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #adadad;
    max-width: 890px;
    margin: 0 auto;
    padding: 40px;

    hr {
        border-bottom: 1px solid #000;
        margin: 60px 0;
    }

    .first-step-left {
        height: 292px;

        input[type] {
            margin: 6px 0;
            background: #fff;
            width: 280px;
            padding: 6px 12px 20px 12px;
            border: 0;
            font-size: 0.9rem;
            font-family: 'Montserrat', sans-serif;
            outline: none;
            color: #000;
        }

        .obligatory {
            font-size: 0.6rem;
            font-weight: bold;
            padding-top: 10px;
        }
    }

    .first-step-right {
        display: flex;
        flex-direction: column;
        width: 40%;

        input[type='submit'] {
            position: relative;
            top: -21px;
        }

        input[type='radio'] {
            accent-color: #000;
            width: 20px;
            height: 20px;
            vertical-align: middle;

        }

        label {
            display: block;
            text-align: left;
            margin: 8px 0;
            font-weight: 500;
            font-size: 1.1rem;
        }

        .radios {
            flex-grow: 1;
        }

    }

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #b9b9b9;
        font-weight: 500;
        opacity: 1;
        /* Firefox */
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #b9b9b9;
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #b9b9b9;
    }

}

.container {
    color: #fff;
    padding-bottom: 20px;
    //max-width: 550px;

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
                border-radius: 50px;
                width: 70px;
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
            width: 345px;

            div {
                width: calc(100% / 3);
                position: relative;
                font-weight: 500;
                font-size: 0.8rem;

                &:first-child {
                    left: -25px;
                }


                &:last-child {
                    left: 25px;
                }
            }
        }
    }
}


// PARTE COLORI SECONDO STEP
.list-typologies {
    display: flex;
    justify-content: center;
    gap: 40px;
    //padding: 20px 0;
    padding-bottom: 20px;

    // .typologies {
    //     padding: 0.1rem 0;
    //     border-bottom: 1px solid #fff;

    //     &:first-child {
    //         border-top: 1px solid #fff;
    //     }
    // }

    // Nome tipologia
    .typology-name {
        cursor: pointer;
        font-weight: 500;
        font-size: 1.4rem;
        border-radius: 50px;
        background-color: #cccccc;
        border: 2px solid transparent;
        padding: 5px 25px;
        //padding: 5px 0 5px 4px;

        &.selected {
            color: $yellow-color;
            border: 2px solid $yellow-color;
            box-shadow: inset 0 3px 0 rgba(0, 0, 0, .1), 0 3px 0 rgba(0, 0, 0, .3);
            //border-left: 4px solid $yellow-color;
            //padding-left: 0;
        }
    }
}

// Nomi e immagini colori - parte sotto
.list-colors {
    padding: 60px 0;
    //transition: all 1s ease;


    // &.selected {
    //     //height: auto;
    //     //opacity: 1;
    // }


    &:not(.selected) {
        display: none;
        //opacity: 0;
        //height: 0;
    }

    // Blocco intero colori
    .colors {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 150px 30px;
        color: #fff;
        font-size: 1rem;
        font-weight: 500;

        // Colore singolo
        .color {
            width: 180px;
            height: 180px;
            cursor: pointer;

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
                width: 180px;
                padding: 5px 6px;
                font-weight: 600;
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
                //border-bottom: 0;
            }
        }

    }

}

.color-choice {
    margin: 0 auto;
    //height: 450px;
    padding: 60px 20px;


    label {
        position: relative;

        [type=radio] {
            position: relative;
            top: 60px;
            z-index: 1;
            width: 1px;
            height: 1px;
        }
    }

    [type=radio]:checked+.color-image {
        border: 3px solid $yellow-color;
        //border-bottom: 0;
    }

    /* CHECKED STYLES */
    // [type=radio]:checked+.color-image+.color-name {
    //     border: 2px solid $yellow-color;
    //     border-top: 0;
    // }
}
</style>
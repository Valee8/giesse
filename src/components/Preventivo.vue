<script>

import { store } from '../store.js';

export default {
    name: 'Preventivo',
    data() {
        return {
            fixRequiredProblem: false,
            infoList: [],
            orderList: [],
            secondStepValid: false,
            store,
            currentStep: 1,
            selectedOption: "",
            name: "",
            newName: "",
            surname: "",
            agency_name: "",
            email: "",
            telephone: "",
            city_of_residence: "",
            enableButton: false,
            typology: "",
            quantity: "",
            width: "",
            height: "",
            colors: "",
            colorsName: "",
            selectedModel: "",
            choice: "",
            message: "",
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
            if (this.email.trim() !== '' && this.email.includes("@") && this.telephone.trim() !== '' && this.city_of_residence.trim() !== '') {
                this.enableButton = true;
            }

            if (this.selectedOption === '') {
                this.selectedOption = 'Privato';
            }

            if (this.selectedOption === 'Privato') {
                if (this.name.trim() !== '' && this.surname.trim() !== '' && this.enableButton) {
                    return true;
                }
            }
            else if (this.selectedOption === 'Azienda' && this.enableButton) {
                return this.agency_name.trim() !== '';
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
        addZanz() {

            if (this.selectedModel !== '' && this.width !== '' && this.height !== '' && this.quantity !== 0 && this.choice !== '' && this.colors !== '') {

                this.fixRequiredProblem = false;

                this.secondStepValid = true;

                let obj = {
                    models: this.selectedModel,
                    width: this.width,
                    height: this.height,
                    quantity: this.quantity,
                    choice: this.choice,
                    colors: this.colors,
                    colorsName: this.colorsName,
                    message: this.message
                }

                const existingData = localStorage.getItem("Preventivo");

                if (existingData) {
                    this.orderList = JSON.parse(existingData);
                }
                else {
                    this.orderList = [];
                }

                this.orderList.push(obj);

                localStorage.setItem("Preventivo", JSON.stringify(this.orderList));

                this.quantity = "";
                this.width = "";
                this.height = "";
                this.colors = "";
                this.colorsName = "";
                this.selectedModel = "";
                this.choice = "";
                this.message = "";

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
        nextStep() {
            if (this.currentStep === 1 && this.firstStepValid || this.currentStep === 2 && this.secondStepValid && this.orderList.length !== 0) {
                this.currentStep++;

                localStorage.setItem("CurrentStep", this.currentStep.toString());

            }

            let obj = {
                name: this.name,
                surname: this.surname,
                agency_name: this.agency_name,
                email: this.email,
                telephone: this.telephone,
                city_of_residence: this.city_of_residence,
                selection: this.selectedOption,
            }

            const existingData = localStorage.getItem("Info dati");

            if (existingData) {
                this.infoList = JSON.parse(existingData);
            }
            else {
                this.infoList = [];
            }

            if (this.currentStep === 2) {
                this.infoList.push(obj);

                localStorage.setItem("Info dati", JSON.stringify(this.infoList));
            }

            this.selectedOption == "";


            if (this.infoList.length > 1) {
                this.infoList.splice(0, 1);
                localStorage.setItem("Info dati", JSON.stringify(this.infoList));
            }

        },
        resetCommonInputs() {
            if (this.selectedOption) {
                this.name = "";
                this.surname = "";
                this.agency_name = "";
                this.email = "";
                this.telephone = "";
                this.city_of_residence = "";
            }
        },
        handleSubmit(event) {
            event.preventDefault();
        },
        getColor(index, colorIndex) {
            for (let i = 0; i < store.colors.length; i++) {
                this.colors = store.colors[index].colorInfo[colorIndex].image;
                this.colorsName = store.colors[index].colorInfo[colorIndex].name;
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
        deleteModel(index) {

            this.orderList.splice(index, 1);

            localStorage.setItem("Preventivo", JSON.stringify(this.orderList));

            if (this.orderList.length === 0) {
                localStorage.removeItem("Preventivo");
            }
        },
        filterCharacters() {
            this.telephone = this.telephone.replace(/\D/g, '');
        },
        filterNumbers() {
            this.name = this.name.replace(/[0-9]/g, '');
            this.surname = this.surname.replace(/[0-9]/g, '');
            this.city_of_residence = this.city_of_residence.replace(/[0-9]/g, '');
        },
        filterSizes() {
            this.width = this.width.replace(/^[a-zA-Z]*$/g, '');
            this.height = this.height.replace(/^[a-zA-Z]*$/g, '');
        },
        confirm() {
            //localStorage.clear();

            this.orderList.splice(0, this.orderList.length);

            //this.currentStep = 1;

            this.currentStep++;

            localStorage.setItem("CurrentStep", this.currentStep.toString());

            this.name = "";
            this.surname = "";
            this.agency_name = "";
            this.email = "";
            this.telephone = "";
            this.city_of_residence = "";
        },
        prevStep() {

            this.currentStep--;

            localStorage.setItem("CurrentStep", this.currentStep.toString());

        }
    },
    mounted() {
        if (localStorage.getItem("CurrentStep") !== null) {
            this.currentStep = parseInt(localStorage.getItem("CurrentStep"), 10);
        }

        localStorage.setItem("CurrentStep", this.currentStep.toString());

        const localStorageData = localStorage.getItem("Preventivo");

        if (localStorageData) {
            this.orderList = JSON.parse(localStorageData);
        }

        this.typology = this.zanzs[0].name;
    }
}
</script>

<template>
    <section>
        <div class="container">

            <div class="section-title">
                <!-- Scritta Home -->
                <router-link to="/">Home</router-link>
                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                {{ printNameSection }}
            </div>

            <div class="top" :class="currentStep > 3 ? 'none' : ''">
                <h1>
                    Fai il <div>Preventivo</div>
                </h1>


                <!-- Cerchi degli step -->
                <div class="steps-circles">
                    <div class="circle" :class="currentStep === 1 ? 'current' : ''">1</div>
                    <hr>
                    <div class="circle" :class="currentStep === 2 ? 'current' : ''">2</div>
                    <hr>
                    <div class="circle" :class="currentStep === 3 ? 'current' : ''">3</div>
                </div>
            </div>

            <!-- Scritte sotto ai cerchi -->
            <div class="steps-text" :class="currentStep > 3 ? 'none' : ''">
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
                <div v-if="currentStep === 1" class="first-step">


                    <!-- Parte sinistra step 1 con gl input -->
                    <div class="first-step-left">
                        <div v-if="selectedOption === 'Privato' || this.selectedOption === ''">
                            <input type="text" v-model="name" placeholder="Nome *" @input="filterNumbers" required>
                            <br>
                            <input type="text" v-model="surname" placeholder="Cognome *" @input="filterNumbers" required>
                        </div>
                        <div v-else-if="selectedOption === 'Azienda'">
                            <input type="text" v-model="agency_name" placeholder="Nome Azienda *" required>
                        </div>
                        <div>
                            <input type="email" v-model="email" placeholder="E-mail *" required>
                            <br>
                            <input type="text" v-model="telephone" placeholder="Telefono *" maxlength="10"
                                @input="filterCharacters" required>
                            <br>
                            <input type="text" v-model="city_of_residence" placeholder="Comune *" @input="filterNumbers"
                                required>

                            <div class="obligatory">
                                i cambi contrassegnati con &ast; sono obbligatori
                            </div>
                        </div>
                    </div>

                    <!-- Parte destra step 1 con gli input radio e il bottone completa i dati -->
                    <div class="first-step-right">
                        <div class="radios">
                            <label for="privato">
                                <input type="radio" id="privato" value="Privato" v-model="selectedOption"
                                    @change="resetCommonInputs" checked>
                                Privato
                            </label>

                            <label for="azienda">
                                <input type="radio" id="azienda" value="Azienda" v-model="selectedOption"
                                    @change="resetCommonInputs">
                                Azienda
                            </label>
                        </div>

                        <div class="form-button">
                            <button @click="nextStep" class="button">Completa i dati</button>
                        </div>

                    </div>
                </div>


                <!-- Inizio step 2 -->
                <div v-else-if="currentStep === 2" class="second-step">


                    <!-- Parte sopra - slider -->
                    <div class="inputs-top">
                        <div class="slider-preventivo" v-for="(zanz, index) in zanzs" :key="index"
                            :class="zanz.active ? 'active' : ''">

                            <div class="arrows-image">
                                <img :src="zanz.image" :alt="zanz.name" class="zanz-image">

                                <!-- Icona freccia indietro -->
                                <a class="arrow left" @click="sliderPrev(index)">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </a>

                                <!-- Icona freccia avanti -->
                                <a class="arrow right" @click="sliderNext(index)">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>

                            <h2>
                                {{ zanz.name }}
                            </h2>
                        </div>

                        <!-- Seleziona modello -->
                        <span v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex">
                            <select v-if="zanz.active" :required="fixRequiredProblem" v-model="selectedModel">
                                <option value="" disabled selected hidden>Seleziona il modello *
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
                            <input type="text" name="width" placeholder="Larghezza (in cm) *" v-model="width"
                                @input="filterSizes" :required="fixRequiredProblem">

                            <input type="text" name="height" placeholder="Altezza (in cm) *" v-model="height"
                                @input="filterSizes" :required="fixRequiredProblem">

                            <input type="number" name="quantity" placeholder="Quantità *" min="1" v-model="quantity"
                                :required="fixRequiredProblem">
                        </span>
                    </div>

                    <!-- Input sotto - input radio scelta rete -->
                    <div class="inputs-bottom">
                        <label v-for="(net, index) in nets" :key="index">
                            {{ net }}
                            <input type="radio" name="net" :value="net" v-model="choice" :required="fixRequiredProblem">
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
                                    :class="typo.active ? 'selected' : ''">
                                    {{ typo.typology }}
                                </div>
                            </div>
                        </div>

                        <!-- Nomi e immagini colori - parte sotto -->
                        <div class="list-colors" v-for="(typo, index) in store.colors" :key="index"
                            :class="typo.active ? 'selected' : ''">
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

                    <!-- Textarea -->
                    <div class="textarea">
                        <textarea v-model="message" rows="8" placeholder="Messaggio"></textarea>
                    </div>

                    <!-- Bottone aggiungi zanzariera -->
                    <div class="form-button">

                        <button @click="addZanz()" class="button">Aggiungi
                            Zanzariera
                        </button>
                    </div>

                    <!-- Elenco zanzariere preventivo -->
                    <ul v-if="orderList.length !== 0" class="list-ul">
                        <li v-for="(order, index) in orderList" :key="index" class="list-order">
                            <span>
                                {{ typology.replace(/\([^)]*\)/g, "") }} | {{ order.models.charAt(0).toUpperCase() +
                                    order.models.slice(1).toLowerCase().replace(/\([^)]*\)/g, "") }} | {{ order.choice }} |
                                <img :src="order.colors" class="order-image">
                            </span>
                            <span>
                                Quantit&agrave;: {{ order.quantity }}
                            </span>

                            <span>
                                {{ order.width }} cm x {{ order.height }} cm
                            </span>

                            <button @click="deleteModel(index)">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </li>
                    </ul>

                    <!-- Bottone per passare allo step successivo -->
                    <div class="form-button confirm">
                        <button @click="prevStep" class="button">Torna indietro</button>
                        <button @click="nextStep" class="button">Conferma le zanzariere</button>
                    </div>

                </div>

                <!-- Inizio terzo step -->
                <form action="" @submit="handleSubmit" v-else-if="currentStep === 3" class="third-step">
                    <h2>
                        Ecco a te il riepilogo
                    </h2>

                    <ul v-for="(list, index) in infoList" :key="index" class="summary info">
                        <li>
                            {{ list.selection }}
                            <hr>
                        </li>
                        <div v-if="list.selection === 'Privato'">
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
                            Telefono: {{ list.telephone }}
                        </li>
                        <li>
                            Comune: {{ list.city_of_residence }}
                        </li>
                    </ul>

                    <div v-for="(order, index) in orderList" :key="index" class="summary">
                        <div>
                            Modello zanzariera: {{ order.models.charAt(0).toUpperCase() +
                                order.models.slice(1).toLowerCase().replace(/\([^)]*\)/g, "") }} - {{ order.choice }}
                        </div>
                        <div>
                            Colore: {{ order.colorsName }}
                        </div>
                        <div>
                            Quantit&agrave;: {{ order.quantity }}
                        </div>

                        <div>
                            Misure: {{ order.width }}cm x {{ order.height }}cm
                        </div>
                        <div>
                            Messaggio:
                            <span v-if="order.message">{{ order.message }}</span>
                            <span v-else>Non hai scritto nessun messaggio</span>
                        </div>
                    </div>


                    <div class="form-button">
                        <button @click="confirm" class="button">Completa</button>
                    </div>
                </form>

                <div v-else class="fourth-step">
                    <h1>
                        Grazie per aver scelto la qualit&agrave; con un preventivo
                        <div>La <span>Giesse Zanzariere</span> ti contatter&agrave;</div>
                        <div>il prima possibile</div>
                        <div>Tutte le informazioni sono state inviate per email</div>
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

.fourth-step {
    text-align: center;
}

.third-step {
    background-color: #ADADAD;
    padding: 20px;

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
        }
    }

    .form-button {
        text-align: center;
        margin-bottom: -65px;
    }
}

.bottom {
    color: #000;
    letter-spacing: 1px;
    padding: 20px 0;

    input,
    label,
    textarea,
    button {
        letter-spacing: 1px;
    }

    hr {
        border-bottom: 1px solid #000;
        margin: 60px 0;
    }

    .form-button {
        padding-top: 50px;

        button {
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

.second-step {
    background-color: #adadad;
    max-width: 1070px;
    margin: 0 auto;
    text-align: center;
    padding: 40px;

    .slider-preventivo {
        max-width: 500px;
        height: 314px;
        margin: 0 auto;
        user-select: none;
        transition: all 500ms ease;

        .arrows-image {
            position: relative;
        }

        img {
            width: 150px;
        }

        h2 {
            padding: 20px 0 60px 0;
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
            padding: 2px 7px;
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

            span,
            button {
                background-color: #fff;
                padding: 10px;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 500;
                margin: 0 8px;
            }

            button {
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
            }
        }
    }

    .form-button {

        &.confirm {
            //padding-top: 30px;
            position: relative;
            bottom: -63px;

            button {
                border-radius: 0;
            }
        }

        button {
            padding: 10px 15px;
        }
    }

    .textarea {
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
        padding: 5px 10px;
        font-size: 0.9rem;
        margin: 0 10px;
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

.section-title {
    a {
        color: #fff;
    }
}

.first-step {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #adadad;
    max-width: 890px;
    margin: 0 auto;
    padding: 40px;

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

section {
    background-color: #686868;
    min-height: calc(100vh - 312px);
}

.container {
    color: #fff;
    padding: 20px 0;
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
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-weight: 500;

                &.current {
                    background-color: $yellow-color;
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
            width: 320px;

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
        font-size: 1.2rem;
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

// Nomi e immagini colori - parte destra
.list-colors {
    padding-top: 30px;

    &:not(.selected) {
        display: none;
    }

    // Blocco intero colori
    .colors {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        color: #fff;
        font-size: 0.8rem;
        font-weight: 500;

        // Colore singolo
        .color {
            width: 120px;
            height: 120px;
            cursor: pointer;

            // Nome colore
            .color-name {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, .15);
                box-shadow: 0 2px 0 rgba(0, 0, 0, .2);
                border-radius: 0 0 10px 10px;
                color: #fff;
                text-align: center;
                height: 37px;
                padding: 2px 5px;
                border: 2px solid transparent;
                border-top: 0;
                display: none;
            }

            // Immagine colore
            .color-image {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 2px solid transparent;
                margin-top: -15px;
                position: relative;
                z-index: 20;
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
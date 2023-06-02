<script>

import { store } from '../store.js';

export default {
    name: 'Preventivo',
    data() {
        return {
            orderList: [],
            secondStepValid: false,
            store,
            currentStep: 1,
            selectedOption: "",
            name: "",
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
            selectedModel: "",
            choice: "",
            zanzs: [
                {
                    name: "Verticali a molla classica (guida telescopica)",
                    image: "/img/alba.png",
                    active: true,
                    models: [
                        "ALBA (con cuffie)",
                        "SONIA (senza cuffie)",
                        "GENNY (cassonetto da 40mm)",
                    ]
                },
                {
                    name: "Vertica a molla classica (guida singola)",
                    image: "/img/alba.png",
                    active: false,
                    models: [
                        "GIUSY (con cuffie)",
                        "ELENA (senza cuffie)",
                        "EDDI (cassonetto da 40mm)"
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
                    name: "Verticali a catena classica (guida telescopica)",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "KATIA (con cuffie)",
                        "VERA (senza cuffie)"
                    ]
                },
                {
                    name: "Verticali a catena classica (guida singola)",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "SARA (senza cuffie)"
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
                }
            ],
            exceptions: [
                "Verticali a molla",
                "Verticali a catena",
                "Orizzontali",
                "Con guida bassa da 2cm",
                "Con guida bassa da 14mm",
                "Con guida bassa da 3mm",
                "Altre",
                "Frizionata",
                "Plissettata",
                "Antivento"
            ],
            models: [
                "Verticali a molla",
                "ALBA (con cuffie)",
                "SONIA (senza cuffie)",
                "GENNY (cassonetto da 40)",
                "LAURA (cricchetto, con cuffie)",
                "EVA (cricchetto, senza cuffie)",
                "ASIA (cricchetto, cassonetto da 40)",
                "Verticali a catena",
                "KATIA (solo catena, con cuffie)",
                "MERI (solo catena, senza cuffie)",
                "GIADA (catena + molla, cuffie)",
                "VERA (catena + molla, senza cuffie)",
                "Orizzontali",
                "Laterale Tipo ALBA (con cuffie)",
                "Laterale Tipo SONIA (senza cuffie)",
                "Laterale Tipo GENNY (cassonetto da 40)",
                "Con guida bassa da 2cm",
                "LARA (con cuffie)",
                "VALERIA (senza cuffie)",
                "DESI (cassonetto da 40)",
                "Con guida bassa da 14mm",
                "LUNA",
                "Con guida bassa da 3mm",
                "ZELIG",
                "Frizionata",
                "JOLLY",
                "Antivento",
                "BORA",
                "Plissettata",
                "PLISSE' 22",
                "Altre",
                "ANTAREX",
                "SCORRI",
                "FISSA",
                "CASPER"
            ],
        }
    },
    computed: {
        firstStepValid() {
            if (this.email.trim() !== '' && this.email.includes("@") && this.telephone.trim() !== '' && this.city_of_residence.trim() !== '') {
                this.enableButton = true;
            }

            if (this.selectedOption === 'privato' || this.selectedOption === '') {
                if (this.name.trim() !== '' && this.surname.trim() !== '' && this.enableButton) {
                    return true;
                }
            }
            else if (this.selectedOption === 'azienda' && this.enableButton) {
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
        avanti(index) {
            index++;

            this.zanzs[index].active = true;

            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

        },
        indietro(index) {
            index--;

            this.zanzs[index].active = true;

            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

        },
        add() {
            if (this.typology !== '' && this.quantity !== 0 && this.width !== '' && this.height !== '' && this.colors !== '') {

                this.secondStepValid = true;

                let obj = {
                    typology: this.typology,
                    quantity: this.quantity,
                    width: this.width,
                    height: this.height,
                    colors: this.colors,
                    models: this.selectedModel,
                    choice: this.choice,
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

                this.typology = "";
                this.quantity = "";
                this.width = "";
                this.height = "";
                this.colors = "";
                this.selectedModel = "";
                this.choice = "";

                this.store.colors[0].active = true;

                for (let i = 0; i < this.store.colors.length; i++) {
                    if (i !== 0)
                        this.store.colors[i].active = false;
                }
            }
        },
        nextStep() {
            if (this.currentStep === 1 && this.firstStepValid || this.currentStep === 2 && this.secondStepValid && this.orderList.length !== 0) {
                this.currentStep++;
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
                localStorage.clear();
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
        }
    },
    mounted() {
        //this.orderNumber = parseInt(localStorage.getItem("orderNumber")) || 0;
    },
    updated() {
        if (this.currentStep === 3) {
            localStorage.removeItem("Preventivo");
            localStorage.clear();
        }
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

            <div class="top">
                <h1>
                    Fai il <div>Preventivo</div>
                </h1>


                <div class="steps-circles">
                    <div class="circle" :class="currentStep === 1 ? 'current' : ''">1</div>
                    <hr>
                    <div class="circle" :class="currentStep === 2 ? 'current' : ''">2</div>
                    <hr>
                    <div class="circle" :class="currentStep === 3 ? 'current' : ''">3</div>
                </div>
            </div>

            <div class="steps-text">
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


            <form action="" @submit="handleSubmit" class="bottom">
                <div v-if="currentStep === 1" class="first-step">

                    <div class="first-step-left">
                        <div v-if="selectedOption === 'privato' || this.selectedOption === ''">
                            <input type="text" v-model="name" placeholder="Nome *" @input="filterNumbers" required>
                            <br>
                            <input type="text" v-model="surname" placeholder="Cognome *" @input="filterNumbers" required>
                        </div>
                        <div v-else-if="selectedOption === 'azienda'">
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

                    <div class="first-step-right">
                        <div class="radios">
                            <label for="privato">
                                <input type="radio" id="privato" value="privato" v-model="selectedOption"
                                    @change="resetCommonInputs" checked>
                                Privato
                            </label>

                            <label for="azienda">
                                <input type="radio" id="azienda" value="azienda" v-model="selectedOption"
                                    @change="resetCommonInputs">
                                Azienda
                            </label>
                        </div>

                        <div class="form-button">
                            <button @click="nextStep">Completa i dati</button>
                        </div>

                    </div>
                </div>


                <div v-else-if="currentStep === 2" class="second-step">

                    <div id="zanz" style="display: none;">
                        <div class="zanz">
                            <div v-for="(zanz, index) in zanzs" :key="index" :class="zanz.active ? 'active' : ''">
                                <img :src="zanz.image">
                                <button @click="avanti(index)" v-if="zanz.active" class="avanti">Avanti</button>
                                <button @click="indietro(index)" v-if="zanz.active" class="indietro">Indietro</button>
                            </div>
                        </div>
                    </div>

                    <div class="inputs-top">
                        <select v-model="typology" id="typology-select" :required="orderList.length === 0">
                            <option value="" disabled selected hidden>Seleziona la tipologia *</option>
                            <option v-for="(zanz, index) in zanzs" :key="index" :value="zanz.name">
                                {{ zanz.name }}
                            </option>
                        </select>

                        <span v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex">
                            <select v-if="(typology === '' && zanzIndex === 0) || typology === zanz.name"
                                :required="orderList.length === 0" v-model="selectedModel">
                                <option value="" disabled selected hidden>Seleziona il modello *</option>
                                <option v-for="(nameModel, index) in zanz.models" :value="nameModel"
                                    v-if="typology === zanz.name">
                                    {{ nameModel }}</option>
                            </select>
                        </span>
                    </div>


                    <div class="inputs-center">
                        <label for="inputs">Inserisci: </label>
                        <span id="inputs">
                            <input type="text" name="width" placeholder="Larghezza (in cm) *" v-model="width"
                                @input="filterSizes" :required="orderList.length === 0">

                            <input type="text" name="height" placeholder="Altezza (in cm) *" v-model="height"
                                @input="filterSizes" :required="orderList.length === 0">

                            <input type="number" name="quantity" placeholder="Quantità *" min="1" v-model="quantity"
                                :required="orderList.length === 0">
                        </span>
                    </div>

                    <div class="inputs-bottom">
                        <label for="normale">
                            Rete normale
                            <input type="radio" id="normale" value="Rete normale" v-model="choice">
                        </label>

                        <label for="rigata">
                            Rete rigata
                            <input type="radio" id="rigata" value="Rete rigata" v-model="choice">
                        </label>

                        <label for="oscurante-bianco">
                            Oscurante bianco
                            <input type="radio" id="oscurante-bianco" value="Oscurante bianco" v-model="choice">
                        </label>

                        <label for="oscurante-nero">
                            Oscurante nero
                            <input type="radio" id="oscurante-nero" value="Oscurante nero" v-model="choice">
                        </label>
                    </div>

                    <hr>

                    <h2>
                        Seleziona il Colore
                    </h2>

                    <div class="color-choice">
                        <div class="list-typologies">
                            <div v-for="(typo, index) in store.colors" :key="index" class="typologies">
                                <div @click="changeColorTypology(index)" class="typology-name"
                                    :class="typo.active ? 'selected' : ''">
                                    {{ typo.typology }}
                                </div>
                            </div>
                        </div>

                        <!-- Nomi e immagini colori - parte destra -->
                        <div class="list-colors" v-for="(typo, index) in store.colors" :key="index"
                            :class="typo.active ? 'selected' : ''">
                            <div class="colors" :class="typo.typology.toLowerCase()" v-if="typo.active">
                                <label v-for="(color, colorIndex) in typo.colorInfo" :key="colorIndex" class="color">
                                    <input type="radio" name="color" @click="getColor(index, colorIndex)"
                                        :required="orderList.length === 0">
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

                    <div class="form-button">
                        <button @click="add()">Aggiungi Zanzariera</button>
                    </div>

                    <ul>
                        <li v-for="(order, index) in orderList" v-if="orderList.length !== 0" :key="index"
                            class="list-order">
                            <span>
                                {{ order.typology.replace(/\([^)]*\)/g, "") }} | {{
                                    order.models.charAt(0).toUpperCase() +
                                    order.models.slice(1).toLowerCase().replace(/\([^)]*\)/g, "") }} | {{ order.choice }}
                                |
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

                    <div class="textarea">
                        <textarea name="message" rows="8" placeholder="Messaggio"></textarea>
                    </div>

                    <div class="form-button">
                        <button @click="nextStep">Conferma le zanzariere</button>
                    </div>

                </div>


                <div v-else class="third-step">
                    Terzo step
                </div>
            </form>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;


.bottom {
    color: #000;

    hr {
        border-color: #000;
        margin: 40px 0;
    }
}


.form-button {
    padding-bottom: 22px;

    button {
        background-color: $yellow-color;
        padding: 10px 50px;
        border: 0;
        color: #000;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
    }
}

.second-step {
    background-color: #adadad;
    max-width: 1020px;
    margin: 0 auto;
    text-align: center;
    padding: 40px;

    .list-order {
        margin: 40px 0;
        border: 1px solid #000;
        padding: 20px;

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

    .form-button {

        &:last-of-type {
            padding-top: 30px;

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

    .inputs-center,
    .inputs-bottom {
        padding-top: 40px;
    }

    .inputs-top,
    .inputs-center {
        input {
            margin: 0 10px;
        }

        label {
            font-weight: 500;
        }
    }

    .inputs-bottom {
        label {
            margin: 0 10px;
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
        padding: 5px;
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
            color: #b9b9b9;
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

#zanz {
    width: 500px;
    margin: 0 auto;

    .avanti {
        position: absolute;
        right: -80px;
        top: 30%;
    }

    .indietro {
        position: absolute;
        left: -80px;
        top: 30%;
    }

    .zanz {
        display: flex;
        position: relative;

        div {
            width: 100px;
            height: 128px;

            img {
                display: block;
            }

            // &:nth-child(odd) {
            //     border: 2px solid red;
            // }

            &.active {
                border: 2px solid yellow;
            }
        }
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

    form {
        padding: 20px 0;
    }

    .top {
        display: flex;
        text-align: center;
        justify-content: space-between;
        align-items: center;
        gap: 50px;
        max-width: 700px;
        margin: 0 auto;
        padding-top: 40px;

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

// .second-step {

//     label+input {
//         margin-left: 0;
//     }

//     select {
//         margin-right: 10px;
//     }

//     input {
//         margin: 0 10px;
//     }
// }

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
                height: 120px;
                object-fit: cover;
                border-radius: 50%;
                border: 2px solid transparent;
                //border-bottom: 0;
            }
        }

    }

}

.color-choice {
    margin: 0 auto;
    height: 450px;
    padding: 60px 20px;

    [type=radio] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
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
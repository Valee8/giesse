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

            if (this.selectedOption === 'privato') {
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
    },
    methods: {
        add() {
            if (this.typology !== '' && this.quantity !== 0 && this.width !== '' && this.height !== '' && this.colors !== '') {

                this.secondStepValid = true;

                let obj = {
                    typology: this.typology,
                    quantity: this.quantity,
                    width: this.width,
                    height: this.height,
                    colors: this.colors,
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
            }
        },
        nextStep() {
            if (this.currentStep === 1 && this.firstStepValid || this.currentStep === 2 && this.secondStepValid) {
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
                this.colors = store.colors[index].colorInfo[colorIndex].name;
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
            <div class="top">
                <h1>
                    Fai il Preventivo
                </h1>


                <div class="steps">
                    <div :class="currentStep === 1 ? 'current' : ''">1</div>
                    <hr>
                    <div :class="currentStep === 2 ? 'current' : ''">2</div>
                    <hr>
                    <div :class="currentStep === 3 ? 'current' : ''">3</div>
                </div>
            </div>

            <form action="" @submit="handleSubmit">
                <div v-if="currentStep === 1">
                    <label>
                        <input type="radio" value="privato" v-model="selectedOption" @change="resetCommonInputs">
                        Privato
                    </label>
                    <label>
                        <input type="radio" value="azienda" v-model="selectedOption" @change="resetCommonInputs">
                        Azienda
                    </label>
                    <br><br>

                    <div v-if="selectedOption === 'privato'">
                        <input type="text" v-model="name" placeholder="Nome *" @input="filterNumbers" required>
                        <br>
                        <input type="text" v-model="surname" placeholder="Cognome *" @input="filterNumbers" required>
                    </div>
                    <div v-else-if="selectedOption === 'azienda'">
                        <input type="text" v-model="agency_name" placeholder="Nome Azienda *" required>
                    </div>
                    <div v-if="selectedOption">
                        <input type="email" v-model="email" placeholder="E-mail *" required>
                        <br>
                        <input type="text" v-model="telephone" placeholder="Telefono *" maxlength="10"
                            @input="filterCharacters" required>
                        <br>
                        <input type="text" v-model="city_of_residence" placeholder="Comune *" @input="filterNumbers"
                            required>
                        <br>
                    </div>

                    <button @click="nextStep" v-if="selectedOption">Avanti</button>
                </div>


                <div v-else-if="currentStep === 2" class="second-step">
                    <select name="models" id="model-select" v-model="typology" :required="orderList.length === 0">
                        <option value="" disabled selected hidden>Seleziona il modello *</option>
                        <option :disabled="exceptions.includes(model)" :value="!exceptions.includes(model) ? model : ''"
                            v-for="model in models"> {{ model }}
                        </option>
                    </select>

                    <input type="number" name="quantity" id="" placeholder="Quantità *" min="1" v-model="quantity"
                        :required="orderList.length === 0">

                    <br><br>

                    <label>Misure:

                        <input type="text" name="width" id="" placeholder="Larghezza (in cm) *" v-model="width"
                            @input="filterSizes" :required="orderList.length === 0">
                        <input type="text" name="height" id="" placeholder="Altezza (in cm) *" v-model="height"
                            @input="filterSizes" :required="orderList.length === 0">
                    </label>

                    <button @click="add()">Aggiungi</button>

                    <br>
                    <ul v-for="(order, index) in orderList" v-if="orderList.length !== 0" :key="index">
                        <li>
                            {{ order.typology }} - {{ order.quantity }} - {{ order.width }} - {{ order.height }} - {{
                                order.colors }} <button @click="deleteModel(index)">Delete</button>
                        </li>
                    </ul>

                    <br>
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
                    <button @click="nextStep">Avanti</button>
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

section {
    background-color: #686868;
    min-height: calc(100vh - 312px);
}

.container {
    text-align: center;
    color: #fff;
    padding: 20px 0;

    form {
        padding: 20px 0;
    }

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;

        .steps {
            display: flex;
            justify-content: space-between;
            align-items: center;
            //gap: 20px;
            font-size: 1.8rem;

            hr {
                width: 60px;
                border: 2px solid #fff;
            }

            div {
                border: 2px solid #fff;
                border-radius: 50px;
                width: 40px;
                height: 40px;

                &.current {
                    background-color: #fcf674;
                    color: #000;
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
    text-align: center;
    width: 8%;

    .typologies {
        padding: 0.1rem 0;
        border-bottom: 1px solid #fff;

        &:first-child {
            border-top: 1px solid #fff;
        }
    }

    // Nome tipologia
    .typology-name {
        cursor: pointer;
        font-weight: 500;
        font-size: 0.9rem;
        padding: 5px 0 5px 4px;

        &.selected {
            color: #fcf674;
            border-left: 4px solid #fcf674;
            padding-left: 0;
        }
    }
}

// Nomi e immagini colori - parte destra
.list-colors {
    width: 90%;

    &:not(.selected) {
        display: none;
    }

    // Blocco intero colori
    .colors {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        color: #fff;
        font-size: 0.8rem;
        font-weight: 500;

        // Colore singolo
        .color {
            width: 140px;
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
            }

            // Immagine colore
            .color-image {
                display: block;
                width: 100%;
                height: 75px;
                object-fit: cover;
                border-radius: 10px 10px 0 0;
                border: 2px solid transparent;
                border-bottom: 0;
            }
        }

    }

}

.color-choice {
    display: flex;
    align-items: center;
    gap: 0 60px;
    margin: 0 auto;
    height: 420px;
    width: 600px;
    //background-color: #9c9c9c;

    [type=radio] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    [type=radio]:checked+.color-image {
        border: 2px solid #fcf674;
        border-bottom: 0;
    }

    /* CHECKED STYLES */
    [type=radio]:checked+.color-image+.color-name {
        border: 2px solid #fcf674;
        border-top: 0;
    }
}
</style>
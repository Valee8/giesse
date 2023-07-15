<script>

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/';

export default {
    name: 'Informazioni',
    data() {
        return {
            enableButton: false,
            newInfo: {
                typology: "",
                name: "",
                surname: "",
                agency_name: "",
                vat_number: "",
                telephone_number: "",
                city_of_residence: "",
                attached_file: "",
                message: ""
            }
        }
    },
    computed: {
        firstStepValid() {
            if (this.newInfo.telephone_number.trim() !== "" && this.newInfo.province.trim() !== "") {
                this.enableButton = true;
            }

            if (this.newInfo.typology === "Privato") {
                if (this.newInfo.name.trim() !== "" && this.newInfo.surname.trim() !== "" && this.enableButton) {
                    return true;
                }
            }
            else if (this.newInfo.typology === "Azienda") {
                if (this.newInfo.agency_name.trim() !== "" && this.newInfo.vat_number.trim() !== "" && this.enableButton) {
                    return true;
                }
            }
            // else {
            //     return false;
            // }
        },
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            this.newInfo.attached_file = files[0].name;
        },
        sendEmail() {

            if (this.firstStepValid) {


                axios.post(API_URL + 'message/store', this.newInfo)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        if (success) {
                            this.newInfo.name = "";
                            this.newInfo.surname = "";
                            this.newInfo.telephone_number = "";
                            this.newInfo.province = "";
                            this.newInfo.message = "";
                            this.newInfo.attached_file = "";
                        }

                    })
                    .catch(error => console.log(error));
            }
        },
        filterNumbers() {
            this.newInfo.name = this.newInfo.name.replace(/[0-9]/g, '');
            this.newInfo.surname = this.newInfo.surname.replace(/[0-9]/g, '');
        },
        filterCharacters() {
            this.newInfo.telephone_number = this.newInfo.telephone_number.replace(/\D/g, '');
            this.newInfo.vat_number = this.newInfo.vat_number.replace(/\D/g, '');
        },
        handleSubmit(event) {
            event.preventDefault();
        },
        resetCommonInputs() {
            if (this.newInfo.typology) {
                this.newInfo.name = "";
                this.newInfo.surname = "";
                this.newInfo.agency_name = "";
                this.newInfo.vat_number = "";
                this.newInfo.email = "";
                this.newInfo.telephone_number = "";
                this.newInfo.city_of_residence = "";
            }
        },
    },
}
</script>

<template>
    <div class="info">
        <h2>
            Informazioni sui prodotti
        </h2>

        <div class="container">

            <form @submit="handleSubmit">

                <div class="left">
                    <div class="radios">
                        <label for="privato">
                            <input type="radio" id="privato" value="Privato" v-model="newInfo.typology"
                                @change="resetCommonInputs"
                                :checked="newInfo.typology === '' || newInfo.typology === 'Privato'">
                            Privato
                        </label>

                        <label for="azienda">
                            <input type="radio" id="azienda" value="Azienda" v-model="newInfo.typology"
                                @change="resetCommonInputs">
                            Azienda
                        </label>
                    </div>

                    <div class="inputs-top">
                        <div v-if="newInfo.typology === 'Privato' || newInfo.typology === ''">
                            <input type="text" class="first-input" v-model="newInfo.name" placeholder="Nome *"
                                @input="filterNumbers" required>
                            <input type="text" class="second-input" v-model="newInfo.surname" placeholder="Cognome *"
                                @input="filterNumbers" required>
                        </div>
                        <div v-else-if="newInfo.typology === 'Azienda'">
                            <input type="text" class="first-input" v-model="newInfo.agency_name"
                                placeholder="Nome Azienda *" required>
                            <input type="text" class="second-input" v-model="newInfo.vat_number" placeholder="Partita Iva *"
                                maxlength="11" @input="filterCharacters" required>
                        </div>
                    </div>

                    <div class="inputs-bottom">
                        <input type="text" class="first-input" v-model="newInfo.telephone_number" placeholder="Telefono *"
                            @input="filterCharacters" required>
                        <input type="text" class="second-input" v-model="newInfo.city_of_residence" placeholder="Comune *"
                            @input="filterNumbers" required>
                    </div>

                    <textarea name="message" v-model="newInfo.message" rows="8" placeholder="Messaggio *"
                        required></textarea>

                    <div class="obligatory">* Campi obbligatori</div>

                    <div class="submit">
                        <input type="submit" value="Invia" @click="sendEmail">
                        <div class="email">
                            <i class="fa-regular fa-envelope"></i>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="text-width">
                        <h1>
                            <div class="border"></div>
                            <div>Scrivici</div>
                        </h1>

                        <h4>
                            Allega un file
                        </h4>

                        <p>
                            E' possibile allegare un file con i seguenti formati .png, .jpg, .jpeg, .dox, .pdf dimensione
                            massima 20MB
                        </p>

                        <input type="file" v-on:change="onFileChange" id="file" accept=".png,.jpg,.jpeg,.dox,.pdf">
                    </div>

                </div>
            </form>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.info {
    background-color: #1c1c1c;
    text-align: center;
    color: #fff;
    padding: 50px 0;
    //height: 400px;
    //display: none;

    h2 {
        padding-bottom: 50px;
    }

    .obligatory {
        font-size: 0.6rem;
        font-weight: bold;
        padding-top: 10px;
        text-align: left;
    }

    form {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        //height: 100%;

        .left {
            text-align: left;

            .radios {
                padding-bottom: 30px;

                input[type='radio'] {
                    accent-color: #000;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }

                label {
                    vertical-align: middle;
                }

                label {
                    &:first-of-type {
                        margin-right: 100px;

                    }
                }
            }

            .inputs-top {
                margin-bottom: 20px;
            }

            input:not(.submit),
            textarea {
                background-color: #fff;
                padding: 6px 12px 20px 12px;
                border: 0;
                font-size: 0.9rem;
                font-family: 'Montserrat', sans-serif;
                outline: none;
                color: #000;
            }

            textarea {
                resize: none;
            }

            .second-input {
                width: 50%;
            }

            .first-input {
                width: calc(50% - 35px);
                margin-right: 35px;
            }

            textarea {
                margin-top: 40px;
                width: 100%;
            }

            ::placeholder {
                /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #b9b9b9;
                font-weight: 600;
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

            .submit {
                display: flex;
                align-items: center;
                margin: 30px auto 0 auto;
                width: 105px;

                input {
                    width: 100%;
                    font-family: 'Montserrat', sans-serif;
                    background-color: #000;
                    border: 1px solid #fff;
                    border-radius: 50px;
                    color: #fff;
                    font-size: 1.3rem;
                    font-weight: 500;
                    padding: 5px 30px 5px 0;
                    cursor: pointer;
                }

                .email {
                    margin-left: -34px;
                    cursor: pointer;

                    svg {
                        vertical-align: middle;
                        font-size: 1.2rem;
                    }
                }
            }
        }

        .right {
            text-align: left;
            padding-top: 52px;

            .text-width {
                width: 71%;
            }

            h1 {
                width: 282px;
                height: 175px;
                font-size: 1.8rem;
                font-weight: normal;
                //margin-left: auto;

                .border {
                    background-color: $yellow-color;
                    width: 70px;
                    height: 10px;
                }

                div {
                    font-weight: bold;
                    color: $yellow-color;
                    font-size: 2.7rem;
                    padding-top: 5px;
                }
            }

            p {
                font-size: 0.9rem;
                padding: 20px 0;
            }


            #file {
                font-family: 'Montserrat', sans-serif;
                background: #000;
                color: #fff;
                border-bottom: 2px solid $yellow-color;
                display: block;
                //width: 350px;
                width: 100%;
                padding: 10px 0;
            }


            input::file-selector-button {
                font-family: 'Montserrat', sans-serif;
                background-color: $yellow-color;
                padding: 3px 11px;
                font-size: 0.9rem;
                margin-right: 122px;
                border: 0;
                cursor: pointer;
                margin-left: 8px;
            }
        }

        .left,
        .right {
            width: 45%;
            //height: 100%;
        }
    }
}
</style>
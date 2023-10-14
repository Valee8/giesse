<script>

import axios from 'axios';
import { toHandlers } from 'vue';

const API_URL = 'http://localhost:8000/api/v1/';

export default {
    name: 'Informazioni',
    data() {
        return {
            error2: "",
            sizeVariable: "",
            error: "",
            messageSuccess: "",
            files: [],
            enableButton: false,
            newInfo: {
                typology: "",
                name: "",
                surname: "",
                agency_name: "",
                vat_number: "",
                telephone_number: "",
                city_of_residence: "",
                attached_files: [],
                message: "",
                infoEmail: ""
            },
            format: [
                ".png",
                ".jpg",
                ".jpeg",
                ".docx",
                ".pdf"
            ]
        }
    },
    computed: {
        prova() {

        },
        firstStepValid() {
            if (this.newInfo.telephone_number.trim() !== "" && this.newInfo.city_of_residence.trim() !== "" && this.newInfo.message !== "") {
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
            return false;

        },
    },
    methods: {
        onFileChange(e) {
            this.files = e.target.files;

            this.error = "";
            this.error2 = "";


            for (let i = 0; i < this.files.length; i++) {

                if (parseInt(this.files[i].size) > 15728640) {
                    this.error = "Dimensioni per questo file troppo grandi";
                }

                this.newInfo.attached_files[i] = this.files[i].name.replace(/\s/g, '');
            }

            for (let i = 0; i < this.format.length; i++) {


                for (let j = 0; j < this.files.length; j++) {
                    if (!this.files[j].name.endsWith(this.format[i])) {
                    }
                }
            }
        },
        deleteAttach() {

            this.$refs.fileInput.value = null;

            this.error = "";
            this.error2 = "";
        },
        sendEmail() {

            if (this.firstStepValid) {

                if (this.files.length > 0) {
                    const formData = new FormData();
                    //formData.append('files', this.files);

                    for (let i = 0; i < this.files.length; i++) {
                        formData.append('files', this.files[i]);
                    }

                    axios.post(API_URL + 'uploadFile', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then((response) => {
                            //console.log('File caricato con successo');
                        })
                        .catch((error) => {
                            console.error('Errore nel caricamento del file:', error);
                        });
                }

                // for (let i = 0; i < this.files.length; i++) {
                //     this.sizes[i] = this.files[i].size;
                // }

                this.newInfo.infoEmail = "oirelav95@gmail.com";

                axios.post(API_URL + 'message', this.newInfo)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        if (success) {
                            this.messageSuccess = "Messaggio inviato con successo!";

                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                        }

                    })
                    .catch(error => console.log(error.response.data));
            }
        },
        handleSubmit(event) {
            event.preventDefault();
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
    mounted() {
        if (this.newInfo.typology === "") {
            this.newInfo.typology = "Privato";
        }
    }
}
</script>

<template>
    <div class="info">
        <div v-if="messageSuccess !== ''">
            {{ messageSuccess }}
        </div>

        <div v-else>
            <h2>
                Informazioni sui prodotti
            </h2>

            <div class="container">

                <form @submit="handleSubmit" enctype="multipart/form-data">
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
                                    @input="filterNumbers" title="Inserisci il nome" required>
                                <input type="text" class="second-input" v-model="newInfo.surname" placeholder="Cognome *"
                                    @input="filterNumbers" title="Inserisci il cognome" required>
                            </div>
                            <div v-else-if="newInfo.typology === 'Azienda'">
                                <input type="text" class="first-input" v-model="newInfo.agency_name"
                                    placeholder="Nome Azienda *" title="Inserisci il nome dell'azienda" required>
                                <input type="text" class="second-input" v-model="newInfo.vat_number"
                                    placeholder="Partita Iva *" maxlength="11" @input="filterCharacters"
                                    title="Inserisci la Partita Iva" required>
                            </div>
                        </div>

                        <div class="inputs-bottom">
                            <input type="text" class="first-input" v-model="newInfo.telephone_number"
                                placeholder="Telefono *" @input="filterCharacters" title="Inserisci il numero di telefono"
                                required>
                            <input type="text" class="second-input" v-model="newInfo.city_of_residence"
                                placeholder="Comune *" @input="filterNumbers" title="Inserisci il Comune" required>
                        </div>

                        <textarea name="message" v-model="newInfo.message" rows="8" placeholder="Messaggio *" required
                            title="Inserisci il messaggio"></textarea>

                        <div class="obligatory">* Campi obbligatori</div>

                        <div class="submit">
                            <button type="submit" @click="sendEmail" :disabled="error !== '' || error2 !== ''">Invia
                                <i class="fa-regular fa-envelope"></i></button>
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
                                E' possibile allegare un file con i seguenti formati .png, .jpg, .jpeg, .docx, .pdf
                                dimensione massima 15MB
                            </p>

                            <input type="file" @change="onFileChange" ref="fileInput" id="file"
                                accept=".png, .jpg, .jpeg, .docx, .pdf" multiple>

                            <div @click="deleteAttach" v-if="files.length > 0">Rimuovi file
                                allegato</div>

                            <div>
                                {{ error }}
                            </div>

                            <div>
                                {{ error2 }}
                            </div>
                        </div>

                    </div>
                </form>

            </div>
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
                    cursor: pointer;
                    accent-color: #000;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }

                label {
                    cursor: pointer;
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

                button {
                    width: 100%;
                    font-family: 'Montserrat', sans-serif;
                    background-color: #000;
                    border: 1px solid #fff;
                    border-radius: 50px;
                    color: #fff;
                    font-size: 1.3rem;
                    font-weight: 500;
                    padding: 5px;
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
                font-size: 0.85rem;
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

@media only screen and (min-width: 480px) and (max-width: 900px) {
    .info {
        form {
            flex-wrap: wrap;

            .left,
            .right {
                width: 100%;
            }
        }
    }
}
</style>
<script>

// Importo store
import { store } from '../store';

// Importo axios
import axios from 'axios';

export default {
    name: 'PrimoStepPreventivo',
    props: {
        getClient: {
            type: Function
        },
    },
    data() {
        return {
            store,

            // Oggetto che contiene le informazioni di un cliente
            newClient: {
                // Tipologia (Privato o Azienda)
                typology: "",
                // Nome
                name: "",
                client_token: "",
                // Cognome
                surname: "",
                // Nome Azienda
                agency_name: "",
                // Partita Iva
                vat_number: "",
                // Email
                client_email: "",
                // Conferma Email
                confirm_client_email: "",
                // Destinatario email
                owner_email: "",
                // Numero di telefono
                telephone_number: "",
                // Comune
                city_of_residence: "",
            },

            // Per far apparire il messaggio se le e-mail coincidono o no
            showMessageEmailConfirm: "",
        }
    },
    computed: {
        // Stampo messaggio corrispondente a seconda che le email coincidano oppure no
        emailConfirmMessage() {
            let message;
            if (!this.showMessageEmailConfirm) {
                message = "Le due e-mail non coincidono";
            }
            else {
                message = "Le due e-mail coincidono";
            }
            return message;
        },
        // Verifico che i campi del form non hanno spazi vuoti all'inizio e alla fine (trim), se non lo sono ritorno true altrimenti false
        firstStepValid() {

            let enableButtonFirstStep = false;

            // Se email, email di conferma, numero di telefono e comune non hanno spazi vuoti all'inizio alla fine e se email e email di conferma coincidono allora assegno true a enableButton
            if (this.newClient.client_email.trim() !== "" && this.newClient.confirm_client_email.trim() !== "" && this.newClient.telephone_number.trim() !== "" && this.newClient.city_of_residence.trim() !== "" && this.newClient.client_email === this.newClient.confirm_client_email && this.newClient.client_email.includes("@") && this.newClient.confirm_client_email.includes("@") && this.newClient.telephone_number.length === 10) {
                enableButtonFirstStep = true;
            }

            // Se la tipologia e' "Privato" i campi che non devono rimanere vuoti sono nome, cognome + quelli sopra
            if (this.newClient.typology === "Privato") {
                if (this.newClient.name.trim() !== "" && this.newClient.surname.trim() !== "" && enableButtonFirstStep) {
                    return true;
                }
            }
            // Se la tipologia e' "Azienda" i campi che non devono rimanere vuoti sono nome azienda, partita iva + quelli sopra
            else if (this.newClient.typology === "Azienda") {
                if (this.newClient.agency_name.trim() !== "" && this.newClient.vat_number.trim() !== "" && enableButtonFirstStep) {
                    return true;
                }
            }

            return false;
        },
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        // Metodo per creare nuovo cliente
        clientSubmit() {

            // Se firstStepValid e' true
            if (this.firstStepValid) {

                // showMessageEmailConfirm e' uguale a true e mi appare messaggio di conferma
                this.showMessageEmailConfirm = true;

                // Assegno l'email del destinatario
                this.newClient.owner_email = "oirelav95@gmail.com";

                // this.newEmail.owner_email = this.newClient.owner_email;

                // this.newEmail.client_email = this.newClient.client_email;

                // Funzione setTimeout per eseguire azioni dopo tot secondi (2 in questo caso)
                setTimeout(() => {

                    // Eseguo chiamata api
                    axios.post(this.store.apiUrl + 'client/store', this.newClient)
                        .then(res => {
                            const data = res.data;
                            const success = data.success;
                            const response = data.response;

                            this.store.clientId = response.client_id;

                            // Salvo clientId in localStorage cosi' non ci sono problemi se dovessi aggiornare la pagina
                            if (this.store.clientId) {
                                sessionStorage.setItem("ClientId", this.store.clientId.toString());
                            }

                            // Se tutto e' andato a buon fine richiamo richiamo getClient
                            if (success) {

                                // Incremento il valore di currentStep
                                this.store.currentStep++;

                                // Aggiorno valore currentStep in localStorage
                                sessionStorage.setItem("CurrentStep", this.store.currentStep.toString());

                                // Scrollo in alto per evitare problemi di visualizzazione pagina
                                this.scrollToTop();

                                this.getClient();
                            }

                        })
                        .catch(error => {
                            console.error(error);
                            // Faccio apparire messaggio di errore
                            this.store.showError = true;
                        });
                }, 2000);
            }

            // Se le email inserite dall'utente non coincidono assegno false a showMessageEmailConfirm
            if (this.newClient.client_email !== this.newClient.confirm_client_email && this.newClient.client_email.trim() !== "" && this.newClient.confirm_client_email.trim() !== "") {
                this.showMessageEmailConfirm = false;
            }
        },
        // Resetto valori dei campi del primo step se cambio tipologia
        resetInputs() {
            if (this.newClient.typology) {
                this.newClient.name = "";
                this.newClient.surname = "";
                this.newClient.agency_name = "";
                this.newClient.vat_number = "";
                this.newClient.client_email = "";
                this.newClient.confirm_client_email = "";
                this.newClient.telephone_number = "";
                this.newClient.city_of_residence = "";
            }
        },

        // Impedisco che questi campi possano contenere lettere e simboli
        filterCharacters() {
            this.newClient.telephone_number = this.newClient.telephone_number.replace(/\D/g, "");
            this.newClient.vat_number = this.newClient.vat_number.replace(/\D/g, "");
        },
        // Impedisco che questi campi possano contenere dei numeri
        filterNumbers() {
            this.newClient.name = this.newClient.name.replace(/[0-9]/g, "");
            this.newClient.surname = this.newClient.surname.replace(/[0-9]/g, "");
            this.newClient.city_of_residence = this.newClient.city_of_residence.replace(/[0-9\s]/g, "");
        },
    },
    mounted() {

        // Salvo valore currentStep in localStorage
        sessionStorage.setItem("CurrentStep", this.store.currentStep.toString());

        //this.getClient();
    },
    created() {

        // Controllo che non via currentStep in localStorage
        if (sessionStorage.getItem("CurrentStep") !== null) {
            // Richiamo il suo valore da localStorage
            this.store.currentStep = parseInt(sessionStorage.getItem("CurrentStep"), 10);
        }

        // Assegno la tipologia "Privato" come tipologia di default appena si apre la pagina perche' altrimenti sarebbe uguale a stringa vuota
        if (this.newClient.typology === "") {
            this.newClient.typology = "Privato";
        }
    }
}
</script>

<template>

    <div class="first-step">

        <!-- Parte sinistra step 1 con gl input -->
        <div class="first-step-left">

            <div v-if="newClient.typology === 'Privato'">
                <input type="text" name="name" v-model="newClient.name" placeholder="Nome *" @input="filterNumbers"
                    title="Inserisci il nome" maxlength="64" required>
                <input type="text" name="surname" v-model="newClient.surname" placeholder="Cognome *"
                    title="Inserisci il cognome" @input="filterNumbers" maxlength="64" required>
            </div>

            <div v-else>
                <input type="text" name="agency_name" v-model="newClient.agency_name" placeholder="Nome Azienda *"
                    title="Inserisci il nome dell'azienda" maxlength="64" required>
                <input type="text" name="vat_number" v-model="newClient.vat_number" placeholder="Partita Iva *"
                    maxlength="11" title="Inserisci la Partita Iva" @input="filterCharacters" required>
            </div>

            <input type="email" name="client_email" v-model="newClient.client_email" placeholder="E-mail *"
                title="Inserisci l'email" maxlength="64" required>
            <input type="email" name="confirm_client_email" v-model="newClient.confirm_client_email"
                placeholder="Conferma e-mail *" maxlength="64" title="Conferma l'email" required>

            <!-- Messaggio che fa capire se le email coincidono oppure no -->
            <div v-if="showMessageEmailConfirm !== ''"
                :class="showMessageEmailConfirm ? 'message-green' : 'message-red'">
                {{ emailConfirmMessage }}
            </div>

            <!-- <div v-else-if="(!newClient.client_email.includes('@') ||
!newClient.confirm_client_email.includes('@')) && newClient.client_email && newClient.confirm_client_email"
class="message-red">
Le email devono avere il formato corretto
</div> -->

            <input type="text" name="telephone_number" v-model="newClient.telephone_number" placeholder="Telefono *"
                minlength="10" maxlength="10" @input="filterCharacters" title="Inserisci il numero di telefono"
                required>
            <input type="text" name="city_of_residence" v-model="newClient.city_of_residence" placeholder="Comune *"
                title="Inserisci il comune" @input="filterNumbers" maxlength="64" required>

            <div class="obligatory">
                i campi contrassegnati con &ast; sono obbligatori
            </div>
        </div>

        <!-- Parte destra step 1 con gli input radio e il bottone completa i dati -->
        <div class="first-step-right">
            <div class="radios">
                <label>
                    <input type="radio" name="typology" value="Privato" v-model="newClient.typology"
                        @change="resetInputs" checked>
                    Privato
                </label>

                <label>
                    <input type="radio" name="typology" value="Azienda" v-model="newClient.typology"
                        @change="resetInputs">
                    Azienda
                </label>
            </div>

            <!-- Bottone completa i dati -->
            <div class="form-button">
                <input type="submit" @click="clientSubmit" class="button" value="Completa i dati">
            </div>

        </div>

        <!-- Messaggio d'errore -->
        <div v-if="store.showError" class="error-axios">
            Si &egrave; verificato un errore. Aggiorna la pagina e riprova.
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;




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
        min-height: 336px;

        input[type] {
            margin: 12px 0;
            background: #fff;
            width: 280px;
            padding: 6px 12px 20px 12px;
            border: 0;
            font-size: 0.9rem;
            outline: none;
            color: #000;
            display: block;

            &:first-child {
                margin: 6px 0 12px 0;
            }

            &:nth-child(2n+5) {
                margin: 12px 0 6px 0;
            }
        }

        .message-green {
            color: green;
        }

        .message-red {
            color: red;
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
        max-height: 328px;

        input[type='submit'] {
            font-weight: 600;
            font-size: 1.4rem;
            letter-spacing: normal;
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
            cursor: pointer;
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

@media only screen and (min-width: 300px) and (max-width: 580px) {

    .first-step {
        .first-step-right {
            .form-button {
                .button {
                    width: 184px;
                    font-size: 0.8rem;
                    padding: 10px 0;
                }
            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 700px) {



    .first-step {
        width: 100%;
        position: relative;

        .first-step-left {
            margin: 0 auto;
            width: 380px;
            padding-top: 30px;

            input[type] {
                width: 100%;
            }
        }

        .first-step-right {
            padding-top: 65px;
            width: 380px;
            margin: 0 auto;

            .radios {
                position: absolute;
                top: 25px;
            }

            label {
                top: 0;
                font-size: 0.9rem;
                display: inline-block;

                &:last-child {
                    padding-left: 30px;
                }
            }

            input[type="submit"] {
                font-size: 1.1rem;
                top: 0;
                margin: 0 auto;
                display: block;
            }
        }
    }
}
</style>
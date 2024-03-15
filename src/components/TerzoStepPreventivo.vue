<script>

// Importo store
import { store } from '../store';


// Importo axios
import axios from 'axios';

export default {
    name: 'TerzoStepPreventivo',
    props: {
        getOrder: {
            type: Function,
            required: true,
        },
        getClient: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            store,

            telephone_number: "",

            // Per mostrare o nascondere schermata di modifica ordine nel terzo step, nella modifica dei dati del cliente
            editClientInfo: false,

            // Oggetto di appoggio per salvarmi i dati di client se nella modifica dei dati l'utente sceglie di non confermare le modifiche effettuate, in questo modo i dati nel dom non vengono aggiornati, come invece accadrebbe senza questo oggetto
            oldClient: {
                typology: "",
                name: "",
                surname: "",
                agency_name: "",
                vat_number: "",
                client_email: "",
                confirm_client_email: "",
                telephone_number: "",
                city_of_residence: ""
            },


            // Elenco tipologie cliente
            clientTypologies: [
                "Privato",
                "Azienda"
            ]
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        // Modifico il nome del modello
        changeNameModel(model) {
            // Prima lettera maiuscola + elimino le parentesi tonde, il loro contenuto e l'ultimo spazio che rimane con trimRight
            model = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase().replace(/(\([^)]*\)|\d+)/g, "").trimRight();

            // Se model termina con un punto
            if (model.endsWith(".")) {
                // Faccio in modo di eliminare le lettere in modo che rimangano "Sonia D.G." a "Alba D.G."
                let albaAndSonia = model.charAt(0).toUpperCase() + model.toLowerCase().slice(1, -4) + model.slice(-4).toUpperCase();

                return albaAndSonia;
            }

            return model;
        },
        // Per torna indietro dallo step 3 allo step 2
        prevStep() {
            // Decremento il valore di currentStep
            this.store.currentStep--;

            // Aggiorno valore currentStep in localStorage
            sessionStorage.setItem("CurrentStep", this.store.currentStep.toString());
        },

        // Metodo per farmi apparire schermata di modifica dei dati del cliente nel terzo step
        showInfoClient(client) {

            //document.body.classList.add("active-edit");

            // Salvo i dati di oldClient su client
            for (const key in client) {
                this.oldClient[key] = client[key];
            }

            // Mostro la schermata di modifica dei dati
            this.editClientInfo = true;
        },
        // Nascondo schermata di modifica dei dati nel terzo step
        hideInfoClient(client) {

            //document.body.classList.remove("active-edit");

            // Salvo dati di client su oldClient
            for (const key in client) {
                client[key] = this.oldClient[key];
            }

            // nascondo la schermata di modifica dei dati
            this.editClientInfo = false;

        },
        // Metodo per modificare i dati del cliente nel terzo step, dopo aver premuto bottone "Aggiorna dati"
        editInfoClient(client) {

            // thirdStepValid inizialmente a false
            let thirdStepValid = false;

            // enableButtonThirdStep inizialmente a false
            let enableButtonThirdStep = false;

            // Se email, numero di telefono e comune non hanno spazi vuoti all'inizio alla fine e se email contiene una @ allora assegno true a enableButtonThirdStep
            if (client.client_email.trim() !== "" && client.telephone_number.trim() !== "" && client.city_of_residence.trim() !== "" && client.client_email.includes("@")) {
                enableButtonThirdStep = true;
            }

            // Se la tipologia e' "Privato" i campi che non devono rimanere vuoti sono nome, cognome + quelli sopra
            if (client.typology === "Privato") {
                if (client.name.trim() !== "" && client.surname.trim() !== "" && enableButtonThirdStep) {
                    thirdStepValid = true;
                }
            }
            // Se la tipologia e' "Azienda" i campi che non devono rimanere vuoti sono nome azienda, partita iva + quelli sopra
            else if (client.typology === "Azienda") {
                if (client.agency_name.trim() !== "" && client.vat_number.trim() !== "" && enableButtonThirdStep) {
                    thirdStepValid = true;
                }
            }

            // Se thirdStepValid e' true allora si puo' procedere con la modifica
            if (thirdStepValid) {

                /* typology: client.typology,
                name: client.name,
                surname: client.surname,
                agency_name: client.agency_name,
                vat_number: client.vat_number,
                client_email: client.client_email,
                confirm_client_email: client.client_email,
                telephone_number: client.telephone_number,
                city_of_residence: client.city_of_residence */

                // Chiamata api per modificare i dati del cliente
                axios.post(this.store.apiUrl + 'infoClients/update/' + this.store.clientId, client)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        // Se success = true richiamo getClient, aggiorno dati cliente
                        if (success) {
                            // Aggiorno i dati
                            this.getClient();
                        }

                    })
                    .catch(error => console.error(error));

                // Nascondo la schermata di modifica dei dati dopo averli modificati
                this.editClientInfo = false;
                //document.body.classList.remove("active-edit");

            }
        },
        // Metodo per inviare il preventivo tramite email (passo dallo step 3 allo step 4)
        sendEmail() {

            // Assegno email destinatario
            //this.newEmail.ownerEmail = "oirelav95@gmail.com";

            // Assegno email cliente
            //this.newEmail.clientEmail = this.newClient.email;
            //this.newEmail.order_id = this.clientId;

            // Chiamata API per inviare email con le informazioni del preventivo
            axios.post(this.store.apiUrl + 'email/' + this.store.clientId, this.newEmail)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    if (success) {
                        console.log("Email inviata con successo");
                    }
                })
                .catch(error => console.error(error)); // error.response.data

            // Incremento currentStep
            this.store.currentStep++;

            // Salvo valore di currentStep in localStorage
            sessionStorage.setItem("CurrentStep", this.store.currentStep.toString());

            // Scrollo verso l'alto
            this.scrollToTop();
        },

        // Impedisco che questi campi possano contenere lettere e simboli
        filterCharacters(client) {
            client.telephone_number = client.telephone_number.replace(/\D/g, '');

            if (client.typology === 'Azienda') {
                client.vat_number = client.vat_number.replace(/\D/g, '');
            }
        },
        // Impedisco che questi campi possano contenere dei numeri
        filterNumbers(client) {
            client.name = client.name.replace(/[0-9]/g, '');
            client.surname = client.surname.replace(/[0-9]/g, '');
            client.city_of_residence = client.city_of_residence.replace(/[0-9\s]/g, '');
        },
    },
    mounted() {
        this.getClient();
        this.getOrder();
    }
}
</script>

<template>
    <!-- Inizio terzo step -->
    <div class="third-step">
        <!-- Titolo -->
        <h2>
            Ecco a te il riepilogo
        </h2>

        <!-- Riepilogo info cliente -->
        <div v-if="!editClientInfo">
            <ul v-for="client in store.clients" :key="client.id" class="summary info">
                <li>
                    {{ client.typology }}
                    <hr>
                </li>
                <li v-if="client.typology === 'Privato'">
                    Nome: {{ client.name }}
                </li>
                <li v-if="client.typology === 'Privato'">
                    Cognome: {{ client.surname }}
                </li>
                <li v-if="client.typology === 'Azienda'">
                    Nome Azienda: {{ client.agency_name }}
                </li>
                <li v-if="client.typology === 'Azienda'">
                    Partita Iva: {{ client.vat_number }}
                </li>
                <li>
                    Email: {{ client.client_email }}
                </li>
                <li>
                    Telefono: {{ client.telephone_number }}
                </li>
                <li>
                    Comune: {{ client.city_of_residence }}
                </li>
                <li class="li-button">
                    <button @click="showInfoClient(client)" v-if="!editClientInfo">Modifica dati
                        cliente</button>
                </li>
            </ul>
        </div>


        <!-- Parte con modificato dei dati del cliente -->
        <div v-if="editClientInfo">
            <ul v-for="client in store.clients" :key="client.id" class="summary info edit">
                <li>
                    <!-- Select tipologia - Privato o Azienda -->
                    <select v-model="client.typology" title="Modifica la tipologia">
                        <option v-for="(typology, typoIndex) in clientTypologies" :key="typoIndex"
                            :selected="client.typology === typology">
                            {{ typology }}
                        </option>
                    </select>
                    <hr>
                </li>
                <li v-if="client.typology === 'Privato'">
                    <!-- Input nome -->
                    <label>
                        Nome:
                        <input name="name" type="text" v-model="client.name" :id="client.id" maxlength="64"
                            @input="filterNumbers(client)" title="Modifica il nome" required>
                    </label>
                </li>
                <li v-if="client.typology === 'Privato'">
                    <!-- Input cognome -->
                    <label>
                        Cognome:
                        <input type="text" name="surname" v-model="client.surname" :id="client.id" maxlength="64"
                            @input="filterNumbers(client)" title="Modifica il cognome" required>
                    </label>
                </li>
                <li v-if="client.typology === 'Azienda'">
                    <!-- Input nome azienda -->
                    <label>
                        Nome Azienda:
                        <input type="text" name="agency_name" v-model="client.agency_name" :id="client.id"
                            maxlength="64" title="Modifica il Nome Azienda" required>
                    </label>
                </li>
                <li v-if="client.typology === 'Azienda'">
                    <!-- Input partita iva -->
                    <label>
                        Partita Iva:
                        <input type="text" name="vat_number" v-model="client.vat_number" :id="client.id" maxlength="11"
                            @input="filterCharacters(client)" title="Modifica la Partita Iva" required>
                    </label>
                </li>
                <li>
                    <!-- Input email -->
                    <label>
                        Email:
                        <input type="email" name="client_email" v-model="client.client_email" :id="client.id"
                            maxlength="64" title="Modifica l'email" required>
                    </label>
                </li>
                <li>
                    <!-- Input numero di telefono -->
                    <label>
                        Telefono:
                        <input type="text" name="telephone_number" v-model="client.telephone_number" :id="client.id"
                            @input="filterCharacters(client)" maxlength="10" title="Modifica il numero di telefono"
                            required>
                    </label>
                </li>
                <li>
                    <!-- Input comune -->
                    <label>
                        Comune:
                        <input type="text" name="city_of_residence" v-model="client.city_of_residence" :id="client.id"
                            @input="filterNumbers(client)" title="Modifica il Comune" required>
                    </label>
                </li>

                <!-- Bottoni Annulla e Aggiorno dati -->
                <li class="li-button">
                    <button class="cancel" @click="hideInfoClient(client)">
                        Annulla
                    </button>

                    <input class="update" type="submit" @click="editInfoClient(client)" value="Aggiorna dati">
                </li>
            </ul>
        </div>



        <!-- Riepilogo info ordine -->
        <ul v-for=" order in store.orders" :key="order.id" class="summary">
            <!-- Nome modello e tipologia rete -->
            <li>
                Modello zanzariera: {{ changeNameModel(order.model_name) }} - {{ order.net }}
            </li>
            <!-- Colore -->
            <li>
                Colore: {{ order.color_name }}
            </li>
            <!-- Quantita' -->
            <li>
                Quantit&agrave;: {{ order.quantity }}
            </li>
            <!-- Larghezza e altezza -->
            <li>
                Misure: L: {{ order.width }}cm x H: {{ order.height }}cm
            </li>
        </ul>

        <!-- Messaggio -->
        <ul>
            <li v-for="mess in store.clients" :key="mess.id" class="summary">
                <span v-if="mess.message">
                    Messaggio: {{ mess.message }}
                </span>

                <span v-else>
                    Messaggio: Non hai scritto nessun messaggio
                </span>
            </li>
        </ul>

        <!-- Bottone per proseguire con lo step successivo -->
        <div class="form-button">
            <button @click="prevStep" class="button">
                <span>
                    Torna indietro
                </span>
            </button>
            <input type="submit" @click="sendEmail" class="button" value="Completa">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;




// TERZO STEP
.third-step {
    background-color: #ADADAD;
    padding-top: 20px;
    margin: 50px 0;
    position: relative;

    button {
        margin-right: 20px;

        span {
            font-weight: 500;
        }
    }

    h2 {
        padding-bottom: 30px;
        text-align: center;
    }

    .summary {
        background-color: #d9d9d9;
        padding: 20px;
        max-width: 700px;
        margin: 0 auto;

        &.info {
            pointer-events: auto;
        }

        .li-button {
            margin-top: 10px;

            input,
            button {
                cursor: pointer;

            }

            .cancel {
                background: #686868;
                color: #fff;
                margin-right: 10px;
            }
        }

        button,
        input,
        select {
            background-color: #fff;
            padding: 7px;
            border: 1px solid #686868;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: 500;
            outline: none;
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

@media only screen and (min-width: 300px) and (max-width: 840px) {


    .third-step {
        margin: 0;

        .summary {
            margin: 0 30px;
            font-size: 0.9rem;

            li {

                .update {
                    width: 130px;
                }

                input {
                    font-size: 0.9rem;
                    width: 170px;
                }

                button {
                    font-size: 0.9rem;
                    margin: 5px auto;
                }

                hr {
                    width: 60%;
                }
            }
        }

        .form-button {
            width: 100%;
            top: 25px;

            button,
            input {
                font-size: 1.1rem;
                margin: 0 auto;
                padding: 10px 20px;
                margin: 4px;
            }

            input {
                padding: 10px 40px;
            }
        }
    }
}
</style>
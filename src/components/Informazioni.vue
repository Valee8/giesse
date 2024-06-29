<script>
// Importo axios
import axios from 'axios';

// Importo store
import { store } from '../store';

export default {
    name: 'Informazioni',
    data() {
        return {
            store,
            // Scritta che appare se nessuna immagine e' stata allegata
            textFiles: "Nessun file selezionato",
            // loading inizialmente a false per non far apparire la scritta "Invio in corso, attendere..."
            loading: false,
            // ShowError inizialmente a false per non far apparire il messaggio d'errore
            showError: false,
            // Messaggio che avvisa che i formati dei file non sono validi
            messageFormats: "",
            // Messaggio che avvisa che le dimensioni dei file sono eccessive
            messageSizes: "",
            // Messaggio di avvenuto successo di invio dell'email
            messageSuccess: "",
            // Contiene i file allegati
            files: [],
            // Abilito pulsante invia a seconda che enableButton sia true o false
            enableButton: false,
            // Oggetto che contiene le informazioni per chiamata API
            newInfo: {
                // Tipologia (Privato o Azienda)
                typology: "",
                // Nome
                name: "",
                // Cognome
                surname: "",
                // Nome Azienda
                agency_name: "",
                // Partita iva
                vat_number: "",
                // Numero di telefono
                telephone_number: "",
                // Email cliente/azienda
                client_email: "",
                // Files allegati
                attached_files: [],
                // Messaggio
                message: "",
                // Email destinatario
                owner_email: "",
            },
            // Contiene elenco formati accettati per i file allegati
            formats: [
                ".png",
                ".jpg",
                ".jpeg",
                ".docx",
                ".pdf"
            ]
        }
    },
    computed: {
        // Verifico che i campi del form non siano vuoti, se non lo sono ritorno true altrimenti false
        firstStepValid() {
            // Se numero di telefono, email e messaggio non sono vuoti allora assegno true a enableButton
            if (this.newInfo.telephone_number.trim() !== "" && this.newInfo.client_email.trim() !== "" && this.newInfo.message !== "" && this.newInfo.client_email.includes("@")) {
                this.enableButton = true;
            }

            // Se la tipologia e' "Privato" i campi che non devono rimanere vuoti sono nome, cognome + quelli sopra (numero di telefono, email e messaggio)
            if (this.newInfo.typology === "Privato") {
                if (this.newInfo.name.trim() !== "" && this.newInfo.surname.trim() !== "" && this.enableButton) {
                    return true;
                }
            }
            // Se la tipologia e' "Azienda" i campi che non devono rimanere vuoti sono nome azienda, partita iva + quelli sopra (numero di telefono, comune e messaggio)
            else if (this.newInfo.typology === "Azienda") {
                if (this.newInfo.agency_name.trim() !== "" && this.newInfo.vat_number.trim() !== "" && this.enableButton) {
                    return true;
                }
            }
            return false;
        },
    },
    methods: {
        // Metodo che prende il contenuto dei file allegati
        onFileChange(e) {
            this.files = e.target.files;

            // Ogni volta che scelgo i file allegati devo svuotare il contenuto dei messaggi altrimenti rimarrebbero
            this.messageSizes = "";
            this.messageFormats = "";

            if (this.files.length === 1) {
                this.textFiles = this.files[0].name;
            }
            else if (this.files.length > 1) {
                this.textFiles = this.files.length + " file";
            }


            // Scorro l'array files
            for (let i = 0; i < this.files.length; i++) {

                // Assegno a fileName il nome dei file
                const fileName = this.files[i].name;

                // Se la dimensione dei file convertita a intero e' maggiore di 15 MB (15728640 byte)
                if (parseInt(this.files[i].size) > 15728640) {
                    // Aggiungo il messaggio corrispondente
                    this.messageSizes = "Dimensioni per questo file troppo grandi";
                }

                // Faccio un confronto tra l'array formats e la parte finale dei nomi dei file presenti in files
                // Quindi controllo che i formati accettabili siano solo quelli di formats
                if (!this.formats.some(format => fileName.endsWith(format))) {
                    // Se non coincidono allora aggiungo il messaggio corrispondente
                    this.messageFormats = "Formato del file non valido";
                    break;  // Esco dal ciclo se il formato non e' valido
                }
            }

        },
        // Metodo per svuotare file allegati, i messaggi di errore e il contenuto dei files
        deleteAttached() {

            this.$refs.fileInput.value = "";

            this.messageSizes = "";
            this.messageFormats = "";
            this.files = [];

        },
        // Metodo per inviare l'email
        sendEmail() {

            // Se firstStepValid e' uguale a true (i campi non sono vuoti)
            if (this.firstStepValid) {

                // Se l'array files ha dei contenuti
                if (this.files.length > 0) {
                    // Creo nuovo oggetto vuoto formData
                    const formData = new FormData();
                    //formData.append('files', this.files);

                    // Aggiunto dati di modulo a formData in coppia chiave-valore
                    for (let i = 0; i < this.files.length; i++) {
                        formData.append('files', this.files[i]);
                    }

                    // Chiamata API per inviare file allegati da frontend a backend
                    axios.post(this.store.apiUrl + 'uploadFile', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                        .then((res) => {

                            console.log(res);

                        })
                        .catch(error => console.error(error));

                }

                // Assegno ad attached_files il nome dei file allegati sostituendo eventuali spazi nel nome con stringa vuota
                for (let i = 0; i < this.files.length; i++) {
                    this.newInfo.attached_files[i] = this.files[i].name.replace(/\s/g, '');
                }

                // Assegno l'email del destinatario
                this.newInfo.owner_email = "oirelav95@gmail.com";

                // loading a true e faccio apparire la scritta "Invio in corso, attendere..."
                this.loading = true;

                // Chiamata api per inviare le informazioni inserire dall'utente
                axios.post(this.store.apiUrl + 'information/store', this.newInfo)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;
                        const response = data.response;


                        if (success) {

                            // Chiamata api per salvarmi i file allegati e l'email del destinatario (response.id contiene l'id del messaggio)
                            axios.post(this.store.apiUrl + 'message/' + response.id, {
                                attached_files: this.newInfo.attached_files,
                                owner_email: this.newInfo.owner_email
                            })
                                .then(res => {
                                    const data = res.data;
                                    const success = data.success;

                                    // Se e' tutto andato a buon fine assegno il messaggio corrispondente
                                    if (success) {
                                        this.messageSuccess = "Messaggio inviato con successo!";

                                        // La pagina si ricarica da sola dopo 1 secondo
                                        setTimeout(() => {
                                            location.reload();
                                        }, 2000);
                                    }

                                })
                                .catch(error => console.error(error)); // error.response.data
                        }

                    })
                    .catch(error => {
                        console.error(error);
                        // Se ci sono stati errori allora showError a true in modo da far apparire il messaggio d'errore
                        this.showError = true;

                    });
            }
        },
        // PreventDefault per evitare che la pagina ricarichi con l'invio del form
        handleSubmit(event) {
            event.preventDefault();
        },
        // Impedisco che questi campi possano contenere dei numeri
        filterNumbers() {
            this.newInfo.name = this.newInfo.name.replace(/[0-9\s]/g, "");
            this.newInfo.surname = this.newInfo.surname.replace(/[0-9\s]/g, "");
        },
        // Impedisco che questi campi possano contenere lettere e simboli
        filterCharacters() {
            this.newInfo.telephone_number = this.newInfo.telephone_number.replace(/\D/g, "");
            this.newInfo.vat_number = this.newInfo.vat_number.replace(/\D/g, "");
        },
        // Svuoto contenuto campi se si cambia tipologia 
        resetCommonInputs() {
            if (this.newInfo.typology) {
                this.newInfo.name = "";
                this.newInfo.surname = "";
                this.newInfo.agency_name = "";
                this.newInfo.vat_number = "";
                this.newInfo.message = "";
                this.newInfo.telephone_number = "";
                this.newInfo.client_email = "";
                //this.files = [];
                //this.$refs.fileInput.value = "";
            }
        },
    },
    created() {
        // Assegno la tipologia "Privato" come tipologia di default appena si apre la pagina perche' altrimenti sarebbe uguale a stringa vuota
        if (this.newInfo.typology === "") {
            this.newInfo.typology = "Privato";
        }
    },
    updated() {
        // Se files non contiene elementi (quindi quando vengono rimossi i file allegati) aggiorno la scritta textFiles
        if (this.files.length === 0) {
            this.textFiles = "Nessun file selezionato";
        }
    }
}
</script>

<template>
    <div class="info">
        <!-- Messaggio di invio email avvenuto con successo -->
        <div v-if="messageSuccess !== ''" class="message-ok">
            {{ messageSuccess }} <i class="fa-solid fa-circle-check"></i>
        </div>

        <!-- Inizio contenuto Informazioni -->
        <div v-else>
            <!-- Titolo -->
            <h2>
                Informazioni sui prodotti
            </h2>

            <!-- Container -->
            <div class="container">
                <!-- Form -->
                <form @submit="handleSubmit" enctype="multipart/form-data">
                    <!-- Parte sinistra -->
                    <div class="left">

                        <!-- Input radio con tipologie (Privato e Azienda) -->
                        <div class="radios">
                            <label>
                                <input type="radio" name="typology" value="Privato" v-model="newInfo.typology"
                                    @change="resetCommonInputs" checked>
                                Privato
                            </label>

                            <label>
                                <input type="radio" name="typology" value="Azienda" v-model="newInfo.typology"
                                    @change="resetCommonInputs">
                                Azienda
                            </label>
                        </div>

                        <!-- Input in alto -->
                        <div class="inputs-top">
                            <div v-if="newInfo.typology === 'Privato'">
                                <input type="text" name="name" class="first-input" v-model="newInfo.name"
                                    placeholder="Nome *" @input="filterNumbers" title="Inserisci il nome" maxlength="64"
                                    required>
                                <input type="text" name="surname" class="second-input" v-model="newInfo.surname"
                                    placeholder="Cognome *" @input="filterNumbers" title="Inserisci il cognome"
                                    maxlength="64" required>
                            </div>
                            <div v-else>
                                <input type="text" name="agency_name" class="first-input" v-model="newInfo.agency_name"
                                    placeholder="Nome Azienda *" title="Inserisci il nome dell'azienda" maxlength="64"
                                    required>
                                <input type="text" name="vat_number" class="second-input" v-model="newInfo.vat_number"
                                    placeholder="Partita Iva *" maxlength="11" @input="filterCharacters"
                                    title="Inserisci la Partita Iva" required>
                            </div>
                        </div>

                        <!-- Input in basso -->
                        <div class="inputs-bottom">
                            <input type="text" name="telephone_number" class="first-input"
                                v-model="newInfo.telephone_number" placeholder="Telefono *" @input="filterCharacters"
                                title="Inserisci il numero di telefono" maxlength="10" required>
                            <input type="email" name="client_email" class="second-input" v-model="newInfo.client_email"
                                placeholder="E-mail *" title="Inserisci l'E-mail" maxlength="64" required>
                        </div>

                        <!-- Textarea -->
                        <textarea name="message" v-model="newInfo.message" rows="8" placeholder="Messaggio *" required
                            title="Inserisci il messaggio"></textarea>

                        <!-- Messaggio campi obbligatori -->
                        <div class="obligatory">&ast; Campi obbligatori</div>

                        <!-- Bottone INVIA -->
                        <div class="submit">
                            <button type="submit" @click.once="sendEmail"
                                :disabled="messageSizes !== '' || messageFormats !== ''">
                                Invia
                                <i class="fa-regular fa-envelope"></i></button>
                        </div>
                    </div>
                    <!-- Parte sinistra -->

                    <!-- Parte destra -->
                    <div class="right">
                        <div class="text-width">
                            <!-- Titolo -->
                            <h1>
                                <div class="border"></div>
                                <div>Scrivici</div>
                            </h1>

                            <!-- Altro titolo -->
                            <h4>
                                Allega un file
                            </h4>

                            <!-- Paragrafo -->
                            <p>
                                &Egrave; possibile allegare un file con i seguenti formati .png, .jpg, .jpeg, .docx,
                                .pdf
                                dimensione massima 15MB
                            </p>

                            <!-- Input per allegare i file -->
                            <div class="file">
                                <input type="file" @change="onFileChange" ref="fileInput" id="file"
                                    name="attached_files[]" accept=".png, .jpg, .jpeg, .docx, .pdf" multiple>
                                <div class="text-file">
                                    {{ textFiles }}
                                </div>
                            </div>

                            <!-- Scritta rimuovi allegati -->
                            <div @click="deleteAttached" v-if="files.length > 0" class="delete-attached">
                                Rimuovi file allegato
                            </div>

                            <!-- Messaggio di errore se l'allegato non rispetta le dimensioni -->
                            <div class="error">
                                {{ messageSizes }}
                            </div>

                            <!-- Messaggio di errore se l'allegato non rispetta i formati -->
                            <div class="error">
                                {{ messageFormats }}
                            </div>

                            <!-- Messaggio che appare se l'allegato non rispetta i formati e/o le dimensioni -->
                            <div v-if="messageSizes || messageFormats" class="error">
                                Per inviare il messaggio devi modificare il file allegato
                            </div>
                        </div>
                        <!-- Parte destra -->

                    </div>
                    <!-- Parte destra -->

                    <!-- Messaggio di errore se il messaggio non e' stato inviato e ci son stati problemi -->
                    <div class="messages">
                        <div v-if="showError" class="error-axios">
                            Si &egrave; verificato un errore. Aggiorna la pagina e riprova.
                        </div>

                        <!-- Messaggio di invio in corso del messaggio -->
                        <div v-if="loading && !showError">
                            Invio in corso, attendere...
                        </div>
                    </div>

                </form>
                <!-- Fine Form -->

            </div>
            <!-- Container -->

        </div>
        <!-- Fine contenuto Informazioni -->

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

    .message-ok {
        color: green;
    }

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
        flex-wrap: wrap;

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

            .file {
                position: relative;
                font-size: 0.85rem;
                cursor: default;
            }


            #file {
                font-family: 'Montserrat', sans-serif;
                background: #000;
                color: #fff;
                border-bottom: 2px solid $yellow-color;
                width: 100%;
                padding: 10px 8px;
                font-size: 0;
            }


            input::file-selector-button {
                font-family: 'Montserrat', sans-serif;
                background-color: $yellow-color;
                padding: 3px 11px;
                font-size: 0.9rem;
                //margin-right: 122px;
                border: 0;
                cursor: pointer;
                //margin-left: 8px;
            }

            .text-file {
                position: absolute;
                right: 8px;
                line-height: 45px;
                height: 45px;
                top: 0;
                max-width: 180px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .error {
                color: red;
                font-size: 0.8rem;
                padding: 1px 0;
            }

            .delete-attached {
                font-size: 0.9rem;
                margin-top: 10px;
                cursor: pointer;
                color: $yellow-color;
                width: 90%;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .left,
        .right {
            width: 45%;
        }

        .messages {
            padding-top: 30px;
            width: 100%;

            .error-axios {
                color: red;
                font-size: 0.9rem;
            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 480px) {

    .info {
        form {

            .right {
                .file {
                    width: 265px;
                    font-size: 0.7rem;
                }

                .text-file {
                    max-width: 130px;
                }
            }

            .radios {
                font-size: 0.8rem;
            }

            .messages {
                padding-top: 0;
                order: -1;
                padding-bottom: 30px;
            }
        }
    }
}

@media only screen and (min-width: 480px) and (max-width: 600px) {

    .info {
        form {

            .messages {
                padding-top: 0;
                order: -1;
                padding-bottom: 30px;
            }
        }
    }
}

@media only screen and (min-width: 480px) and (max-width: 900px) {

    .info {
        form {
            .right {

                .file {
                    width: 400px;
                    font-size: 0.8rem;
                }
            }
        }
    }
}

// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 300px) and (max-width: 900px) {
    .info {
        form {

            .left,
            .right {
                width: 100%;
            }
        }
    }
}

@media only screen and (min-width: 900px) and (max-width: 1000px) {
    .info {
        form {
            .right {

                .file {
                    width: 300px;
                    font-size: 0.8rem;
                }
            }
        }
    }
}

@media only screen and (min-width: 1001px) and (max-width: 1324px) {
    .info {

        form {
            .right {
                .file {
                    width: 340px;
                    font-size: 0.8rem;
                }
            }
        }
    }

}

// Fine versioni mobile, tablet e intermedie</style>
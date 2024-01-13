<script>

// Imposto store
import { store } from '../store.js';

// Importo axios
import axios from 'axios';

const imagePrefix = process.env.NODE_ENV === 'production' ? '/giesse/' : '/';

// URL per la chiamata API
const API_URL = 'http://localhost:8000/api/v1/';

export default {
    name: 'Preventivo',
    data() {
        return {
            textSuccessMessage: "",

            enableEditDeleteButtons: false,

            // store (dall'import di store.js)
            store,
            // activePopup - Per verificare che un popup sia presente, in questo modo posso bloccare il contenuto attorno al popup e non far interagire l'utente con nient'altro nella pagina fino a quando il popup non scompare
            activePopup: false,

            // (da controllare domani) - per sovrapporre con z-index il popup dell'ordine selezionato agli altri popup tramite css (ne appare uno per ogni ordine, hanno position: absolute quindi sono uno sopra l'altro)
            checkIdOrders: null,

            // Oggetto di appoggio per salvarmi i dati di order se nella modifica dei dati l'utente sceglie di non confermare le modifiche effettuate, in questo modo i dati nel dom non vengono aggiornati, come invece accadrebbe senza questo oggetto
            oldOrder: {
                typology: "",
                model_name: "",
                net: "",
                width: "",
                height: "",
                quantity: "",
                color_name: ""
            },
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

            // showSelectModelText per mostrare e nascondere la scritta "Seleziona il modello" durante la modifica dei dati, appare una volta che l'utente ha scelto una tipologia
            showSelectModelText: false,

            // Per salvarmi l'id di order in modo che se premo il tasto 'modifica' per la modifica di un ordine mi appaia l'ordine selezionato
            showEditInputs: null,

            // Inizio dati per mostrare o nascondere i popup
            showDeleteItemPopup: false,
            showUpdateItemPopup: false,
            showCancelUpdateItemPopup: false,

            // Per mostrare il popup se aggiungo una zanzariera
            showAddedItemPopup: false,

            // Fine dati per mostrare o nascondere i popup

            enableButtonThirdStep: false,

            editClientInfo: false,

            // Messaggio di errore se l'invio dei dati (sia step 1 per il cliente, sia step2 per gli ordini) non e' andato a buon fine
            showError: false,
            // Mi salvo l'id di client
            clientId: "",
            // Per mostrare il tipo di rete a seconda del modello selezionato tramite lo slider (alcune non hanno oscuranti e li nascondo showNet = false)
            showNet: true,
            // Per mostrare il tipo di rete a seconda del modello selezionato quando sono nella modifica dei dati (alcune non hanno oscuranti e li nascondo showNetEditItem = false)
            showNetEditItem: true,
            // Per far apparire il messaggio se le e-mail coincidono o no
            showMessageEmailConfirm: "",
            // fixRequiredProblem: Per risolvere il problema del messaggio predefinito del browser che mi chiede di selezionare un modello dallo slider (mi dice che il dato da inserire e' obbligatorio quando non dovrebbe)
            fixRequiredProblem: false,
            // Per verificare che ci siano le condizioni per passare dallo step 2 allo step 3
            secondStepValid: false,
            // Step corrente del preventivo
            currentStep: 1,
            // Abilito pulsante invia a seconda che enableButton sia true o false
            enableButtonFirstStep: false,
            // Oggetto che contiene le informazioni di un cliente
            newClient: {
                // Tipologia (Privato o Azienda)
                typology: "",
                // Nome
                name: "",
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
            // Oggetto che contiene le informazioni della zanzariera
            newOrder: {
                typology: "",
                // Nome modello
                model_name: "",
                // Larghezza
                width: "",
                // Altezza
                height: "",
                // Quantita'
                quantity: "",
                // Tipo di rete
                net: "",
                // Nome colore
                color_name: "",
                // Immagine colore
                color_image: "",
                // Id del cliente
                client_id: ""
            },
            // Array contenente i dati del cliente
            clients: [],
            // Array contenente i dati dell'ordine
            orders: [],
            // Contiene messaggio inserito dall'utente nell'ordine
            message: "",
            // Elenco zanzariere
            zanzs: [
                {
                    name: "Verticali a molla classica",
                    typo: "Verticali",
                    image: imagePrefix + "img/zanzariere/alba.png",
                    active: true,
                    activeSelect: false,
                    models: [
                        "ALBA D.G. (guida telescopica, con cuffie)",
                        "SONIA D.G. (guida telescopica, senza cuffie)",
                        "GENNY (guida telescopica, cassonetto da 40mm)",
                        "GIUSY (guida singola, con cuffie)",
                        "ELENA (guida singola, senza cuffie)",
                        "EDDI (guida singola, cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Verticali a molla (cricchetto)",
                    typo: "Verticali",
                    image: imagePrefix + "img/zanzariere/laura.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "LAURA (con cuffie)",
                        "EVA (senza cuffie)",
                        "ASIA (cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Verticali a catena classica",
                    typo: "Verticali",
                    image: imagePrefix + "img/zanzariere/katia.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "KATIA D.G. (guida telescopica, con cuffie)",
                        "VERA (guida telescopica, senza cuffie)",
                        "SARA (guida singola, senza cuffie)"
                    ]
                },
                {
                    name: "Verticali a catena + molla",
                    typo: "Verticali",
                    image: imagePrefix + "img/zanzariere/giada.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "GIADA (con cuffie)",
                        "MERI (senza cuffie)"
                    ]
                },
                {
                    name: "Laterali a molla classica",
                    typo: "Orizzontali",
                    image: imagePrefix + "img/zanzariere/alba-laterale.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "TIPO ALBA (con cuffie)",
                        "TIPO SONIA (senza cuffie)",
                        "TIPO GENNY (cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Laterali a molla (guida bassa da 2cm)",
                    typo: "Orizzontali",
                    image: imagePrefix + "img/zanzariere/lara-rigata.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "LARA (con cuffie)",
                        "VALERIA (senza cuffie)",
                        "DESI (cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Laterale a molla (guida arrotondata da 14mm)",
                    typo: "Orizzontali",
                    image: imagePrefix + "img/zanzariere/luna.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "LUNA",
                    ]
                },
                {
                    name: "Laterale a molla (guida bassa da 3mm)",
                    typo: "Orizzontali",
                    image: imagePrefix + "img/zanzariere/zelig.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "ZELIG",
                    ]
                },
                {
                    name: "Laterale Frizionata",
                    typo: "Orizzontali",
                    image: imagePrefix + "img/zanzariere/jolly.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "JOLLY",
                        "LEVANTE"
                    ]
                },
                {
                    name: "Laterale Antivento",
                    typo: "Orizzontali",
                    image: imagePrefix + "img/zanzariere/bora.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "BORA",
                    ]
                },
                {
                    name: "Laterale Plissettata",
                    typo: "Orizzontali",
                    image: imagePrefix + "img/zanzariere/plisse-22.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "PLISSE' 22",
                    ]
                },
                {
                    name: "Porta a battente",
                    typo: "Altre",
                    image: imagePrefix + "img/zanzariere/porta-a-battente.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "ANTAREX",
                    ]
                },
                {
                    name: "A pannelli scorrevoli",
                    typo: "Altre",
                    image: imagePrefix + "img/zanzariere/scorri.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "SCORRI",
                    ]
                },
                {
                    name: "Telaio fisso",
                    typo: "Altre",
                    image: imagePrefix + "img/zanzariere/fissa.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "FISSA",
                    ]
                },
                {
                    name: "Incasso con guida da 50x35",
                    typo: "Altre",
                    image: imagePrefix + "img/zanzariere/casper.png",
                    active: false,
                    activeSelect: false,
                    models: [
                        "CASPER",
                    ]
                }
            ],
            // Elenco tipologie reti
            nets: [
                "Rete normale",
                "Rete rigata",
                "Oscurante bianco",
                "Oscurante nero",
            ],
            // Elenco tipologie cliente
            clientTypologies: [
                "Privato",
                "Azienda"
            ]
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
            // Se email, email di conferma, numero di telefono e comune non hanno spazi vuoti all'inizio alla fine e se email e email di conferma coincidono allora assegno true a enableButton
            if (this.newClient.client_email.trim() !== "" && this.newClient.confirm_client_email.trim() !== "" && this.newClient.telephone_number.trim() !== "" && this.newClient.city_of_residence.trim() !== "" && this.newClient.client_email === this.newClient.confirm_client_email && this.newClient.client_email.includes("@") && this.newClient.confirm_client_email.includes("@")) {
                this.enableButtonFirstStep = true;
            }

            // Se la tipologia e' "Privato" i campi che non devono rimanere vuoti sono nome, cognome + quelli sopra 
            if (this.newClient.typology === "Privato") {
                if (this.newClient.name.trim() !== "" && this.newClient.surname.trim() !== "" && this.enableButtonFirstStep) {
                    return true;
                }
            }
            // Se la tipologia e' "Azienda" i campi che non devono rimanere vuoti sono nome azienda, partita iva + quelli sopra
            else if (this.newClient.typology === "Azienda") {
                if (this.newClient.agency_name.trim() !== "" && this.newClient.vat_number.trim() !== "" && this.enableButtonFirstStep) {
                    return true;
                }
            }

            return false;
        },
        // Stampo nome sezione
        printNameSection() {
            for (let i = 0; i < store.linksNav.length; i++) {
                if (i === 0)
                    return store.linksNav[i].text;
            }
        }
    },
    methods: {
        prevStep() {
            // Incremento il valore di currentStep
            this.currentStep--;

            // Aggiorno valore currentStep in localStorage
            sessionStorage.setItem("CurrentStep", this.currentStep.toString());
        },
        changeTypology(typology) {
            let varTypology;
            if (typology.includes("(")) {
                varTypology = typology.replace(/(\([^)]*\)|\d+)/g, "");
            }
            else {
                varTypology = typology.replace(/[0-9]{1,2}$/, "");
            }

            return varTypology;
        },
        changeNameModel(model) {
            model = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase().replace(/(\([^)]*\)|\d+)/g, "").trimRight();

            if (model.endsWith(".")) {
                let albaAndSonia = model.charAt(0).toUpperCase() + model.toLowerCase().slice(1, -4) + model.slice(-4).toUpperCase();

                return albaAndSonia;
            }

            return model;
        },
        deleteItemPopup(order) {
            this.showDeleteItemPopup = true;

            this.activePopup = true;

            this.checkIdOrders = order.id;

        },
        updateItemPopup(order) {

            if (order.model_name.trim() !== "" && order.net.trim() !== "" && order.width.trim() !== "" && order.height.trim() !== "") {
                this.showUpdateItemPopup = true;

                this.activePopup = true;
            }

            this.checkIdOrders = order.id;

        },
        CancelUpdateItem() {
            this.showCancelUpdateItemPopup = false;
            this.activePopup = false;

            //document.body.classList.add("active-edit");
        },
        cancelUpdateItemPopup(order) {
            this.showCancelUpdateItemPopup = true;

            this.activePopup = true;

            this.checkIdOrders = order.id;

            //document.body.classList.remove("active-edit");

        },
        showEdit(order) {

            this.enableEditDeleteButtons = true;

            //document.body.classList.add("active-edit");

            for (const key in order) {
                this.oldOrder[key] = order[key];
            }

            this.showSelectModelText = false;

            for (let i = 0; i < this.zanzs.length; i++) {

                this.zanzs[i].activeSelect = false;

                if (order.typology.includes(this.zanzs[i].name)) {
                    this.zanzs[i].activeSelect = true;
                }
            }

            if (order.typology.includes(6) || order.typology.includes(7) || order.typology.includes(8) || order.typology.includes(9) || order.typology.includes(10)) {
                this.showNetEditItem = false;
                if (this.oldOrder.net.includes("Oscurante")) {
                    this.oldOrder.net = "Rete normale";
                }
            }
            else {
                this.showNetEditItem = true;
            }

            if (this.showEditInputs === order.id) {

                this.showEditInputs = null;
            }

            else {
                this.showEditInputs = order.id;
            }
        },
        hideEdit(order) {

            this.enableEditDeleteButtons = false;

            this.showEditInputs = null;

            this.activePopup = false;

            this.showCancelUpdateItemPopup = false;

            for (const key in this.oldOrder) {
                order[key] = this.oldOrder[key];
            }
        },
        selectTypo(event, order) {

            let typologyName = event.target.value;

            this.showSelectModelText = true;

            if (this.showSelectModelText) {
                order.model_name = "";
            }

            //console.log(event.target.options[event.target.selectedIndex].innerText);

            for (let i = 0; i < this.zanzs.length; i++) {

                this.zanzs[i].activeSelect = false;

                if (typologyName.includes(this.zanzs[i].name)) {
                    this.zanzs[i].activeSelect = true;
                }
            }

            if (typologyName.includes(6) || typologyName.includes(7) || typologyName.includes(8) || typologyName.includes(9) || typologyName.includes(10)) {
                this.showNetEditItem = false;
                if (order.net.includes("Oscurante")) {
                    order.net = "Rete normale";
                }
            }
            else {
                this.showNetEditItem = true;
            }
        },
        // getClient per ottenere i dati dei clienti
        getClient() {
            // Se clientId e' presente eseguo la chiama API
            if (this.clientId) {
                axios.get(API_URL + 'clients/' + this.clientId, {
                    headers: {
                        'ngrok-skip-browser-warning': 'skip-browser-warning'
                    }
                })
                    .then(res => {
                        const data = res.data;
                        const success = data.success;
                        const response = data.response;

                        if (success) {
                            this.clients = response.clients;
                        }

                    })
                    .catch(error => console.error(error));
            }
        },
        // getOrder per ottenere i dati degli ordini
        getOrder() {
            // Se clientId e' presente eseguo la chiama API
            if (this.clientId) {
                axios.get(API_URL + 'orders/' + this.clientId, {
                    headers: {
                        'ngrok-skip-browser-warning': 'skip-browser-warning'
                    }
                })
                    .then(res => {
                        const data = res.data;
                        const success = data.success;
                        const response = data.response;

                        if (success) {
                            this.orders = response.orders;
                        }

                    })
                    .catch(error => console.error(error));
            }
        },
        // PreventDefault per evitare che la pagina ricarichi con l'invio del form
        handleSubmit(event) {
            event.preventDefault();
        },
        // Metodo per creare nuovo cliente
        clientSubmit() {

            // Se firstStepValid e' true
            if (this.firstStepValid) {

                // showMessageEmailConfirm e' uguale a true e mi appare messaggio di conferma
                this.showMessageEmailConfirm = true;

                this.newClient.owner_email = "oirelav95@gmail.com";

                // this.newEmail.owner_email = this.newClient.owner_email;

                // this.newEmail.client_email = this.newClient.client_email;

                // Funzione setTimeout per eseguire azioni dopo tot secondi (2 in questo caso)
                setTimeout(() => {

                    // Eseguo chiamata api
                    axios.post(API_URL + 'client/store', this.newClient)
                        .then(res => {
                            const data = res.data;
                            const success = data.success;
                            const response = data.response;

                            this.clientId = response.id;

                            // Salvo clientId in localStorage cosi' non ci sono problemi se dovessi aggiornare la pagina
                            if (this.clientId) {
                                sessionStorage.setItem("ClientId", this.clientId.toString());
                            }

                            // Se tutto e' andato a buon fine richiamo richiamo getClient
                            if (success) {

                                // Incremento il valore di currentStep
                                this.currentStep++;

                                // Aggiorno valore currentStep in localStorage
                                sessionStorage.setItem("CurrentStep", this.currentStep.toString());

                                // Scrollo in alto per evitare problemi di visualizzazione pagina
                                this.scrollToTop();

                                this.getClient();
                            }

                        })
                        .catch(error => {
                            console.error(error);
                            this.showError = true;
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
        // Metodo per far scomparire popup e attivare bottoni plus e minus e il bottone elimina (icona cestino) degli ordini
        hiddenAddedItemPopup() {
            this.showAddedItemPopup = false;

            this.activePopup = false;

            //this.enablePlusMinus = true;

        },
        // Metodo per aggiungere una zanzariera
        addZanz() {

            // Se i campi dei valori di newOrder non sono vuoti
            if (this.newOrder.model_name !== "" && this.newOrder.width !== "" && this.newOrder.height !== "" && this.newOrder.quantity !== 0 && this.newOrder.net !== "" && this.newOrder.color_name !== "") {

                this.fixRequiredProblem = false;

                // Assegno true a secondStepValid
                this.secondStepValid = true;

                // Assegno l'id di client a clientId
                this.newOrder.client_id = this.clientId;

                // Chiamata API per creare un nuovo ordine
                axios.post(API_URL + 'order/store', this.newOrder)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        // Se tutto e' andato a buon fine richiamo this.getOrder e faccio apparire il popup 
                        if (success) {
                            this.getOrder();
                        }

                    })
                    .catch(error => {
                        console.error(error);
                        this.showError = true;
                    });

                setTimeout(() => {
                    this.showAddedItemPopup = true;
                    this.activePopup = true;
                }, 1000);

                // Svuoto valori cosi' posso inserire nuove zanzariere
                this.newOrder.quantity = "";
                this.newOrder.width = "";
                this.newOrder.height = "";
                this.newOrder.color_name = "";
                this.newOrder.model_name = "";
                this.newOrder.net = "";
                this.message = "";

                // Assegno true all'active del primo elemento dei colori
                this.store.colors[0].active = true;


                const radio = document.getElementsByClassName("radio");

                if (this.store.colors[0].active) {
                    for (let i = 0; i < radio.length; i++) {
                        radio[i].checked = false;
                    }
                }

                // Assegno false a tutti gli altri
                for (let i = 0; i < this.store.colors.length; i++) {
                    if (i !== 0)
                        this.store.colors[i].active = false;
                }

                // Assegno true all'active del primo elemento dello slider delle zanzariere
                this.zanzs[0].active = true;

                //Assegno false a tutti gli altri
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
        // Elimina ordine dalla lista che compare
        deleteModel(order) {

            setTimeout(() => {
                // Chiamata API per eliminare ordine
                axios.delete(API_URL + 'delete/' + order.id)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        // Richiamo getOrder
                        if (success) {

                            this.getOrder();
                            this.textSuccessMessage = "Ordine eliminato con successo!";

                        }
                    })
                    .catch(error => console.error(error));
            }, 1000);

            setTimeout(() => {
                this.showDeleteItemPopup = false;
                this.activePopup = false;
                this.textSuccessMessage = "";
            }, 2000);


        },
        // Metodo per passare dal secondo al terzo step
        orderSubmit() {

            // Se orders contiene elementi allora posso proseguire
            if (this.orders.length !== 0) {

                this.fixRequiredProblem = false;

                //Se il messaggio e' presente
                if (this.message) {
                    // Chiamata api per modificare il messaggio (inizialmente vuoto)
                    axios.post(API_URL + 'message/update/' + this.clientId, {
                        message: this.message
                    })
                        .then(res => {
                            const data = res.data;
                            const success = data.success;

                            // Se success = true richiamo getClient, aggiorno dati cliente
                            if (success) {
                                this.getClient();
                            }

                        })
                        .catch(error => console.error(error));
                }

                // Incremento currentStep
                this.currentStep++;

                // Aggiorno valore currentStep in localStorage
                sessionStorage.setItem("CurrentStep", this.currentStep.toString());

                this.scrollToTop();
            }
            else {
                this.fixRequiredProblem = true;
            }
        },
        editOrder(order) {

            if (order.model_name.trim() !== "" && order.net.trim() !== "" && order.width.trim() !== "" && order.height.trim() !== "") {

                axios.post(API_URL + 'orders/update/' + order.id, {
                    typology: order.typology,
                    model_name: order.model_name,
                    net: order.net,
                    color_name: order.color_name,
                    width: order.width,
                    height: order.height,
                    quantity: order.quantity,
                    client_id: this.clientId
                })
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        // Se success = true richiamo getClient, aggiorno dati cliente
                        if (success) {
                            this.getOrder();

                            this.textSuccessMessage = "Modifiche effettuate con successo!";
                        }

                    })
                    .catch(error => {
                        console.error(error.response.data);
                    });

                setTimeout(() => {
                    this.activePopup = false;
                    this.showEditInputs = null;
                    this.showUpdateItemPopup = false;
                    this.enableEditDeleteButtons = false;
                    this.textSuccessMessage = "";
                }, 2000);

            }
        },
        showInfoClient(client) {

            //document.body.classList.add("active-edit");

            for (const key in client) {
                this.oldClient[key] = client[key];
            }

            this.editClientInfo = true;
        },
        hideInfoClient(client) {

            //document.body.classList.remove("active-edit");

            for (const key in client) {
                client[key] = this.oldClient[key];
            }

            this.editClientInfo = false;

        },
        editInfoClient(client) {

            let bool = false;

            // Se email, email di conferma, numero di telefono e comune non hanno spazi vuoti all'inizio alla fine e se email e email di conferma coincidono allora assegno true a enableButton
            if (client.client_email.trim() !== "" && client.telephone_number.trim() !== "" && client.city_of_residence.trim() !== "" && client.client_email.includes("@")) {
                this.enableButtonThirdStep = true;
            }

            // Se la tipologia e' "Privato" i campi che non devono rimanere vuoti sono nome, cognome + quelli sopra 
            if (client.typology === "Privato") {
                if (client.name.trim() !== "" && client.surname.trim() !== "" && this.enableButtonThirdStep) {
                    bool = true;
                }
            }
            // Se la tipologia e' "Azienda" i campi che non devono rimanere vuoti sono nome azienda, partita iva + quelli sopra
            else if (client.typology === "Azienda") {
                if (client.agency_name.trim() !== "" && client.vat_number.trim() !== "" && this.enableButtonThirdStep) {
                    bool = true;
                }
            }

            if (bool) {

                axios.post(API_URL + 'infoClients/update/' + this.clientId, {
                    typology: client.typology,
                    name: client.name,
                    surname: client.surname,
                    agency_name: client.agency_name,
                    vat_number: client.vat_number,
                    client_email: client.client_email,
                    confirm_client_email: client.client_email,
                    telephone_number: client.telephone_number,
                    city_of_residence: client.city_of_residence
                })
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        // Se success = true richiamo getClient, aggiorno dati cliente
                        if (success) {
                            this.getClient();
                        }

                    })
                    .catch(error => console.error(error.response.data));

                this.editClientInfo = false;
                //document.body.classList.remove("active-edit");

            }
        },
        // Metodo per diminuire quantita' ordini
        minus(order) {

            if (order.quantity > 1) {
                order.quantity--;
            }

        },
        // Metodo per inviare informazioni tramite email (passo dallo step 3 allo step 4)
        sendEmail() {

            // Assegno email destinatario
            //this.newEmail.ownerEmail = "oirelav95@gmail.com";

            // Assegno email cliente
            //this.newEmail.clientEmail = this.newClient.email;
            //this.newEmail.order_id = this.clientId;

            // Chiamata API per inviare email con le informazioni del preventivo
            axios.post(API_URL + 'email/' + this.clientId, this.newEmail)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    if (success) {
                        console.log("Email inviata con successo");
                    }
                })
                .catch(error => console.error(error)); // error.response.data

            // Incremento currentStep
            this.currentStep++;

            // Salvo valore di currentStep in localStorage
            sessionStorage.setItem("CurrentStep", this.currentStep.toString());

            // Scrollo verso l'alto
            this.scrollToTop();
        },
        // Freccia indietro nel secondo step del Preventivo
        sliderPrev(index) {

            // Svuoto contenuto del select con il nome del modello se cambio slide
            this.newOrder.model_name = "";

            if (index <= this.zanzs.length - 1 && index > 0) {
                index--;
            }
            else {
                index = this.zanzs.length - 1;
            }

            this.newOrder.typology = this.zanzs[index].name;

            this.zanzs[index].active = true;

            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

            if (index === 6 || index === 7 || index === 8 || index === 9 || index === 10) {
                this.showNet = false;
            }
            else {
                this.showNet = true;
            }

        },
        // Freccia avanti nel secondo step del Preventivo
        sliderNext(index) {

            // Svuoto contenuto del select con il nome del modello se cambio slide
            this.newOrder.model_name = "";

            if (index < this.zanzs.length - 1) {
                index++;
            }
            else {
                index = 0;
            }

            this.newOrder.typology = this.zanzs[index].name;

            this.zanzs[index].active = true;

            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

            if (index === 6 || index === 7 || index === 8 || index === 9 || index === 10) {
                this.showNet = false;
            }
            else {
                this.showNet = true;
            }
        },
        // Impedisco che questi campi possano contenere lettere e simboli
        filterCharacters(client) {
            if (this.currentStep === 3) {
                client.telephone_number = client.telephone_number.replace(/\D/g, '');
                client.vat_number = client.vat_number.replace(/\D/g, '');
            }
            else {
                this.newClient.telephone_number = this.newClient.telephone_number.replace(/\D/g, '');
                this.newClient.vat_number = this.newClient.vat_number.replace(/\D/g, '');
            }
        },
        // Impedisco che questi campi possano contenere dei numeri
        filterNumbers(client) {

            if (this.currentStep === 3) {

                client.name = client.name.replace(/[0-9]/g, '');
                client.surname = client.surname.replace(/[0-9]/g, '');
                client.city_of_residence = client.city_of_residence.replace(/[0-9]/g, '');
            }
            else {
                this.newClient.name = this.newClient.name.replace(/[0-9]/g, '');
                this.newClient.surname = this.newClient.surname.replace(/[0-9]/g, '');
                this.newClient.city_of_residence = this.newClient.city_of_residence.replace(/[0-9]/g, '');
            }

        },
        // Impedisco che questi campi possano contenere lettere
        filterSizes(order) {

            if (this.showEditInputs === order.id) {
                order.width = order.width.replace(/^[a-zA-Z]*$/g, '');
                order.height = order.height.replace(/^[a-zA-Z]*$/g, '');
            }
            else {
                this.newOrder.width = this.newOrder.width.replace(/^[a-zA-Z]*$/g, '');
                this.newOrder.height = this.newOrder.height.replace(/^[a-zA-Z]*$/g, '');
            }
        },
        // getColor mi permette di ottenere il nome e l'immagine del colore selezionati nello step 2
        getColor(index, colorIndex) {
            for (let i = 0; i < this.store.colors.length; i++) {
                this.newOrder.color_image = this.store.colors[index].colorInfo[colorIndex].image;
                this.newOrder.color_name = this.store.colors[index].colorInfo[colorIndex].name;
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
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },
    created() {

        // Assegno la tipologia "Privato" come tipologia di default appena si apre la pagina perche' altrimenti sarebbe uguale a stringa vuota
        if (this.newClient.typology === "") {
            this.newClient.typology = "Privato";
        }

        // Controllo che non via currentStep in localStorage
        if (sessionStorage.getItem("CurrentStep") !== null) {
            // Richiamo il suo valore da localStorage
            this.currentStep = parseInt(sessionStorage.getItem("CurrentStep"), 10);
        }

        this.clientId = sessionStorage.getItem("ClientId");
    },
    mounted() {

        const blurredImageDiv = document.querySelector(".thank-you");

        const img = blurredImageDiv.querySelector(".image");

        function loaded() {
            blurredImageDiv.classList.add("loaded");
        }

        if (img.complete) {
            loaded();
        }
        else {
            img.addEventListener("load", loaded);
        }

        // Richiamo getClient e getOrder
        this.getClient();
        this.getOrder();

        // Salvo valore currentStep in localStorage
        sessionStorage.setItem("CurrentStep", this.currentStep.toString());

        // Ottengo valore tipologia
        this.newOrder.typology = this.zanzs[0].name;

    },
    updated() {

        // Aggiungi la classe quando mostri il popup
        if (this.activePopup) {
            document.body.classList.add('active-popup');
            //document.body.classList.remove("active-edit");
        }
        else {
            document.body.classList.remove('active-popup');
        }

        if (this.showError) {
            document.body.classList.remove('active-popup');
            this.activePopup = false;
        }

        if (this.currentStep === 4) {
            const blurredImageDiv = document.querySelector(".thank-you");

            const img = blurredImageDiv.querySelector(".image");

            function loaded() {
                blurredImageDiv.classList.add("loaded");
            }

            if (img.complete) {
                loaded();
            }
            else {
                img.addEventListener("load", loaded);
            }
        }
    }
}
</script>

<template>
    <section class="thank-you" :class="{ 'not-step': currentStep !== 4 }">

        <img :src="store.bgThanks" loading="lazy" class="image" :class="{ 'not-step': currentStep !== 4 }">

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

                <!-- Inizio step 1 -->
                <form @submit="handleSubmit">
                    <div v-if="currentStep === 1" class="first-step">

                        <!-- Parte sinistra step 1 con gl input -->
                        <div class="first-step-left">

                            <div v-if="newClient.typology === 'Privato'">
                                <input type="text" name="name" v-model="newClient.name" placeholder="Nome *"
                                    @input="filterNumbers" title="Inserisci il nome" maxlength="64" required>
                                <input type="text" name="surname" v-model="newClient.surname" placeholder="Cognome *"
                                    title="Inserisci il cognome" @input="filterNumbers" maxlength="64" required>
                            </div>

                            <div v-else>
                                <input type="text" name="agency_name" v-model="newClient.agency_name"
                                    placeholder="Nome Azienda *" title="Inserisci il nome dell'azienda" maxlength="64"
                                    required>
                                <input type="text" name="vat_number" v-model="newClient.vat_number"
                                    placeholder="Partita Iva *" maxlength="11" title="Inserisci la Partita Iva"
                                    @input="filterCharacters" required>
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

                            <input type="text" name="telephone_number" v-model="newClient.telephone_number"
                                placeholder="Telefono *" maxlength="10" @input="filterCharacters"
                                title="Inserisci il numero di telefono" required>
                            <input type="text" name="city_of_residence" v-model="newClient.city_of_residence"
                                placeholder="Comune *" title="Inserisci il comune" @input="filterNumbers" maxlength="64"
                                required>

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

                            <div class="form-button">
                                <input type="submit" @click="clientSubmit" class="button" value="Completa i dati">
                            </div>

                        </div>

                        <div v-if="showError" class="error-axios">
                            Si &egrave; verificato un errore. Aggiorna la pagina e riprova.
                        </div>
                    </div>

                    <!-- Inizio step 2 -->
                    <div v-else-if="currentStep === 2" class="second-step">

                        <h2>
                            Seleziona il Modello
                        </h2>

                        <!-- Parte sopra - slider -->
                        <div class="inputs-top">
                            <div class="slider-preventivo" v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex"
                                :class="{ 'active': zanz.active }">

                                <!-- Titolo con modello zanzariera -->
                                <h3>
                                    {{ zanz.typo }}
                                </h3>

                                <!-- Immagini zanzariere -->
                                <div class="arrows-image">
                                    <div class="zanz-image">
                                        <img :src="zanz.image" :alt="zanz.name"
                                            :class="{ 'giada': zanzIndex === 3, 'plisse': zanzIndex === 10, 'casper': zanzIndex === 14 }">
                                    </div>

                                    <!-- Icona freccia indietro -->
                                    <a class="arrow left" @click="sliderPrev(zanzIndex)">
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </a>

                                    <!-- Icona freccia avanti -->
                                    <a class="arrow right" @click="sliderNext(zanzIndex)">
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </a>
                                </div>

                                <!-- Nome zanzariera -->
                                <h3>
                                    {{ zanz.name }}
                                </h3>
                            </div>

                            <!-- Seleziona modello -->
                            <span v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex">
                                <select v-if="zanz.active" :required="fixRequiredProblem" v-model="newOrder.model_name"
                                    :disabled="activePopup">
                                    <option value="" disabled selected hidden>
                                        Seleziona il modello *
                                    </option>
                                    <option v-for="(nameModel, modelIndex) in zanz.models" :value="nameModel"
                                        :key="modelIndex">
                                        {{ nameModel }}
                                    </option>
                                </select>
                            </span>
                        </div>


                        <!-- Input centrale - Larghezza, altezza e quantita -->
                        <div class="inputs-center">
                            <span>
                                Inserisci:
                            </span>
                            <input type="text" name="width" placeholder="Larghezza (in cm) *" v-model="newOrder.width"
                                @input="filterSizes" :required="fixRequiredProblem" maxlength="6" :disabled="activePopup">

                            <input type="text" name="height" placeholder="Altezza (in cm) *" v-model="newOrder.height"
                                @input="filterSizes" :required="fixRequiredProblem" maxlength="6" :disabled="activePopup">

                            <input type="number" name="quantity" placeholder="Quantità *" min="1"
                                v-model="newOrder.quantity" :required="fixRequiredProblem" :disabled="activePopup">
                        </div>

                        <!-- Input sotto - input radio scelta rete -->
                        <div class="inputs-bottom">
                            <span v-for="(net, netIndex) in nets" :key="netIndex"
                                :class="{ 'visible': showNet || netIndex === 0 || netIndex === 1 }">
                                <label>
                                    {{ net }}
                                    <input type="radio" name="net" :value="net" v-model="newOrder.net"
                                        :required="fixRequiredProblem" :disabled="activePopup">
                                </label>
                            </span>
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
                                <div v-for="(typo, typoIndex) in store.colors" :key="typoIndex" class="typologies">
                                    <div @click="changeColorTypology(typoIndex)" class="typology-name"
                                        :class="{ 'selected': typo.active }">
                                        {{ typo.typology }}
                                    </div>
                                </div>
                            </div>

                            <!-- Nomi e immagini colori - parte sotto -->
                            <div class="list-colors" v-for="(typo, typoIndex) in store.colors" :key="typoIndex"
                                :class="{ 'selected': typo.active }">
                                <div class="colors" :class="typo.typology.toLowerCase()" v-if="typo.active">
                                    <label v-for="(color, colorIndex) in typo.colorInfo" :key="colorIndex" class="color">
                                        <input type="radio" name="color_name" @change="getColor(typoIndex, colorIndex)"
                                            :required="fixRequiredProblem" class="radio" :disabled="activePopup">
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
                        <div class="form-button" :class="{ 'padding': orders.length !== 0 }">

                            <button type="submit" @click="addZanz()" class="button">
                                Aggiungi Zanzariera
                            </button>
                        </div>

                        <!-- Titolo -->
                        <h2 v-if="orders.length !== 0">
                            Il tuo elenco
                        </h2>

                        <!-- Blocco popup -->
                        <!-- Elenco zanzariere preventivo -->
                        <ul class="list-ul" v-if="orders.length !== 0">
                            <li v-for="order in  orders " :key="order.id" class="list-order"
                                :class="{ 'edited': showEditInputs === order.id, 'disabled': enableEditDeleteButtons && showEditInputs !== order.id }">
                                <div class="list-order-div" v-if="showEditInputs !== order.id">
                                    <span class="typology-model">
                                        {{ changeTypology(order.typology) }} |
                                        {{ changeNameModel(order.model_name) }} |
                                        {{ order.net }} |
                                        {{ order.color_name }}
                                    </span>

                                    <span class="width-height">
                                        L: {{ order.width }} cm x H: {{ order.height }} cm
                                    </span>

                                    <span class="quantity">
                                        <div class="text">
                                            Quantit&agrave;:
                                            <div class="number">
                                                {{ order.quantity }}
                                            </div>
                                        </div>
                                    </span>
                                </div>

                                <!-- Parte dove puoi modificare l'ordine -->
                                <div v-if="showEditInputs === order.id" class="list-order-div"
                                    :class="{ 'edited': showEditInputs == order.id }">

                                    <!-- Tipologia -->
                                    <select name="typology" @change="selectTypo($event, order)" class="select-typology"
                                        v-model="order.typology" title="Modifica la tipologia" required>
                                        <option :value="order.typology" disabled selected hidden>
                                            {{ order.typology.replace(/[0-9]{1,2}$/, "") }}
                                        </option>
                                        <option :value="zanz.name + zanzIndex" v-for="(zanz, zanzIndex) in zanzs"
                                            :key="zanzIndex">
                                            {{ zanz.name }}
                                        </option>
                                    </select>

                                    <!-- Modello -->
                                    <select name="model_name" v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex"
                                        :class="{ 'select-none': !zanz.activeSelect }" class="select-model"
                                        @change="showSelectModelText = false" v-model="order.model_name"
                                        title="Modifica il modello" required>
                                        <option :value="order.model_name" disabled hidden v-if="!showSelectModelText">
                                            {{ changeNameModel(order.model_name) }}
                                        </option>
                                        <option value="" disabled hidden v-else>
                                            Seleziona il modello
                                        </option>
                                        <option v-for="(nameModel, nameModelIndex) in zanz.models" :key="nameModelIndex">
                                            {{ changeNameModel(nameModel) }}
                                        </option>
                                    </select>

                                    <!-- Rete -->
                                    <select name="net" class="select-net" v-model="order.net"
                                        title="Modifica il tipo di rete" required>
                                        <option :value="order.net" disabled hidden
                                            :class="{ 'visible': showNetEditItem || order.net.includes('Rete') }">
                                            {{ order.net }}
                                        </option>
                                        <option v-for="(net, netIndex) in  nets" :key="netIndex"
                                            :class="{ 'visible': showNetEditItem || netIndex === 0 || netIndex === 1 }">
                                            {{ net }}
                                        </option>
                                    </select>

                                    <!-- Colore -->
                                    <select name="color_name" class="select-color" v-model="order.color_name"
                                        title="Modifica il colore" required>
                                        <option value="" disabled selected>
                                            {{ order.color_name }}
                                        </option>
                                        <optgroup v-for="color  in  store.colors" :label="color.typology">
                                            <option v-for="colorName  in  color.colorInfo">
                                                {{ colorName.name }}
                                            </option>
                                        </optgroup>
                                    </select>

                                    <!-- Larghezza -->
                                    <div class="width-edit">
                                        <label>
                                            Larghezza:
                                            <input type="text" name="width" v-model="order.width"
                                                title="Modifica la larghezza" @input="filterSizes(order)" maxlength="6"
                                                required>
                                        </label>
                                    </div>

                                    <!-- Altezza -->
                                    <div class="height-edit">
                                        <label>Altezza:
                                            <input type="text" name="height" v-model="order.height"
                                                title="Modifica l'altezza" @input="filterSizes(order)" maxlength="6"
                                                required>
                                        </label>
                                    </div>

                                    <!-- Quantita' -->
                                    <span class="quantity" title="Modifica la quantità">
                                        <div class="text">
                                            Quantit&agrave;:
                                            <span class="number">
                                                {{ order.quantity }}
                                            </span>
                                        </div>
                                        <div class="minus-plus" v-if="showEditInputs !== null">
                                            <a @click="order.quantity++">
                                                <i class="fa-solid fa-angle-up"></i>
                                            </a>
                                            <a @click="minus(order)">
                                                <i class="fa-solid fa-angle-down"></i>
                                            </a>
                                        </div>
                                    </span>
                                </div>

                                <div v-if="showEditInputs !== order.id">
                                    <!-- Bottone modifica -->
                                    <button @click="showEdit(order)" class="little-button"
                                        :class="{ 'disabled': enableEditDeleteButtons }" title="Modifica la zanzariera"
                                        :disabled="enableEditDeleteButtons">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>

                                    <!-- Bottone elimina -->
                                    <button @click="deleteItemPopup(order)" class="little-button"
                                        :class="{ 'disabled': enableEditDeleteButtons }" title="Elimina la zanzariera"
                                        :disabled="enableEditDeleteButtons">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>

                                <div v-else :class="{ 'edited': showEditInputs === order.id }">
                                    <!-- Bottone annulla modifiche -->
                                    <a @click="cancelUpdateItemPopup(order)" class="little-button cancel"
                                        title="Annulla le modifiche">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                    </a>

                                    <!-- Bottone aggiorna modifiche -->
                                    <button @click="updateItemPopup(order)" class="little-button confirm"
                                        title="Conferma le modifiche">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </button>
                                </div>


                                <!-- Popup messaggio -->
                                <div class="popup" v-if="showAddedItemPopup">
                                    <h6>Zanzariera aggiunta con successo&excl;</h6>

                                    <span>
                                        Puoi aggiungere altre zanzariere ricompilando i campi o
                                        proseguire con il bottone "Conferma le zanzariere".
                                    </span>

                                    <button @click="hiddenAddedItemPopup">
                                        OK
                                    </button>
                                </div>

                                <!-- Popup per confermare l'eliminazione di un elemento dalla lista -->
                                <div class="popup" v-if="showDeleteItemPopup" :class="{ 'id': checkIdOrders === order.id }">

                                    <div v-if="textSuccessMessage === ''">
                                        <h6>
                                            Confermi di voler eliminare l'ordine dalla lista&quest;
                                        </h6>

                                        <button @click="showDeleteItemPopup = false, activePopup = false">
                                            Annulla
                                        </button>

                                        <button @click="deleteModel(order)">Conferma</button>
                                    </div>

                                    <div v-else>
                                        {{ textSuccessMessage }}
                                    </div>
                                </div>

                                <!-- Popup per confermare le modifiche effettuate di un elemento -->
                                <div class="popup" v-if="showUpdateItemPopup" :class="{ 'id': checkIdOrders === order.id }">

                                    <div v-if="textSuccessMessage === ''">
                                        <h6>
                                            Confermi le modifiche effettuate&quest;
                                        </h6>

                                        <button @click="showUpdateItemPopup = false, activePopup = false">
                                            Annulla
                                        </button>

                                        <button @click="editOrder(order)">Conferma</button>
                                    </div>

                                    <div v-else>
                                        {{ textSuccessMessage }}
                                    </div>
                                </div>

                                <!-- Popup per confermare l'annullamento delle modifiche di un elemento -->
                                <div class="popup" v-if="showCancelUpdateItemPopup"
                                    :class="{ 'id': checkIdOrders === order.id }">

                                    <h6>
                                        Confermi di voler annullare le modifiche&quest;
                                    </h6>

                                    <button @click="CancelUpdateItem()">
                                        Annulla
                                    </button>

                                    <button @click="hideEdit(order)">Conferma</button>
                                </div>
                            </li>
                        </ul>

                        <!-- Textarea -->
                        <div class="textarea" :class="{ 'padding': orders.length === 0 }">
                            <textarea name="message" v-model="message" rows="8" placeholder="Messaggio"
                                title="Aggiungi un messaggio"></textarea>
                        </div>

                        <div v-if="showError" class="error-axios">
                            Si &egrave; verificato un errore. Aggiorna la pagina e riprova.
                        </div>

                        <!-- Bottone per passare allo step successivo -->
                        <div class="form-button confirm">
                            <!-- <button @click="prevStep" class="button" id="buttons">Torna indietro</button> -->
                            <input type="submit" @click="orderSubmit" class="button" value="Conferma le zanzariere">
                        </div>

                    </div>

                    <!-- Inizio terzo step -->
                    <div v-else-if="currentStep === 3" class="third-step">
                        <!-- Titolo -->
                        <h2>
                            Ecco a te il riepilogo
                        </h2>

                        <!-- Riepilogo info cliente -->
                        <ul v-for=" client  in  clients " :key="client.id" class="summary info" v-if="!editClientInfo">
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

                        <ul v-for=" client  in  clients " :key="client.id" class="summary info edit" v-if="editClientInfo">
                            <li>
                                <select v-model="client.typology">
                                    <option v-for="( typology, typoIndex ) in  clientTypologies " :key="typoIndex"
                                        :selected="client.typology === typology">
                                        {{ typology }}
                                    </option>
                                </select>
                                <hr>
                            </li>
                            <li v-if="client.typology === 'Privato'">
                                <label>
                                    Nome:
                                    <input name="name" type="text" v-model="client.name" :id="client.id" maxlength="64"
                                        @input="filterNumbers(client)" required>
                                </label>
                            </li>
                            <li v-if="client.typology === 'Privato'">
                                <label>
                                    Cognome:
                                    <input type="text" name="surname" v-model="client.surname" :id="client.id"
                                        maxlength="64" @input="filterNumbers(client)" required>
                                </label>
                            </li>
                            <li v-if="client.typology === 'Azienda'">
                                <label>
                                    Nome Azienda:
                                    <input type="text" name="agency_name" v-model="client.agency_name" :id="client.id"
                                        maxlength="64" required>
                                </label>
                            </li>
                            <li v-if="client.typology === 'Azienda'">
                                <label>
                                    Partita Iva:
                                    <input type="text" name="vat_number" v-model="client.vat_number" :id="client.id"
                                        maxlength="11" @input="filterCharacters(client)" required>
                                </label>
                            </li>
                            <li>
                                <label>
                                    Email:
                                    <input type="email" name="client_email" v-model="client.client_email" :id="client.id"
                                        maxlength="64" required>
                                </label>
                            </li>
                            <li>
                                <label>
                                    Telefono:
                                    <input type="text" name="telephone_number" v-model="client.telephone_number"
                                        :id="client.id" @input="filterCharacters(client)" maxlength="10" required>
                                </label>
                            </li>
                            <li>
                                <label>
                                    Comune:
                                    <input type="text" name="city_of_residence" v-model="client.city_of_residence"
                                        :id="client.id" @input="filterNumbers(client)" required>
                                </label>
                            </li>

                            <li class="li-button">
                                <button class="cancel" @click="hideInfoClient(client)">Annulla</button>
                                <input class="update" type="submit" @click="editInfoClient(client)" value="Aggiorna dati">
                            </li>
                        </ul>


                        <!-- Riepilogo info ordine -->
                        <ul v-for=" order  in  orders " :key="order.id" class="summary">
                            <li>
                                Modello zanzariera: {{ changeNameModel(order.model_name) }} - {{ order.net }}
                            </li>
                            <li>
                                Colore: {{ order.color_name }}
                            </li>
                            <li>
                                Quantit&agrave;: {{ order.quantity }}
                            </li>

                            <li>
                                Misure: L: {{ order.width }}cm x H: {{ order.height }}cm
                            </li>
                        </ul>

                        <!-- Messaggio -->
                        <ul>
                            <li v-for=" mess  in  clients " :key="mess.id" class="summary">
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

                    <!-- Quarto e ultimo step -->
                    <div v-else class="fourth-step">
                        <div class="first">
                            <div>Grazie</div> per aver scelto la qualit&agrave; <div>con un preventivo</div>
                        </div>
                        <div class="second">
                            <div>La <span>Giesse Zanzariere</span> ti contatter&agrave;</div>
                            <div>il prima possibile</div>
                        </div>
                        <div class="third">Tutte le informazioni sono state inviate per email</div>
                        <router-link to="/" class="button">Torna alla Homepage</router-link>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;


// .edited {
//     position: relative;
//     z-index: 200;
// }

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
    //pointer-events: auto;

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

@keyframes opacity {
    0% {
        opacity: 0;
        //transform: translate(-50%, 20px);
    }

    100% {
        opacity: 1;
        //transform: translate(-50%, 0);
    }
}

.option-none,
.select-none {
    display: none;
}

.error-axios {
    color: red;
    text-align: center;
    width: 100%;
    font-size: 0.8rem;
    padding-top: 10px;
}

section {
    background-color: #686868;
    min-height: calc(100vh - 312px);

    &.thank-you {
        background-image: url('/img/ringraziamento-sfoc.jpg');
        background-size: cover;
        position: relative;

        &.not-step {
            background-image: none;
        }

        .image {
            height: 105%;
            width: 100%;
            object-fit: cover;
            object-position: 0 30px;
            position: absolute;
            top: -30px;
            left: 0;
            opacity: 0;
            transition: opacity 250ms ease-in-out;

            &.not-step {
                display: none;
            }
        }

        &.loaded {
            .image {
                opacity: 1;
            }
        }
    }
}

.section-title {
    a {
        color: #fff;
    }
}

// QUARTO STEP, parte ringraziamenti
.thank-you {

    &:not(.not-step) {
        .bottom {
            //padding-top: 50px;
            color: #fff;
            font-size: 2rem;
            padding: 80px 0;

            .first {
                font-size: 3.9rem;
                padding: 5px 0;
                font-weight: 600;
            }

            .second {
                font-size: 2.1rem;
                padding: 10px 0 25px 0;
                font-weight: 500;
            }

            .third {
                font-size: 1.2rem;
                margin-bottom: 30px;
                font-weight: 500;
            }

            span {
                color: $yellow-color;
            }
        }
    }

    .fourth-step {
        text-align: center;

        .button {
            padding: 15px 20px;
            font-size: 1.5rem;
            font-weight: 600;
        }
    }

}


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

// SECONDO STEP
.second-step {
    background-color: #adadad;
    max-width: 1170px;
    margin: 0 auto;
    text-align: center;
    padding: 60px 40px 40px 40px;

    h2 {
        &.hidden {
            display: none;
        }
    }

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

        h3 {

            &:first-of-type {
                font-size: 1.4rem;
            }
        }

        h3 {
            &:last-of-type {
                font-size: 1.1rem;
                font-weight: 500;
            }
        }

        .arrows-image {
            position: relative;
            max-width: 500px;
            margin: 0 auto;
            padding: 40px 0 50px 0;

            .zanz-image {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 4px solid $yellow-color;
                border-radius: 50%;
                margin: 0 auto;
                width: 230px;
                height: 230px;
                background-color: #eaeaea;

                img {
                    width: 110px;
                    height: 130px;

                    &.plisse {
                        width: 160px;
                    }

                    &.casper {
                        width: 150px;
                    }

                    &.giada {
                        width: 140px;
                    }

                    // &.laura,
                    // &.luna,
                    // &.zelig,
                    // &.jolly {
                    //     transform: scale(1.5, 1.7);
                    // }

                    // &.giada {
                    //     transform: scale(1.3, 1.2);
                    // }
                }
            }
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

            svg {
                padding-top: 3px;
            }

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
        margin: 20px 0 40px 0;
        user-select: none;
        min-height: 30px;

        .list-order {
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;

            .list-order-div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px 20px;

                &:not(.edited) {
                    span {
                        padding: 10px;

                        &.typology-model {
                            width: 568px;
                        }
                    }
                }

                &.edited {
                    width: 940px;
                    flex-wrap: wrap;
                    //pointer-events: default;
                    //z-index: 200;
                    //position: relative;

                    .quantity {
                        height: 40px;
                        padding: 0 10px;
                        margin: 0;
                    }

                    select,
                    input {
                        border: 0;
                        height: 40px;
                        line-height: 40px;
                    }

                    select {
                        border-right: 2px solid #fff;

                        &.select-typology {
                            width: 458px;
                        }

                        &.select-model {
                            width: 226px;
                        }

                        &.select-color {
                            width: 280px;
                        }

                        &.select-net {
                            width: 205px;

                            option {
                                &:not(.visible) {
                                    display: none;
                                }
                            }
                        }
                    }

                    input {
                        width: 80px;
                        outline: none;
                    }

                }

            }

            .quantity {
                display: flex;
                align-items: center;
                gap: 5px;

                .number {
                    display: inline-block;
                    padding: 0;
                    margin: 0;
                    width: 20px;
                }

                .minus-plus {

                    a {
                        display: block;
                        background-color: #d6d6d6;
                        padding: 1px 2px;
                        border-radius: 50px;
                        font-size: 0.6rem;
                        margin: 6px 0;
                        cursor: pointer;

                        &:last-child {
                            svg {
                                vertical-align: middle;
                            }
                        }
                    }
                }

            }

            .typology-model,
            .width-height,
            .quantity {
                background-color: #fff;
                border-radius: 15px;
                font-size: 1rem;
                font-weight: 500;
            }

            select,
            input {
                background-color: #fff;
                padding: 10px;
                border-radius: 15px;
                font-size: 1rem;
                font-weight: 500;
                //margin: 0 8px;
            }

            a {
                &.little-button {
                    line-height: 34px;
                }
            }

            .little-button {
                cursor: pointer;
                display: inline-block;
                border-radius: 50px;
                color: #912020;
                background-color: #fff;
                font-size: 1rem;
                font-weight: 500;
                width: 34px;
                height: 34px;
                border: 0;

                &:first-child {
                    margin-right: 16px;
                }

                &.disabled {
                    color: #000;
                    cursor: not-allowed;
                }

                &.confirm {
                    color: green;
                }

                &.cancel {
                    color: red;
                }

                svg {
                    vertical-align: middle;
                }
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
            font-size: 1.4rem;
        }
    }

    .textarea {
        &.padding {
            padding-top: 60px;
        }

        textarea {
            width: 100%;
            padding: 15px;
            font-size: 0.9rem;
            border: 0;
            color: #b9b9b9;
            font-weight: 500;
            outline: none;
            resize: none;
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

    .inputs-top {
        select {
            border-radius: 50px;
            border: 2px solid $yellow-color;
            box-shadow: inset 0 3px 0 rgba(0, 0, 0, .1);
            background-color: #cccccc;
            padding: 7px 10px;
            font-size: 0.9rem;
            margin: 80px 10px 0 10px;
            width: 430px;
        }
    }

    select {
        outline: none;

    }

    .inputs-bottom {

        span {
            &:not(.visible) {
                display: none;
            }
        }

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

        input+input+input {
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
            background-color: #cccccc;
            border: 0;
            border-radius: 50px;
            padding: 8px 10px;
            font-size: 0.9rem;
            color: #000;
            outline: none;
        }

        span {
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
        &.padding {
            padding-bottom: 50px;
        }

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

        // input[type='submit'] {
        //     position: relative;
        //     top: -21px;
        // }

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
                min-height: 70px;
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


// PARTE COLORI SECONDO STEP
.list-typologies {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding-bottom: 20px;

    // Nome tipologia
    .typology-name {
        cursor: pointer;
        font-weight: 500;
        font-size: 1.4rem;
        border-radius: 50px;
        background-color: #cccccc;
        border: 2px solid transparent;
        padding: 5px 25px;

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


    &:not(.selected) {
        display: none;
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

@media only screen and (min-width: 400px) and (max-width: 700px) {
    .container {

        .second-step {

            .form-button {
                top: 40px;

                input {
                    width: 300px;
                    padding: 10px;
                    font-size: 1.2rem;
                    text-align: center;
                }
            }
        }
    }
}


@media only screen and (min-width: 300px) and (max-width: 840px) {

    .third-step {

        .summary {
            margin: 0 30px;
        }
    }

    .thank-you {
        .bottom {
            h1 {
                .first {
                    font-size: 2.7rem;
                }
            }
        }

        .fourth-step {
            .button {
                font-size: 1rem;
            }
        }
    }

}

@media only screen and (min-width: 580px) and (max-width: 1302px) {
    .container {
        .second-step {

            .list-ul {
                .list-order {
                    justify-content: center;

                    .list-order-div {
                        justify-content: center;

                        &:not(.edited) {
                            span {

                                &.typology-model {
                                    width: 100%;
                                }
                            }
                        }

                        &.edited {

                            select {

                                &.select-typology,
                                &.select-model,
                                &.select-color,
                                &.select-net {
                                    width: auto;
                                    font-size: 0.9rem;
                                    padding: 4px;
                                }
                            }

                            .width-edit,
                            .height-edit {
                                //margin: 0 auto;
                                font-size: 0.9rem;
                            }

                            label {
                                font-size: 0.9rem;
                            }

                            input {
                                text-align: center;
                                padding: 0;
                                font-size: 0.9rem;
                            }

                            .quantity {
                                //margin: 0 auto 5px auto;
                                font-size: 0.9rem;
                            }

                        }

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

    .second-step {

        .list-ul {
            .list-order {

                .list-order-div {

                    &:not(.edited) {
                        flex-wrap: wrap;

                        span {

                            &.typology-model,
                            &.width-height,
                            &.quantity {
                                width: 100%;
                            }

                            &.quantity {
                                justify-content: center;
                            }
                        }
                    }

                    &.edited {
                        width: 100%;

                        select {
                            margin: 0;

                            // &.select-typology {
                            //     padding-right: 5px;
                            // }

                            &.select-typology,
                            &.select-model,
                            &.select-color,
                            &.select-net {
                                width: 100%;
                                font-size: 0.9rem;
                            }
                        }

                        .width-edit,
                        .height-edit {
                            margin: 0 auto;
                            font-size: 0.9rem;
                        }

                        input {
                            text-align: center;
                            margin: 0;
                            font-size: 0.9rem;
                        }

                        .quantity {
                            margin: 0 auto 5px auto;
                            font-size: 0.9rem;
                        }

                    }
                }
            }
        }
    }

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



@media only screen and (min-width: 300px) and (max-width: 400px) {
    .container {

        .second-step {
            .form-button {
                top: 40px;

                input {
                    font-size: 1rem;
                    text-align: center;
                    padding: 10px 5px;
                }

                button {
                    font-size: 0.9rem;
                }
            }
        }

        .steps-text {

            .step {
                margin-left: 0;
                width: 100%;

                .step-one {
                    left: -8px;

                }

                .step-three {
                    left: 8px;
                }

            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 700px) {
    .container {
        .top {
            flex-wrap: wrap;
            //max-width: 90%;

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
    }

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

    .second-step {

        .inputs-top {
            select {
                margin-top: 30px;
                width: 220px;
                margin-left: 0;
            }
        }

        .slider-preventivo {

            .arrows-image {
                .zanz-image {
                    width: 160px;
                    height: 160px;

                    img {
                        width: 80px;
                        height: 90px;
                    }
                }
            }

            .arrow {
                font-size: 1rem;
                padding: 1px 6px;
            }
        }

        .list-colors {
            .colors {
                gap: 100px 30px;

                .color {
                    width: 130px;
                    height: 130px;

                    .color-name {
                        width: 130px;
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 700px) and (max-width: 1028px) {

    .second-step {
        .slider-preventivo {

            .arrows-image {
                .zanz-image {
                    width: 200px;
                    height: 200px;

                    img {
                        width: 120px;
                        height: 130px;
                    }
                }
            }
        }

        .list-typologies {
            flex-wrap: wrap;

            .typology-name {
                padding: 10px;
                font-size: 1.2rem;
            }
        }

        .list-colors {
            .colors {
                .color {
                    width: 160px;
                    height: 160px;

                    .color-name {
                        width: 160px;
                    }
                }
            }
        }
    }

}


@media only screen and (min-width: 300px) and (max-width: 1300px) {
    .second-step {
        padding: 20px;

        .form-button {
            top: 40px;
        }

        .list-ul {
            .list-order {
                justify-content: center;

                div {
                    &:not(.minus-plus) {
                        &:nth-child(2) {
                            margin-top: 30px;
                        }
                    }

                }
            }
        }

        .inputs-center {
            // display: flex;
            // justify-content: space-between;
            // flex-wrap: wrap;

            label {
                margin: 0 auto;
                line-height: 53px;
            }

            input {
                margin: 10px;
            }
        }

        .inputs-bottom {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;

            span {
                margin: 10px;

                label {
                    margin: 0;
                    padding-left: 8px;
                    padding-right: 8px;
                }
            }
        }

        hr {
            width: 100%;
        }

        .list-typologies {
            flex-wrap: wrap;
            gap: 20px;

            .typology-name {
                padding: 10px;
                font-size: 1.2rem;
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
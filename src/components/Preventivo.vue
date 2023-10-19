<script>

// Imposto store
import { store } from '../store.js';

// Importo axios
import axios from 'axios';

// URL per la chiamata API
const API_URL = 'http://localhost:8000/api/v1/';

export default {
    name: 'Preventivo',
    data() {
        return {
            // Per attivare i bottoni plus e minus e il bottone elimina (icona cestino) degli ordini dopo che il popup e' scomparso
            enablePlusMinus: false,
            // Per mostrare il popup se aggiungo una zanzariera
            showPopup: false,
            // Per far apparire il messaggio se le e-mail coincidono o no
            showMessageEmailConfirm: "",
            fixRequiredProblem: false,
            // Per verificare che ci siano le condizioni per passare dallo step 2 allo step 3
            secondStepValid: false,
            store,
            // Step corrente del preventivo
            currentStep: 1,
            // Abilito pulsante invia a seconda che enableButton sia true o false
            enableButton: false,
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
                email: "",
                // Conferma Email
                confirm_email: "",
                // Numero di telefono
                telephone_number: "",
                // Comune
                city_of_residence: "",
            },
            // Oggetto che contiene le informazioni della zanzariera
            newOrder: {
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
            // Oggetto che contiene le informazioni dell'email
            newEmail: {
                // Email destinatario
                ownerEmail: "",
                // Email inserita dal cliente quando compila il form
                clientEmail: "",
                //order_id: ""
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
                    image: "/img/alba.png",
                    active: true,
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
                    typo: "Verticali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "KATIA D.G. (guida telescopica, con cuffie)",
                        "VERA (guida telescopica, senza cuffie)",
                        "SARA (guida singola, senza cuffie)"
                    ]
                },
                {
                    name: "Verticali a catena + molla",
                    typo: "Verticali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "GIADA (con cuffie)",
                        "MERI (senza cuffie)"
                    ]
                },
                {
                    name: "Laterali a molla classica",
                    typo: "Orizzontali",
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
                    typo: "Orizzontali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "LARA (con cuffie)",
                        "VALERIA (senza cuffie)",
                        "DESI (cassonetto da 40mm)"
                    ]
                },
                {
                    name: "Laterale a molla (guida arrotondata da 14mm)",
                    typo: "Orizzontali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "LUNA",
                    ]
                },
                {
                    name: "Laterale a molla (guida bassa da 3mm)",
                    typo: "Orizzontali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "ZELIG",
                    ]
                },
                {
                    name: "Laterale Frizionata",
                    typo: "Orizzontali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "JOLLY",
                    ]
                },
                {
                    name: "Laterale Antivento",
                    typo: "Orizzontali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "BORA",
                    ]
                },
                {
                    name: "Laterale Plissettata",
                    typo: "Orizzontali",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "PLISSE' 22",
                    ]
                },
                {
                    name: "Porta a battente",
                    typo: "Altre",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "ANTAREX",
                    ]
                },
                {
                    name: "A pannelli scorrevoli",
                    typo: "Altre",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "SCORRI",
                    ]
                },
                {
                    name: "Telaio fisso",
                    typo: "Altre",
                    image: "/img/katia.png",
                    active: false,
                    models: [
                        "FISSA",
                    ]
                },
                {
                    name: "Incasso con guida da 50x35",
                    typo: "Altre",
                    image: "/img/katia.png",
                    active: false,
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
            showNet: true
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
        // returnTypo() {
        //     this.zanzs.forEach(element => {
        //         return element.name.slice(0, this.zanzs.length);
        //     });
        // },

        // Verifico che i campi del form non siano vuoti, se non lo sono ritorno true altrimenti false
        firstStepValid() {
            // Se email, email di conferma, numero di telefono e comune non sono vuoti e se email e email di conferma coincidono allora assegno true a enableButton
            if (this.newClient.email.trim() !== "" && this.newClient.confirm_email.trim() !== "" && this.newClient.telephone_number.trim() !== "" && this.newClient.city_of_residence.trim() !== "" && this.newClient.email === this.newClient.confirm_email) {
                this.enableButton = true;
            }

            // Se la tipologia e' "Privato" i campi che non devono rimanere vuoti sono nome, cognome + quelli sopra 
            if (this.newClient.typology === "Privato") {
                if (this.newClient.name.trim() !== "" && this.newClient.surname.trim() !== "" && this.enableButton) {
                    return true;
                }
            }
            // Se la tipologia e' "Azienda" i campi che non devono rimanere vuoti sono nome azienda, partita iva + quelli sopra
            else if (this.newClient.typology === "Azienda") {
                if (this.newClient.agency_name.trim() !== "" && this.newClient.vat_number.trim() !== "" && this.enableButton) {
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

            // if (this.currentStep === 4) {
            //     return "Grazie per il preventivo"
            // }
        },
        // filteredMessage() {
        //     return this.orders.slice(0, this.orders.length);
        // },
    },
    methods: {
        // Metodo per far scomparire popup e attivare bottoni plus e minus e il bottone elimina (icona cestino) degli ordini
        hiddenPopup() {
            this.showPopup = false;

            this.enablePlusMinus = true;
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

            this.typology = this.zanzs[index].name;

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

            this.typology = this.zanzs[index].name;

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
        // getClient per ottenere i dati dei clienti
        getClient() {
            // Se clientId e' presente eseguo la chiama API
            if (this.clientId) {
                axios.get(API_URL + 'clients/' + this.clientId)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;
                        const response = data.response;

                        //ids = response.clients[response.clients.length - 1].id;
                        //this.newOrder.client_id = response.ids[response.ids.length - 1];

                        if (success) {
                            this.clients = response.clients;

                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        // getClient per ottenere i dati degli ordini
        getOrder() {
            // Se clientId e' presente eseguo la chiama API
            if (this.clientId) {
                axios.get(API_URL + 'orders/' + this.clientId)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;
                        const response = data.response;

                        if (success) {
                            this.orders = response.orders;

                            // if (this.ids) {
                            //     localStorage.setItem("ClientId", this.ids.toString());
                            // }
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
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
                        //const response = data.response;

                        //this.newOrder.client_id = this.ids;

                        // Se tutto e' andato a buon fine richiamo this.getOrder e faccio apparire il popup 
                        if (success) {
                            this.getOrder();
                            this.showPopup = true;
                        }

                    })
                    .catch(error => console.log(error));

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
        // Metodo per creare nuovo cliente
        clientSubmit() {

            // Se firstStepValid e' true
            if (this.firstStepValid) {

                // showMessageEmailConfirm e' uguale a true e mi appare messaggio di conferma
                this.showMessageEmailConfirm = true;

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
                                localStorage.setItem("ClientId", this.clientId.toString());
                            }

                            //localStorage.setItem("ClientId", this.clientId.toString());

                            //ids = response.clients[response.clients.length - 1].id;

                            //localStorage.setItem("ClientId", ids.toString());

                            // Se tutto e' andato a buon fine richiamo richiamo getClient
                            if (success) {
                                this.getClient();
                            }

                        })
                        .catch(error => console.log(error));

                    //event.preventDefault();

                    // Incremento il valore di currentStep
                    this.currentStep++;

                    // Aggiorno valore currentStep in localStorage
                    localStorage.setItem("CurrentStep", this.currentStep.toString());

                    // Scrollo in alto per evitare problemi di visualizzazione pagina
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }, 2000);

                //this.newClient.typology = "";
            }

            // Se le email inserite dall'utente non coincidono assegno false a showMessageEmailConfirm
            if (this.newClient.email !== this.newClient.confirm_email && this.newClient.email.trim() !== "" && this.newClient.confirm_email.trim() !== "") {
                this.showMessageEmailConfirm = false;
            }
        },
        // Resetto valori dei campi del primo step se cambio tipologia
        resetCommonInputs() {
            if (this.newClient.typology) {
                this.newClient.name = "";
                this.newClient.surname = "";
                this.newClient.agency_name = "";
                this.newClient.vat_number = "";
                this.newClient.email = "";
                this.newClient.confirm_email = "";
                this.newClient.telephone_number = "";
                this.newClient.city_of_residence = "";
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
        // Elimina ordine dalla lista che compare
        deleteModel(order) {

            // Chiamata API per eliminare ordine
            axios.get(API_URL + 'delete/' + order.id)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    // Richiamo getOrder
                    if (success) {
                        this.getOrder();
                    }
                })
                .catch(error => console.log(error));

        },
        // Impedisco che questi campi possano contenere lettere e simboli
        filterCharacters() {
            this.newClient.telephone_number = this.newClient.telephone_number.replace(/\D/g, '');
            this.newClient.vat_number = this.newClient.vat_number.replace(/\D/g, '');
        },
        // Impedisco che questi campi possano contenere dei numeri
        filterNumbers() {
            this.newClient.name = this.newClient.name.replace(/[0-9]/g, '');
            this.newClient.surname = this.newClient.surname.replace(/[0-9]/g, '');
            this.newClient.city_of_residence = this.newClient.city_of_residence.replace(/[0-9]/g, '');
        },
        // Impedisco che questi campi possano contenere lettere
        filterSizes() {
            this.newOrder.width = this.newOrder.width.replace(/^[a-zA-Z]*$/g, '');
            this.newOrder.height = this.newOrder.height.replace(/^[a-zA-Z]*$/g, '');
        },
        // PreventDefault per evitare che la pagina ricarichi con l'invio del form
        handleSubmit(event) {
            event.preventDefault();
        },
        // Metodo per inviare informazioni tramite email (passo dallo step 3 allo step 4)
        complete() {
            //event.preventDefault();

            // Assegno email destinatario
            this.newEmail.ownerEmail = "oirelav95@gmail.com";

            // Assegno email cliente
            this.newEmail.clientEmail = this.newClient.email;
            //this.newEmail.order_id = this.clientId;

            // Chiamata API per inviare email con le informazioni del preventivo
            axios.post(API_URL + 'email/' + this.clientId, this.newEmail)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    // if (success) {
                    //     console.log("Tuttapposto");
                    // }
                })
                .catch(error => console.log(error.response.data)); // error.response.data

            // Scrollo verso l'alto
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            // Incremento currentStep
            this.currentStep++;

            // Salvo valore di currentStep in localStorage
            localStorage.setItem("CurrentStep", this.currentStep.toString());

            // this.name = "";
            // this.surname = "";
            // this.agency_name = "";
            // this.email = "";
            // this.telephone = "";
            // this.city_of_residence = "";
        },
        // Metodo per passare dal secondo al terzo step
        nextStep() {

            // Se currentStep e' uguale a 2 e se orders contiene elementi allora posso proseguire
            if (this.currentStep === 2 && this.orders.length !== 0) {

                //event.preventDefault();

                // Scrollo verso l'alto
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                // Richiamo getClient
                this.getClient();

                // Se il messaggio e' presente
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
                        .catch(error => console.log(error));
                }

                // axios.post(API_URL + 'message/store', this.newMessage)
                //     .then(res => {
                //         const data = res.data;
                //         const success = data.success;

                //         if (success) {
                //             this.getOrder();
                //         }

                //     })
                //     .catch(error => console.log(error));

                // Incremento currentStep
                this.currentStep++;

                // Aggiorno valore currentStep in localStorage
                localStorage.setItem("CurrentStep", this.currentStep.toString());
            }
        },
        // prevStep() {

        //     //event.preventDefault();

        //     this.newClient.typology = "";
        //     this.newClient.name = "";
        //     this.newClient.surname = "";
        //     this.newClient.agency_name = "";
        //     this.newClient.vat_number = "";
        //     this.newClient.email = "";
        //     this.newClient.telephone_number = "";
        //     this.newClient.city_of_residence = "";

        //     window.scrollTo({
        //         top: 0,
        //         behavior: "smooth"
        //     });

        //     this.currentStep--;

        //     localStorage.setItem("CurrentStep", this.currentStep.toString());

        // },
        // Metodo per aumentare quantita' ordini
        plus(order) {

            axios.post(API_URL + 'increment/' + order.id)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    if (success) {
                        this.getOrder();
                    }

                })
                .catch(error => console.log(error));

            //this.newOrder.quantity++;

            // axios.post(API_URL + 'quantity/update', {
            //     quantity: this.newOrder.quantity
            // })
            //     .then(res => {
            //         const data = res.data;
            //         const success = data.success;

            //         if (success) {
            //             this.getOrder();
            //         }

            //     })
            //     .catch(error => console.log(error));
        },
        // Metodo per diminuire quantita' ordini
        minus(order) {

            axios.post(API_URL + 'decrement/' + order.id)
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
    created() {
        // Salvo valore clientId in localStorage
        this.clientId = localStorage.getItem("ClientId");
    },
    mounted() {

        // Richiamo getClient e getOrder
        this.getClient();
        this.getOrder();

        // Assegno la tipologia "Privato" come tipologia di default appena si apre la pagina perche' altrimenti sarebbe uguale a stringa vuota
        if (this.newClient.typology === "") {
            this.newClient.typology = "Privato";
        }

        // Controllo che non via currentStep in localStorage
        if (localStorage.getItem("CurrentStep") !== null) {
            // Richiamo il suo valore da localStorage
            this.currentStep = parseInt(localStorage.getItem("CurrentStep"), 10);
        }

        // Salvo valore currentStep in localStorage
        localStorage.setItem("CurrentStep", this.currentStep.toString());

        // if (localStorage.getItem("ClientId") !== null) {
        //     this.clientId = parseInt(localStorage.getItem("ClientId"), 10);
        // }

        // localStorage.setItem("ClientId", this.clientId.toString());

        // Ottengo valore tipologia
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
                <form @submit="handleSubmit">
                    <div v-if="currentStep === 1" class="first-step">

                        <!-- Parte sinistra step 1 con gl input -->
                        <div class="first-step-left">

                            <div v-if="newClient.typology === 'Privato' || newClient.typology === ''">
                                <input type="text" v-model="newClient.name" placeholder="Nome *" @input="filterNumbers"
                                    title="Inserisci il nome" required>
                                <br>
                                <input type="text" v-model="newClient.surname" placeholder="Cognome *"
                                    title="Inserisci il cognome" @input="filterNumbers" required>
                            </div>

                            <div v-else-if="newClient.typology === 'Azienda'">
                                <input type="text" v-model="newClient.agency_name" placeholder="Nome Azienda *"
                                    title="Inserisci il nome dell'azienda" required>
                                <br>
                                <input type="text" v-model="newClient.vat_number" placeholder="Partita Iva *" maxlength="11"
                                    title="Inserisci la Partita Iva" @input="filterCharacters" required>
                            </div>

                            <input type="email" v-model="newClient.email" placeholder="E-mail *" title="Inserisci l'email"
                                required>
                            <br>
                            <input type="email" v-model="newClient.confirm_email" placeholder="Conferma e-mail *"
                                title="Conferma l'email" required>

                            <!-- Messaggio che fa capire se le email coincidono oppure no -->
                            <div v-if="showMessageEmailConfirm !== ''"
                                :class="showMessageEmailConfirm ? 'message-green' : 'message-red'">
                                {{ emailConfirmMessage }}
                            </div>

                            <br>
                            <input type="text" v-model="newClient.telephone_number" placeholder="Telefono *" maxlength="10"
                                @input="filterCharacters" title="Inserisci il numero di telefono" required>
                            <br>
                            <input type="text" v-model="newClient.city_of_residence" placeholder="Comune *"
                                title="Inserisci il comune" @input="filterNumbers" required>

                            <div class="obligatory">
                                i campi contrassegnati con &ast; sono obbligatori
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
                    </div>

                    <!-- Inizio step 2 -->
                    <div v-else-if="currentStep === 2" class="second-step">

                        <h2>
                            Seleziona il Modello
                        </h2>

                        <!-- Parte sopra - slider -->
                        <div class="inputs-top">
                            <div class="slider-preventivo" v-for="(zanz, index) in zanzs" :key="index"
                                :class="{ 'active': zanz.active }">

                                <!-- Titolo con modello zanzariera -->
                                <h3>
                                    {{ zanz.typo }}
                                </h3>

                                <!-- Immagini zanzariere -->
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

                                <!-- Nome zanzariera -->
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
                            <span v-for="(net, index) in nets" :key="index">
                                <label v-if="showNet || index === 0 || index === 1">
                                    {{ net }}
                                    <input type="radio" name="net" :value="net" v-model="newOrder.net"
                                        :required="fixRequiredProblem">
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
                        <div class="form-button" :class="{ 'padding': orders.length !== 0 }">

                            <button @click=" addZanz()" class="button">
                                Aggiungi Zanzariera
                            </button>
                        </div>

                        <!-- Titolo -->
                        <h2 v-if="orders.length !== 0">
                            Il tuo elenco
                        </h2>

                        <!-- Blocco popup -->
                        <div class="div-popup">
                            <!-- Elenco zanzariere preventivo -->
                            <ul v-if="orders.length !== 0" class="list-ul">
                                <li v-for=" order  in  orders " :key="order.id" class="list-order">
                                    <span>
                                        {{ typology.replace(/\([^)]*\)/g, "") }} | {{
                                            order.model_name.charAt(0).toUpperCase() +
                                            order.model_name.slice(1).toLowerCase().replace(/\([^)]*\)/g, "") }}
                                        | {{ order.net }} |
                                        <!-- <img :src="order.color_image" :alt="order.color_name" class="order-image"> -->
                                        {{ order.color_name }}
                                    </span>
                                    <span class="quantity">
                                        <div class="text">
                                            Quantit&agrave;:
                                            <span class="number">
                                                {{ order.quantity }}
                                            </span>
                                        </div>
                                        <div class="minus-plus">
                                            <button @click="plus(order)" :disabled="showPopup && !enablePlusMinus">
                                                <i class="fa-solid fa-angle-up"></i>
                                            </button>
                                            <button @click="minus(order)" :disabled="showPopup && !enablePlusMinus">
                                                <i class="fa-solid fa-angle-down"></i>
                                            </button>
                                        </div>
                                    </span>

                                    <span>
                                        {{ order.width }} cm x {{ order.height }} cm
                                    </span>

                                    <button @click="deleteModel(order)" class="delete"
                                        :disabled="showPopup && !enablePlusMinus && orders.length === 1">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                </li>
                            </ul>

                            <!-- Popup messaggio -->
                            <div id="popup" v-if="showPopup && !enablePlusMinus">
                                <p>
                                <div>Zanzariera aggiunta con successo!</div>
                                Puoi aggiungere altre zanzariere ricompilando i campi o
                                proseguire con il bottone "Conferma le zanzariere"
                                </p>

                                <!-- Tasto OK -->
                                <div @click="hiddenPopup" class="ok-popup">
                                    OK
                                </div>
                            </div>
                        </div>

                        <!-- Textarea -->
                        <div class="textarea" :class="{ 'padding': orders.length === 0 }">
                            <textarea v-model="message" rows="8" placeholder="Messaggio"></textarea>
                        </div>

                        <!-- Bottone per passare allo step successivo -->
                        <div class="form-button confirm">
                            <!-- <button @click="prevStep" class="button" id="buttons">Torna indietro</button> -->
                            <input type="submit" @click="nextStep" class="button" id="buttons" v-if="orders.length !== 0"
                                value="Conferma le zanzariere">
                        </div>

                    </div>

                    <!-- Inizio terzo step -->
                    <div v-else-if="currentStep === 3" class="third-step">
                        <!-- Titolo -->
                        <h2>
                            Ecco a te il riepilogo
                        </h2>

                        <!-- Riepilogo info cliente -->
                        <ul v-for=" client  in  clients " :key="client.id" class="summary info">
                            <li>
                                {{ client.typology }}
                                <hr>
                            </li>
                            <div v-if="client.typology === 'Privato'">
                                <li>
                                    Nome: {{ client.name }}
                                </li>
                                <li>
                                    Cognome: {{ client.surname }}
                                </li>
                            </div>
                            <div v-else>
                                <li>
                                    Nome Azienda: {{ client.agency_name }}
                                </li>
                                <li>
                                    Partita Iva: {{ client.vat_number }}
                                </li>
                            </div>
                            <li>
                                Email: {{ client.email }}
                            </li>
                            <li>
                                Telefono: {{ client.telephone_number }}
                            </li>
                            <li>
                                Comune: {{ client.city_of_residence }}
                            </li>
                        </ul>

                        <!-- Riepilogo info ordine -->
                        <ul v-for=" order  in  orders " :key="order.id" class="summary">
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
                            <input type="submit" @click="complete" class="button" id="buttons" value="Completa">
                        </div>
                    </div>

                    <!-- Quarto e ultimo step -->
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
                </form>
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
                margin-bottom: 15px;
            }
        }

        span {
            color: $yellow-color;
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

    h2 {
        padding-bottom: 30px;
        text-align: center;
    }

    .summary {
        background-color: #d9d9d9;
        padding: 20px;
        max-width: 700px;
        margin: 0 auto;

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
            background-color: $yellow-color;
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
    padding: 60px 40px 40px 40px;
    position: relative;

    .div-popup {
        position: relative;
    }

    #popup {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        background-color: #fff;
        width: 400px;
        padding: 0 40px;
        height: 200px;
        position: absolute;
        left: 50%;
        z-index: 50;
        color: #000;
        border-radius: 5px;
        box-shadow: 0 3px 2px rgba(0, 0, 0, .5);
        animation: fade-in-down 2s ease;
        transform: translate(-50%, 0);
        top: 10%;

        p {
            div {
                font-weight: bold;
            }
        }

        .ok-popup {
            background-color: #686868;
            color: #fff;
            cursor: pointer;
            padding: 5px;
            border-radius: 5px;
        }
    }

    @keyframes fade-in-down {
        0% {
            opacity: 0;
            transform: translate(-50%, -20px);
        }

        100% {
            opacity: 1;
            transform: translate(-50%, 0);
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

        h3:first-of-type {
            font-size: 1.4rem;
        }

        h3:last-of-type {
            font-size: 1.1rem;
            font-weight: 500;
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
                //box-shadow: inset 0 8px 0 rgba(0, 0, 0, .05);
                border-radius: 50%;
                margin: 0 auto;
                width: 230px;
                height: 230px;
                background-color: #eaeaea;

                img {
                    width: 110px;
                    height: 130px;
                }
            }
        }

        // h2 {
        //     padding: 20px 0 60px 0;
        //     background-color: red !important;
        // }

        // h3:first-of-type {
        //     padding-bottom: 20px;
        // }

        // h3:last-of-type {
        //     padding-top: 20px;
        // }

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
        margin: 20px 0 40px 0;

        .list-order {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            // &:not(.visible) {
            //     display: none;
            // }

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
        &.padding {
            padding-top: 60px;
        }

        textarea {
            font-family: 'Montserrat', sans-serif;
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


    select {
        font-family: 'Montserrat', sans-serif;
        border-radius: 50px;
        border: 2px solid $yellow-color;
        box-shadow: inset 0 3px 0 rgba(0, 0, 0, .1);
        background-color: #cccccc;
        outline: none;
        padding: 7px 10px;
        font-size: 0.9rem;
        margin: 80px 10px 0 10px;
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
            font-family: 'Montserrat', sans-serif;
            background-color: #cccccc;
            border: 0;
            border-radius: 50px;
            padding: 8px 10px;
            font-size: 0.9rem;
            color: #000;
            outline: none;
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
                border-radius: 50%;
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


@media only screen and (min-width: 480px) and (max-width: 840px) {

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


@media only screen and (min-width: 480px) and (max-width: 550px) {
    .container {

        .top {

            .steps-circles {
                width: 100%;

                .circle {
                    height: 60px;
                    line-height: 60px;
                }

                hr {
                    width: calc(100% / 3);
                }

            }
        }
    }
}

@media only screen and (min-width: 480px) and (max-width: 700px) {
    .container {

        .top {
            flex-wrap: wrap;
            max-width: 90%;

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

        .steps-text {
            max-width: 100%;


            .step {
                margin-left: 0;
                width: 100%;

                div {
                    width: calc(100% / 3);

                    &:first-child {
                        left: -20px;
                    }
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

        select {
            margin-top: 20px;
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


        .form-button {
            input {
                padding-right: 15px;
                padding-left: 15px;
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


@media only screen and (min-width: 480px) and (max-width: 1028px) {
    .second-step {

        select {
            width: 350px;
            margin-left: 0;
            //margin-top: 20px;
        }

        .inputs-center {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

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

            label {
                margin: 0;
                padding-left: 8px;
                padding-right: 8px;
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

        .list-ul {
            .list-order {
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px 0;

                span:first-child {
                    line-height: 30px;
                }

                li {
                    width: 100%;
                    text-align: center;
                }
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
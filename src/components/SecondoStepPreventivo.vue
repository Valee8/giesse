<script>

// Importo store
import { store } from '../store';

// Importo axios
import axios from 'axios';

//const imagePrefix = process.env.NODE_ENV === 'production' ? '/giesse/' : '';

export default {
    name: 'SecondoStepPreventivo',
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

            // Messaggio di avvenuto successo di aggiunta, aggiorna e eliminazione ordine
            textSuccessMessage: "",

            // Per attivare o disattivare i bottoni "Modifica" ed "Elimina" se c'e' una modifica di un ordine in corso
            enableEditDeleteButtons: false,

            // Per sovrapporre con z-index il popup dell'ordine selezionato agli altri popup tramite css (ne appare uno per ogni ordine, hanno position: absolute quindi sono uno sopra l'altro), al momento e' null poi nei vari metodi gli assegno il valore dell'id dell'ordine
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

            // showSelectModelText per mostrare e nascondere la scritta "Seleziona il modello" durante la modifica dei dati, appare una volta che l'utente ha scelto una tipologia
            showSelectModelText: false,

            // Per salvarmi l'id di order in modo che se premo il tasto 'modifica' per la modifica di un ordine mi appaia l'ordine selezionato
            showEditInputs: null,

            // Per mostrare popup se scelgo di eliminare ordine
            showDeleteItemPopup: false,

            // Per mostrare popup se scelgo di aggiornare modifiche ordine
            showUpdateItemPopup: false,

            // Per mostrare popup se scelgo di annullare modifiche ordine
            showCancelUpdateItemPopup: false,

            // Per mostrare popup di aggiunta ordine
            showAddedItemPopup: false,

            // Per mostrare il tipo di rete a seconda del modello selezionato tramite lo slider (alcune non hanno oscuranti e li nascondo showNet = false)
            showNet: true,

            // Per mostrare il tipo di rete a seconda del modello selezionato quando sono nella modifica dei dati (alcune non hanno oscuranti e li nascondo showNetEditItem = false)
            showNetEditItem: true,

            // fixRequiredProblem: Per risolvere il problema del messaggio predefinito del browser che mi chiede di selezionare un modello dallo slider (mi dice che il dato da inserire e' obbligatorio quando non dovrebbe)
            fixRequiredProblem: false,

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

            // Contiene messaggio inserito dall'utente nell'ordine
            message: "",
            // Elenco zanzariere
            zanzs: [
                {
                    name: "Verticali a molla classica",
                    typo: "Verticali",
                    image: "img/zanzariere/alba.webp",
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
                    image: "img/zanzariere/laura.webp",
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
                    image: "img/zanzariere/katia.webp",
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
                    image: "img/zanzariere/giada.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "GIADA (con cuffie)",
                        "MERI (senza cuffie)"
                    ]
                },
                {
                    name: "Laterali a molla classica",
                    typo: "Laterali",
                    image: "img/zanzariere/alba-laterale.webp",
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
                    typo: "Laterali",
                    image: "img/zanzariere/lara-rigata.webp",
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
                    typo: "Laterali",
                    image: "img/zanzariere/luna.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "LUNA",
                    ]
                },
                {
                    name: "Laterale a molla (guida inferiore da 3mm)",
                    typo: "Laterali",
                    image: "img/zanzariere/zelig.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "ZELIG",
                    ]
                },
                {
                    name: "Laterale Frizionata",
                    typo: "Laterali",
                    image: "img/zanzariere/jolly.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "JOLLY / LEVANTE",
                    ]
                },
                {
                    name: "Laterale Antivento",
                    typo: "Laterali",
                    image: "img/zanzariere/bora.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "BORA",
                    ]
                },
                {
                    name: "Laterale Plissettata",
                    typo: "Laterali",
                    image: "img/zanzariere/plisse-22.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "PLISSE' 22",
                    ]
                },
                {
                    name: "Porta a battente",
                    typo: "Altre",
                    image: "img/zanzariere/porta-a-battente.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "ANTAREX",
                    ]
                },
                {
                    name: "A pannelli scorrevoli",
                    typo: "Altre",
                    image: "img/zanzariere/scorri.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "SCORRI",
                    ]
                },
                {
                    name: "Telaio fisso",
                    typo: "Altre",
                    image: "img/zanzariere/fissa.webp",
                    active: false,
                    activeSelect: false,
                    models: [
                        "FISSA",
                    ]
                },
                {
                    name: "Con guida da incasso per falegnami",
                    typo: "Altre",
                    image: "img/zanzariere/casper.webp",
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
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        // Modifico il nome della tipologichangeTypologya
        changeTypology(typology) {

            let varTypology = typology;
            // Se la tipologia contiene una parentesi nel suo testo allora elimino le parentesi e il loro contenuto
            if (varTypology.includes(")")) {
                varTypology = typology.replace(/(\([^)]*\)|\d+)/g, "");
            }

            // Altrimenti elimino solo l'ultimo numero o gli ultimi 2 numeri presenti nella stringa
            else if (!varTypology.endsWith("35")) {
                varTypology = typology.replace(/[0-9]{1,2}$/, "");
            }

            return varTypology;
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
        // Popup per eliminare un ordine
        deleteItemPopup(order) {
            // Faccio apparire il popup mettendo showDeleteItemPopup a true
            this.showDeleteItemPopup = true;

            // C'e' un popup attivo quindi metto activePopup a true
            this.store.activePopup = true;

            // Assegno a checkIdOrders l'id dell'ordine
            this.checkIdOrders = order.id;

        },
        // Popup per modificare un ordine
        updateItemPopup(order) {

            // Se il nome del modello, la rete, la larghezza a l'altezza non contengono spazi
            if (order.model_name.trim() !== "" && order.net.trim() !== "" && order.width.trim() !== "" && order.height.trim() !== "") {
                // Faccio comparire il popup
                this.showUpdateItemPopup = true;

                // C'e' un popup attivo quindi metto activePopup a true
                this.store.activePopup = true;
            }

            // Assegno a checkIdOrders l'id dell'ordine
            this.checkIdOrders = order.id;

        },
        // Metodo per annullare la modifica di un ordine (premo tasto annulla del popup)
        cancelUpdateItem() {
            // Nascondo il popup
            this.showCancelUpdateItemPopup = false;

            // Non c'e' un popup attivo quindi metto activePopup a false
            this.store.activePopup = false;

            //document.body.classList.add("active-edit");
        },
        // Popup per annulla le modifiche apportate ad un ordine
        cancelUpdateItemPopup(order) {
            // Faccio apparire il popup
            this.showCancelUpdateItemPopup = true;

            // C'e' un popup attivo quindi metto activePopup a true
            this.store.activePopup = true;

            // Assegno a checkIdOrders l'id dell'ordine
            this.checkIdOrders = order.id;

            //document.body.classList.remove("active-edit");

        },
        // Metodo quando viene cliccata la matita e sono sulla modifica dell'ordine
        showEdit(order) {

            // Disattivo i bottoni "Modifica" ed "Elimina" di tutti gli altri ordini che non sono quello corrente che sto modificando, in modo che possa modificare un solo ordine alla volta
            this.enableEditDeleteButtons = true;

            //document.body.classList.add("active-edit");

            // Salvo i dati dell'ordine su oldOrder
            for (const key in order) {
                this.oldOrder[key] = order[key];
            }

            // Non faccio comparire la scritta "Seleziona il modello", che appare solo quando seleziono un'altra tipologia
            this.showSelectModelText = false;

            // Scelgo la tipologia attiva da mostrare
            for (let i = 0; i < this.zanzs.length; i++) {

                this.zanzs[i].activeSelect = false;

                if (order.typology.includes(this.zanzs[i].name)) {
                    this.zanzs[i].activeSelect = true;
                }
            }

            // Se typology contiene uno di questi numeri
            if (order.typology.includes(6) || order.typology.includes(7) || order.typology.includes(8) || order.typology.includes(9) || order.typology.includes(10)) {
                // Per questi modelli gli oscuranti non sono disponibili, li nascondo assegnando false a showNetEditItem
                this.showNetEditItem = false;

                // Se la tipologia di rete attuale comprende Oscurante allora gli assegno il valore Rete normale per non dar possibilita' di creare ordini che non possono avere l'oscurante
                if (this.oldOrder.net.includes("Oscurante")) {
                    this.oldOrder.net = "Rete normale";
                }
            }
            // Altrimenti showNetEditItem a true
            else {
                this.showNetEditItem = true;
            }

            // Se showEditInputs e' uguale all'id di order
            if (this.showEditInputs === order.id) {

                // Allora showEditInputs a null
                this.showEditInputs = null;
            }
            // Altrimenti se e' null
            else {
                // showEditInputs uguale a id di order
                this.showEditInputs = order.id;
            }
        },
        // Metodo che nasconde il contenuto di modifica dell'ordine
        hideEdit(order) {

            // Riattivo i bottoni "Modifica" ed "Elimina" di tutti gli ordini
            this.enableEditDeleteButtons = false;

            // showEditInputs a null
            this.showEditInputs = null;

            // Non c'e' un popup attivo quindi metto activePopup a false
            this.store.activePopup = false;

            // Nascondo il popup
            this.showCancelUpdateItemPopup = false;

            // Salvo i dati di order in oldOlder
            for (const key in this.oldOrder) {
                order[key] = this.oldOrder[key];
            }
        },
        // Metodo per quando seleziono una tipologia dalla modifica dell'ordine
        selectTypo(event, order) {

            // Assegno a typologyName il valore di typology
            let typologyName = event.target.value;

            // Faccio comparire la scritta "Seleziona il modello"
            this.showSelectModelText = true;

            // Se la scritta "Seleziona il modello" e' presente allora svuoto il contenuto di model_name, cosi' se premo il bottone per proseguire con le modifiche senza aver scelto un modello mi appare il messaggio di avviso, altrimenti mi rimarrebbe il valore precedente
            if (this.showSelectModelText) {
                order.model_name = "";
            }

            //console.log(event.target.options[event.target.selectedIndex].innerText);

            // Scelgo la tipologia attiva da mostrare
            for (let i = 0; i < this.zanzs.length; i++) {

                this.zanzs[i].activeSelect = false;

                if (typologyName.includes(this.zanzs[i].name)) {
                    this.zanzs[i].activeSelect = true;
                }
            }

            // Se la tipologia include uno di questi numeri
            if (typologyName.includes(6) || typologyName.includes(7) || typologyName.includes(8) || typologyName.includes(9) || typologyName.includes(10)) {

                // Per questi modelli gli oscuranti non sono disponibili, li nascondo assegnando false a showNetEditItem
                this.showNetEditItem = false;

                // Se la tipologia di rete attuale comprende Oscurante allora gli assegno il valore Rete normale per non dar possibilita' di creare ordini che non possono avere l'oscurante
                if (order.net.includes("Oscurante")) {
                    order.net = "Rete normale";
                }
            }
            // Altrimenti assegno true a showNetEditItem
            else {
                this.showNetEditItem = true;
            }
        },
        // Metodo per aggiungere una zanzariera
        addZanz() {

            // Se i campi dei valori di newOrder non sono vuoti
            if (this.newOrder.model_name !== "" && this.newOrder.width !== "" && this.newOrder.height !== "" && this.newOrder.quantity !== "" && this.newOrder.net !== "" && this.newOrder.color_name !== "") {

                // Risolvo problemi di required, il messaggio di avviso del browser mi appare ogni volta che cambio slide, con questo evito che accada
                this.fixRequiredProblem = false;

                // Assegno l'id di client a clientId
                this.newOrder.client_id = this.store.clientId;

                // Chiamata API per creare un nuovo ordine
                axios.post(this.store.apiUrl + 'order/store', this.newOrder)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        // Se tutto e' andato a buon fine richiamo this.getOrder e faccio apparire il popup
                        if (success) {
                            this.getOrder();
                        }

                    })
                    .catch(error => {
                        console.error(error.response.data);
                        this.store.showError = true;
                    });

                setTimeout(() => {
                    // Faccio comparire il popup
                    this.showAddedItemPopup = true;

                    // C'e' un popup attivo quindi metto activePopup a true
                    this.store.activePopup = true;
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

                // Quando aggiungo una zanzariera rimane su checked il colore che ho appena selezionato, con questo codice, una volta che ho aggiunto una zanzariera, rimuovo tutti i checked dai colori
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

                // Ottengo valore tipologia
                this.newOrder.typology = this.zanzs[0].name;

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
        // Metodo per eliminare un ordine
        deleteModel(order) {

            // Chiamata API per eliminare ordine
            axios.delete(this.store.apiUrl + 'delete/' + order.id)
                .then(res => {
                    const data = res.data;
                    const success = data.success;

                    // Richiamo getOrder
                    if (success) {

                        this.getOrder();
                        // Faccio apparire messaggio
                        this.textSuccessMessage = "Ordine eliminato con successo!";

                    }
                })
                .catch(error => console.error(error));

            setTimeout(() => {
                // Nascondo popup
                this.showDeleteItemPopup = false;
                // Non c'e' un popup attivo quindi metto activePopup a false
                this.store.activePopup = false;
                // Nascondo messaggio
                this.textSuccessMessage = "";
            }, 2000);


        },
        // Metodo per passare dal secondo al terzo step (bottone "Completa le Zanzariere")
        orderSubmit() {

            // Se orders contiene elementi allora posso proseguire
            if (this.store.orders.length !== 0) {

                this.fixRequiredProblem = false;

                //Se il messaggio e' presente
                if (this.message) {
                    // Chiamata api per modificare il messaggio (inizialmente vuoto)
                    axios.post(this.store.apiUrl + 'message/update/' + this.store.clientId, {
                        message: this.message
                    })
                        .then(res => {
                            const data = res.data;
                            const success = data.success;

                            // Se success = true richiamo getClient, aggiorno dati cliente
                            if (success) {
                                // Aggiorno dati
                                this.getClient();
                            }

                        })
                        .catch(error => console.error(error));
                }

                // Incremento currentStep
                this.store.currentStep++;

                // Aggiorno valore currentStep in localStorage
                sessionStorage.setItem("CurrentStep", this.store.currentStep.toString());

                // Scrollo in alto
                this.scrollToTop();
            }
            else {
                this.fixRequiredProblem = true;
            }
        },
        // Metodo per modificare effettivamente l'ordine
        editOrder(order) {

            // Se ogni valore non contiene spazi vuoti
            if (order.model_name.trim() !== "" && order.net.trim() !== "" && order.width.trim() !== "" && order.height.trim() !== "") {

                // Chiamata per moodificare i dati
                axios.post(this.store.apiUrl + 'orders/update/' + order.id, order)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        // Se success = true richiamo getClient, aggiorno dati cliente
                        if (success) {
                            // Aggiorno dati
                            this.getOrder();

                            // Faccio apparire messaggio
                            this.textSuccessMessage = "Modifiche effettuate con successo!";
                        }

                    })
                    .catch(error => {
                        console.error(error.response.data);
                    });

                setTimeout(() => {
                    // C'e' un popup attivo quindi metto activePopup a true
                    this.store.activePopup = false;

                    // showEditInputs a null
                    this.showEditInputs = null;

                    // Faccio scomparire il popup
                    this.showUpdateItemPopup = false;

                    // Abilito nuovamente i bottoni "Modifica" ed "Elimina" per ogni ordine
                    this.enableEditDeleteButtons = false;

                    // Nascondo il messaggio
                    this.textSuccessMessage = "";
                }, 2000);

            }
        },
        // Metodo per far scomparire il popup dopo che ho premuto "OK"
        hideAddedItemPopup() {
            // Nascondo il popup
            this.showAddedItemPopup = false;

            // C'e' un popup attivo quindi metto activePopup a false
            this.store.activePopup = false;

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

            // Assegno a typology il nome della tipologia corrente
            this.newOrder.typology = this.zanzs[index].name;

            // Assegno true ad active della tipologia corrente
            this.zanzs[index].active = true;

            // Assegno false a tutti gli altri active che non sono uguali all'index
            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

            // Se index e' uguale ad uno di questi numeri
            if (index === 6 || index === 7 || index === 8 || index === 9 || index === 10) {

                // Per questi modelli gli oscuranti non sono disponibili e li nascondo
                this.showNet = false;
            }
            // Altrimenti quei modelli possono avere gli oscuranti e non li nascondo
            else {
                this.showNet = true;
            }

        },

        // Metodo per diminuire quantita' ordini
        minus(order) {

            if (order.quantity > 1) {
                order.quantity--;
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

            // Assegno a typology il nome della tipologia corrente
            this.newOrder.typology = this.zanzs[index].name;

            // Assegno true ad active della tipologia corrente
            this.zanzs[index].active = true;

            // Assegno false a tutti gli altri active che non sono uguali all'index
            for (let i = 0; i < this.zanzs.length; i++) {
                if (i !== index) {
                    this.zanzs[i].active = false;
                }
            }

            // Se index e' uguale ad uno di questi numeri
            if (index === 6 || index === 7 || index === 8 || index === 9 || index === 10) {

                // Per questi modelli gli oscuranti non sono disponibili e li nascondo
                this.showNet = false;
            }
            // Altrimenti quei modelli possono avere gli oscuranti e non li nascondo
            else {
                this.showNet = true;
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

        // Impedisco che questi campi possano contenere lettere
        filterSizes(order) {
            if (this.showEditInputs === order.id) {
                order.width = order.width.replace(/^[a-zA-Z]*$/g, "");
                order.height = order.height.replace(/^[a-zA-Z]*$/g, "");
            }
            else {
                this.newOrder.width = this.newOrder.width.replace(/^[a-zA-Z]*$/g, "");
                this.newOrder.height = this.newOrder.height.replace(/^[a-zA-Z]*$/g, "");
            }
        },
    },
    mounted() {
        // Ottengo valore tipologia
        this.newOrder.typology = this.zanzs[0].name;

        this.getOrder();
    }
}
</script>

<template>

    <!-- Inizio step 2 -->
    <div class="second-step">

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
                        <img :src="zanz.image" :alt="'Immagine zanzariera ' + zanz.name" width="120" height="150">
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
            <div v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex">
                <select v-if="zanz.active" :required="fixRequiredProblem" v-model="newOrder.model_name"
                    :disabled="store.activePopup">
                    <option value="" disabled selected hidden>
                        Seleziona il modello *
                    </option>
                    <option v-for="(nameModel, modelIndex) in zanz.models" :value="nameModel" :key="modelIndex">
                        {{ nameModel }}
                    </option>
                </select>
            </div>
        </div>


        <!-- Input centrale - Larghezza, altezza e quantita' -->
        <div class="inputs-center">
            <label>
                Inserisci:
                <input type="text" name="width" placeholder="Larghezza (in cm) *" v-model="newOrder.width"
                    @input="filterSizes" :required="fixRequiredProblem" maxlength="6" :disabled="store.activePopup">

                <input type="text" name="height" placeholder="Altezza (in cm) *" v-model="newOrder.height"
                    @input="filterSizes" :required="fixRequiredProblem" maxlength="6" :disabled="store.activePopup">

                <input type="number" name="quantity" placeholder="Quantità *" min="1" v-model="newOrder.quantity"
                    :required="fixRequiredProblem" :disabled="store.activePopup">
            </label>
        </div>

        <!-- Input sotto - input radio scelta rete -->
        <div class="inputs-bottom">
            <div v-for="(net, netIndex) in nets" :key="netIndex"
                :class="{ 'visible': showNet || netIndex === 0 || netIndex === 1 }" class="netsClass">
                <label>
                    {{ net }}
                    <input type="radio" name="net" :value="net" v-model="newOrder.net" :required="fixRequiredProblem"
                        :disabled="store.activePopup">
                </label>
            </div>
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
                            :required="fixRequiredProblem" class="radio" :disabled="store.activePopup">
                        <!-- Immagine colore -->
                        <img :src="color.image" :alt="'Colore ' + color.name" class="color-image">

                        <!-- Nome colore -->
                        <div class="color-name">
                            {{ color.name }}
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <!-- Bottone aggiungi zanzariera -->
        <div class="form-button" :class="{ 'padding': store.orders.length !== 0 }">
            <button type="submit" @click="addZanz()" class="button">
                Aggiungi Zanzariera
            </button>
        </div>

        <!-- Titolo -->
        <div class="orders-all" v-if="store.orders.length !== 0">
            <h2>
                Il tuo elenco
            </h2>

            <!-- Elenco zanzariere preventivo - parte dove non puoi modificare l'ordine -->
            <ul class="list-ul">
                <li v-for="order in store.orders" :key="order.id" class="list-order"
                    :class="{ 'edited': showEditInputs === order.id, 'disabled': enableEditDeleteButtons && showEditInputs !== order.id }">

                    <!-- Tipologia, nome modello, rete e nome colore -->
                    <div class="list-order-div" v-if="showEditInputs !== order.id">
                        <span class="typology-model">
                            {{ changeTypology(order.typology) }} |
                            {{ changeNameModel(order.model_name) }} |
                            {{ order.net }} |
                            {{ order.color_name }}
                        </span>

                        <!-- Larghezza e altezza -->
                        <span class="width-height">
                            L: {{ order.width }} cm x H: {{ order.height }} cm
                        </span>

                        <!-- Quantita' -->
                        <span class="quantity">
                            <span class="text">
                                Quantità:
                                <span class="number">
                                    {{ order.quantity }}
                                </span>
                            </span>
                        </span>
                    </div>

                    <!-- Parte dove puoi modificare l'ordine - input e select -->
                    <div v-if="showEditInputs === order.id" class="list-order-div"
                        :class="{ 'edited': showEditInputs === order.id }">

                        <!-- Select Tipologia -->
                        <select name="typology" @change="selectTypo($event, order)" class="select-typology"
                            v-model="order.typology" title="Modifica la tipologia" required>
                            <option :value="order.typology" disabled selected hidden>
                                {{ order.typology.replace(/[0-9]{1,2}$/, "") }}
                            </option>
                            <option :value="zanz.name + zanzIndex" v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex">
                                {{ zanz.name }}
                            </option>
                        </select>

                        <!-- Select Modello -->
                        <select name="model_name" v-for="(zanz, zanzIndex) in zanzs" :key="zanzIndex"
                            :class="{ 'select-none': !zanz.activeSelect }" class="select-model"
                            @change="showSelectModelText = false" v-model="order.model_name" title="Modifica il modello"
                            required>
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

                        <!-- Select Rete -->
                        <select name="net" class="select-net" v-model="order.net" title="Modifica il tipo di rete"
                            required>
                            <option :value="order.net" disabled hidden
                                :class="{ 'visible': showNetEditItem || order.net.includes('Rete') }">
                                {{ order.net }}
                            </option>
                            <option v-for="(net, netIndex) in nets" :key="netIndex"
                                :class="{ 'visible': showNetEditItem || netIndex === 0 || netIndex === 1 }">
                                {{ net }}
                            </option>
                        </select>

                        <!-- Select Colore -->
                        <select name="color_name" class="select-color" v-model="order.color_name"
                            title="Modifica il colore" required>
                            <option value="" disabled selected>
                                {{ order.color_name }}
                            </option>
                            <optgroup v-for="(color, colorIndex) in store.colors" :label="color.typology"
                                :key="colorIndex">
                                <option v-for="(colorName, colorNameIndex) in color.colorInfo" :key="colorNameIndex">
                                    {{ colorName.name }}
                                </option>
                            </optgroup>
                        </select>

                        <!-- Input Larghezza -->
                        <div class="width-edit">
                            <label>
                                Larghezza:
                                <input type="text" name="width" v-model="order.width" title="Modifica la larghezza"
                                    @input="filterSizes(order)" maxlength="6" required>
                            </label>
                        </div>

                        <!-- Input Altezza -->
                        <div class="height-edit">
                            <label>Altezza:
                                <input type="text" name="height" v-model="order.height" title="Modifica l'altezza"
                                    @input="filterSizes(order)" maxlength="6" required>
                            </label>
                        </div>

                        <!-- Input Quantita' -->
                        <div class="quantity" title="Modifica la quantità">
                            <div class="text">
                                Quantità:
                                <span class="number">
                                    {{ order.quantity }}
                                </span>
                            </div>
                            <div class="minus-plus" v-if="showEditInputs === order.id">
                                <a @click="order.quantity++">
                                    <i class="fa-solid fa-angle-up"></i>
                                </a>
                                <a @click="minus(order)">
                                    <i class="fa-solid fa-angle-down"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Bottoni "Modifica" ed "Elimina" -->
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
                    <!-- Bottoni "Modifica" ed "Elimina" -->

                    <!-- Bottoni "Annulla Modifica" e "Aggiorna Modifica"  -->
                    <div v-else :class="{ 'edited': showEditInputs === order.id }">
                        <!-- Bottone annulla modifiche -->
                        <button @click="cancelUpdateItemPopup(order)" class="little-button cancel"
                            title="Annulla le modifiche">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </button>

                        <!-- Bottone aggiorna modifiche -->
                        <button @click="updateItemPopup(order)" class="little-button confirm"
                            title="Conferma le modifiche">
                            <i class="fa-solid fa-circle-check"></i>
                        </button>
                    </div>
                    <!-- Bottoni "Annulla Modifica" e "Aggiorna Modifica"  -->


                    <!-- Popup che appare dopo che hai aggiunto una nuova zanzariera -->
                    <div class="popup" v-if="showAddedItemPopup">
                        <p>
                            Zanzariera aggiunta con successo!
                        </p>

                        <span>
                            Puoi aggiungere altre zanzariere ricompilando i campi o
                            proseguire con il bottone "Conferma le zanzariere".
                        </span>

                        <button @click="hideAddedItemPopup">
                            OK
                        </button>
                    </div>

                    <!-- Popup per confermare l'eliminazione di un elemento -->
                    <div class="popup" v-if="showDeleteItemPopup" :class="{ 'id': checkIdOrders === order.id }">

                        <div v-if="textSuccessMessage === ''">
                            <p>
                                Confermi di voler eliminare l'ordine dalla lista?
                            </p>

                            <button @click="showDeleteItemPopup = false, store.activePopup = false">
                                Annulla
                            </button>

                            <button @click="deleteModel(order)">
                                Conferma
                            </button>
                        </div>

                        <div v-else>
                            {{ textSuccessMessage }}
                        </div>
                    </div>

                    <!-- Popup per confermare le modifiche effettuate di un elemento -->
                    <div class="popup" v-if="showUpdateItemPopup" :class="{ 'id': checkIdOrders === order.id }">

                        <div v-if="textSuccessMessage === ''">
                            <p>
                                Confermi le modifiche effettuate?
                            </p>

                            <button @click="showUpdateItemPopup = false, store.activePopup = false">
                                Annulla
                            </button>

                            <button @click="editOrder(order)">
                                Conferma
                            </button>
                        </div>

                        <div v-else>
                            {{ textSuccessMessage }}
                        </div>
                    </div>

                    <!-- Popup per confermare l'annullamento delle modifiche di un elemento -->
                    <div class="popup" v-if="showCancelUpdateItemPopup" :class="{ 'id': checkIdOrders === order.id }">

                        <p>
                            Confermi di voler annullare le modifiche?
                        </p>

                        <button @click="cancelUpdateItem()">
                            Annulla
                        </button>

                        <button @click="hideEdit(order)">
                            Conferma
                        </button>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Textarea -->
        <div class="textarea" :class="{ 'padding': store.orders.length === 0 }">
            <textarea name="message" v-model="message" rows="8" placeholder="Messaggio"
                title="Aggiungi un messaggio"></textarea>
        </div>

        <!-- Messaggio d'errore -->
        <div v-if="store.showError" class="error-axios">
            Si è verificato un errore. Aggiorna la pagina e riprova.
        </div>

        <!-- Bottone per passare allo step successivo -->
        <div class="form-button confirm">
            <!-- <button @click="prevStep" class="button" id="buttons">Torna indietro</button> -->
            <input type="submit" @click="orderSubmit" class="button" value="Conferma le zanzariere">
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

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

// Nascondo i select e gli option se gli oscuranti sono disponibili per quei modelli
.option-none,
.select-none {
    display: none;
}

// Stili messaggio d'errore
.error-axios {
    color: red;
    text-align: center;
    width: 100%;
    font-size: 0.8rem;
    padding-top: 10px;
}


// SECONDO STEP
.second-step {
    background-color: #adadad;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 300px;
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

                    .typology-model,
                    .width-height,
                    .quantity {
                        padding: 10px;
                    }

                    span {

                        &.typology-model {
                            width: 568px;
                        }
                    }
                }

                &.edited {
                    width: 940px;
                    flex-wrap: wrap;

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
        .netsClass {
            display: inline-block;
        }

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

        label {
            font-weight: 500;
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

}


@media only screen and (min-width: 300px) and (max-width: 400px) {

    // .orders-all {

    //     h2 {
    //         margin-bottom: 15px;
    //     }

    //     .delete-all-button {
    //         position: relative;
    //         right: 0;
    //     }
    // }

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
</style>
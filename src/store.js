import { reactive } from 'vue';

export const store = reactive({
    infoDitta: {
        address: "Via Damiano Chiesa 69",
        postalCode: "09016 Iglesias",
        telephone: "0781 33387",
        cell: "+39 3939139300",
        email: "giessezanzariere@tiscali.it",
        vatNumber: "01376020929"
    },
    showPopupExitRoutePreventivo: false,
    changeRoute: false,
    linkRoute: null,
    // Array contenente i dati del cliente
    clients: [],
    // Array contenente i dati dell'ordine
    orders: [],
    // Mi salvo l'id di client
    clientId: "",
    // Messaggio di errore se l'invio dei dati (sia step 1 per il cliente, sia step2 per gli ordini) non e' andato a buon fine
    showError: false,
    // activePopup - Per verificare che un popup sia presente, in questo modo posso bloccare il contenuto attorno al popup e non far interagire l'utente con nient'altro nella pagina fino a quando il popup non scompare
    activePopup: false,
    // Step corrente del preventivo
    currentStep: 1,
    // URL per la chiamata API
    apiUrl: "/backend/api/",
    // Info Logo in Navbar e Footer
    logo: {
        image: "/img/sfondi-e-logo/logo-giesse.jpg",
        alt: "Logo Giesse Zanzariere"
    },
    // Scritta "Home" nella varie sezioni
    textHome: "Home",
    // Contiene gli slider Verticali o Orizzontali a seconda della sezione
    slider: [],
    // menuHamburger per mostrare e nascondere il sottomenu del menu hamburger
    menuHamburger: false,
    // classHamburger mi serve per aggiungere le classi css per gli effetti del sottomenu
    classHamburger: "",
    // submenu per mostrare e nascondere il sottomenu della scritta "Zanzariere"
    submenu: false,
    // classSubmenu mi serve per aggiungere le classi css per gli effetti del sottomenu di "Zanzariere"
    classSubmenu: "",
    // Lista modelli zanzariere
    listModels: [
        {
            name: "Verticale a molla classica",
            hash: "#verticale-molla",
        },
        {
            name: "Verticale a molla (sistema a cricchetto)",
            hash: "#cricchetto"
        },
        {
            name: "Verticale a catena classica",
            hash: "#catena"
        },
        {
            name: "Verticale a catena + molla",
            hash: "#catena-molla"
        },
        {
            name: "Laterale a molla classica",
            hash: "#laterale-molla"
        },
        {
            name: "Laterale a molla (guida inferiore da 2cm)",
            hash: "#molla-guida-bassa"
        },
        {
            name: "Laterale a molla (guida arrotondata da 14mm)",
            hash: "#luna"
        },
        {
            name: "Laterale a molla (guida inferiore da 3mm)",
            hash: "#zelig"
        },
        {
            name: "Laterale Frizionata",
            hash: "#laterale-frizionata"
        },
        {
            name: "Laterale Antivento",
            hash: "#bora"
        },
        {
            name: "Laterale Plissettata",
            hash: "#plisse"
        },
        {
            name: "Porta a battente",
        },
        {
            name: "Scorri",
        },
        {
            name: "Fissa",
        },
        {
            name: "Casper",
        },
    ],
    // Lista links per ogni nav (Menu bello e menu hamburger)
    linksNav: [
        {
            text: "Richiedi Preventivo",
            href: "preventivo",
            icon: "fa-regular fa-file-lines",
            active: false
        },
        {
            text: "Posizione Sede",
            href: "sede",
            icon: "fa-solid fa-location-dot",
            active: false
        },
        {
            text: "Contatti",
            href: "contatti",
            icon: "fa-solid fa-phone",
            active: false
        }
    ],
    // Array di oggetti 'vertical' - contiene informazioni zanzariere
    vertical: [
        {
            typology: "VERTICALE A MOLLA CLASSICA",
            models: [
                {
                    name: "ALBA D.G.",
                    info: [
                        "Guida telescopica",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "SONIA D.G.",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "GENNY",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 40mm"
                    ],
                    hover: false
                },
                {
                    name: "GIUSY",
                    info: [
                        "Guida singola",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "ELENA",
                    info: [
                        "Guida singola",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "EDDI",
                    info: [
                        "Guida singola",
                        "Testata singola",
                        "Cassonetto da 40mm"
                    ],
                    hover: false
                }
            ],
            //secondName: "GIUSY (con cuffie) - ELENA (senza cuffie) - EDDI (con cassonetto da 40mm)",
            image: "/img/zanzariere/alba.jpg",
            width: 240,
            height: 320,
            description: "Il modello VERTICALE A MOLLA CLASSICA, adatto soprattutto per finestre, può essere realizzato in diverse tipologie e modelli.",
            active: true
        },
        {
            typology: "VERTICALE A MOLLA (con sistema a cricchetto)",
            models: [
                {
                    name: "LAURA",
                    info: [
                        "Guida telescopica",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "EVA",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "ASIA",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 40mm"
                    ],
                    hover: false
                },
            ],
            image: "/img/zanzariere/laura.jpg",
            width: 280,
            height: 320,
            description: "Il modello VERTICALE A MOLLA può essere realizzato anche con sistema a CRICCHETTO (un sistema a pulsante che permette l'apertura della zanzariera in modo semplice e veloce). Questo sistema viene realizzato solamente con guida telescopica.",
            active: false
        },
        {
            typology: "VERTICALE A CATENA CLASSICA",
            models: [
                {
                    name: "KATIA D.G.",
                    info: [
                        "Guida telescopica",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "VERA",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "SARA",
                    info: [
                        "Guida singola",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
            ],
            image: "/img/zanzariere/katia.jpg",
            width: 233,
            height: 320,
            description: "Il modello VERTICALE A CATENA CLASSICA è adatto sia per finestre sia per portefinestre in quanto è dotato di una catenella che può essere inserita sia dalla parte interna sia dalla parte esterna, in modo da non doversi inchinare. Può essere realizzato esclusivamente con il cassonetto da 50mm.",
            active: false
        },
        {
            typology: "VERTICALE A CATENA + MOLLA (con aggancio magnetico)",
            models: [
                {
                    name: "GIADA",
                    info: [
                        "Guida telescopica",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "MERI",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
            ],
            nameClass: "giada",
            image: "/img/zanzariere/giada.jpg",
            width: 220,
            height: 290,
            description: "Il modello VERTICALE A CATENA + MOLLA, prodotto esclusivamente con il cassonetto da 50mm e la guida telescopica, si differenzia dal modello VERTICALE A CATENA CLASSICA in quanto viene dotato di una molla di richiamo che permette di tenere la rete ben tesa.",
            active: false
        }
    ],
    // Array di oggetti 'horizontal' - contiene informazioni zanzariere
    horizontal: [
        {
            typology: "LATERALE A MOLLA CLASSICA",
            models: [
                {
                    name: "TIPO ALBA",
                    info: [
                        "Guida telescopica",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "TIPO SONIA",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "TIPO GENNY",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 40mm"
                    ],
                    hover: false
                },
                {
                    name: "TIPO GIUSY",
                    info: [
                        "Guida singola",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "TIPO ELENA",
                    info: [
                        "Guida singola",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "TIPO EDDI",
                    info: [
                        "Guida singola",
                        "Testata singola",
                        "Cassonetto da 40mm"
                    ],
                    hover: false
                }
            ],
            nameClass: "laterale-classica",
            image: "/img/zanzariere/alba-laterale.jpg",
            width: 240,
            height: 320,
            description: "Il modello LATERALE A MOLLA CLASSICA è adatto per portefinestre in quanto permette di non doversi inchinare sia per l'apertura sia per la chiusura della zanzariera.",
            active: true
        },
        {
            typology: "LATERALE A MOLLA (con guida bassa da 2cm)",
            models: [
                {
                    name: "LARA",
                    info: [
                        "Guida telescopica",
                        "Cuffie laterali",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "VALERIA",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 50mm"
                    ],
                    hover: false
                },
                {
                    name: "DESI",
                    info: [
                        "Guida telescopica",
                        "Testata singola",
                        "Cassonetto da 40mm"
                    ],
                    hover: false
                },
            ],
            image: "/img/zanzariere/lara-rigata.jpg",
            width: 246,
            height: 320,
            description: "Il modello LATERALE con guida bassa da 2cm, si differenzia dal modello LATERALE A MOLLA CLASSICA in quanto viene fornito con una guida inferiore di 2cm.",
            active: false
        },
        {
            typology: "LATERALE A MOLLA (con guida arrotondata da 14mm)",
            models: [
                {
                    name: "LUNA"
                }
            ],
            image: "/img/zanzariere/luna.jpg",
            nameClass: "one-model",
            width: 262,
            height: 320,
            description: "Il modello LUNA, prodotto esclusivamente con il cassonetto da 50mm, si differenzia dal modello LATERALE A MOLLA CLASSICA in quanto viene fornito con una guida arrotondata (calpestabile) di soli 14mm.",
            active: false
        },
        {
            typology: "LATERALE A MOLLA (con guida inferiore da 3mm)",
            models: [
                {
                    name: "ZELIG"
                }
            ],
            nameClass: "one-model",
            image:"/img/zanzariere/zelig.jpg",
            width: 262,
            height: 320,
            description: "Il modello ZELIG, prodotto esclusivamente con il cassonetto da 50mm, dotato di una catena che si adagia sulla guida durante l'apertura della zanzariera, è caratterizzato da una guida inferiore di soli 3mm.",
            active: false
        },
        {
            typology: "LATERALE FRIZIONATA (con guida inferiore da 3mm)",
            models: [
                {
                    name: "JOLLY",
                    info: [
                        "Larghezza massima 160mm"
                    ],
                    hover: false
                },
                {
                    name: "LEVANTE",
                    info: [
                        "Larghezza massima 220mm"
                    ],
                    hover: false
                }
            ],
            nameClass: "laterale-frizionata",
            image: "/img/zanzariere/jolly.jpg",
            width: 240,
            height: 320,
            description: "Il modello LATERALE FRIZIONATA è caratterizzato da un ingombro di 40mm. Prodotto con una guida inferiore di 3mm, a differenza del modello ZELIG, permette di arrestare l'apertura della zanzariera nella posizione desiderata. Viene dotato di una catena (chiusa) che si adagia sulla guida inferiore durante l'apertura della zanzariera. Si differenzia tra JOLLY (con una larghezza massima di 160mm) e LEVANTE (con una larghezza massima di 220mm).",
            active: false
        },
        {
            typology: "LATERALE ANTIVENTO (con guida inferiore da 2mm)",
            models: [
                {
                    name: "BORA"
                }
            ],
            nameClass: "one-model",
            image: "/img/zanzariere/bora.jpg",
            width: 262,
            height: 320,
            description: "Il modello BORA, adatto per portefinestre, viene fornito con una guida inferiore di soli 2mm. Semplicissima da montare, è grazie ad uno speciale meccanismo brevettato che la rete non esce dalle guide anche in presenza di un forte vento.",
            active: false
        },
        {
            typology: "LATERALE PLISSETTATA",
            models: [
                {
                    name: "PLISSE' 22"
                }
            ],
            nameClass: "one-model",
            image: "/img/zanzariere/plisse-22.jpg",
            width: 220,
            height: 320,
            description: "Il modello PLISSE' 22 è caratterizzato da un ingombro di soli 22mm. Prodotto con una guida inferiore di 7mm e la rete plissettata in propilene nera o grigia, permette di arrestare l'apertura della zanzariera nella posizione desiderata.",
            active: false
        },
    ],
    // Elenco tipologie presenti nella Home 
    typologies: [
        {
            name: "Verticali",
            image: "/img/zanzariere/alba.jpg",
            width: 210,
            height: 280
        },
        {
            name: "Laterali",
            image: "/img/zanzariere/lara.jpg",
            width: 210,
            height: 280
        },
        {
            name: "Porta a battente",
            image: "/img/zanzariere/porta-a-battente.jpg",
            width: 210,
            height: 280
        },
        {
            name: "Scorri",
            image: "/img/zanzariere/scorri.jpg",
            width: 210,
            height: 298
        },
        {
            name: "Fissa",
            image: "/img/zanzariere/fissa.jpg",
            width: 210,
            height: 210
        },
        {
            name: "Casper",
            image: "/img/zanzariere/casper.jpg",
            width: 210,
            height: 280
        },
    ],
    // Colori zanzariere presenti sia nel Preventivo sia nelle sezioni delle zanzariere
    colors: [
        {
            typology: "Standard",
            active: true,
            colorInfo: [
                {
                    name: "Bianco 9010",
                    image: "/img/colori/bianco-9010.jpg"
                },
                {
                    name: "Avorio 1013",
                    image: "/img/colori/avorio-1013.jpg"
                },
            ]
        },
        {
            typology: "Gotici",
            active: false,
            colorInfo: [
                {
                    name: "Marrone 8017",
                    image: "/img/colori/marrone-8017.jpg"
                },
                {
                    name: "Nero 9005",
                    image: "/img/colori/nero-9005.jpg"
                },
                {
                    name: "Bronzo Chiaro Verniciato",
                    image: "/img/colori/bronzo-chiaro-verniciato.jpg"
                },
                {
                    name: "Bronzo Scuro Verniciato",
                    image: "/img/colori/bronzo-scuro-verniciato.jpg"
                },
                {
                    name: "Argento",
                    image: "/img/colori/argento.jpg"
                },
                {
                    name: "Rosso Gotico",
                    image: "/img/colori/rosso-gotico.jpg"
                },
                {
                    name: "Verde Gotico",
                    image: "/img/colori/verde-gotico.jpg"
                },
                {
                    name: "Marrone Gotico",
                    image: "/img/colori/marrone-gotico.jpg"
                },
                {
                    name: "Grigio Gotico",
                    image: "/img/colori/grigio-gotico.jpg"
                }
            ]
        },
        {
            typology: "Effecta",
            active: false,
            colorInfo: [
                {
                    name: "Noce Chiaro NH31",
                    image: "/img/colori/noce-chiaro-nh31.jpg"
                },
                {
                    name: "Noce Scuro NH30",
                    image: "/img/colori/noce-scuro-nh30.jpg"
                },
                {
                    name: "Verde GH30",
                    image:  "/img/colori/verde-gh30.jpg"
                },
                {
                    name: "Ciliegio CH30",
                    image: "/img/colori/ciliegio-ch30.jpg"
                },
                {
                    name: "Bianco WH30",
                    image: "/img/colori/bianco-wh30.jpg"
                },
                {
                    name: "Renolit Chiaro Effecta",
                    image: "/img/colori/renolit-chiaro-effecta.jpg"
                },
                {
                    name: "Renolit Scuro Effecta",
                    image: "/img/colori/renolit-scuro-effecta.jpg"
                },
            ]
        },
        {
            typology: "Sublimall",
            active: false,
            colorInfo: [
                {
                    name: "Ciliegio Scuro",
                    image: "/img/colori/ciliegio-scuro.jpg"
                },
                {
                    name: "Castano",
                    image: "/public/img/colori/castano.jpg"
                },
                {
                    name: "Renolit Chiaro Sublimall",
                    image: "/img/colori/renolit-chiaro-sublimall.jpg"
                },
                {
                    name: "Renolit Scuro Sublimall",
                    image: "/img/colori/renolit-scuro-sublimall.jpg"
                },
                {
                    name: "Renolit Bianco Sublimall",
                    image: "/img/colori/renolit-bianco-sublimall.jpg"
                },
                {
                    name: "Renolit Marrone Sublimall",
                    image: "/img/colori/renolit-marrone-sublimall.jpg"
                }
            ]
        },
    ],
});
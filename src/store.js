import { reactive } from 'vue';

const imagePrefix = process.env.NODE_ENV === 'production' ? '/giesse/' : '/';

export const store = reactive({
    //imageZanz: "",
    imagePath: imagePrefix + "img/jumbotron.png",
    imagePath2: imagePrefix + "img/sfondo-faq.png",
    imagePath3: imagePrefix + "img/ringraziamento.png",
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
            name: "Laterale a molla (guida bassa da 2cm)",
            hash: "#molla-guida-bassa"
        },
        {
            name: "Laterale a molla (guida arrotondata da 14mm)",
            hash: "#luna"
        },
        {
            name: "Laterale a molla (guida bassa da 3mm)",
            hash: "#zelig"
        },
        {
            name: "Laterale Frizionata",
            hash: "#jolly"
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
            model: "VERTICALE A MOLLA CLASSICA",
            firstName: "ALBA D.G. (con cuffie) - SONIA D.G. (senza cuffie) - GENNY (con cassonetto da 40mm)",
            secondName: "GIUSY (con cuffie) - ELENA (senza cuffie) - EDDI (con cassonetto da 40mm)",
            image: imagePrefix + "img/zanzariere/alba.png",
            description: "Il modello VERTICALE A MOLLA CLASSICA prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
            active: true
        },
        {
            model: "VERTICALE A MOLLA (con sistema a cricchetto)",
            name: "LAURA (con cuffie) - EVA (senza cuffie) - ASIA (con cassonetto da 40mm)",
            image: imagePrefix + "img/zanzariere/laura.png",
            description: "Il modello a CRICCHETTO, prodotto di serie con il cassonetto da 50mm, viene realizzato con un sistema a pulsante molto semplice da manovrare che permette l'apertura della zanzariera in modo semplice e veloce. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 55mm), cassonetto da 40 (ingombro testate 40mm).",
            active: false
        },
        {
            model: "VERTICALE A CATENA CLASSICA",
            firstName: "KATIA D.G. (con cuffie) - VERA (senza cuffie)",
            secondName: "SARA (senza cuffie)",
            image: imagePrefix + "img/zanzariere/katia.png",
            description: "Il modello VERTICALE A CATENA CLASSICA, prodotto esclusivamente con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        },
        {
            model: "VERTICALE A CATENA + MOLLA (con aggancio magnetico)",
            name: "GIADA (con cuffie) - MERI (senza cuffie)",
            nameChange: "giada",
            image: imagePrefix + "img/zanzariere/giada.png",
            description: "Il modello VERTICALE A CATENA + MOLLA, prodotto esclusivamente con il cassonetto da 50mm, viene realizzato con una molla di richiamo che permette di tenere la rete ben tesa. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        }
    ],
    // Array di oggetti 'horizontal' - contiene informazioni zanzariere
    horizontal: [
        {
            model: "LATERALE A MOLLA CLASSICA",
            name: "TIPO ALBA (con cuffie) - TIPO SONIA (senza cuffie) - TIPO GENNY (con cassonetto da 40mm)",
            nameChange: "laterale-alba",
            image: imagePrefix + "img/zanzariere/alba-laterale.png",
            description: "Il modello LATERALE A MOLLA CLASSICA, prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
            active: true
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 2cm)",
            name: "LARA (con cuffie) - VALERIA (senza cuffie) - DESI (con cassonetto da 40mm)",
            image: imagePrefix + "img/zanzariere/lara-rigata.png",
            description: "Il modello LATERALE con guida bassa da 2cm, prodotto di serie con il cassonetto da 50mm, è caratterizzato da una guida inferiore di soli 2cm. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
            active: false
        },
        {
            model: "LATERALE A MOLLA (con guida arrotondata da 14mm)",
            name: "LUNA",
            image: imagePrefix + "img/zanzariere/luna.png",
            description: "Il modello LUNA, prodotto esclusivamente con il cassonetto da 50mm, è caratterizzato da una guida inferiore (arrotondata) di soli 14mm. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 3mm)",
            name: "ZELIG",
            image: imagePrefix + "img/zanzariere/zelig.png",
            description: "Il modello ZELIG, prodotto esclusivamente con il cassonetto da 50mm, è caratterizzato da una guida inferiore di soli 3mm. Dotato di una catena che si adagia sulla guida durante l'apertura della zanzariera, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        },
        {
            model: "LATERALE FRIZIONATA (con guida bassa da 3mm)",
            name: "JOLLY",
            nameChange: "jolly",
            image: imagePrefix + "img/zanzariere/jolly.jpg",
            description: "Il modello JOLLY, è caratterizzato da un ingombro di 4mm. Prodotto con una guida inferiore di 4mm, a differenza del modello ZELIG permette di arrestare l'apertura della zanzariera nella posizione desiderata. Viene dotato di una catena (chiusa) che si adagia sulla guida inferiore durante l'apertura della zanzariera.",
            active: false
        },
        {
            model: "LATERALE ANTIVENTO (con guida bassa da 2mm)",
            name: "BORA",
            image: imagePrefix + "img/zanzariere/bora.png",
            description: "Il modello BORA, adatto per portefinestre, viene fornito con una guida inferiore di soli 2mm. Semplicissima da montare, è grazie ad uno speciale meccanismo brevettato che la rete non esce dalle guide anche in presenza di un forte vento.",
            active: false
        },
        {
            model: "LATERALE PLISSETTATA",
            name: "PLISSE' 22",
            nameChange: "plisse",
            image: imagePrefix + "img/zanzariere/plisse-22.png",
            description: "Il modello PLISSE' 22, è caratterizzato da un ingombro di 22mm. Prodotto con una guida inferiore di 7mm e la rete plissettata in propilene nera o grigia, permette di arrestare l'apertura della zanzariera nella posizione desiderata.",
            active: false
        },
    ],
    // Elenco tipologie presenti nella Home 
    typologies: [
        {
            name: "Verticali",
            image: imagePrefix + "img/zanzariere/alba.png",
        },
        {
            name: "Orizzontali",
            image: imagePrefix + "img/zanzariere/lara.png",
        },
        {
            name: "Porta a battente",
            image: imagePrefix + "img/zanzariere/porta-a-battente.png"
        },
        {
            name: "Scorri",
            image: imagePrefix + "img/zanzariere/scorri.png"
        },
        {
            name: "Fissa",
            image: imagePrefix + "img/zanzariere/fissa.png"
        },
        {
            name: "Casper",
            image: imagePrefix + "img/zanzariere/casper.png"
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
                    image: imagePrefix + "img/colori/bianco-9010.jpg"
                },
                {
                    name: "Avorio 1013",
                    image: imagePrefix + "img/colori/avorio-1013.jpg"
                },
            ]
        },
        {
            typology: "Gotici",
            active: false,
            colorInfo: [
                {
                    name: "Marrone 8017",
                    image: imagePrefix + "img/colori/marrone-8017.jpg"
                },
                {
                    name: "Nero 9005",
                    image: imagePrefix + "img/colori/nero-9005.jpg"
                },
                {
                    name: "Bronzo Chiaro Verniciato",
                    image: imagePrefix + "img/colori/bronzo-chiaro-verniciato.jpg"
                },
                {
                    name: "Bronzo Scuro Verniciato",
                    image: imagePrefix + "img/colori/bronzo-scuro-verniciato.jpg"
                },
                {
                    name: "Argento",
                    image: imagePrefix + "img/colori/argento.jpg"
                },
                {
                    name: "Rosso Gotico",
                    image: imagePrefix + "img/colori/rosso-gotico.jpg"
                },
                {
                    name: "Verde Gotico",
                    image: imagePrefix + "img/colori/verde-gotico.jpg"
                },
                {
                    name: "Marrone Gotico",
                    image: imagePrefix + "img/colori/marrone-gotico.jpg"
                },
                {
                    name: "Grigio Gotico",
                    image: imagePrefix + "img/colori/grigio-gotico.jpg"
                }
            ]
        },
        {
            typology: "Effecta",
            active: false,
            colorInfo: [
                {
                    name: "Noce Chiaro NH31",
                    image: imagePrefix + "img/colori/noce-chiaro-nh31.jpg"
                },
                {
                    name: "Noce Scuro NH30",
                    image: imagePrefix + "img/colori/noce-scuro-nh30.jpg"
                },
                {
                    name: "Verde GH30",
                    image: imagePrefix + "img/colori/verde-gh30.jpg"
                },
                {
                    name: "Ciliegio CH30",
                    image: imagePrefix + "img/colori/ciliegio-ch30.jpg"
                },
                {
                    name: "Bianco WH30",
                    image: imagePrefix + "img/colori/bianco-wh30.jpg"
                },
                {
                    name: "Renolit Chiaro Effecta",
                    image: imagePrefix + "img/colori/renolit-chiaro-effecta.jpg"
                },
                {
                    name: "Renolit Scuro Effecta",
                    image: imagePrefix + "img/colori/renolit-scuro-effecta.jpg"
                },
            ]
        },
        {
            typology: "Sublimall",
            active: false,
            colorInfo: [
                {
                    name: "Ciliegio Scuro",
                    image: imagePrefix + "img/colori/ciliegio-scuro.jpg"
                },
                {
                    name: "Castano",
                    image: imagePrefix + "img/colori/castano.jpg"
                },
                {
                    name: "Renolit Chiaro Sublimall",
                    image: imagePrefix + "img/colori/renolit-chiaro-sublimall.jpg"
                },
                {
                    name: "Renolit Scuro Sublimall",
                    image: imagePrefix + "img/colori/renolit-scuro-sublimall.jpg"
                },
                {
                    name: "Renolit Bianco Sublimall",
                    image: imagePrefix + "img/colori/renolit-bianco-sublimall.jpg"
                },
                {
                    name: "Renolit Marrone Sublimall",
                    image: imagePrefix + "img/colori/renolit-marrone-sublimall.jpg"
                }
            ]
        },
    ],
});
import { reactive } from 'vue';

export const store = reactive({
    // Tipologie zanzariere
    //isLoading: true,
    linksNav: [
        {
            text: "Richiedi Preventivo",
            href: "preventivo",
            name: "preventivo",
            icon: "fa-regular fa-file-lines",
            active: false
        },
        {
            text: "Posizione Sede",
            href: "sede",
            name: "sede",
            icon: "fa-solid fa-location-dot",
            active: false
        },
        {
            text: "Contatti",
            href: "contatti",
            name: "sede",
            icon: "fa-solid fa-phone",
            active: false
        }
    ],
    // Array di oggetti 'vertical' - contiene informazioni zanzariere
    vertical: [
        {
            model: "VERTICALE A MOLLA CLASSICA",
            firstName: "ALBA (con cuffie) - SONIA (senza cuffie) - GENNY (con cassonetto da 40mm)",
            secondName: "GIUSY (con cuffie) - ELENA (senza cuffie) - EDDI (con cassonetto da 40mm)",
            image: "/img/alba.png",
            description: "Il modello VERTICALE A MOLLA CLASSICA prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
        },
        {
            model: "VERTICALE A MOLLA (con sistema a cricchetto)",
            name: "LAURA (con cuffie) - EVA (senza cuffie) - ASIA (con cassonetto da 40mm)",
            image: "/img/laura.png",
            description: "Il modello a CRICCHETTO, prodotto di serie con il cassonetto da 50mm, viene realizzato con un sistema a pulsante molto semplice da manovrare che permette l'apertura della zanzariera in modo semplice e veloce. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 55mm), cassonetto da 40 (ingombro testate 40mm).",
        },
        {
            model: "VERTICALE A CATENA CLASSICA",
            firstName: "KATIA (con cuffie) - VERA (senza cuffie)",
            secondName: "SARA (senza cuffie)",
            image: "/img/katia.png",
            description: "Il modello VERTICALE A CATENA CLASSICA, prodotto esclusivamente con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
        },
        {
            model: "VERTICALE A CATENA + MOLLA (con aggancio magnetico)",
            name: "GIADA (con cuffie) - MERI (senza cuffie)",
            image: "/img/katia.png",
            description: "Il modello VERTICALE A CATENA + MOLLA, prodotto esclusivamente con il cassonetto da 50mm, viene realizzato con una molla di richiamo che permette di tenere la rete ben tesa. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
        }
    ],
    horizontal: [
        {
            model: "LATERALE A MOLLA CLASSICA",
            name: "TIPO ALBA (con cuffie) - TIPO SONIA (senza cuffie) - TIPO GENNY (con cassonetto da 40mm)",
            //image: "/img/alba.png",
            description: "Il modello LATERALE A MOLLA CLASSICA, prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 2cm)",
            name: "LARA (con cuffie) - VALERIA (senza cuffie) - DESI (con cassonetto da 40mm)",
            //image: "/img/alba.png",
            description: "Il modello LATERALE con guida bassa da 2cm, prodotto di serie con il cassonetto da 50mm, è caratterizzato da una guida inferiore di soli 2cm. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
        },
        {
            model: "LATERALE A MOLLA (con guida arrotondata da 14mm)",
            name: "LUNA",
            //image: "/img/alba.png",
            description: "Il modello LUNA, prodotto esclusivamente con il cassonetto da 50mm, è caratterizzato da una guida inferiore (arrotondata) di soli 14mm. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 3mm)",
            name: "ZELIG",
            //image: "/img/alba.png",
            description: "Il modello ZELIG, prodotto esclusivamente con il cassonetto da 50mm, è caratterizzato da una guida inferiore di soli 3mm. Dotato di una catena che si adagia sulla guida durante l'apertura della zanzariera, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
        },
        {
            model: "LATERALE FRIZIONATA (con guida bassa da 3mm)",
            name: "JOLLY",
            //image: "/img/alba.png",
            description: "Il modello JOLLY, è caratterizzato da un ingombro di 4mm. Prodotto con una guida inferiore di 4mm, a differenza del modello ZELIG permette di arrestare l'apertura della zanzariera nella posizione desiderata. Viene dotato di una catena (chiusa) che si adagia sulla guida inferiore durante l'apertura della zanzariera.",
        },
        {
            model: "LATERALE ANTIVENTO (con guida bassa da 2mm)",
            name: "BORA",
            //image: "/img/alba.png",
            description: "Il modello BORA, adatto per portefinestre, viene fornito con una guida inferiore di soli 2mm. Semplicissima da montare, è grazie ad uno speciale meccanismo brevettato che la rete non esce dalle guide anche in presenza di un forte vento.",
        },
        {
            model: "LATERALE PLISSETTATA",
            name: "PLISSE' 22",
            //image: "/img/alba.png",
            description: "Il modello PLISSE' 22, è caratterizzato da un ingombro di 22mm. Prodotto con una guida inferiore di 7mm e la rete plissettata in propilene nera o grigia, permette di arrestare l'apertura della zanzariera nella posizione desiderata.",
        },
    ],
    typologies: [
        {
            name: "Verticali",
            image: "/img/alba.png",
        },
        {
            name: "Orizzontali",
            image: "/img/lara.png",
        },
        {
            name: "Porta a battente",
            image: "/img/porta-a-battente.jpg"
        },
        {
            name: "Scorri",
            //image: "/img/casper.png"
        },
        {
            name: "Fissa",
            //image: "/img/casper.png"
        },
        {
            name: "Casper",
            image: "/img/casper.jpg"
        },
    ],
    // Colori zanzariere
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
                    image: ""
                },
                {
                    name: "Bronzo Scuro Verniciato",
                    image: ""
                },
                {
                    name: "Argento",
                    image: ""
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
                    image: "/img/colori/verde-gh30.jpg"
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
                    image: "/img/colori/castano.jpg"
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
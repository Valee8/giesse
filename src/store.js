import { reactive } from 'vue';

export const store = reactive({
    //isLoading: true,
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
            image: "/img/alba.png",
            description: "Il modello VERTICALE A MOLLA CLASSICA prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
            active: true
        },
        {
            model: "VERTICALE A MOLLA (con sistema a cricchetto)",
            name: "LAURA (con cuffie) - EVA (senza cuffie) - ASIA (con cassonetto da 40mm)",
            image: "/img/laura.png",
            description: "Il modello a CRICCHETTO, prodotto di serie con il cassonetto da 50mm, viene realizzato con un sistema a pulsante molto semplice da manovrare che permette l'apertura della zanzariera in modo semplice e veloce. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 55mm), cassonetto da 40 (ingombro testate 40mm).",
            active: false
        },
        {
            model: "VERTICALE A CATENA CLASSICA",
            firstName: "KATIA D.G. (con cuffie) - VERA (senza cuffie)",
            secondName: "SARA (senza cuffie)",
            image: "/img/katia.png",
            description: "Il modello VERTICALE A CATENA CLASSICA, prodotto esclusivamente con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        },
        {
            model: "VERTICALE A CATENA + MOLLA (con aggancio magnetico)",
            name: "GIADA (con cuffie) - MERI (senza cuffie)",
            image: "/img/katia.png",
            description: "Il modello VERTICALE A CATENA + MOLLA, prodotto esclusivamente con il cassonetto da 50mm, viene realizzato con una molla di richiamo che permette di tenere la rete ben tesa. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        }
    ],
    // Array di oggetti 'horizontal' - contiene informazioni zanzariere
    horizontal: [
        {
            model: "LATERALE A MOLLA CLASSICA",
            name: "TIPO ALBA (con cuffie) - TIPO SONIA (senza cuffie) - TIPO GENNY (con cassonetto da 40mm)",
            //image: "/img/alba.png",
            description: "Il modello LATERALE A MOLLA CLASSICA, prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
            active: true
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 2cm)",
            name: "LARA (con cuffie) - VALERIA (senza cuffie) - DESI (con cassonetto da 40mm)",
            image: "/img/lara-rigata.png",
            description: "Il modello LATERALE con guida bassa da 2cm, prodotto di serie con il cassonetto da 50mm, è caratterizzato da una guida inferiore di soli 2cm. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
            active: false
        },
        {
            model: "LATERALE A MOLLA (con guida arrotondata da 14mm)",
            name: "LUNA",
            image: "/img/luna.png",
            description: "Il modello LUNA, prodotto esclusivamente con il cassonetto da 50mm, è caratterizzato da una guida inferiore (arrotondata) di soli 14mm. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 3mm)",
            name: "ZELIG",
            //image: "/img/alba.png",
            description: "Il modello ZELIG, prodotto esclusivamente con il cassonetto da 50mm, è caratterizzato da una guida inferiore di soli 3mm. Dotato di una catena che si adagia sulla guida durante l'apertura della zanzariera, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
            active: false
        },
        {
            model: "LATERALE FRIZIONATA (con guida bassa da 3mm)",
            name: "JOLLY",
            //image: "/img/alba.png",
            description: "Il modello JOLLY, è caratterizzato da un ingombro di 4mm. Prodotto con una guida inferiore di 4mm, a differenza del modello ZELIG permette di arrestare l'apertura della zanzariera nella posizione desiderata. Viene dotato di una catena (chiusa) che si adagia sulla guida inferiore durante l'apertura della zanzariera.",
            active: false
        },
        {
            model: "LATERALE ANTIVENTO (con guida bassa da 2mm)",
            name: "BORA",
            //image: "/img/alba.png",
            description: "Il modello BORA, adatto per portefinestre, viene fornito con una guida inferiore di soli 2mm. Semplicissima da montare, è grazie ad uno speciale meccanismo brevettato che la rete non esce dalle guide anche in presenza di un forte vento.",
            active: false
        },
        {
            model: "LATERALE PLISSETTATA",
            name: "PLISSE' 22",
            //image: "/img/alba.png",
            description: "Il modello PLISSE' 22, è caratterizzato da un ingombro di 22mm. Prodotto con una guida inferiore di 7mm e la rete plissettata in propilene nera o grigia, permette di arrestare l'apertura della zanzariera nella posizione desiderata.",
            active: false
        },
    ],
    // others: [
    //     {
    //         model: "PORTA A BATTENTE",
    //         name: "ANTAREX",
    //         image: "/img/porta-a-battente.jpg",
    //         description: "Il modello ANTAREX è una zanzariera a battente per portafinestra. Caratterizzata dall'assenza di profili a pavimento, può essere realizzata ad una o più ante. Fornita di serie con la rete in fibra di vetro, su richiesta può essere fornita anche con rete in alluminio, acciaio, petscreen."
    //     },
    //     {
    //         model: "MODELLO A PANNELLI SCORREVOLI",
    //         name: "SCORRI",
    //         image: "",
    //         description: "Il modello SCORRI è una zanzariera ad ante scorrevoli o saliscendi (a due o più ante). Fornito di serie con la rete in fibra di vetro, su richiesta può essere realizzato anche con rete in alluminio, acciaio, petscreen."
    //     },
    //     {
    //         model: "TELAIO FISSO",
    //         name: "FISSA",
    //         image: "",
    //         description: "Il modello FISSA è viene fornito di serie con rete in fibra di vetro, su richiesta può essere realizzato anche con rete in alluminio, acciaio, petscreen."
    //     },
    //     {
    //         model: "INCASSO CON GUIDA DA 50X35",
    //         name: "CASPER",
    //         image: "",
    //         description: "Il modello CASPER è una zanzariera da incasso per falegnami. Viene prodotto con il cassonetto da 45 o 55mm e con una guida da 50x35. Questo modello può essere realizzato in tutte le versioni:"
    //     }
    // ],
    // Elenco tipologie presenti nella Home 
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
            image: "/img/scorri.png"
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
    // Colori zanzariere presenti sia nel Preventivo sia nelle sezioni delle zanzariere
    colors: [
        {
            typology: "Standard",
            active: true,
            colorInfo: [
                {
                    name: "Bianco 9010",
                    image: "/img/colori/bianco-9010.png"
                },
                {
                    name: "Avorio 1013",
                    image: "/img/colori/avorio-1013.png"
                },
            ]
        },
        {
            typology: "Gotici",
            active: false,
            colorInfo: [
                {
                    name: "Marrone 8017",
                    image: "/img/colori/marrone-8017.png"
                },
                {
                    name: "Nero 9005",
                    image: "/img/colori/nero-9005.png"
                },
                {
                    name: "Bronzo Chiaro Verniciato",
                    image: "/img/colori/bronzo-chiaro-verniciato-3.png"
                },
                {
                    name: "Bronzo Scuro Verniciato",
                    image: "/img/colori/bronzo-scuro-verniciato-2.png"
                },
                {
                    name: "Argento",
                    image: "/img/colori/argento-2.png"
                },
                {
                    name: "Rosso Gotico",
                    image: "/img/colori/rosso-gotico.png"
                },
                {
                    name: "Verde Gotico",
                    image: "/img/colori/verde-gotico.png"
                },
                {
                    name: "Marrone Gotico",
                    image: "/img/colori/marrone-gotico.png"
                },
                {
                    name: "Grigio Gotico",
                    image: "/img/colori/grigio-gotico.png"
                }
            ]
        },
        {
            typology: "Effecta",
            active: false,
            colorInfo: [
                {
                    name: "Noce Chiaro NH31",
                    image: "/img/colori/noce-chiaro-nh31.png"
                },
                {
                    name: "Noce Scuro NH30",
                    image: "/img/colori/noce-scuro-nh30.png"
                },
                {
                    name: "Verde GH30",
                    image: "/img/colori/verde-gh30.png"
                },
                {
                    name: "Ciliegio CH30",
                    image: "/img/colori/ciliegio-ch30.png"
                },
                {
                    name: "Bianco WH30",
                    image: "/img/colori/bianco-wh30.png"
                },
                {
                    name: "Renolit Chiaro Effecta",
                    image: "/img/colori/renolit-chiaro-effecta.png"
                },
                {
                    name: "Renolit Scuro Effecta",
                    image: "/img/colori/renolit-scuro-effecta.png"
                },
            ]
        },
        {
            typology: "Sublimall",
            active: false,
            colorInfo: [
                {
                    name: "Ciliegio Scuro",
                    image: "/img/colori/ciliegio-scuro.png"
                },
                {
                    name: "Castano",
                    image: "/img/colori/castano.png"
                },
                {
                    name: "Renolit Chiaro Sublimall",
                    image: "/img/colori/renolit-chiaro-sublimall.png"
                },
                {
                    name: "Renolit Scuro Sublimall",
                    image: "/img/colori/renolit-scuro-sublimall.png"
                },
                {
                    name: "Renolit Bianco Sublimall",
                    image: "/img/colori/renolit-bianco-sublimall.png"
                },
                {
                    name: "Renolit Marrone Sublimall",
                    image: "/img/colori/renolit-marrone-sublimall.png"
                }
            ]
        },
    ],
});
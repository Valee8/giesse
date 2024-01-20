import { reactive } from 'vue';

const imagePrefix = process.env.NODE_ENV === 'production' ? '/giesse/' : '/';

export const store = reactive({
    // Info Logo in Navbar e Footer
    logo: {
        image: "/img/sfondi-e-logo/logo-giesse.webp",
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
            model: "VERTICALE A MOLLA CLASSICA",
            firstName: "ALBA D.G. (con cuffie) - SONIA D.G. (senza cuffie) - GENNY (con cassonetto da 40mm)",
            secondName: "GIUSY (con cuffie) - ELENA (senza cuffie) - EDDI (con cassonetto da 40mm)",
            image: imagePrefix + "img/zanzariere/alba.webp",
            width: 240,
            height: 320,
            description: "Il modello VERTICALE A MOLLA CLASSICA, adatto soprattutto per finestre, può essere realizzato in diverse tipologie e modelli.",
            active: true
        },
        {
            model: "VERTICALE A MOLLA (con sistema a cricchetto)",
            name: "LAURA (con cuffie) - EVA (senza cuffie) - ASIA (con cassonetto da 40mm)",
            image: imagePrefix + "img/zanzariere/laura.webp",
            width: 262,
            height: 320,
            description: "Il modello VERTICALE A MOLLA può essere realizzato con sistema a CRICCHETTO (un sistema a pulsante che permette l'apertura della zanzariera in modo semplice e veloce). Questo sistema viene realizzato solamente con guida telescopica.",
            active: false
        },
        {
            model: "VERTICALE A CATENA CLASSICA",
            firstName: "KATIA D.G. (con cuffie) - VERA (senza cuffie)",
            secondName: "SARA (senza cuffie)",
            image: imagePrefix + "img/zanzariere/katia.webp",
            width: 233,
            height: 320,
            description: "Il modello VERTICALE A CATENA CLASSICA è adatto sia per finestre sia per portefinestre in quanto dotato di una catenella che può essere inserita dalla parte interna (e anche esterna), in modo da non doversi inchinare per l'apertura della zanzariera. Può essere realizzato in diverse tipologie e modelli ma esclusivamente con cassonetto da 50mm.",
            active: false
        },
        {
            model: "VERTICALE A CATENA + MOLLA (con aggancio magnetico)",
            name: "GIADA (con cuffie) - MERI (senza cuffie)",
            nameClass: "giada",
            image: imagePrefix + "img/zanzariere/giada.webp",
            width: 220,
            height: 290,
            description: "Il modello VERTICALE A CATENA + MOLLA, prodotto esclusivamente con il cassonetto da 50mm, si differenzia dal modello VERTICALE A CATENA CLASSICA in quanto viene dotato di una molla di richiamo che permette di tenere la rete ben tesa.",
            active: false
        }
    ],
    // Array di oggetti 'horizontal' - contiene informazioni zanzariere
    horizontal: [
        {
            model: "LATERALE A MOLLA CLASSICA",
            firstName: "TIPO ALBA (con cuffie) - TIPO SONIA (senza cuffie) - TIPO GENNY (con cassonetto da 40mm)",
            secondName: "TIPO GIUSY (con cuffie) - TIPO ELENA (senza cuffie) - TIPO EDDI (con cassonetto da 40mm)",
            nameClass: "laterale-alba",
            image: imagePrefix + "img/zanzariere/alba-laterale.webp",
            width: 240,
            height: 320,
            description: "Il modello LATERALE A MOLLA CLASSICA è adatto sia per finestre sia per portefinestre in quanto permette di non doversi inchinare per l'apertura della zanzariera. Può essere realizzato in diverse tipologie e modelli.",
            active: true
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 2cm)",
            name: "LARA (con cuffie) - VALERIA (senza cuffie) - DESI (con cassonetto da 40mm)",
            image: imagePrefix + "img/zanzariere/lara-rigata.webp",
            width: 246,
            height: 320,
            description: "Il modello LATERALE con guida bassa da 2cm, si differenzia dal modello LATERALE A MOLLA CLASSICA in quanto viene fornito con una guida inferiore di 2cm. Può essere realizzato in diverse tipologie e modelli.",
            active: false
        },
        {
            model: "LATERALE A MOLLA (con guida arrotondata da 14mm)",
            name: "LUNA",
            image: imagePrefix + "img/zanzariere/luna.webp",
            width: 262,
            height: 320,
            description: "Il modello LUNA, prodotto esclusivamente con il cassonetto da 50mm, si differenzia dal modello LATERALE A MOLLA CLASSICA in quanto viene fornito con una guida arrotondata (calpestabile) di soli 14mm.",
            active: false
        },
        {
            model: "LATERALE A MOLLA (con guida bassa da 3mm)",
            name: "ZELIG",
            image: imagePrefix + "img/zanzariere/zelig.webp",
            width: 262,
            height: 320,
            description: "Il modello ZELIG, prodotto esclusivamente con il cassonetto da 50mm e dotato di una catena che si adagia sulla guida durante l'apertura della zanzariera, è caratterizzato da una guida inferiore di soli 3mm.",
            active: false
        },
        {
            model: "LATERALE FRIZIONATA (con guida bassa da 3mm)",
            name: "JOLLY - LEVANTE",
            image: imagePrefix + "img/zanzariere/jolly.webp",
            width: 240,
            height: 320,
            description: "Il modello JOLLY è caratterizzato da un ingombro di 40mm. Prodotto con una guida inferiore di 3mm, a differenza del modello ZELIG, permette di arrestare l'apertura della zanzariera nella posizione desiderata. Viene dotato di una catena (chiusa) che si adagia sulla guida inferiore durante l'apertura della zanzariera.",
            active: false
        },
        {
            model: "LATERALE ANTIVENTO (con guida bassa da 2mm)",
            name: "BORA",
            image: imagePrefix + "img/zanzariere/bora.webp",
            width: 262,
            height: 320,
            description: "Il modello BORA, adatto per portefinestre, viene fornito con una guida inferiore di soli 2mm. Semplicissima da montare, è grazie ad uno speciale meccanismo brevettato che la rete non esce dalle guide anche in presenza di un forte vento.",
            active: false
        },
        {
            model: "LATERALE PLISSETTATA",
            name: "PLISSE' 22",
            nameClass: "plisse",
            image: imagePrefix + "img/zanzariere/plisse-22.webp",
            width: 220,
            height: 320,
            description: "Il modello PLISSE' 22, è caratterizzato da un ingombro di 22mm. Prodotto con una guida inferiore di 7mm e la rete plissettata in propilene nera o grigia, permette di arrestare l'apertura della zanzariera nella posizione desiderata.",
            active: false
        },
    ],
    // Elenco tipologie presenti nella Home 
    typologies: [
        {
            name: "Verticali",
            image: imagePrefix + "img/zanzariere/alba.webp",
            width: 210,
            height: 280
        },
        {
            name: "Orizzontali",
            image: imagePrefix + "img/zanzariere/lara.webp",
            width: 210,
            height: 280
        },
        {
            name: "Porta a battente",
            image: imagePrefix + "img/zanzariere/porta-a-battente.webp",
            width: 210,
            height: 280
        },
        {
            name: "Scorri",
            image: imagePrefix + "img/zanzariere/scorri.webp",
            width: 210,
            height: 298
        },
        {
            name: "Fissa",
            image: imagePrefix + "img/zanzariere/fissa.webp",
            width: 210,
            height: 210
        },
        {
            name: "Casper",
            image: imagePrefix + "img/zanzariere/casper.webp",
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
                    image: imagePrefix + "img/colori/bianco-9010.webp"
                },
                {
                    name: "Avorio 1013",
                    image: imagePrefix + "img/colori/avorio-1013.webp"
                },
            ]
        },
        {
            typology: "Gotici",
            active: false,
            colorInfo: [
                {
                    name: "Marrone 8017",
                    image: imagePrefix + "img/colori/marrone-8017.webp"
                },
                {
                    name: "Nero 9005",
                    image: imagePrefix + "img/colori/nero-9005.webp"
                },
                {
                    name: "Bronzo Chiaro Verniciato",
                    image: imagePrefix + "img/colori/bronzo-chiaro-verniciato.webp"
                },
                {
                    name: "Bronzo Scuro Verniciato",
                    image: imagePrefix + "img/colori/bronzo-scuro-verniciato.webp"
                },
                {
                    name: "Argento",
                    image: imagePrefix + "img/colori/argento.webp"
                },
                {
                    name: "Rosso Gotico",
                    image: imagePrefix + "img/colori/rosso-gotico.webp"
                },
                {
                    name: "Verde Gotico",
                    image: imagePrefix + "img/colori/verde-gotico.webp"
                },
                {
                    name: "Marrone Gotico",
                    image: imagePrefix + "img/colori/marrone-gotico.webp"
                },
                {
                    name: "Grigio Gotico",
                    image: imagePrefix + "img/colori/grigio-gotico.webp"
                }
            ]
        },
        {
            typology: "Effecta",
            active: false,
            colorInfo: [
                {
                    name: "Noce Chiaro NH31",
                    image: imagePrefix + "img/colori/noce-chiaro-nh31.webp"
                },
                {
                    name: "Noce Scuro NH30",
                    image: imagePrefix + "img/colori/noce-scuro-nh30.webp"
                },
                {
                    name: "Verde GH30",
                    image: imagePrefix + "img/colori/verde-gh30.webp"
                },
                {
                    name: "Ciliegio CH30",
                    image: imagePrefix + "img/colori/ciliegio-ch30.webp"
                },
                {
                    name: "Bianco WH30",
                    image: imagePrefix + "img/colori/bianco-wh30.webp"
                },
                {
                    name: "Renolit Chiaro Effecta",
                    image: imagePrefix + "img/colori/renolit-chiaro-effecta.webp"
                },
                {
                    name: "Renolit Scuro Effecta",
                    image: imagePrefix + "img/colori/renolit-scuro-effecta.webp"
                },
            ]
        },
        {
            typology: "Sublimall",
            active: false,
            colorInfo: [
                {
                    name: "Ciliegio Scuro",
                    image: imagePrefix + "img/colori/ciliegio-scuro.webp"
                },
                {
                    name: "Castano",
                    image: imagePrefix + "img/colori/castano.webp"
                },
                {
                    name: "Renolit Chiaro Sublimall",
                    image: imagePrefix + "img/colori/renolit-chiaro-sublimall.webp"
                },
                {
                    name: "Renolit Scuro Sublimall",
                    image: imagePrefix + "img/colori/renolit-scuro-sublimall.webp"
                },
                {
                    name: "Renolit Bianco Sublimall",
                    image: imagePrefix + "img/colori/renolit-bianco-sublimall.webp"
                },
                {
                    name: "Renolit Marrone Sublimall",
                    image: imagePrefix + "img/colori/renolit-marrone-sublimall.webp"
                }
            ]
        },
    ],
});
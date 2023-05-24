import { reactive } from 'vue';

export const store = reactive({
    // Tipologie zanzariere
    typologies: [
        {
            name: "Verticali",
            image: "/img/alba.png",
        },
        {
            name: "Orizzontali",
            image: "/img/lara.png"
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
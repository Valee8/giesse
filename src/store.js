import { reactive } from 'vue'

export const store = reactive({
    cards: [
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
    colors: [
        {
            typology: "Standard",
            active: true,
            colorInfo: [
                {
                    name: "Bianco 9010",
                    background: "/img/colori/bianco-9010.jpg"
                },
                {
                    name: "Avorio 1013",
                    background: "/img/colori/avorio-1013.jpg"
                },
            ]
        },
        {
            typology: "Gotici",
            active: false,
            colorInfo: [
                {
                    name: "Marrone 8017",
                    background: "/img/colori/marrone-8017.jpg"
                },
                {
                    name: "Nero 9005",
                    background: "/img/colori/nero-9005.jpg"
                },
                {
                    name: "Bronzo Chiaro Verniciato",
                    background: ""
                },
                {
                    name: "Bronzo Scuro Verniciato",
                    background: ""
                },
                {
                    name: "Argento",
                    background: ""
                },
                {
                    name: "Rosso Gotico",
                    background: "/img/colori/rosso-gotico.jpg"
                },
                {
                    name: "Verde Gotico",
                    background: "/img/colori/verde-gotico.jpg"
                },
                {
                    name: "Marrone Gotico",
                    background: "/img/colori/marrone-gotico.jpg"
                },
                {
                    name: "Grigio Gotico",
                    background: "/img/colori/grigio-gotico.jpg"
                }
            ]
        },
        {
            typology: "Effecta",
            active: false,
            colorInfo: [
                {
                    name: "Noce Chiaro NH31",
                    background: "/img/colori/noce-chiaro-nh31.jpg"
                },
                {
                    name: "Noce Scuro NH30",
                    background: "/img/colori/noce-scuro-nh30.jpg"
                },
                {
                    name: "Verde GH30",
                    background: "/img/colori/verde-gh30.jpg"
                },
                {
                    name: "Ciliegio CH30",
                    background: "/img/colori/ciliegio-ch30.jpg"
                },
                {
                    name: "Bianco WH30",
                    background: "/img/colori/bianco-wh30.jpg"
                },
                {
                    name: "Renolit Chiaro Effecta",
                    background: "/img/colori/renolit-chiaro-effecta.jpg"
                },
                {
                    name: "Renolit Scuro Effecta",
                    background: "/img/colori/renolit-scuro-effecta.jpg"
                },
            ]
        },
        {
            typology: "Sublimall",
            active: false,
            colorInfo: [
                {
                    name: "Ciliegio Scuro",
                    background: "/img/colori/ciliegio-scuro.jpg"
                },
                {
                    name: "Castano",
                    background: "/img/colori/castano.jpg"
                },
                {
                    name: "Renolit Chiaro Sublimall",
                    background: "/img/colori/renolit-chiaro-sublimall.jpg"
                },
                {
                    name: "Renolit Scuro Sublimall",
                    background: "/img/colori/renolit-scuro-sublimall.jpg"
                },
                {
                    name: "Renolit Bianco Sublimall",
                    background: "/img/colori/renolit-bianco-sublimall.jpg"
                },
                {
                    name: "Renolit Marrone Sublimall",
                    background: "/img/colori/renolit-marrone-sublimall.jpg"
                }
            ]
        },
    ],
});
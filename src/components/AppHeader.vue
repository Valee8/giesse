<script>

// Importo AppNavbar
import AppNavbar from './AppNavbar.vue';

// Variabile per la funzione setInterval, dichiarata qui perche' se lo facessi all'interno del metodo changeSlide non potrei fare clearInterval(interval) su blockSlide (riga 90)
let interval;

export default {
    name: 'AppHeader',
    components: {
        AppNavbar
    },
    data() {
        return {
            // Index corrente dello slider
            currentSlideIndex: 0,
            // isMouseOver inizialmente a false, con cui controllo se il puntatore e' sopra lo slider
            isMouseOver: false,
            // Contenuto slider
            sliderContent: [
                {
                    name_zanz: "Jolly, la Laterale Frizionata",
                    name: "orizzontali",
                    id: 1,
                    hash: "#jolly-" + 4,
                    active: true,
                },
                {
                    name_zanz: "Laura, con sistema a cricchetto",
                    name: "verticali",
                    id: 0,
                    hash: "#laura-" + 1,
                    active: false,
                },
                {
                    name_zanz: "Luna, con guida arrotondata da 14mm",
                    name: "orizzontali",
                    id: 1,
                    hash: "#luna-" + 2,
                    active: false
                },
                {
                    name_zanz: "Zelig, con guida bassa da 3mm",
                    name: "orizzontali",
                    id: 1,
                    hash: "#zelig-" + 3,
                    active: false
                }
            ]
        }
    },
    methods: {
        // Metodo per far scorrere lo slider
        changeSlide() {

            // Assegno a isMouseOver false in modo che lo slider riprenda a funzionare ogni volta che levo il puntatore
            this.isMouseOver = false;

            // Inizio funzione setInterval
            interval = setInterval(() => {

                // Se isMouseOver e' false lo slider parte
                if (!this.isMouseOver) {
                    // Se l'index corrente e' minore della lunghezza di slider - 1 allora incremento l'index corrente
                    if (this.currentSlideIndex < this.sliderContent.length - 1) {
                        this.currentSlideIndex++;
                    }

                    // Altrimenti sono arrivato all'ultimo elemento dello slider e ricomincio da capo con index = 0
                    else {
                        this.currentSlideIndex = 0;
                    }

                    // Assegno true all'active dello slider corrente
                    this.sliderContent[this.currentSlideIndex].active = true;

                    // Scorro l'array sliderContent con for e assegno false a tutti gli altri active che non sono correnti
                    for (let i = 0; i < this.sliderContent.length; i++) {
                        if (i !== this.currentSlideIndex) {
                            this.sliderContent[i].active = false;
                        }
                    }

                }

            }, 4000); // Lo slider scorre ogni 4 secondi
        },
        // Metodo per bloccare lo slider se ci vado sopra con il puntatore
        blockSlide() {

            // Assegno true a isMouseOver per bloccare lo slider
            this.isMouseOver = true;

            // Se isMouseOver e' true allora interrompo l'esecuzione del timer con clearInterval
            if (this.isMouseOver) {
                clearInterval(interval);
            }
        },
        // changeSlideRectangles(index) {

        //     this.currentSlideIndex = index;

        //     for (let i = 0; i < this.slider_content.length; i++) {
        //         if (i !== this.currentSlideIndex) {
        //             this.slider_content[i].active = false;
        //         }
        //     }

        //     this.slider_content[this.currentSlideIndex].active = true;
        // },
    },
    mounted() {
        // Richiamo il metodo changeSlide su mounted
        this.changeSlide();
    },
}
</script>

<template>
    <!-- Inizio Header -->
    <header :class="{ 'header-home': $route.name === 'home' }">
        <!-- Navbar -->
        <AppNavbar />

        <div class="container">
            <!-- Contenuto header -->
            <div class="jumbotron">
                <!-- Titolo -->
                <div class="title">
                    <h1>
                        Proteggi <div>la tua casa</div>
                    </h1>

                    <p>
                        Affidati a noi che produciamo zanzariere da pi&ugrave; di 30 anni
                    </p>
                </div>

                <!-- Inizio contenuto slider -->
                <div class="container-slide">
                    <div class="slider-header" v-for="(slide, index) in sliderContent" :key="index"
                        :class="{ 'active': index === currentSlideIndex }" @mouseout="changeSlide(index)"
                        @mouseover="blockSlide">
                        <!-- Testo -->
                        <div class="name-zanz">
                            {{ slide.name_zanz }}
                        </div>

                        <!-- Bottone scopri di piu' -->
                        <router-link :to="{ name: slide.name, params: { id: slide.id }, hash: slide.hash }"
                            class="button header">
                            Scopri di pi&ugrave; sulla {{ slide.name_zanz.replace(/,(.*?)[\s\w]*/g, "") }}
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </header>

    <!-- Rettangoli al centro sotto lo sfondo dell'header -->
    <div class="container" v-if="$route.name === 'home'">
        <div class="list-rectangles">
            <div class="rectangles" v-for="(rectangles, index) in sliderContent" :key="index"
                :class="{ 'active': rectangles.active }">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Rettangolini in alto
.list-rectangles {
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 30px;
    padding-top: 30px;
    height: 72px;

    .rectangles {
        background-color: rgba(0, 0, 0, .4);
        width: 45px;
        height: 8px;
        transition: all 1s ease-in-out;

        &.active {
            background-color: #000;

        }

        // &:not(.active) {
        //     cursor: pointer;
        // }
    }
}

// Slider
.container-slide {
    position: relative;
    height: 90px;
}

.slider-header {
    position: absolute;
    top: 0;
    transition: all 1s ease-in-out;

    &:not(.active) {
        opacity: 0;
        z-index: 1;
    }

    &.active {
        z-index: 20;
    }
}

// Header
header {
    color: #fff;

    // Nascondo sfondo header nelle sezioni
    &:not(.header-home) {
        .container {
            display: none;
        }
    }

    .container {
        //display: flex;
        //flex-direction: column;
        //justify-content: flex-end;
        //height: 81%;
        //height: 500px;
        //background-color: red;

        // Contenuto header
        .jumbotron {
            height: 400px;
            //width: 680px;
            padding-top: 60px;

            // Titolo
            .title {
                height: 105%;

                h1 {
                    color: #fff;
                    font-size: 4rem;
                    line-height: 110%;
                }

                p {
                    font-style: italic;
                    font-size: 1.4rem;
                    font-weight: 500;
                }
            }

            // Testo
            .name-zanz {
                font-size: 1.2rem;
                font-weight: bold;
                padding: 15px 0 20px 0;
            }

            a {
                font-size: 1.1rem;
            }
        }
    }
}

// Sfondo con immagine dell'header nella home
.header-home {
    background-image: url('/img/jumbotron.png');
    background-size: cover;
    background-position: 0 -95px;
    height: 610px;
}

// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 480px) and (max-width: 610px) {
    .header-home {
        height: 400px;

        .container {
            .jumbotron {
                padding-top: 30px;
                height: 220px;

                .title {
                    h1 {
                        font-size: 2.3rem;
                    }

                    p {
                        width: 300px;
                        padding-top: 10px;
                        font-style: italic;
                        font-size: 1.1rem;
                        font-weight: 500;
                    }
                }

                .name-zanz,
                a {
                    font-size: 1rem;
                }

                // a {
                //     font-size: 1rem;
                // }
            }
        }
    }
}

@media only screen and (min-width: 610px) and (max-width: 1060px) {
    .header-home {
        height: 450px;

        .container {
            .jumbotron {
                height: 260px;
                padding-top: 20px;

                .title {
                    h1 {
                        font-size: 2.5rem;
                    }

                    p {
                        padding-right: 90px;
                    }
                }

            }
        }
    }
}

@media only screen and (min-width: 480px) and (max-width: 1060px) {
    .header-home {
        background-position: center;
    }
}

// Fine versioni mobile, tablet e intermedie
</style>
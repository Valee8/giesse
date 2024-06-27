<script>

// Importo AppNavbar
import AppNavbar from './AppNavbar.vue';

// Importo store
import { store } from '../store.js';

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

//import './style.css';

// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

export default {
    name: 'AppHeader',
    components: {
        AppNavbar,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            modules: [EffectFade, Autoplay, Pagination],
            lastTimestamp: null,
            animationFrameId: null,
            store,
            // Index corrente dello slider
            currentSlideIndex: 0,
            // isMouseOver inizialmente a false, con cui controllo se il puntatore e' sopra lo slider
            isMouseOver: false,
            // Contenuto slider
            sliderContent: [
                {
                    order: "first",
                    nameZanz: "Jolly, la Laterale Frizionata",
                    typo: "orizzontali",
                    id: 1,
                    hash: "#orizzontali-" + 4,
                    active: true,
                },
                {
                    order: "second",
                    nameZanz: "Laura, con sistema a cricchetto",
                    typo: "verticali",
                    id: 0,
                    hash: "#laura-" + 1,
                    active: false,
                },
                {
                    order: "third",
                    nameZanz: "Luna, con guida arrotondata da 14mm",
                    typo: "orizzontali",
                    id: 1,
                    hash: "#luna-" + 2,
                    active: false
                },
                {
                    order: "fourth",
                    nameZanz: "Zelig, con guida inferiore da 3mm",
                    typo: "orizzontali",
                    id: 1,
                    hash: "#zelig-" + 3,
                    active: false
                }
            ]
        }
    },
    /* methods: {
        // Metodo per far scorrere lo slider
        animateSlider(timestamp) {

            if (!this.isMouseOver) {
                if (!this.lastTimestamp) {
                    this.lastTimestamp = timestamp;
                }

                const deltaTime = timestamp - this.lastTimestamp;

                if (deltaTime >= 6000) {

                    if (this.currentSlideIndex < this.sliderContent.length - 1) {
                        this.currentSlideIndex++;
                    }
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

                    this.lastTimestamp = timestamp;

                }

                this.animationFrameId = requestAnimationFrame(this.animateSlider);
            }

        },
        startSlider() {
            // Assegno a isMouseOver false in modo che lo slider riprenda a funzionare ogni volta che levo il puntatore
            this.isMouseOver = false;

            this.animationFrameId = requestAnimationFrame(this.animateSlider);
        },
        // Metodo per bloccare lo slider se ci vado sopra con il puntatore
        stopSlider() {

            // Assegno true a isMouseOver per bloccare lo slider
            if (this.animationFrameId !== null) {
                this.isMouseOver = true;
                cancelAnimationFrame(this.animationFrameId);
            }
        },
        handleVisibilityChange() {
            if (document.hidden) {
                // La pagina è diventata non visibile
                this.stopSlider(); // Interrompi l'animazione quando la pagina diventa non visibile
            } else {
                // La pagina è diventata visibile
                this.startSlider(); // Riavvia l'animazione quando la pagina diventa visibile
            }
        },
    }, */
    // Richiamo il metodo changeSlide su mounted
    /* mounted() {

        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        this.startSlider();

    },

    beforeDestroy() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        this.stopSlider(); // Interrompi l'animazione prima che il componente venga distrutto
    }, */
    methods: {
        onSwiper(swiper) {
            this.swiperInstance = swiper;
        },
        stopAutoplay() {
            this.swiperInstance.autoplay.stop();
        },
        startAutoplay() {
            this.swiperInstance.autoplay.start();
        }
    }
}
</script>

<template>
    <!-- Inizio Header -->
    <header>
        <!-- Navbar -->
        <AppNavbar />

        <Swiper ref="mySwiper" :effect="'fade'" :autoplay="{
            delay: 3000,
            //pauseOnMouseEnter: true,
            //disableOnInteraction: false
            //disableOnInteraction: true,
        }" :pagination="{
            clickable: false,
            el: '.list-rectangles'
        }" :loop="true" :allowTouchMove="false" :modules="modules" class="slider-home" v-if="$route.name === 'home'"
            @swiper="onSwiper">

            <SwiperSlide v-for="(slider, index) in sliderContent" :key="index" :class="slider.order">

                <div class="container">
                    <!-- Contenuto header -->
                    <div class="header-container">
                        <!-- Titolo -->
                        <div class="title">
                            <h1>
                                Proteggi la tua casa
                            </h1>

                            <p>
                                Affidati a noi che produciamo zanzariere da pi&ugrave; di 30 anni
                            </p>
                        </div>

                        <!-- Inizio contenuto slider -->
                        <div class="container-button" @mouseover="stopAutoplay" @mouseout="startAutoplay">
                            <div class="slider-header">
                                <!-- Testo -->
                                <div class="name-zanz">
                                    {{ slider.nameZanz }}
                                </div>

                                <!-- Bottone scopri di piu' -->
                                <router-link :to="{ name: slider.typo, params: { id: slider.id }, hash: slider.hash }"
                                    class="button header">
                                    Scopri di pi&ugrave;
                                    <!-- sulla {{ slider.nameZanz.replace(/,(.*?)[\s\w]*/g, "") }} -->
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </SwiperSlide>
            <!-- <swiper-slide class="swiper-slide second">Slide 2</swiper-slide>
            <swiper-slide class="swiper-slide third">Slide 3</swiper-slide>
            <swiper-slide class="swiper-slide fourth">Slide 4</swiper-slide> -->

        </Swiper>


        <div v-if="$route.name === 'home'" class="list-rectangles"></div>


        <!-- <Swiper :spaceBetween="30" :centeredSlides="true" :navigation="true" :modules="modules" :effect="'fade'"
            class="mySwiper">

        </Swiper> -->

        <div class="slider-home" :class="{ 'home': $route.name === 'home' }" style="display:none;">
            <div v-for="(slider, index) in sliderContent" :key="index" class="jumbotron"
                :class="[slider.order + (index === currentSlideIndex ? ' active' : '')]">

                <div class="container">
                    <!-- Contenuto header -->
                    <div class="header-container">
                        <!-- Titolo -->
                        <div class="title">
                            <h1>
                                Proteggi la tua casa
                            </h1>

                            <p>
                                Affidati a noi che produciamo zanzariere da pi&ugrave; di 30 anni
                            </p>
                        </div>

                        <!-- Inizio contenuto slider -->
                        <div class="container-button">
                            <div class="slider-header">
                                <!-- Testo -->
                                <div class="name-zanz">
                                    {{ slider.nameZanz }}
                                </div>

                                <!-- Bottone scopri di piu' -->
                                <router-link :to="{ name: slider.typo, params: { id: slider.id }, hash: slider.hash }"
                                    class="button header">
                                    Scopri di pi&ugrave;
                                    <!-- sulla {{ slider.nameZanz.replace(/,(.*?)[\s\w]*/g, "") }} -->
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- <div class="loading" v-else-if="store.isLoading && $route.name === 'home'">
            <div class="spinner">
                <i class="fa-solid fa-spinner"></i>
            </div>
        </div> -->
    </header>

    <!-- Rettangoli al centro sotto lo sfondo dell'header -->
    <!-- <div class="container" v-if="$route.name === 'home'">
        <div class="list-rectangles">
            <div class="rectangles" v-for="(rectangles, index) in sliderContent" :key="index"
                :class="{ 'active': rectangles.active }">
            </div>
        </div>
    </div> -->
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.swiper-slide {
    width: 100%;

    &.first {
        background-image: url('/img/sfondi-e-logo/jumbotron1.webp');
    }

    &.second {
        background-image: url('/img/sfondi-e-logo/jumbotron2.webp');
        margin-top: -1px;
        padding-top: 1px;
    }

    &.third {
        background-image: url('/img/sfondi-e-logo/jumbotron3.webp');
    }

    &.fourth {
        background-image: url('/img/sfondi-e-logo/jumbotron4.webp');
    }
}

.slider-home {
    width: 100%;
    //position: relative;
    height: 538px;
    //z-index: 1;

    /* &:not(.home) {
        display: none;
    } */
}

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
    }
}


// Header
header {
    color: #fff;

    .container {

        // Contenuto header
        .header-container {
            height: 412px;
            padding-top: 60px;

            // Titolo
            .title {
                height: 100%;

                h1 {
                    color: #fff;
                    font-size: 4rem;
                    line-height: 110%;
                    max-width: 360px;
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

/* .jumbotron {
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    &.first {
        background-image: url('/img/sfondi-e-logo/jumbotron1.webp');

    }

    &.second {
        background-image: url('/img/sfondi-e-logo/jumbotron2.webp');
        margin-top: -1px;
        padding-top: 1px;
    }

    &.third {
        background-image: url('/img/sfondi-e-logo/jumbotron3.webp');
    }

    &.fourth {
        background-image: url('/img/sfondi-e-logo/jumbotron4.webp');
    }

    &:not(.active) {
        z-index: 1;
        visibility: hidden;
    }

    &.active {
        z-index: 20;
        visibility: visible;
    }

    .container-slide {
        height: 90px;
    }

} */


@media only screen and (min-width: 300px) and (max-width: 479px) {
    .list-rectangles {
        transform: scale(0.8);
    }

    header {
        .jumbotron {

            .container-slide {
                .button {
                    font-size: 0.8rem;
                }
            }
        }
    }
}

// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 300px) and (max-width: 610px) {

    .slider-home {
        height: 350px;
    }

    header {

        .jumbotron {
            height: 350px;
        }

        .container {
            .header-container {
                padding-top: 30px;
                height: 220px;

                .title {
                    h1 {
                        font-size: 2.3rem;
                        max-width: 78%;
                    }

                    p {
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
            }
        }
    }
}

@media only screen and (min-width: 610px) and (max-width: 1060px) {

    .slider-home {
        height: 450px;
    }

    header {
        .jumbotron {
            height: 450px;


            .container {
                .header-container {
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
}

@media only screen and (min-width: 300px) and (max-width: 1060px) {
    header {
        .jumbotron {
            background-position: top center;
        }
    }
}

// Fine versioni mobile, tablet e intermedie</style>
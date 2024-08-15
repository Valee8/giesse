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
            swiperClass: "",
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
                    typo: "laterali",
                    hash: "#jolly-" + 4,
                    active: true,
                    src: "/img/sfondi-e-logo/jumbotron1.jpg"
                },
                {
                    order: "second",
                    nameZanz: "Laura, con sistema a cricchetto",
                    typo: "verticali",
                    hash: "#laura-" + 1,
                    active: false,
                    src: "/img/sfondi-e-logo/jumbotron2.jpg"
                },
                {
                    order: "third",
                    nameZanz: "Luna, con guida arrotondata da 14mm",
                    typo: "laterali",
                    hash: "#luna-" + 2,
                    active: false,
                    src: "/img/sfondi-e-logo/jumbotron3.jpg"
                },
                {
                    order: "fourth",
                    nameZanz: "Zelig, con guida inferiore da 3mm",
                    typo: "laterali",
                    hash: "#zelig-" + 3,
                    active: false,
                    src: "/img/sfondi-e-logo/jumbotron4.jpg"
                }
            ]
        }
    },
    methods: {
        onSwiper(swiper) {
            this.swiperInstance = swiper;
        },
        stopAutoplay() {
            this.swiperInstance.autoplay.stop();
        },
        startAutoplay() {
            this.swiperInstance.autoplay.start();
        },
        onImageLoad() {
            this.swiperClass = "loaded";
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
            @swiper="onSwiper" :speed="1000">

            <SwiperSlide v-for="(slider, index) in sliderContent" :key="index" :class="swiperClass">

                <img :src="slider.src" alt="Immagine Jumbotron" class="image" :class="{ 'second': index === 1 }"
                    loading="lazy" @load="onImageLoad">

                <div class="container">
                    <!-- Contenuto header -->
                    <div class="header-container">
                        <!-- Titolo -->
                        <div class="title">
                            <h1>
                                Proteggi la tua casa
                            </h1>

                            <p>
                                Affidati a noi che produciamo zanzariere da oltre 30 anni
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
                                <router-link :to="{ name: slider.typo, hash: slider.hash }" class="button header">
                                    Scopri di più
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </SwiperSlide>

        </Swiper>

        <div v-if="$route.name === 'home'" class="list-rectangles"></div>
    </header>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.swiper-slide {
    background-image: url('/img/sfondi-e-logo/jumbotron1-sfoc.jpg');
    width: 100%;
    position: relative;

    .image {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;

        &.second {
            margin-top: -1px;
        }
    }

    &.loaded {
        .image {
            opacity: 1;
        }
    }

    /*&.first {
        background-image: url('/img/sfondi-e-logo/jumbotron1.jpg');
    }

    &.second {
        background-image: url('/img/sfondi-e-logo/jumbotron2.jpg');
        margin-top: -1px;
        padding-top: 1px;
    }

    &.third {
        background-image: url('/img/sfondi-e-logo/jumbotron3.jpg');
    }

    &.fourth {
        background-image: url('/img/sfondi-e-logo/jumbotron4.jpg');
    }*/
}

.slider-home {
    width: 100%;
    height: 538px;
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
                    padding-top: 20px;
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


@media only screen and (min-width: 300px) and (max-width: 479px) {
    .list-rectangles {
        transform: scale(0.7);
        padding-top: 20px;
    }
}

@media only screen and (min-width: 480px) and (max-width: 600px) {
    .list-rectangles {
        transform: scale(0.8);
        padding-top: 20px;
    }
}

// Inizio versioni mobile, tablet e intermedie
@media only screen and (min-width: 300px) and (max-width: 610px) {

    .slider-home {
        height: 350px;
    }

    header {

        .swiper-slide {
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

        .container {
            .header-container {
                height: 310px;
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

@media only screen and (min-width: 300px) and (max-width: 1060px) {
    header {
        .swiper-slide {
            background-position: top center;
        }
    }
}
</style>
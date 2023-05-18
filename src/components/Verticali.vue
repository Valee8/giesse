<script>
import { store } from '../store';

const items = document.getElementsByClassName("cards");
const thumbs = document.getElementsByClassName("thumbs");

let activeItem = 0;

export default {
    name: 'Verticali',
    data() {
        return {
            store,
            vertical: [
                {
                    model: "VERTICALE A MOLLA CLASSICA",
                    name: "ALBA (con cuffie) - SONIA (senza cuffie) - GENNY (con cassonetto da 40mm)",
                    image: "/img/alba.png",
                    description: "Il modello VERTICALE A MOLLA CLASSICA prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
                },
                {
                    model: "VERTICALE A MOLLA (realizzata con sistema a cricchetto)",
                    name: "LAURA (con cuffie) - EVA (senza cuffie) - ASIA (con cassonetto da 40mm)",
                    image: "/img/laura.png",
                    description: "Il modello a CRICCHETTO, prodotto di serie con il cassonetto da 50mm, viene realizzato con un sistema a pulsante molto semplice da manovrare che permette l'apertura della zanzariera in modo semplice e veloce. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 55mm), cassonetto da 40 (ingombro testate 40mm).",
                },
                {
                    model: "VERTICALE A CATENA CLASSICA",
                    name: "KATIA (con cuffie) - VERA (senza cuffie)",
                    image: "/img/katia.png",
                    description: "Il modello VERTICALE A CATENA CLASSICA, prodotto esclusivamente con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
                },
                {
                    model: "VERTICALE A CATENA + MOLLA (realizzata con aggancio magnetico)",
                    name: "GIADA (con cuffie) - MERI (senza cuffie)",
                    image: "/img/katia.png",
                    description: "Il modello VERTICALE A CATENA + MOLLA, prodotto esclusivamente con il cassonetto da 50mm, viene realizzato con una molla di richiamo che permette di tenere la rete ben tesa. Viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm).",
                }
            ],
        }
    },
    mounted() {

        items[activeItem].classList.add("active");
        thumbs[activeItem].classList.add("active");

        // const description = document.querySelector(".description");

        // description.innerHTML = "Il modello <span>VERTICALE A MOLLA CLASSICA</span> " + this.vertical[0].description;

    },
    methods: {
        next() {
            if (activeItem < this.vertical.length - 1) {

                items[activeItem].classList.remove("active");
                thumbs[activeItem].classList.remove("active");

                activeItem++;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

            }

            else {

                activeItem = 0;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

                items[this.vertical.length - 1].classList.remove("active");
                thumbs[this.vertical.length - 1].classList.remove("active");

            }
        },
        prev() {
            if (activeItem <= this.vertical.length - 1 && activeItem > 0) {

                items[activeItem].classList.remove("active");
                thumbs[activeItem].classList.remove("active");

                activeItem--;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

            }

            else {

                activeItem = this.vertical.length - 1;

                items[activeItem].classList.add("active");
                thumbs[activeItem].classList.add("active");

                items[0].classList.remove("active");
                thumbs[0].classList.remove("active");

            }
        },
        changeActive(index) {

            this.store.colors[index].active = true;

            for (let i = 0; i < this.store.colors.length; i++) {
                if (i !== index) {
                    this.store.colors[i].active = false;
                }
            }
        }
    }
}
</script>

<template>
    <section>
        <div class="container">
            <h1>
                Verticali
            </h1>

            <div class="small_container">
                <div class="list-thumbs">
                    <div class="thumbs" v-for="(thumb, index) in vertical" :key="index"></div>
                </div>

                <div class="cards" v-for="(card, index) in vertical">
                    <img :src="card.image" :alt="card.model">
                    <h2>
                        {{ card.model }}
                    </h2>

                    <div class="name">
                        {{ card.name }}
                    </div>

                    <p class="description">
                        {{ card.description }}
                    </p>

                    <a class="arrow left" @click="prev">
                        <i class="fa-solid fa-chevron-left"></i>
                    </a>

                    <a class="arrow right" @click="next">
                        <i class="fa-solid fa-chevron-right"></i>
                    </a>
                </div>

            </div>
        </div>

        <div class="info-colors">

            <div class="container">
                <div class="list-typologies">
                    <div v-for="(typo, index) in store.colors" :key="index">
                        <div @click="changeActive(index)" class="typology-name" :class="typo.active ? 'selected' : ''">
                            {{ typo.typology }}
                        </div>
                    </div>
                </div>

                <div class="list-colors" v-for="(typo, index) in store.colors" :key="index"
                    :class="typo.active ? 'selected' : ''">
                    <div class="colors-name" :class="typo.typology.toLowerCase()" v-if="typo.active">
                        <div v-for="(color, index) in typo.colorInfo" :key="index" class="color">
                            <img :src="color.background" :alt="color.name">
                            <span>
                                {{ color.name }}
                            </span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.small_container {
    text-align: center;

    .list-thumbs {
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 20px;
        padding: 50px 0 20px 0;

        .thumbs {
            width: 30px;
            height: 5px;
        }
    }

    .cards {
        height: 600px;

    }
}

.info-colors {
    background-color: #686868;

    .container {
        display: flex;
        gap: 0 80px;
        padding: 40px 20px;
    }

    .list-typologies {

        .typology-name {
            color: #fff;
            cursor: pointer;

            &.selected {
                font-weight: bold;
            }
        }
    }

    .list-colors {

        &:not(.selected) {
            display: none;
        }

        .colors-name {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 15px;

            span {
                color: #fff;
                text-align: center;
                font-size: 0.7rem;
                display: block;
            }

        }

    }
}

.color {
    width: 120px;

    img {
        width: 100%;
        height: 80px;
        object-fit: cover;
    }
}
</style>
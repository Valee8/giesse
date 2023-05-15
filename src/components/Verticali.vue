<script>
const items = document.getElementsByClassName("cards");

let activeItem = 0;

export default {
    name: 'AppVertical',
    data() {
        return {
            vertical: [
                {
                    model: "VERTICALE A MOLLA CLASSICA",
                    name: "ALBA (con cuffie) - SONIA (senza cuffie) - GENNY (con cassonetto da 40mm)",
                    image: "/img/alba.png",
                    description: "Il modello VERTICALE A MOLLA CLASSICA, prodotto di serie con il cassonetto da 50mm, viene fornito con: cuffie laterali (ingombro cuffie 55mm), testata singola (ingombro testate 50mm), cassonetto da 40mm (ingombro testate 40mm).",
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
            ]
        }
    },
    mounted() {
        items[activeItem].classList.add("active");
    },
    methods: {
        next() {
            if (activeItem < this.vertical.length - 1) {

                items[activeItem].classList.remove("active");

                activeItem++;

                items[activeItem].classList.add("active");

            }

            else {

                activeItem = 0;

                items[activeItem].classList.add("active");

                items[this.vertical.length - 1].classList.remove("active");

            }
        },
        prev() {
            if (activeItem <= this.vertical.length - 1 && activeItem > 0) {

                items[activeItem].classList.remove("active");

                activeItem--;

                items[activeItem].classList.add("active");

            }

            else {

                activeItem = this.vertical.length - 1;

                items[activeItem].classList.add("active");

                items[0].classList.remove("active");

            }
        }
    }
}
</script>

<template>
    <section>
        <h1>
            Verticali
        </h1>

        <div class="list">
            <div class="cards" v-for="(card, index) in vertical" :key="index">
                <img :src="card.image" :alt="card.name">
                <h2>
                    {{ card.model }}
                </h2>

                Nomi modello: {{ card.name }}
                <p>
                    {{ card.description }}
                </p>
            </div>


            <button class="prev" @click="prev">Prev</button>
            <button class="next" @click="next">Next</button>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;
</style>
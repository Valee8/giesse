<script>

const items = document.getElementsByClassName("cards");

let activeItem = 0;

export default {
    name: 'Orizzontali',
    data() {
        return {
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
            ]
        }
    },
    mounted() {
        if (window.location.hash === '#jolly') {
            activeItem = 4;
        }
        else {
            activeItem = 0;
        }

        items[activeItem].classList.add("active");
    },
    methods: {
        next() {
            if (activeItem < this.horizontal.length - 1) {

                items[activeItem].classList.remove("active");

                activeItem++;

                items[activeItem].classList.add("active");

            }

            else {

                activeItem = 0;

                items[activeItem].classList.add("active");

                items[this.horizontal.length - 1].classList.remove("active");

            }

            if (window.location.hash === '#jolly') {
                window.location.hash = "";
            }
        },
        prev() {
            if (activeItem <= this.horizontal.length - 1 && activeItem > 0) {

                items[activeItem].classList.remove("active");

                activeItem--;

                items[activeItem].classList.add("active");

            }

            else {

                activeItem = this.horizontal.length - 1;

                items[activeItem].classList.add("active");

                items[0].classList.remove("active");

            }

            if (window.location.hash === '#jolly') {
                window.location.hash = "";
            }
        }
    }
}
</script>

<template>
    <section>
        <div class="container">
            <h1>
                Orizzontali
            </h1>

            <div class="small_container">
                <div class="cards" v-for="(card, index) in horizontal" :key="index">
                    <img :src="card.image" :alt="card.model">
                    <h2>
                        {{ card.model }}
                    </h2>

                    <div class="name">
                        {{ card.name }}
                    </div>

                    <p>
                        {{ card.description }}
                    </p>

                    <div class="arrow left" @click="prev">
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>

                    <div class="arrow right" @click="next">
                        <i class="fa-solid fa-chevron-right"></i>
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

    .cards {
        height: 600px;

    }
}
</style>
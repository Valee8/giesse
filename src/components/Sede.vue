<script>

// Importo store
import { store } from '../store.js';


import { useHead } from "@vueuse/head";


export default {
    name: 'Sede',
    data() {
        return {
            store,
            showIframe: false
        }
    },
    setup() {
        useHead({
            title: "Posizione sede della Giesse Zanzariere",
            meta: [
                {
                    name: "description",
                    content: "Visita la nostra sede in Sardegna per scoprire le nostre zanzariere - consulta la nostra mappa."
                },
                {
                    property: "og:title",
                    content: "Posizione sede della Giesse Zanzariere"
                },
                {
                    property: "og:description",
                    content: "Visita la nostra sede in Sardegna per scoprire le nostre zanzariere - consulta la nostra mappa."
                }
            ]
        })
    },
    computed: {
        // Stampa nome sezione nel titolo
        printNameSection() {
            for (let i = 0; i < store.linksNav.length; i++) {
                if (i === 1)
                    return store.linksNav[i].text;
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.showIframe = true;
        }, 1000);
    }
}
</script>

<template>
    <section>
        <div class="container">
            <div class="section-title">
                <!-- Scritta Home -->
                <router-link :to="{ name: store.textHome.toLowerCase() }">
                    {{ store.textHome }}
                </router-link>

                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                <span>{{ printNameSection }}</span>
            </div>
        </div>

        <!-- Iframe con la posizione su google -->
        <iframe v-if="showIframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.2310949334355!2d8.528361675727885!3d39.30568487163972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e70b02fe9d03cf%3A0x615031d33eeeb855!2sGiesse%20Zanzariere%20Sandro%20Locci%20Giesse!5e0!3m2!1sit!2sit!4v1685009261815!5m2!1sit!2sit"
            style="border:0;" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" id="location"
            loading="lazy"></iframe>

        <div v-else class="loading">
            <img src="/img/sfondi-e-logo/loading.gif" alt="Immagine caricamento" width="150" height="150">
        </div>

        <!-- Informazioni in basso -->
        <div class="info-giesse">
            <h1>
                Giesse Zanzariere
            </h1>

            <!-- Lista info -->
            <ul class="pt">
                <li>
                    <div>
                        <span>{{ store.infoDitta.address }}</span>
                    </div>
                    <span>{{ store.infoDitta.postalCode }} (SU)</span>
                </li>
                <li class="pt">
                    <h2 class="time">Orari di apertura</h2>
                    Lun - Ven 09:00 - 13:00 / 15:00 - 19:00
                </li>
                <li class="pt">
                    Tel. <span>{{ store.infoDitta.telephone }}</span>
                </li>
                <li>
                    Cell. <span>{{ store.infoDitta.cell }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.loading {
    margin-top: 30px;
    width: 100%;
    height: 473px;
    //background-color: #F1F3F4;
    display: flex;
    justify-content: center;
    align-items: center;
}

section {

    #location {
        padding-top: 30px;
        width: 100%;
        height: 500px;
    }

    .info-giesse {
        text-align: center;
        background-color: #9c9c9c;
        padding: 50px 0;
        margin-top: -4px;

        .pt {
            padding-top: 10px;
        }

        .time {
            font-weight: bold;
            font-size: 16px;
        }

        span {
            color: $yellow-color;
            font-weight: 500;
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 479px) {
    section {
        .info-giesse {
            padding: 50px 20px;
        }

    }
}
</style>
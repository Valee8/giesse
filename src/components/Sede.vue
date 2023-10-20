<script>

// Importo store
import { store } from '../store.js';

export default {
    name: 'Sede',
    data() {
        return {
            store,
        }
    },
    computed: {
        // Stampa nome sezione nel titolo
        printNameSection() {
            for (let i = 0; i < store.linksNav.length; i++) {
                if (i === 1)
                    return store.linksNav[i].text;
            }
        }
    }
}
</script>

<template>
    <section>
        <div class="container">
            <div class="section-title">
                <!-- Scritta Home -->
                <router-link :to="{ name: 'home' }">Home</router-link>
                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                {{ printNameSection }}
            </div>
        </div>

        <!-- Iframe con la posizione su google -->
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.2310949334355!2d8.528361675727885!3d39.30568487163972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e70b02fe9d03cf%3A0x615031d33eeeb855!2sGiesse%20Zanzariere%20Sandro%20Locci%20Giesse!5e0!3m2!1sit!2sit!4v1685009261815!5m2!1sit!2sit"
            style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            id="location"></iframe>

        <!-- Informazioni in basso -->
        <div class="info-giesse">
            <h1>
                Giesse Zanzariere
            </h1>

            <!-- Lista info -->
            <ul class="pt">
                <li>
                    <span>Via Damiano Chiesa 69 <div>09016 Iglesias (SU)</div></span>
                </li>
                <li class="pt">
                    <div class="time">Orari di apertura</div>
                    Lun - Ven 09:00 - 13:00 / 15:00 - 19:00
                </li>
                <li class="pt">
                    Tel. <span>0781 33387</span>
                </li>
                <li>
                    Cell. <span>&plus;39 3939139300</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

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
        }

        span {
            color: $yellow-color;
            font-weight: 500;
        }
    }
}
</style>
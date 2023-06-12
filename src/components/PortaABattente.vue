<script>

import { store } from '../store';

import Colori from './Colori.vue';

export default {
    name: 'PortaABattente',
    components: {
        Colori
    },
    data() {
        return {
            store
        }
    },
    computed: {
        printNameSection() {
            return this.store.typologies[2].name;
        },
    }
}
</script>

<template>
    <!-- Inizio sezioni Verticali/Orizzontali -->
    <section>
        <div class="container">
            <!-- Titolo in alto a sinistra -->
            <div class="section-title" :class="{ 'menu-expand': this.store.classSubmenu === 'expand' }">
                <!-- Scritta Home -->
                <router-link to="/">Home</router-link>
                <!-- Icone freccia -->
                <i class="fa-solid fa-chevron-right"></i>
                <!-- Nome sezione -->
                {{ printNameSection }}
            </div>


            <!-- Inizio parte slider zanzariere -->
            <div class="slider-container">

                <!-- Parte contenuto slider -->
                <div class="slider active">
                    <div class="div-image">
                        <!-- Immagine zanzariera -->
                        <img src="/img/porta-a-battente.jpg" alt="ANTAREX" class="slide-image">
                    </div>

                    <!-- Titolo - nome modello -->
                    <h2>
                        PORTA A BATTENTE
                    </h2>

                    <!-- Nome zanzariera  -->
                    <div class="name">
                        ANTAREX
                    </div>

                    <!-- Descrizione zanzariera -->
                    <p class="description">
                        Il modello ANTAREX &egrave; una zanzariera a battente per portafinestra. Caratterizzata dall'assenza
                        di
                        profili a pavimento, pu&ograve; essere realizzata ad una o pi&ugrave; ante. Fornita di serie con la
                        rete
                        in fibra di vetro, su richiesta pu&ograve; essere fornita anche con rete in alluminio, acciaio,
                        petscreen.
                    </p>
                </div>

            </div>
        </div>

        <!-- Colori -->
        <Colori />
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;
</style>
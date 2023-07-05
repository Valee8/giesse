<script>

import AppNavbar from './AppNavbar.vue';

export default {
    name: 'AppHeader',
    components: {
        AppNavbar
    }
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
                <h1>
                    Proteggi <div>la tua casa</div>
                </h1>

                <!-- Testo -->
                <p>Jolly, la Laterale Frizionata</p>

                <!-- Bottone scopri di piu' -->
                <router-link :to="{ name: 'orizzontali', params: { id: 1 }, hash: '#jolly-' + 4 }" class="button header">
                    Scopri di pi&ugrave;
                </router-link>
            </div>

        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

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
            width: 500px;
            padding-top: 60px;

            // Titolo
            h1 {
                color: #fff;
                height: 100%;
                font-size: 3.3rem;
            }

            // Testo
            p {
                font-size: 1.2rem;
                font-weight: bold;
                padding: 15px 0 20px 0;
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
                width: 300px;

                h1 {
                    font-size: 1.8rem;
                }

                p {
                    font-size: 1rem;
                }
            }
        }
    }
}

@media only screen and (min-width: 610px) and (max-width: 1060px) {
    .header-home {
        height: 450px;
    }
}

@media only screen and (min-width: 480px) and (max-width: 1060px) {
    .header-home {
        background-position: center;
    }
}

// Fine versioni mobile, tablet e intermedie
</style>
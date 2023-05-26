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
                    Proteggi la <div>tua stanza</div>
                </h1>

                <!-- Testo -->
                <p>Jolly, la Laterale Frizionata</p>

                <!-- Bottone scopri di piu' -->
                <router-link :to="{ name: 'orizzontali', params: { id: 1 }, hash: '#jolly' }" class="button-header">
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 98%;

        // Contenuto header
        .jumbotron {
            width: 500px;

            // Titolo
            h1 {
                color: #fff;
                font-size: 2.7rem;
            }

            // Testo
            p {
                font-size: 1.2rem;
                font-weight: bold;
                padding: 15px 0 20px 0;
            }

            // Bottone
            .button-header {
                background-color: #fcf674;
                font-weight: bold;
                padding: 8px 20px;
                color: #000;
                font-size: 0.9rem;
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
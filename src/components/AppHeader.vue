<script>

import AppNavbar from './AppNavbar.vue'

export default {
    name: 'AppHeader',
    components: {
        AppNavbar
    }
}
</script>

<template>
    <header :class="{ 'header-home': $route.name === 'home' }">
        <AppNavbar />

        <div class="container">
            <div class="jumbotron">
                <h1>
                    Proteggi la <div>tua stanza</div>
                </h1>

                <p>Jolly, la Laterale Frizionata</p>

                <router-link :to="{ name: 'orizzontali', params: { id: 1 }, hash: '#jolly' }" class="button">
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

header {
    color: #fff;

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

        .jumbotron {
            width: 500px;

            h1 {
                color: #fff;
                font-size: 2.7rem;
            }

            p {
                font-size: 1.2rem;
                font-weight: bold;
                padding: 15px 0 20px 0;
            }

            .button {
                background-color: #fcf674;
                font-weight: bold;
                padding: 8px 20px;
                color: #000;
                font-size: 0.9rem;
            }
        }
    }
}

.header-home {
    background-image: url('/img/jumbotron.jpg');
    background-size: cover;
    background-position: 0 -95px;
    height: 610px;
}
</style>
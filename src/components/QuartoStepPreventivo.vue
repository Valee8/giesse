<script>

// Importo store
import { store } from '../store';

/* import { useHead } from "@vueuse/head"; */

export default {
    name: 'QuartoStepPreventivo',
    data() {
        return {
            store
        }
    },
    /* setup() {
        useHead({
            link: [
                {
                    rel: "preload",
                    href: "/img/sfondi-e-logo/sfondo-ringraziamento.webp",
                    as: "image"
                }
            ]
        })
    }, */
}
</script>

<template>
    <!-- Quarto e ultimo step -->
    <div class="fourth-step">

        <p class="first">
            <span>Grazie</span> per aver scelto la qualità con un preventivo
        </p>

        <p class="second">
            La <span class="yellow">Giesse Zanzariere</span> ti contatterà
            il prima possibile
        </p>

        <p class="third">
            Tutte le informazioni sono state inviate per email
        </p>

        <router-link :to="{ name: store.textHome.toLowerCase() }" class="button">
            Torna alla Homepage
        </router-link>

    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.fourth-step {
    text-align: center;
    color: #fff;
    font-size: 2rem;
    padding: 0 0 80px 0;

    p {
        margin: 0 auto;

        span {
            &:not(.yellow) {
                display: block;
            }
        }
    }

    .first {
        font-size: 3.9rem;
        padding: 5px 0;
        font-weight: 600;
        max-width: 900px;
    }

    .second {
        font-size: 2.1rem;
        padding: 10px 0 25px 0;
        font-weight: 500;
        max-width: 620px;
        margin: 0 auto;
    }

    .third {
        font-size: 1.2rem;
        margin-bottom: 30px;
        font-weight: 500;
    }

    .yellow {
        color: $yellow-color;
    }

    .button {
        padding: 15px 20px;
        font-size: 1.5rem;
        font-weight: 600;
    }
}


@media only screen and (min-width: 300px) and (max-width: 840px) {


    .fourth-step {
        .button {
            font-size: 1rem;
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 840px) {

    .fourth-step {
        padding-top: 0;
        padding-bottom: 0;

        .first {
            font-size: 2rem;
        }
    }

}
</style>
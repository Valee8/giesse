<script>

// Importo store
import { store } from '../store';

export default {
    name: 'QuartoStepPreventivo',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <!-- Quarto e ultimo step -->
    <div class="fourth-step">

        <div class="first">
            <div>Grazie</div> per aver scelto la qualit&agrave; <div>con un preventivo</div>
        </div>

        <div class="second">
            <div>La <span>Giesse Zanzariere</span> ti contatter&agrave;</div>
            <div>il prima possibile</div>
        </div>

        <div class="third">
            Tutte le informazioni sono state inviate per email
        </div>
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
    padding: 80px 0;

    .first {
        font-size: 3.9rem;
        padding: 5px 0;
        font-weight: 600;
    }

    .second {
        font-size: 2.1rem;
        padding: 10px 0 25px 0;
        font-weight: 500;
    }

    .third {
        font-size: 1.2rem;
        margin-bottom: 30px;
        font-weight: 500;
    }

    span {
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
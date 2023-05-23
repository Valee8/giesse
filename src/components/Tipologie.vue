<script>

import { store } from '../store.js';

export default {
    name: 'Tipologie',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <section id="typologies">
        <div class="container">
            <h2>
                Tipologia Zanzariere
            </h2>

            <div class="list-typologies">
                <div class="typologies" v-for="(card, index) in store.cards" :key="index">
                    <router-link :to="{ name: card.name.toLowerCase().replace(/\s/g, '-'), params: { id: index } }"
                        class="link">

                        <img :src="card.image" :alt="card.name">

                        <h3>
                            {{ card.name }}
                        </h3>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

h2 {
    text-align: center;
    font-size: 1.9rem;
}

.list-typologies {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .typologies {
        width: calc(100% / 3);
        padding: 50px;

        .link {
            color: #000;
        }

        img {
            margin: 0 auto;
            width: 200px;
            height: 263px;
            display: block;
        }

        h3 {
            text-align: center;
            padding-top: 30px;
        }
    }
}
</style>
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
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 9.5rem;

    .typologies {
        width: 210px;
        padding: 50px 0;

        // &:nth-child(1),
        // &:nth-child(4) {
        //     margin-right: 0;
        // }

        // &:nth-child(3),
        // &:nth-child(6) {

        //     margin-left: 0;

        // }

        .link {
            color: #000;
        }

        img {
            //margin: 0 auto;
            display: block;
        }

        h3 {
            text-align: center;
            padding-top: 30px;
        }
    }
}
</style>
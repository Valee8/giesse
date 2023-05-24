<script>

import { store } from '../store.js';

export default {
    name: 'Loader',
    data() {
        return {
            store,
        }
    },
    mounted() {
        this.$router.beforeEach((to, from, next) => {
            this.store.isLoading = true;
            setTimeout(() => {
                next();
            }, 50);
        });

        this.$router.afterEach(() => {
            this.store.isLoading = false;
        });

        setTimeout(() => {
            this.store.isLoading = false;
        }, 50);
    }
}
</script>

<template>
    <div class="loading" v-if="store.isLoading">
        <i class="fa-solid fa-spinner"></i>
    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
    width: 100%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(1turn);
        }
    }
}
</style>
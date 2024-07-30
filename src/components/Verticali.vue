<script>
import { useHead } from "@vueuse/head";

// Importo Slider
import Slider from './Slider.vue';

export default {
    name: 'Verticali',
    components: {
        Slider
    },
    setup() {
        useHead({
            title: "Zanzariere verticali",
            meta: [
                {
                    name: "description",
                    content: "Zanzariere verticali di alta qualità in Sardegna."
                },
                {
                    name: "robots",
                    content: "index, follow"
                },
                {
                    property: "og:title",
                    content: "Zanzariere verticali"
                },
                {
                    property: "og:description",
                    content: "Zanzariere verticali di alta qualità in Sardegna da più di 30 anni."
                },
                {
                    property: "og:image",
                    content: "https://silly-salmiakki-065fbc.netlify.app/img/sfondi-e-logo/logo-giesse.webp"
                }
            ]
        })
    }
}
</script>

<template>
    <Slider />
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;
</style>
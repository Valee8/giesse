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
                    property: "og:title",
                    content: "Zanzariere verticali"
                },
                {
                    property: "og:description",
                    content: "Zanzariere verticali di alta qualità in Sardegna da più di 30 anni."
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
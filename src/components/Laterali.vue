<script>

import { useHead } from "@vueuse/head";

// Importo Slider
import Slider from './Slider.vue';

export default {
    name: 'Laterali',
    components: {
        Slider
    },
    setup() {
        useHead({
            title: "Zanzariere laterali",
            meta: [
                {
                    name: "description",
                    content: "Zanzariere laterali con design innovativo per portefinestre in Sardegna."
                },
                {
                    property: "og:title",
                    content: "Zanzariere laterali"
                },
                {
                    property: "og:description",
                    content: "Zanzariere laterali con design innovativo per portefinestre in Sardegna da oltre 30 anni."
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
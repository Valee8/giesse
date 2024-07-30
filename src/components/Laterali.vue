<script>

// Importo Slider
import Slider from './Slider.vue';

export default {
    name: 'Laterali',
    components: {
        Slider
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
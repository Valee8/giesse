<script>

import Slider from './Slider.vue';

export default {
    name: 'Verticali',
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
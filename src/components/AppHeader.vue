<script>

import AppNavbar from './AppNavbar.vue'

export default {
    name: 'AppHeader',
    components: {
        AppNavbar
    }
}
</script>

<template>
    <header>
        <AppNavbar />
    </header>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

header {
    background-image: url('/img/jumbotron.jpg');
    background-size: cover;
    background-position: 0 -95px;
    min-height: 620px;
}
</style>
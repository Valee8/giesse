<script>

export default {
    name: 'Informazioni',
}
</script>

<template>
    <section>
        <h1>
            Informazioni
        </h1>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

section {
    background-color: #000;
    text-align: center;
    color: #fff;
    min-height: 400px;
    display: none;
}
</style>
<script>

export default {
    name: 'Contatti',
}
</script>

<template>
    <section>
        <div class="bg-section">

            <h1>
                Prova
            </h1>

        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

section {
    background-image: url('/img/jumbotron-faq.jpg');
    background-size: cover;
    background-position: center;
    height: 410px;

    h1 {
        color: #fff;
    }
}
</style>
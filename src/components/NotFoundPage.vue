<script>
export default {
    name: 'NotFoundPage',
    data() {
        return {

        }
    }
}
</script>

<template>
    <section>
        <div class="container">

            <h2>
                Oops!
            </h2>

            <p>
                Ehi, forse hai rotto qualcosa!
            </p>

            <router-link to="/">
                Torna alla Home
            </router-link>
        </div>
    </section>

</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

section {
    background-color: #f5f5f5;
    color: #000;
    padding: 20px 0;

    .container {
        text-align: center;

        h2 {
            font-size: 55px;
        }

        p {
            font-size: 21px;
            margin: 20px 0;
        }

        a {
            color: #fff;
            background-color: #000;
            font-weight: 500;
            padding: 4px 50px;
            border-radius: 8px;
            font-size: 0.9rem;
        }
    }
}
</style>
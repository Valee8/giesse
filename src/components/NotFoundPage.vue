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

            <img src="/img/sfondi-e-logo/glitch-404.gif" alt="Immagine pagina non trovata" width="150" height="57">

            <div>
                <router-link to="/">
                    Torna alla Home
                </router-link>
            </div>
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
    padding: 48px 0;

    .container {
        text-align: center;

        h2 {
            font-size: 3.43rem;
        }

        p {
            font-size: 1.31rem;
            margin: 12px 0 25px 0;
            font-weight: 400;
        }

        img {
            margin-top: 10px;
            margin-bottom: 40px;
        }

        a {
            font-family: "Inter", sans-serif;
            color: #fff;
            background-color: #000;
            font-weight: 700;
            padding: 8px 50px;
            border-radius: 8px;
            font-size: 0.9rem;
        }
    }
}
</style>
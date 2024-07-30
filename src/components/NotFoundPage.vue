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
            <div class="icon-down">
                <i class="fa-regular fa-face-frown"></i>
            </div>

            <h1>
                404
            </h1>

            <h2>
                Pagina non trovata
            </h2>

            <router-link to="/">
                Torna alla Homepage
            </router-link>
        </div>
    </section>

</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

section {
    background-color: #ADADAD;
    color: #000;
    padding: 20px 0;

    .container {
        text-align: center;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
        //height: calc(100vh - 340px);

        .icon-down {
            font-size: 9rem;
        }

        h1 {
            font-size: 5rem;
        }

        h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }

        a {
            color: #000;
        }
    }
}
</style>
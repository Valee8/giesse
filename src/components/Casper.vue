<script>

export default {
    name: 'Casper',
}
</script>

<template>
    <section>
        <div class="container">
            <h1>
                Casper
            </h1>

            <div class="small_container">
                <div class="cards active">
                    <img src="/img/casper.jpg" alt="CASPER">

                    <h2>
                        INCASSO CON GUIDA DA 50X35
                    </h2>

                    <div class="name">
                        CASPER
                    </div>

                    <p>
                        Il modello CASPER &egrave; una zanzariera da incasso per falegnami. Viene prodotto con il cassonetto
                        da
                        45 o 55mm e con una guida da 50x35. Questo modello pu&ograve; essere realizzato in tutte le
                        versioni:
                    <ul>
                        <li>VERTICALE A MOLLA CLASSICA (CASPER A MOLLA)</li>
                        <li>VERTICALE A MOLLA CON SISTEMA A CRICCHETTO (CASPER A CRICCHETTO)</li>
                        <li>VERTICALE A CATENA CLASSICA (CASPER A CATENA)</li>
                        <li>VERTICALE A CATENA + MOLLA (CASPER TIPO MERI)</li>
                        <li>LATERALE A MOLLA CLASSICA (CASPER LATERALE)</li>
                        <li>LATERALE CON GUIDA BASSA DA 2cm (CASPER TIPO VALERIA)</li>
                        <li>LATERALE CON GUIDA ARROTONDATA DA 14mm (CASPER TIPO LUNA)</li>
                        <li>LATERALE CON GUIDA BASSA DA 3mm (CASPER TIPO ZELIG)</li>
                        <li>LATERALE A MOLLA FRIZIONATA (CASPER TIPO JOLLY)</li>
                    </ul>
                    </p>


                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.small_container {
    text-align: center;

    ul {
        li {
            text-align: left;
        }
    }
}
</style>
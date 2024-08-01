<script>

export default {
    name: 'DescrizioneDitta',
}
</script>

<template>
    <!-- Inizio sezione Ditta -->
    <section id="ditta">
        <div class="container">
            <!-- Titolo -->
            <h2>
                La <span>G</span>aranzia a nome <span>G</span>iesse Zanzariere
            </h2>

            <h3>
                <span>Giesse Zanzariere</span>, soluzioni su misura di qualit&agrave; superiore.
            </h3>

            <!-- Testo - descrizione ditta -->
            <div class="description">

                Da oltre 30 anni <span>Giesse Zanzariere</span> si dedica alla produzione di zanzariere con
                rete saldata e bottoncini antivento, offrendo protezione per la tua casa.
                <div>
                    Inoltre, offriamo servizi
                    professionali di riparazione delle zanzariere e sostituzione della rete, assicurando che le tue
                    zanzariere rimangano sempre in perfette condizioni.
                </div>

                Le nostre zanzariere, <span>di serie</span>, sono realizzate con
                <span>cassonetto da 50mm</span> e sono disponibili con:

                <div class="flex">
                    <div class="flex-item">
                        <h4>CUFFIE LATERALI e GUIDA TELESCOPICA </h4>

                        Garantiscono una facile installazione, in particolare nei vani
                        con notevoli fuori squadra.
                    </div>

                    <div class="flex-item">
                        <h4>TESTATA SINGOLA e GUIDA SINGOLA</h4>

                        Adatte principalmente
                        per monoblocchi o vani regolari, offrono una soluzione funzionale.
                    </div>

                    <div class="flex-item">
                        <h4>CASSONETTO DA 40mm</h4>

                        Adatto per spazi ridotti, questa opzione mantiene l'efficienza delle zanzariere in uno
                        spazio limitato.
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Sezione ditta
section {
    .container {

        // Titolo
        h2 {
            text-align: center;
            font-size: 1.9rem;
            max-width: 330px;
            margin: 0 auto;
        }

        h3 {
            text-align: center;
            margin: 30px auto 0 auto;
        }

        // Scritte in rosso
        span {
            color: #e91d24;
        }

        .flex {
            display: flex;
            gap: 30px;
            margin-top: 30px;

            h4 {
                color: #e91d24;
                text-align: center;
                margin-bottom: 25px;
                font-weight: 600;
            }

            .flex-item {
                text-align: left;
                width: calc(100% / 3);
            }
        }

        // Testo
        .description {
            padding: 30px 0;
            text-align: justify;
            margin: 0 auto;
            max-width: 725px;
            font-size: 1.1rem;
            font-weight: 600;

            .list-short {
                display: block;
                margin: 7px 0;
                text-align: center;
            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 600px) {

    section {
        .container {
            p {
                padding: 30px 10px;
                font-size: 1rem;
            }

            h2 {
                font-size: 1.6rem;
            }
        }
    }
}
</style>
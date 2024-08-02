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
                La <span class="highlight">G</span>aranzia a nome <span class="highlight">G</span>iesse Zanzariere
            </h2>

            <h3>
                <span class="highlight">Giesse Zanzariere</span>, soluzioni su misura di qualità superiore.
            </h3>

            <!-- Testo - descrizione ditta -->
            <div class="description">

                <p>
                    Da oltre 30 anni <span class="highlight">Giesse Zanzariere</span> si dedica alla produzione di
                    zanzariere con
                    rete saldata e bottoncini antivento, offrendo protezione per la tua casa.
                </p>

                <p>
                    Inoltre, offriamo servizi professionali di riparazione delle zanzariere e sostituzione della rete,
                    assicurando che le tue
                    zanzariere rimangano sempre in perfette condizioni.
                </p>

                <p>
                    Le nostre zanzariere, <span class="highlight">di serie</span>, sono realizzate con
                    <span class="highlight">cassonetto da 50mm</span> e sono disponibili con:
                </p>

                <div class="flex">
                    <div class="flex-item">
                        <h4>CUFFIE LATERALI e GUIDA TELESCOPICA </h4>

                        <p>
                            Garantiscono una facile installazione, anche nei vani
                            con notevoli fuori squadra.
                        </p>
                    </div>

                    <div class="flex-item">
                        <h4>TESTATA SINGOLA</h4>

                        <p>
                            Adatta principalmente
                            per monoblocchi o vani regolari, offre una soluzione funzionale.
                        </p>
                    </div>

                    <div class="flex-item">
                        <h4>CASSONETTO DA 40mm</h4>

                        <p>
                            Adatto per spazi ridotti, questa opzione mantiene l'efficienza delle zanzariere in uno
                            spazio limitato.
                        </p>
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
        .highlight {
            color: #e91d24;
        }

        .flex {
            display: flex;
            gap: 30px;
            margin-top: 30px;

            h4 {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #e91d24;
                text-align: center;
                margin-bottom: 25px;
                font-weight: 600;
                height: 43px;
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
        }
    }
}

@media only screen and (min-width: 600px) and (max-width: 800px) {

    section {
        .container {
            .flex {
                justify-content: center;
                flex-wrap: wrap;

                .flex-item {
                    width: 40%;

                    p {
                        text-align: center;
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 300px) and (max-width: 600px) {

    section {
        .container {
            .description {
                padding: 30px 10px;
                font-size: 1rem;
            }

            h2 {
                font-size: 1.6rem;
            }

            .flex {
                flex-wrap: wrap;

                .flex-item {

                    &:first-child {
                        h4 {
                            margin-bottom: 10px;
                        }
                    }
                }

                h4 {
                    margin-bottom: 0;
                }

                .flex-item {
                    width: 100%;

                    p {
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>
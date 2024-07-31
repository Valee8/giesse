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

            <!-- Testo - descrizione ditta -->
            <p>
                La <span>Giesse Zanzariere</span>, da pi&ugrave; di 30 anni è attrezzata per la produzione di
                <span>ZANZARIERE SU MISURA</span> con rete saldata e bottoncini
                antivento.
                Le nostre zanzariere vengono prodotte <span>di serie</span> con il <span>cassonetto da 50mm</span> e
                possono
                essere
                fornite con:
                <span class="list-short">
                    <span>
                        CUFFIE LATERALI
                    </span>
                    -
                    <span>
                        TESTATA SINGOLA
                    </span>
                    -
                    <span>CASSONETTO DA 40mm
                    </span>
                </span>
                La versione con <span>CUFFIE LATERALI E GUIDA TELESCOPICA</span> garantisce una facile installazione
                anche
                nei vani con
                notevoli fuori squadra, la versione con <span>TESTATA SINGOLA</span> invece &egrave; adatta soprattutto
                per
                monoblocchi o
                per vani regolari, infine la versione con <span>CASSONETTO DA 40mm</span> &egrave; adatta per spazi
                ridotti.
            </p>
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

        // Scritte in rosso
        span {
            color: #e91d24;
        }

        // Testo
        p {
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

@media only screen and (min-width: 300px) and (max-width: 480px) {

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
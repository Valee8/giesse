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
                La <span>G</span>aranzia a nome <div><span>G</span>iesse Zanzariere</div>
            </h2>

            <!-- Testo - descrizione ditta -->
            <p>
                La <span>Giesse Zanzariere</span>, da pi&ugrave; di 30 anni impegnata nella realizzazione di zanzariere,
                &egrave;
                attrezzata per la produzione di <span>ZANZARIERE SU MISURA</span> con rete saldata e bottoncini antivento.
                Le nostre zanzariere vengono prodotte <span>di serie</span> con il <span>cassonetto da 50mm</span> e possono
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
                La versione con <span>CUFFIE LATERALI E GUIDA TELESCOPICA</span> garantisce una facile installazione anche
                nei vani con
                notevoli fuori squadra, la versione con <span>TESTATA SINGOLA</span> invece &egrave; adatta soprattutto per
                monoblocchi o
                per vani regolari, infine la versione con <span>CASSONETTO DA 40mm</span> &egrave; adatta per spazi ridotti.
            </p>


            <!-- !!!!!! Forse da rimuovere !!!!!! -->
            <!-- <div style="display: none">
                Con misura da <span>scontare</span> la zanzariera verr&agrave; fornita con 2mm in meno in LARGHEZZA e
                ALTEZZA, con
                misura <span>finita</span> la zanzariera verr&agrave; fornita con le stesse misure in LARGHEZZA e ALTEZZA,
                invece con misura
                <span>luce</span> verr&agrave; aumentata in LARGHEZZA e ALTEZZA in base alle varie tipologie dei modelli a
                incasso.
            </div> -->
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
        }

        // Scritte in rosso
        span {
            color: #e91d24;
        }

        // Testo
        p {
            padding: 30px 10px;
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
</style>
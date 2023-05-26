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
                La <span>Giesse Zanzariere</span>, da pi&ugrave; di 20 anni impegnata nella realizzazione di zanzariere, è
                attrezzata per la produzione di <span>ZANZARIERE SU MISURA</span> con rete saldata e bottoncini antivento.
                Possono essere fornite con: <span>CUFFIE LATERALI</span> - <span>TESTATA SINGOLA</span> - <span>CASSONETTO
                    DA 40mm</span>.
                La versione con <span>CUFFIE LATERALI E GUIDA TELESCOPICA</span> garantisce una facile installazione anche
                nei vani con
                notevoli fuori squadra, la versione con <span>TESTATA SINGOLA</span> invece &egrave; adatta soprattutto per
                monoblocchi o
                per vani regolari, infine la versione con <span>CASSONETTO DA 40mm</span> &egrave; adatta per spazi ridotti.

                <!-- !!!!!! Forse da rimuovere !!!!!! -->
            <div style="display: none">
                Con misura da <span>scontare</span> la zanzariera verr&agrave; fornita con 2mm in meno in LARGHEZZA e
                ALTEZZA, con
                misura <span>finita</span> la zanzariera verr&agrave; fornita con le stesse misure in LARGHEZZA e ALTEZZA,
                invece con misura
                <span>luce</span> verr&agrave; aumentata in LARGHEZZA e ALTEZZA in base alle varie tipologie dei modelli a
                incasso.
            </div>
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
        }

        // Scritte in rosso
        span {
            color: #e91d24;
        }

        // Testo
        p {
            text-align: center;
            margin: 0 auto;
            max-width: 690px;
            font-size: 0.9rem;
            font-weight: 600;
            padding: 30px 0;
        }
    }
}
</style>
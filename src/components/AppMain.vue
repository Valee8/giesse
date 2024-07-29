<script>
// Importo componenti in AppMain
import DescrizioneDitta from './DescrizioneDitta.vue';
import Tipologie from './Tipologie.vue';
import Verticali from './Verticali.vue';
import Laterali from './Laterali.vue';
import PortaABattente from './PortaABattente.vue';
import Scorri from './Scorri.vue';
import Fissa from './Fissa.vue';
import Casper from './Casper.vue';
import Preventivo from './Preventivo.vue';
import Sede from './Sede.vue';
import Contatti from './Contatti.vue';

export default {
    name: 'AppMain',
    components: {
        DescrizioneDitta,
        Tipologie,
        Verticali,
        Laterali,
        PortaABattente,
        Scorri,
        Fissa,
        Casper,
        Preventivo,
        Sede,
        Contatti,
    }
}
</script>

<template>
    <!-- Varie sezioni -->
    <DescrizioneDitta v-if="$route.name === 'home'" />

    <Tipologie v-if="$route.name === 'home'" />

    <Verticali v-if="$route.name === 'verticali'" />

    <Laterali v-if="$route.name === 'laterali'" />

    <PortaABattente v-if="$route.name === 'porta-a-battente'" />

    <Scorri v-if="$route.name === 'scorri'" />

    <Fissa v-if="$route.name === 'fissa'" />

    <Casper v-if="$route.name === 'casper'" />

    <Preventivo v-if="$route.name === 'preventivo'" />

    <Sede v-if="$route.name === 'sede'" />

    <Contatti v-if="$route.name === 'contatti'" />
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;
</style>
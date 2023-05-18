<script>

import DescrizioneDitta from './DescrizioneDitta.vue'
import Tipologie from './Tipologie.vue'
import Verticali from './Verticali.vue'
import Orizzontali from './Orizzontali.vue'
import PortaABattente from './PortaABattente.vue'
import Scorri from './Scorri.vue'
import Fissa from './Fissa.vue'
import Casper from './Casper.vue'

export default {
    name: 'AppMain',
    components: {
        DescrizioneDitta,
        Tipologie,
        Verticali,
        Orizzontali,
        PortaABattente,
        Scorri,
        Fissa,
        Casper
    }
}
</script>

<template>
    <DescrizioneDitta v-if="$route.name === 'home'" />

    <Tipologie v-if="$route.name === 'home'" />

    <Verticali v-if="$route.name === 'verticali'" />

    <Orizzontali v-if="$route.name === 'orizzontali'" />

    <PortaABattente v-if="$route.name === 'porta-a-battente'" />

    <Scorri v-if="$route.name === 'scorri'" />

    <Fissa v-if="$route.name === 'fissa'" />

    <Casper v-if="$route.name === 'casper'" />
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;
</style>
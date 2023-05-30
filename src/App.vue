<script>
import { store } from './store.js';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
//import Loader from './components/Loader.vue';

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
    //Loader
  },
  data() {
    return {
      store
    }
  }
}
</script>

<template>
  <!-- <Loader /> -->

  <!-- <AppHeader v-if="!store.isLoading" /> -->
  <AppHeader />

  <main>
    <AppMain />
  </main>

  <AppFooter />
</template>

<style lang="scss">
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Padding sezioni
// Sezioni che hanno id: Home
// Sezioni senza id: tutte le altre
// Sezione con class: Contatti
section {
  &:not([id]) {
    padding-top: 30px;
  }

  &[id] {
    padding-top: 60px;
  }

  &[class] {
    padding-top: 0;
  }
}

// Logo nav e footer
.logo {
  width: 250px;
  height: 55px;
  vertical-align: middle;
}

.section-title {
  font-size: 0.9rem;

  a {
    color: #000;

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    padding-left: 4px;
    padding-right: 1px;
    font-size: 0.8rem;
  }
}
</style>
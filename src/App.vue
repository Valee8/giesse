<script>
import { store } from './store.js';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
import Loader from './components/Loader.vue';

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
    Loader
  },
  data() {
    return {
      store
    }
  }
}
</script>

<template>
  <Loader />

  <!-- Header -->
  <AppHeader v-if="!store.isLoading" />

  <!-- Main -->
  <main>
    <AppMain v-if="!store.isLoading" />
  </main>

  <!-- Footer -->
  <AppFooter v-if="!store.isLoading" />
</template>

<style lang="scss">
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

// Padding sezioni
// Sezioni che hanno id: Home
// Sezioni senza id: tutte le altre
section {
  &:not([id]) {
    padding-top: 30px;
  }

  &[id] {
    padding-top: 60px;
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

// Contenuto slider sezioni Verticali e Orizzontali
.slider-container {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;

  // Rettangoli in alto
  .rectangles {
    background-color: rgba(0, 0, 0, .4);

    &.active {
      background-color: #000;
    }
  }

  // Contenuto slider
  .slider {
    display: none;
    font-weight: bold;
    user-select: none;

    &.active {
      display: block;
    }

    .div-image {
      position: relative;
      //margin: 0 auto;
      //max-width: 900px;

      .slide-image {
        height: 320px;
      }
    }

    h2 {
      padding: 25px 0;
      font-size: 2rem;

      &.giada {
        font-size: 1.8rem;
      }
    }

    .name {
      font-size: 1.3rem;
    }

    .description {
      text-align: justify;
      padding: 84px 0;
      //margin: 0 auto;
      //max-width: 900px;
      font-size: 1.05rem;

      &.giada {
        padding: 87px 0;
      }
    }

    .arrow {
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2.5rem;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }
    }
  }
}
</style>
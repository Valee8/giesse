<script>
import { store } from './store.js';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
//import Loader from './components/Loader.vue';

let slider;

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
    //Loader
  },
  data() {
    return {
      store,
      showBackToTop: false
    }
  },
  watch: {
    $route(to, from) {
      if (!window.location.href.includes("preventivo")) {
        localStorage.clear();

        if (window.location.href.includes("verticali")) {
          slider = this.store.vertical;
        }
        else {
          slider = this.store.horizontal;
        }

        if (to.hash && window.location.hash) {
          for (let i = 0; i < slider.length; i++) {
            if (i !== parseInt(to.hash.replace(/[^0-9]+/g, ''), 10)) {
              slider[i].active = false;
              slider[parseInt(to.hash.replace(/[^0-9]+/g, ''), 10)].active = true;
            }
          }
        }
      }
    }
  },
  updated() {
    window.addEventListener('popstate', this.handleBackButton);
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('popstate', this.handleBackButton);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 700) {
        this.showBackToTop = true;
      }
      else {
        this.showBackToTop = false;
      }
    },
    handleBackButton() {
      if (!window.location.href.includes("preventivo")) {
        localStorage.clear();
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
}
</script>

<template>
  <div :class="{ 'show': showBackToTop }" @click="scrollToTop" class="arrow-up" v-if="$route.name !== 'preventivo'">
    <i class="fa-solid fa-chevron-up"></i>
  </div>

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


.arrow-up {
  position: fixed;
  bottom: 80px;
  left: 80px;
  z-index: 100;
  font-size: 2.5rem;
  cursor: pointer;
  background-color: #878787;
  border-radius: 50%;
  padding: 3px 8px;
  color: #fff;
  opacity: 0;
  transition: all 1s ease;

  &.show {
    opacity: 1;
  }
}

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

  // &.thank-you {
  //   padding-top: 0;
  // }
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

// Bottone
.button {
  background-color: $yellow-color;
  font-weight: bold;
  padding: 8px 20px;
  color: #000;
  font-size: 0.9rem;
}
</style>
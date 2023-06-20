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
      }

      if (window.location.href.includes("verticali")) {
        slider = this.store.vertical;
      }
      else if (window.location.href.includes("orizzontali")) {
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

      if (this.store.classSubmenu === "expand") {
        this.store.submenu = false;
        this.store.classSubmenu = "reduce";
      }
    }
  },
  updated() {
    window.addEventListener('clearStorage', this.handleBackButton);
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('clearStorage', this.handleBackButton);
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
    closeMenu() {

      if (this.store.classSubmenu === "expand") {
        this.store.submenu = false;
        this.store.classSubmenu = "reduce";
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
  <div @click="closeMenu">
    <!-- <AppHeader v-if="!store.isLoading" /> -->
    <AppHeader />

    <main>
      <AppMain />
    </main>

    <AppFooter />
  </div>
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
  // &:not([id]) {
  //   padding-top: 30px;
  // }

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
  padding-top: 30px;

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

// Sezioni Verticali/Orizzontali/Battente/Scorri/Fissa/Casper
section {

  // Inizio contenuto slider
  .slider-container {
    text-align: center;
    max-width: 900px;
    margin: 0 auto;

    // Rettangolini in alto
    .list-rectangles {
      display: flex;
      justify-content: center;
      align-content: center;
      gap: 20px;
      padding: 46px 0 20px 0;

      .rectangles {
        background-color: rgba(0, 0, 0, .4);
        width: 30px;
        height: 6px;

        &.active {
          background-color: #000;

        }

        &:not(.active) {
          cursor: pointer;
        }
      }
    }

    // Contenuto slider
    .slider {
      font-weight: bold;
      user-select: none;
      // transition-property: transform, opacity;
      // transition-duration: 500ms;
      // transition-timing-function: ease-in;

      &:not(.active) {
        opacity: 0;
        height: 0;
      }

      &.active {
        opacity: 1;
        height: auto;
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
        font-size: 1.2rem;

        div {
          &:nth-child(2) {
            padding-top: 10px;
          }
        }
      }

      .casper-list {
        padding-top: 10px;
        padding-bottom: 84px;
        text-align: left;
      }

      .description {
        text-align: justify;
        //margin: 0 auto;
        //max-width: 900px;
        font-size: 1.05rem;

        &.casper {
          padding-top: 84px;
        }

        &:not(.casper) {
          padding: 96px 0;

        }

        &.giada {
          padding: 102px 0;
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
}

@media only screen and (min-width: 1800px) and (max-width: 2000px) {

  section {

    .slider-container {
      padding-bottom: 40px;
      padding-top: 50px;
    }

    .info-colors {

      .container {
        height: 370px;

        .list-colors {

          .colors {
            font-size: 0.92rem;

            .color {
              width: 165px;

              .color-image {
                height: 98px;
              }
            }
          }

        }
      }
    }
  }
}
</style>
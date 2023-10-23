<script>
import { store } from './store.js';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  },
  data() {
    return {
      store,
      showArrowUp: false
    }
  },
  watch: {
    $route(to, from) {

      // Se la rotta cambia e nell'url non e' presente "preventivo" (quindi quando cambio pagina)
      if (!window.location.href.includes("preventivo") && localStorage.length > 0) {
        // Svuoto il contenuto di localStorage
        localStorage.clear();
      }

      // Se l'url include "verticali" slider conterra' l'array vertical (presente nel file store.js)
      if (window.location.href.includes("verticali")) {
        this.store.slider = this.store.vertical;
      }
      // Altrimenti se l'url contiene "orizzontali" slider conterra' l'array horizontal 
      else if (window.location.href.includes("orizzontali")) {
        this.store.slider = this.store.horizontal;
      }

      // Se hash e' presente
      if (to.hash && window.location.hash) {
        // Scorro lo slider con ciclo for
        for (let i = 0; i < this.store.slider.length; i++) {
          // parseInt(to.hash.replace(/[^0-9]+/g, ''), 10) ===> Conversione ad intero del contenuto di hash eliminando ogni simbolo in modo che rimanga solo il numero
          let hashNumber = parseInt(to.hash.replace(/[^0-9]+/g, ''), 10);
          // Se l'i-esimo elemento e' diverso da hashNumber
          if (i !== hashNumber) {
            // Assegno a tutti gli active il valore false
            this.store.slider[i].active = false;
            // Assegno true all'active di hashNumber 
            this.store.slider[hashNumber].active = true;
          }
        }
      }

      // Se classSubmenu (presente nel file store.js) e' uguale a "expand"
      if (this.store.classSubmenu === "expand") {
        // Assegno false a submenu (presente nel file store.js) 
        this.store.submenu = false;
        // Assegno a classSubmenu "reduce"
        this.store.classSubmenu = "reduce";
      }
    }
  },
  updated() {
    // Aggiungo evento per lo scroll 
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    // Rimuovo evento per lo scroll
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // Mostro la freccia o la nascondo a seconda dell'altezza raggiunta della pagina
    handleScroll() {
      if (window.scrollY > 700) {
        this.showArrowUp = true;
      }
      else {
        this.showArrowUp = false;
      }
    },
    // Metodo per
    closeMenu() {
      // chiudere il sottomenu di "Zanzariere" quando si clicca in un qualsiasi punto della pagina
      if (this.store.classSubmenu === "expand") {
        this.store.submenu = false;
        this.store.classSubmenu = "reduce";
      }

      // chiudere il sottomenu del menu hamburger quando si clicca in un qualsiasi punto della pagina
      if (this.store.classHamburger === "visible") {
        this.store.menuHamburger = false;
        this.store.classHamburger = "hidden";
      }

    },
    // Scrollo in alto quando clicco la freccia
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
  <!-- Freccia per scrollare in alto con la pagina -->
  <div :class="{ 'show': showArrowUp }" @click="scrollToTop" class="arrow-up" v-if="$route.name !== 'preventivo'">
    <i class="fa-solid fa-chevron-up"></i>
  </div>

  <div @click="closeMenu">
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

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #000;
  height: 100vh;

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(360deg);
    }
  }
}

// Freccia per scrollare in alto
.arrow-up {
  position: fixed;
  bottom: 80px;
  right: 80px;
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
  padding-top: 30px;

  a {
    color: #000;
    margin-right: 4px;


    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    font-size: 0.8rem;
  }

  span {
    padding-left: 5px;
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

  // Inizio contenuto slider presente in Verticali e Orizzontali
  .slider-container {
    text-align: center;
    max-width: 900px;
    margin: 0 auto;

    &#not-slider {
      padding-top: 72px;
    }

    // Rettangolini in alto
    .list-rectangles {
      display: flex;
      justify-content: center;
      align-content: center;
      gap: 20px;
      padding: 46px 0 20px 0;
      height: 72px;

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

      &:not(.active) {
        display: none;
      }

      .div-image {
        position: relative;

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
        font-size: 1.1rem;

        div {
          &:nth-child(2) {
            padding-top: 10px;
          }
        }
      }

      .casper-list {
        text-align: left;
        padding-bottom: 84px;
      }

      .description {
        text-align: justify;
        font-size: 1.05rem;

        &:not(.casper) {
          padding: 50px 0 90px 0;
        }

        &.casper {
          padding: 30px 0;
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


@media only screen and (min-width: 300px) and (max-width: 479px) {
  .arrow-up {
    display: none;
  }

  section {

    // Inizio contenuto slider presente in Verticali e Orizzontali
    .slider-container {

      // Contenuto slider
      .slider {

        h2 {
          font-size: 1.8rem;
        }

        .div-image {

          .slide-image {
            height: 200px;
          }
        }

        .arrow {
          font-size: 1.5rem;
        }
      }
    }
  }
}

// Inizio versioni mobile, tablet e intermedie
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

// Fine versioni mobile, tablet e intermedie
</style>
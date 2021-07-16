<template>
  <aside class="navigation-sidebar">
    <nuxt-link
      to="/"
      class="py-0 py-lg-2 px-3 px-lg-2 navigation-sidebar__logo"
    >
      <img src="~/assets/images/UNDP_logo.svg" alt="UNDP" />
    </nuxt-link>

    <div class="p-2 ps-3 ps-lg-2 pb-lg-3 text-center navigation-sidebar__menu">
      <span
        class="
          mb-lg-4
          ms-3 ms-lg-0
          text-uppercase
          navigation-sidebar__menu__label
        "
        >{{ menuLabel }}</span
      >

      <button
        ref="menuButton"
        type="button"
        class="btn p-0 border-0 hamburger hamburger--squeeze"
        title="Navigation Menu"
        @click="openMenu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'NavigationSidebar',

  data() {
    return {
      menuLabel: null,
    }
  },

  watch: {
    $route() {
      this.menuLabel = this.setMenuLabel()
    },
  },

  mounted() {
    this.menuLabel = this.setMenuLabel()

    this.$bus.$on('toggle-menu-icon', this.animateIcon)
  },

  beforeDestroy() {
    this.$bus.$off('toggle-menu-icon')
  },

  methods: {
    openMenu() {
      this.$bus.$emit('toggle-menu')

      this.animateIcon()
    },

    animateIcon() {
      this.$refs.menuButton.classList.toggle('is-active')
    },

    setMenuLabel() {
      switch (this.$nuxt.$route.path) {
        case '/':
          return 'index'
        case '/data-availability':
          return 'chapter 1'
        case '/data-disaggregation':
          return 'chapter 2'
        case '/data-up-to-date':
          return 'chapter 3'
        case '/about':
          return 'about'
        default:
          return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation-sidebar {
  width: $sidebar-width;
  height: 100vh;
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @include media-breakpoint-down(lg) {
    width: 100%;
    height: $sidebar-width;

    flex-direction: row;
  }
}

.navigation-sidebar__logo {
  display: flex;
  width: 100%;

  img {
    width: 100%;
  }

  @include media-breakpoint-down(lg) {
    height: 145%;
    width: auto;

    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-1px);

    img {
      height: 100%;
      width: auto;
    }
  }
}

.navigation-sidebar__menu {
  display: flex;
  flex-direction: column;
  align-items: center;

  & path {
    stroke: $dark !important;
  }

  @include media-breakpoint-down(lg) {
    flex-direction: row-reverse;
  }

  @include media-breakpoint-up(lg) {
    & .navigation-sidebar__menu__label {
      writing-mode: vertical-lr;
      transform: rotate(-180deg);
    }
  }
}

/*
 * Hamburger
 */

$hamburger-box-width: 30px;
$hamburger-box-height: 30px;

$hamburger-width: 30px;
$hamburger-height: 2px;

.hamburger {
  display: flex;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
}
// .hamburger:hover {
//   opacity: 0.7;
// }
// .hamburger.is-active:hover {
//   opacity: 0.7;
// }
.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after {
  background-color: $dark;
}

.hamburger-box {
  width: $hamburger-box-width;
  height: $hamburger-box-height;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: $hamburger-width;
  height: $hamburger-height;
  background-color: $dark;
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: '';
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}

/*
 * Squeeze
 */
.hamburger--squeeze .hamburger-inner {
  transition-duration: 0.075s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.hamburger--squeeze .hamburger-inner::before {
  transition: top 0.075s 0.12s ease, opacity 0.075s ease;
}
.hamburger--squeeze .hamburger-inner::after {
  transition: bottom 0.075s 0.12s ease,
    transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.hamburger--squeeze.is-active .hamburger-inner {
  transform: rotate(45deg);
  transition-delay: 0.12s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
.hamburger--squeeze.is-active .hamburger-inner::before {
  top: 0;
  opacity: 0;
  transition: top 0.075s ease, opacity 0.075s 0.12s ease;
}
.hamburger--squeeze.is-active .hamburger-inner::after {
  bottom: 0;
  transform: rotate(-90deg);
  transition: bottom 0.075s ease,
    transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>

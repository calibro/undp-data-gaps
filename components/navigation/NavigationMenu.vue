<template>
  <nav
    ref="navigationMenu"
    class="position-fixed bottom-0 navigation-menu"
    @click="navigateMenu"
  >
    <navigation-link
      link="/narratives/data-availability"
      title="01.Why is important to make data available in the Arab Region?"
    />
    <navigation-link
      link="/narratives/data-disaggregation"
      title="02.Why is it important to have disaggregated data?"
    />
    <navigation-link
      link="/narratives/data-up-to-date"
      title="03.Why is it important to have up-to-date statistic?"
    />
    <navigation-link link="/about" title="About" />
  </nav>
</template>

<script>
import NavigationLink from '~/components/navigation/NavigationLink'

export default {
  name: 'NavigationMenu',

  components: {
    NavigationLink,
  },

  data() {
    return {
      isMenuVisible: false,
    }
  },

  mounted() {
    this.$bus.$on('toggle-menu', this.toggleMenu)
  },

  beforeDestroy() {
    this.$bus.$off('toggle-menu')
  },

  methods: {
    clearAnimations() {
      this.$anime.running.forEach((animation) => {
        animation?.pause()
      })
    },

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible

      if (this.isMenuVisible) {
        this.$refs.navigationMenu.classList.remove('navigation-menu--hidden')
        this.$refs.navigationMenu.classList.add('navigation-menu--visible')
      } else {
        this.$refs.navigationMenu.classList.remove('navigation-menu--visible')
        this.$refs.navigationMenu.classList.add('navigation-menu--hidden')
      }
    },

    navigateMenu() {
      this.toggleMenu()

      this.$bus.$emit('toggle-menu-icon')
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation-menu {
  width: calc(100% - #{$sidebar-width});
  z-index: 999;
  transform: translateY(100%);
  will-change: transform;

  @include media-breakpoint-down(lg) {
    width: 100%;
  }
}

@keyframes showMenu {
  0% {
    display: block;
  }
  1% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.navigation-menu--visible {
  animation: showMenu 700ms cubic-bezier(0.23, 1, 0.32, 1) forwards; /* easeOutQuint */
}

@keyframes hideMenu {
  0% {
    transform: translateY(0);
  }
  99% {
    transform: translateY(100%);
  }
  100% {
    display: none;
  }
}

.navigation-menu--hidden {
  animation: hideMenu 700ms cubic-bezier(0.23, 1, 0.32, 1) forwards; /* easeOutQuint */
}
</style>

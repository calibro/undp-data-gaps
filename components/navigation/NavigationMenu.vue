<template>
  <nav
    ref="navigationMenu"
    class="position-fixed bottom-0 navigation-menu"
    style="transform: translateY(100%)"
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

    changeVisibility() {
      this.isMenuVisible = !this.isMenuVisible
    },

    toggleMenu() {
      this.clearAnimations()

      if (this.isMenuVisible) {
        this.$anime({
          targets: this.$refs.navigationMenu,
          translateY: '100%',
          easing: 'easeOutQuint',
          duration: 500,
        })

        this.changeVisibility()
      } else {
        this.$anime({
          targets: this.$refs.navigationMenu,
          translateY: 0,
          easing: 'easeOutQuint',
          duration: 500,
        })

        this.changeVisibility()
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

  @include media-breakpoint-down(lg) {
    width: 100%;
  }
}
</style>

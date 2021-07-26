<template>
  <div class="viewport">
    <div
      class="
        bg-light
        safe-area
        position-sticky
        top-0
        zIndex
        viewport__navigation
      "
    >
      <navigation-sidebar class="position-sticky top-0" />
    </div>

    <div class="position-relative viewport__content">
      <navigation-menu />
      <div class="safe-area">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import NavigationSidebar from '~/components/navigation/NavigationSidebar'
import NavigationMenu from '~/components/navigation/NavigationMenu'

export default {
  name: 'DefaultLayout',

  components: {
    NavigationSidebar,
    NavigationMenu,
  },
}
</script>

<style lang="scss" scoped>
.viewport {
  display: grid;
  grid-template-columns: min-content 1fr;

  @include media-breakpoint-down(lg) {
    grid-template-columns: 1fr;
  }
}
</style>

<style lang="scss">
html {
  background-color: $dark;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: $dark !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.safe-area {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.zIndex {
  z-index: 13;
}
</style>

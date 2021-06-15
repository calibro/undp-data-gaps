<template>
  <div class="row m-0">
    <div class="col-auto p-0">
      <navigation-sidebar class="position-sticky top-0" />
    </div>

    <div class="col p-0 position-relative">
      <navigation-menu />
      <Nuxt />
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

<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
</style>

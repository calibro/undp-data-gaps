<template>
  <div
    class="
      d-flex
      flex-column
      justify-content-between
      border-end border-dark
      navigation-sidebar
    "
  >
    <nuxt-link to="/" class="d-block p-2 navigation-sidebar__logo">
      <img src="~/assets/images/UNDP_logo.svg" alt="UNDP" />
    </nuxt-link>

    <div class="d-flex flex-column">
      <nuxt-link
        to="/narratives/data-availability"
        class="
          d-flex
          align-items-center
          justify-content-center
          border-top border-dark
          text-decoration-none text-reset
          display-6
          p-2
          navigation-sidebar__narration-link
        "
      >
        1
      </nuxt-link>
      <nuxt-link
        to="/"
        class="
          d-flex
          align-items-center
          justify-content-center
          border-top border-dark
          text-decoration-none text-reset
          display-6
          p-2
          navigation-sidebar__narration-link
        "
      >
        2
      </nuxt-link>
      <nuxt-link
        to="/"
        class="
          d-flex
          align-items-center
          justify-content-center
          border-top border-dark
          text-decoration-none text-reset
          display-6
          p-2
          navigation-sidebar__narration-link
        "
      >
        3
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationSidebar',
}
</script>

<style lang="scss" scoped>
$sidebar-width: 65px;

.navigation-sidebar {
  width: $sidebar-width;
  height: 100vh;
}

.navigation-sidebar__logo {
  img {
    width: 100%;
  }
}

.navigation-sidebar__narration-link {
  width: $sidebar-width;
  height: $sidebar-width;
}
</style>

<template>
  <aside
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

    <nav class="d-flex flex-column">
      <navigation-sidebar-link
        chapter-number="1"
        link="/narratives/data-availability"
        title="Why is important to make data available in the Arab Region?"
      />
      <!-- TODO: Add correct data -->
      <navigation-sidebar-link
        chapter-number="2"
        link="/"
        title="Data availability in the Arab Region"
      />
      <!-- TODO: Add correct data -->
      <navigation-sidebar-link
        chapter-number="3"
        link="/"
        title="Sustainable Development Goals"
      />
    </nav>
  </aside>
</template>

<script>
import NavigationSidebarLink from '~/components/navigation/NavigationSidebarLink'

export default {
  name: 'NavigationSidebar',

  components: {
    NavigationSidebarLink,
  },
}
</script>

<style lang="scss" scoped>
.navigation-sidebar {
  width: $sidebar-width;
  height: 100vh;
  z-index: 999;
}

.navigation-sidebar__logo {
  img {
    width: 100%;
  }
}
</style>
